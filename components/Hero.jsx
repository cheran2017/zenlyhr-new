"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import StatsBar from "./StatsBar";

/* The category pills orbit the Z on a flattened ellipse (a 3D ring seen
   slightly from above), matching the reference clip: tracking individual
   pills across its frames shows the far-side ones drifting one way and
   the near-side ones the other, i.e. a continuous revolution rather than
   a one-off fade into fixed spots. Depth (sin of the angle) drives
   scale/opacity/stacking so pills read as passing in front of and behind
   the monument.

   Geometry is in percentages of the hero stage, which is exactly the
   background image's box (1280x495 crop of the video's opening frame),
   so the ring sits around the marble Z at any viewport width. The
   values are measured off the clip: tracking each pill's offset from
   the monument's centre across consecutive frames puts the ring's
   semi-axes at ~215x60px on that 1280x495 plate. */
const ORBIT = { cx: 73.4, cy: 53.9, rx: 16.8, ry: 12.1 };
const ORBIT_SECONDS = 18;
const SCENE_SIZE = { width: 1280, height: 495 };

/* Silhouette of the marble Z, as percentages of the same plate, traced
   off the artwork. A copy of the background clipped to this shape is
   layered between the far-side and near-side pills so pills genuinely
   disappear behind the monument as they come round — in the reference
   clip the "People" chip is visibly cut in half by the Z's diagonal,
   which is what sells the orbit as 3D. Because the clipped copy shows
   exactly the same pixels as the plate beneath it, small tracing
   errors shift where occlusion starts but never leave a visible seam.

   The two concave notches matter: at mid-height the letter is only as
   wide as its diagonal, so the polygon must pinch in there. An earlier
   version ran a straight edge across the full width at that height,
   which left the occluder covering hollow background and chopped pills
   off in mid-air. Traced a touch inside the marble on purpose — a pill
   overlapping the stone's rim by a pixel is invisible, a pill clipped
   over empty background is not. */
const Z_SILHOUETTE = [
  [66.5, 28.3], // top bar, top-left
  [80.2, 28.3], // top bar, top-right
  [80.2, 42.8], // top bar, bottom-right — diagonal starts
  [68.8, 66.4], // diagonal's right edge, down to the bottom bar
  [79.8, 67.0], // bottom bar, top-right
  [79.8, 76.4], // bottom bar, bottom-right
  [65.4, 76.4], // bottom bar, bottom-left
  [65.4, 67.0], // bottom bar, top-left
  [76.7, 42.8], // diagonal's left edge, back up under the top bar
  [66.5, 42.8], // top bar, bottom-left
];

/* startAngle (degrees) spaces the pills around the ring. "Prow" in the
   source is relabelled "Grow" — it carries the same green icon and fits
   the verb set used elsewhere in the clip; "Prow" isn't a real word. */
const PILLS = [
  { key: "manage", label: "Manage", dot: "#5b8def", angle: 250 },
  { key: "people", label: "People", dot: "#e5973f", angle: 310 },
  { key: "global", label: "Go Global", dot: "#5b8def", angle: 10 },
  { key: "grow", label: "Grow", dot: "#3fae61", angle: 70 },
  { key: "hire", label: "Hire", dot: "#3fae61", angle: 130 },
  { key: "comply", label: "Go Comply", dot: "#8f6de5", angle: 190 },
];

