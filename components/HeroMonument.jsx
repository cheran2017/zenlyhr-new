"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SOLUTIONS } from "./solutionsData";

/* The marble Z and its plinth, rendered as real geometry rather than
   lifted out of the reference video as a flat crop.

   This replaced an image-based hero because every problem that kept
   recurring there was really the same problem: a photograph has no
   depth, so anything that needed depth had to be faked in 2D. Framing
   the Z meant re-cropping the source plate (which then broke at other
   viewport sizes); making chips pass behind it meant hand-tracing its
   silhouette and clipping to that path (which sliced chips into
   fragments wherever the trace grazed a thin stroke). Both are free
   here: the camera frames the subject, and occlusion is a raycast
   against the actual mesh. */

/* The orbiting cards are the site's actual services (shared with the
   Solutions grid and each service's own page) rather than generic
   placeholder labels, spaced evenly around the ring. */
const PILLS = SOLUTIONS.map((s, i) => ({
  key: s.slug,
  label: s.shortLabel,
  dot: s.dot,
  angle: (250 + i * (360 / SOLUTIONS.length)) % 360,
}));

/* Timings read off the reference clip. Its ring completes a revolution
   in roughly 7s, but that clip is a sped-up showcase reel — at 7s on a
   page you're reading, the motion pulls the eye off the copy. 13s keeps
   the same unmistakable "rolling around the monument" read at a pace
   that sits behind text rather than competing with it. */
const ORBIT_SECONDS = 13;
const ORBIT_RADIUS = 2.3;
const ORBIT_TILT = 0.3; // radians; the ring is tipped so it reads as 3D
const PILL_WORLD_HEIGHT = 0.43;

/* Entrance beats, matched to the clip's first second: the chips come up
   together (not one-by-one) from ~0.15s and settle by ~0.7s, and the
   plinth light blooms open a little behind them. */
const PILL_ENTRANCE = { start: 0.15, duration: 0.55, stagger: 0.05 };
const GLOW_ENTRANCE = { start: 0.3, duration: 0.8 };

/* Marble: a procedural canvas texture beats a flat colour here — the
   veining is what makes it read as stone rather than grey plastic. */
