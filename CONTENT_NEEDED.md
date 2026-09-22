# Content needed from you

This Next.js app (`web/`) recreates the reference video (`zenlyhr.mp4`)
closely:

- The hero background (marble "Z" monument + office scene) and the
  "Continuous Growth" section photo are **pixel crops taken directly from
  your own reference frames** (`frame_001.png` and `frame_008.png`) — not
  redrawn, so they match exactly.
- The 8 solution icons (chair, shield, grad cap, globe, etc.) are also
  crops straight from `frame_006.png`.
- Layout, spacing, section order, the floating pill tags + connector
  lines, the stat counters, the solutions grid/pagination, and the
  animated growth chart are all rebuilt as real, responsive, interactive
  HTML/React — since those can't be lifted from a video.

Everything text-based is still placeholder (orange dashed outline +
"PLACEHOLDER" tag in the browser — toggle off bottom-right) because the
source video's own text is AI-garbled and unusable. See the checklist
below.

## 1. Brand
- [ ] Confirm logo: currently a simple generated "Z" mark
      (`components/Nav.jsx` / `components/Footer.jsx`). Replace with the
      real ZenlyHR logo file if one exists.
- [ ] Confirm brand colors (`app/globals.css` `:root`): cream `#f7f6f1`,
      ink `#1d2019`, olive `#5c7a3f`, gold `#c8a24a`.

## 2. Nav
- [ ] Confirm final menu items and whether "Home" needs a dropdown.

## 3. Hero section (`components/Hero.jsx`)
- [ ] Breadcrumb/eyebrow trail text
- [ ] 3-line headline + accent line
- [ ] Hero paragraph copy
- [ ] Primary CTA label + link ("Request a demo")
- [ ] Secondary/video CTA label + link ("Watch overview") — real video to
      embed?
- [ ] Confirm the 6 floating pill labels (Manage / Grow / Hire / Pay /
      Go Comply / Go Global) and what each links to.

## 4. Stats bar (`components/StatsBar.jsx`)
- [ ] 4 real stat values + labels (placeholders: 11,566+ / 104+ / 131+ / 55%)
- [ ] Real partner/client logos (currently text wordmarks)

## 5. Solutions section (`components/Solutions.jsx`)
- [ ] Total number of cards/pages. All 8 cards now show at once as 2 rows
      of 4 (matching the video's layout). The video also shows 4 carousel
      dots below the grid, which implies roughly 4 pages / ~32 cards — so
      the dots stay hidden until there is more than one page of content.
      Confirm how many solutions there really are.
- [ ] Final title + description + destination link per card

## 6. Continuous Growth section (`components/Growth.jsx`)
- [ ] Eyebrow + heading + paragraph copy
- [ ] Real chart data/metric (placeholder monthly trend ending at +32%)
- [ ] CTA label + link
- [ ] Real licensed photo to replace the cropped reference photo (the
      current one is a direct crop from your video and is fine as a
      stand-in, but confirm if you have proper usage rights to it or want
      a different photo)
- [ ] Floating card values/labels

## 7. Footer (`components/Footer.jsx`)
- [ ] Not shown in the reference clip — confirm what it should contain.

## Running it
```
cd web
npm run dev
```
Then open http://localhost:3000