export default function Hero() {
  const stageRef = useRef(null);
  const sceneRef = useRef(null);
  const pillRefs = useRef([]);
  const occluderRef = useRef(null);
  const glowRef = useRef(null);
  const ringsRef = useRef(null);
  const breadcrumbRef = useRef(null);
  const lineRefs = useRef([]);
  const subRef = useRef(null);
  const ctasRef = useRef(null);

  /* Entrance choreography timed off the reference video's first ~1s:
     headline lines cascade in one after another, the pills fade up as a
     group while already revolving, and the pedestal light bursts open
     partway through, then keeps breathing. */
  useEffect(() => {
    const spin = { t: 0 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* `object-fit: cover` crops the scene differently at each hero size.
       The Z path is traced in source-image coordinates, so converting it
       to stage pixels keeps the occluder attached to the Z — including at
       the tablet breakpoint, where the focal point moves to 82% across. */
    const syncOccluder = () => {
      const stage = stageRef.current;
      const scene = sceneRef.current;
      const occluder = occluderRef.current;
      if (!stage || !scene || !occluder) return;

      const { width: stageWidth, height: stageHeight } = stage.getBoundingClientRect();
      if (!stageWidth || !stageHeight) return;

      const sceneStyle = window.getComputedStyle(scene);
      const [xPosition = "70%", yPosition = "45%"] = sceneStyle.objectPosition.split(/\s+/);
      const xFocus = Number.parseFloat(xPosition) / 100;
      const yFocus = Number.parseFloat(yPosition) / 100;
      const sourceWidth = scene.naturalWidth || SCENE_SIZE.width;
      const sourceHeight = scene.naturalHeight || SCENE_SIZE.height;
      const scale = Math.max(stageWidth / sourceWidth, stageHeight / sourceHeight);
      const offsetX = (stageWidth - sourceWidth * scale) * (Number.isFinite(xFocus) ? xFocus : 0.7);
      const offsetY = (stageHeight - sourceHeight * scale) * (Number.isFinite(yFocus) ? yFocus : 0.45);
      const points = Z_SILHOUETTE.map(([x, y]) => {
        const stageX = offsetX + (x / 100) * sourceWidth * scale;
        const stageY = offsetY + (y / 100) * sourceHeight * scale;
        return `${stageX.toFixed(2)}px ${stageY.toFixed(2)}px`;
      }).join(", ");

      occluder.style.clipPath = `polygon(${points})`;
      occluder.style.backgroundPosition = `${xPosition} ${yPosition}`;
    };

    const place = () => {
      PILLS.forEach((p, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        const a = ((p.angle + spin.t) * Math.PI) / 180;
        const depth = Math.sin(a); // +1 nearest the viewer, -1 furthest
        gsap.set(el, {
          left: `${ORBIT.cx + ORBIT.rx * Math.cos(a)}%`,
          top: `${ORBIT.cy + ORBIT.ry * depth}%`,
          xPercent: -50,
          yPercent: -50,
          scale: 0.82 + 0.18 * (depth + 1) * 0.5,
          zIndex: Math.round(100 + depth * 50),
          // far side sits back into the scene rather than popping forward
          filter: `brightness(${(0.93 + 0.07 * (depth + 1) * 0.5).toFixed(3)})`,
        });
      });
    };
    syncOccluder();
    place();

    const resizeObserver = new ResizeObserver(syncOccluder);
    resizeObserver.observe(stageRef.current);
    sceneRef.current.addEventListener("load", syncOccluder);

    const orbit = reduceMotion
      ? null
      : gsap.to(spin, {
          t: 360,
          duration: ORBIT_SECONDS,
          ease: "none",
          repeat: -1,
          onUpdate: place,
        });

    gsap.set(glowRef.current, {
      xPercent: -50,
      yPercent: -100,
      transformOrigin: "50% 100%",
      scale: 0.25,
      opacity: 0,
    });

    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(breadcrumbRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power1.out" }, 0)
      .fromTo(lineRefs.current[0], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0)
      .fromTo(lineRefs.current[1], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.15)
      .fromTo(lineRefs.current[2], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.3)
      .fromTo(subRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0.38)
      .fromTo(ctasRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" }, 0.42)
      .fromTo(
        pillRefs.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.55, stagger: 0.04, ease: "power2.out" },
        0.12
      )
      .fromTo(ringsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power1.out" }, 0.2)
      .to(glowRef.current, { opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" }, 0.18)
      .to(glowRef.current, { scale: 1.07, opacity: 0.88, duration: 2.2, ease: "sine.inOut", repeat: -1, yoyo: true }, 1.1);

    return () => {
      tl.kill();
      orbit?.kill();
      resizeObserver.disconnect();
      sceneRef.current?.removeEventListener("load", syncOccluder);
    };
  }, []);

  return (
    <section className="hero">
      {/* The stage is exactly the background image's own box, so the
          image renders at its natural framing and the pill percentages
          map 1:1 onto it. The stats bar sits outside it. */}
      <div className="hero-stage" ref={stageRef}>
      <div className="hero-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={sceneRef} src="/images/hero-scene.png" alt="ZenlyHR marble Z monument in an office lobby" />
      </div>

      <div className="hero-glow" ref={glowRef} style={{ left: "70%", top: "76%" }} />

      {/* Faint orbit trails — the curved white ribbons that sweep around
          the monument in the reference clip. */}
      <svg className="connector-layer" ref={ringsRef} viewBox="0 0 100 100" preserveAspectRatio="none">
        <ellipse cx={ORBIT.cx} cy={ORBIT.cy} rx={ORBIT.rx} ry={ORBIT.ry} />
        <ellipse cx={ORBIT.cx} cy={ORBIT.cy - 1.5} rx={ORBIT.rx * 0.82} ry={ORBIT.ry * 0.72} />
        <ellipse cx={ORBIT.cx} cy={ORBIT.cy + 1.5} rx={ORBIT.rx * 1.1} ry={ORBIT.ry * 1.15} />
      </svg>

      <div className="pill-layer">
        {PILLS.map((p, i) => (
          <div
            key={p.key}
            className="pill"
            ref={(el) => (pillRefs.current[i] = el)}
          >
            <span className="pill-dot" style={{ "--dot": p.dot }}></span>
            {p.label}
          </div>
        ))}

        {/* Z cut-out that hides pills travelling round the far side.
            Sits at z-index 100; pills are given 50..150 by depth. */}
        <div
          ref={occluderRef}
          className="hero-occluder"
          style={{
            clipPath: `polygon(${Z_SILHOUETTE.map(([x, y]) => `${x}% ${y}%`).join(", ")})`,
          }}
        />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow" ref={breadcrumbRef}>
            People <span>›</span> Confidence <span>›</span> Details
          </p>
          <h1 className="hero-title">
            <span className="title-line" ref={(el) => (lineRefs.current[0] = el)}>HR, Simplified.</span>
            <span className="title-line" ref={(el) => (lineRefs.current[1] = el)}>People, Empowered.</span>
            <span className="title-line accent" ref={(el) => (lineRefs.current[2] = el)}>A Brighter Tomorrow.</span>
          </h1>
          <p className="hero-sub" ref={subRef}>
            ZenlyHR brings timeless and central HR solutions
            together — unifying people, payroll and compliance into one
            confident, connected experience your whole organization can
            rely on.
          </p>
          <div className="hero-ctas" ref={ctasRef}>
            <a href="#" className="btn btn-solid btn-lg">
              Request a demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button className="btn btn-play">
              <span className="play-circle">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              Watch overview
            </button>
          </div>
        </div>
      </div>
      </div>

      <StatsBar />
    </section>
  );
}