function makeMarbleTexture() {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");

  ctx.fillStyle = "#b8b5ae";
  ctx.fillRect(0, 0, size, size);

  // broad tonal mottling
  for (let i = 0; i < 60; i++) {
    const r = 40 + Math.random() * 150;
    const g = ctx.createRadialGradient(
      Math.random() * size, Math.random() * size, 0,
      Math.random() * size, Math.random() * size, r
    );
    const tone = 170 + Math.random() * 65;
    g.addColorStop(0, `rgba(${tone},${tone - 2},${tone - 8},0.22)`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }

  // veins
  for (let i = 0; i < 26; i++) {
    ctx.strokeStyle = `rgba(78,75,70,${0.05 + Math.random() * 0.14})`;
    ctx.lineWidth = Math.random() * 2.2 + 0.3;
    ctx.beginPath();
    let x = Math.random() * size;
    let y = Math.random() * size;
    ctx.moveTo(x, y);
    for (let j = 0; j < 6; j++) {
      x += (Math.random() - 0.5) * 190;
      y += (Math.random() - 0.5) * 190;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* Unlike an HTML overlay, a sprite lives in the same depth buffer as the
   Z. That means a chip is cleanly cut by the diagonal at the exact pixel
   where it passes behind the marble — no opacity trick or silhouette mask
   is needed. The texture is rendered at 2× so the label stays as crisp as
   the original CSS pill on a high-DPI display. */
function makePillSprite({ label, dot }) {
  const density = 2;
  const height = 34;
  const dotSize = 17;
  const left = 9;
  const gap = 7;
  const right = 15;
  const measure = document.createElement("canvas").getContext("2d");
  measure.font = "700 14px Manrope, Arial, sans-serif";
  const width = Math.ceil(left + dotSize + gap + measure.measureText(label).width + right);
  const canvas = document.createElement("canvas");
  canvas.width = width * density;
  canvas.height = height * density;
  const ctx = canvas.getContext("2d");
  ctx.scale(density, density);

  ctx.shadowColor = "rgba(0, 128, 128, 0.16)";
  ctx.shadowBlur = 11;
  ctx.shadowOffsetY = 5;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, height / 2);
  ctx.fill();
  ctx.shadowColor = "transparent";

  ctx.fillStyle = dot;
  ctx.beginPath();
  ctx.arc(left + dotSize / 2, height / 2, dotSize / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0b1a1c";
  ctx.font = "700 14px Manrope, Arial, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(label, left + dotSize + gap, height / 2 + 0.5);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.02,
    depthTest: true,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  const worldWidth = PILL_WORLD_HEIGHT * (width / height);
  sprite.scale.set(worldWidth, PILL_WORLD_HEIGHT, 1);

  return { sprite, material, texture, initialScale: new THREE.Vector2(worldWidth, PILL_WORLD_HEIGHT) };
}

/* The letterform, traced as a 2D path then extruded. Proportions follow
   the reference: a wide top bar, a steep diagonal, a wide bottom bar,
   with the bar ends cut at an angle rather than square. */
function buildZGeometry() {
  const s = new THREE.Shape();
  const halfW = 1.16;
  const halfH = 1.5;
  const bar = 0.46; // bar thickness
  const skew = 0.3; // angled cut on the bar ends

  s.moveTo(-halfW + skew, halfH);
  s.lineTo(halfW - 0.14, halfH);
  s.quadraticCurveTo(halfW + 0.08, halfH, halfW + 0.08, halfH - 0.2);
  s.quadraticCurveTo(halfW + 0.08, halfH - bar, halfW - 0.02, halfH - bar);
  s.lineTo(-halfW + skew + bar * 0.55, -halfH + bar);
  s.lineTo(halfW - skew + 0.08, -halfH + bar);
  s.quadraticCurveTo(halfW + 0.06, -halfH + bar, halfW + 0.06, -halfH + bar - 0.18);
  s.quadraticCurveTo(halfW + 0.06, -halfH, halfW - skew - 0.12, -halfH);
  s.lineTo(-halfW, -halfH);
  s.lineTo(-halfW, -halfH + bar);
  s.lineTo(halfW - skew - bar * 0.55, halfH - bar);
  s.lineTo(-halfW + skew, halfH - bar);
  s.closePath();

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.62,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.055,
    bevelSegments: 4,
    curveSegments: 6,
  });
  geo.center();
  return geo;
}

export default function HeroMonument() {
  const mountRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const canvas = canvasRef.current;
    if (!mount || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.48, 12.2);
    camera.lookAt(0, -0.15, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // composites over the photographic backdrop
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    // ---- studio lighting with soft teal bounce ----
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd0e8e8, 1.45));
    const key = new THREE.DirectionalLight(0xffffff, 2.3);
    key.position.set(4.5, 7.0, 5.5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 24;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x008080, 0.45);
    fill.position.set(-5, 2.5, 2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xd4f5f5, 1.1);
    rim.position.set(-2, 2.5, -4.5);
    scene.add(rim);

    const marble = makeMarbleTexture();
    const stone = new THREE.MeshPhysicalMaterial({
      map: marble,
      color: 0xf6f4ee,
      roughness: 0.36,
      metalness: 0.02,
      clearcoat: 0.55,
      clearcoatRoughness: 0.22,
    });

    // ---- the Z ----
    const zMesh = new THREE.Mesh(buildZGeometry(), stone);
    zMesh.castShadow = true;
    zMesh.receiveShadow = true;
    zMesh.position.y = 0.62;
    zMesh.rotation.y = -0.2; // nearly frontal, with just enough visible depth
    const zGroup = new THREE.Group();
    zGroup.add(zMesh);
    scene.add(zGroup);

    // ---- plinth ----
    const plinthMat = new THREE.MeshPhysicalMaterial({
      map: marble,
      color: 0xeae7df,
      roughness: 0.42,
      clearcoat: 0.35,
    });
    const plinthTop = new THREE.Mesh(new THREE.CylinderGeometry(1.62, 1.7, 0.36, 72), plinthMat);
    plinthTop.position.y = -1.32;
    plinthTop.receiveShadow = true;
    scene.add(plinthTop);

    const goldRing = new THREE.Mesh(
      new THREE.CylinderGeometry(1.92, 1.92, 0.06, 72),
      new THREE.MeshStandardMaterial({
        color: 0xd4af37, metalness: 0.85, roughness: 0.25,
        emissive: 0x996515, emissiveIntensity: 0.08,
      })
    );
    goldRing.position.y = -1.53;
    scene.add(goldRing);

    const plinthBase = new THREE.Mesh(
      new THREE.CylinderGeometry(2.0, 2.08, 0.26, 72),
      new THREE.MeshStandardMaterial({ map: marble, color: 0xdcd8ce, roughness: 0.55 })
    );
    plinthBase.position.y = -1.69;
    plinthBase.receiveShadow = true;
    scene.add(plinthBase);

    // ---- floor contact shadow for grounding on native background ----
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext("2d");
    const sgrad = sctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    sgrad.addColorStop(0, "rgba(0, 50, 50, 0.35)");
    sgrad.addColorStop(0.35, "rgba(0, 40, 40, 0.18)");
    sgrad.addColorStop(0.7, "rgba(0, 30, 30, 0.05)");
    sgrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    sctx.fillStyle = sgrad;
    sctx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);

    const floorShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(5.4, 5.4),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      })
    );
    floorShadow.rotation.x = -Math.PI / 2;
    floorShadow.position.y = -1.83;
    scene.add(floorShadow);

    /* Light pooling on the plinth. A flat disc reads as a green sticker,
       so the alpha is painted as a radial falloff and the mesh is
       additively blended — it lights the stone instead of sitting on it. */
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = glowCanvas.height = 128;
    const gctx = glowCanvas.getContext("2d");
    const grad = gctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(220,255,252,0.92)");
    grad.addColorStop(0.4, "rgba(0,180,180,0.38)");
    grad.addColorStop(1, "rgba(0,128,128,0)");
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 128, 128);
    const glowTex = new THREE.CanvasTexture(glowCanvas);

    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(1.55, 48),
      new THREE.MeshBasicMaterial({
        map: glowTex,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -1.09;
    scene.add(glow);

    // ---- orbit anchors: real 3D points, so their screen path is a
    // genuine perspective projection rather than a hand-tuned ellipse ----
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = ORBIT_TILT;
    scene.add(orbitGroup);
    const pillSprites = PILLS.map((p) => {
      const o = new THREE.Object3D();
      const a = (p.angle * Math.PI) / 180;
      o.position.set(Math.cos(a) * ORBIT_RADIUS, 0.55, Math.sin(a) * ORBIT_RADIUS);
      orbitGroup.add(o);
      const pill = makePillSprite(p);
      o.add(pill.sprite);
      return pill;
    });
    const compactLayout = window.matchMedia("(max-width: 980px)");
    const syncCompactLayout = () => {
      pillSprites.forEach(({ sprite }) => {
        sprite.visible = !compactLayout.matches;
      });
    };
    syncCompactLayout();
    compactLayout.addEventListener("change", syncCompactLayout);

    /* Entrance progress is read from the clock rather than tweened onto
       the elements, because syncPills() rewrites every chip's opacity
       and transform each frame — a GSAP tween on those same properties
       would simply be overwritten. Driving it from elapsed time keeps
       the one writer. */
    const easeOut = (t) => 1 - Math.pow(1 - THREE.MathUtils.clamp(t, 0, 1), 3);
    const pillEntrance = (i, elapsed) =>
      easeOut(
        (elapsed - PILL_ENTRANCE.start - i * PILL_ENTRANCE.stagger) /
          PILL_ENTRANCE.duration
      );

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    /* Sprites share the monument's depth buffer, so an orbiting chip can
       be partially hidden by the Z's diagonal exactly as it would be in
       a filmed scene. The only per-frame work is their entrance scale. */
    const syncPills = (elapsed) => {
      pillSprites.forEach(({ sprite, material, initialScale }, i) => {
        const entrance = pillEntrance(i, elapsed);
        const scale = THREE.MathUtils.lerp(0.55, 1, entrance);
        sprite.scale.set(initialScale.x * scale, initialScale.y * scale, 1);
        material.opacity = entrance;
      });
    };

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();
    document.addEventListener("visibilitychange", () => {
      running = document.visibilityState === "visible";
    });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!running) return;
      const dt = clock.getDelta();
      const elapsed = clock.elapsedTime;

      if (!reduceMotion) {
        orbitGroup.rotation.y += (dt * Math.PI * 2) / ORBIT_SECONDS;
        zMesh.rotation.y = -0.2 + Math.sin(elapsed * 0.25) * 0.035;
        zGroup.position.y = Math.sin(elapsed * 0.8) * 0.035;
      }

      // plinth light blooms open, then breathes
      const glowIn = easeOut((elapsed - GLOW_ENTRANCE.start) / GLOW_ENTRANCE.duration);
      const breathe = 1 + Math.sin(elapsed * 0.9) * 0.05;
      glow.material.opacity = 0.75 * glowIn;
      glow.scale.setScalar(THREE.MathUtils.lerp(0.35, 1, glowIn) * breathe);

      syncPills(elapsed);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      compactLayout.removeEventListener("change", syncCompactLayout);
      renderer.dispose();
      marble.dispose();
      pillSprites.forEach(({ material, texture }) => {
        material.dispose();
        texture.dispose();
      });
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
    };
  }, []);

  return (
    <div className="hero-3d" ref={mountRef}>
      <canvas ref={canvasRef} className="hero-3d-canvas" />
    </div>
  );
}
