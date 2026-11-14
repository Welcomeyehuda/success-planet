# כוכב ההצלחה — BUILD 8 · Game overhaul plan
Status: design / acceptance criteria, NOT a released gameplay update.
Date: 2026-11-14

## Product goal
An original, visually polished, mobile-first Hebrew 3D educational adventure for two separate child profiles (Adel / Elroi). Learning drives exploration, building and progression. Keep existing GitHub Pages URL and never modify the older learning app or Lovable.

## 1. Smooth performance and controller (priority P0)
- Refactor monolithic HTML into modules (input, movement, animation state, camera, scene streaming, UI, quiz, progression, persistence).
- Use frame-rate-independent acceleration/deceleration, a dead zone, normalized diagonals and touch-safe pointer capture with cleanup on pointercancel, blur, visibilitychange and pagehide.
- Controller movement is authoritative; animation plays in place. Keep visual rig centered at avatar x/z; align feet to terrain. Lock camera follow with smooth damping (avoid lag and jitter).
- Add pause during modal dialogs; avoid stale pointer state.
- Quality presets: automatic pixel ratio, LOD, shadows and particles. Target smooth >=30fps on target iPhones; benchmark before increasing fidelity. No unbounded per-frame allocations or repeated material/geometry creation.
- Acceptance: 2-minute continuous drag, rotate/turn/release, modal entry, background/foreground, device rotation without drift or runaway movement on iOS Safari; reproducible fps log.

## 2. Meaningful unlockable worlds
- World 1: Enchanted Meadow (starter village).
- World 2: Cloud Archipelago — floating platforms, wind bridges, sky structures.
- World 3: Crystal Caverns — glowing gems, cave puzzles, illuminated tunnels.
- World 4: Ocean Kingdom — reef architecture, underwater color and movement.
- Distinct artwork, landmarks, color palette, interactables, soundtrack/ambient effects; NOT just a background-color swap.
- Suggested initial unlock policy (tunable in parent settings; do not release until question banks and tracking are ready):
  - World 2: at least 120 **distinct correct answers** across >=20 completed 5-question sessions, 3 subjects, minimum 70% first-try accuracy across recent attempts.
  - World 3: additional 180 distinct correct answers in world 2 across >=30 completed sessions, 3 subjects, evidence of improved mastery.
  - World 4: additional 250 distinct correct answers in world 3 across >=40 completed sessions, 4 subjects, sustained learning.
  - Failed attempts receive explanations and practice; unlock requirements never depend on spending coins, and children can continue practicing without losing access.
  - Count each question ID only once per unlock milestone, enforce persistent per-profile progress; avoid repetitive single-question farming and easy repeat XP.
  - Grade-specific proficiency and adjustable target thresholds by parent. Neither child must match the other child's raw performance.
- Gate UI should show visible progress, next goals, celebratory sequence, and journey map.
- Rewards per session: correct answers + full session bonus, with diminishing rewards for already-mastered items to prevent coin farming.

## 3. Questions, reading/listening & narration
- Replace fixed array of 49 demo questions with tagged/versioned question bank: id, grade, subject, subskill, difficulty, learning objective, correct answer, distractors, explanation, voice hints.
- Build *validated* pool with >=150-250 unique questions per child/subject before relying on non-repetition across the first world, and scale content by new world. Do not count unreviewed generated questions as vetted.
- Five-question rounds today; add configurable 5/8/10-question quest length, adapt using first-attempt success, spaced review and mistake correction.
- Four subjects: mathematics, Hebrew, English, geometry/engineering. Rich tasks: short interactive stories, picture-based counting, shapes, listening comprehension, ordering, drag tasks, not only multiple choice.
- Narration opt-in for both profiles; Adel can enable default narration in parent settings; support speech rate and mute. Read option *content* only, no index numbers; avoid numerical ambiguity in math. English uses proper language voice; no autoplay without user permission.
- Use native browser TTS first; clearly indicate unavailable Hebrew voice. Later consider vetted neural voice with user-approved cost and privacy review.
- Parent dashboard measures true understanding: first-try success, repeated errors, skill progression, streak consistency, time on task (no compulsive hooks).

## 4. Graphics replacement, not cosmetic tweaks (top priority)
- Establish one high-quality stylized fantasy direction; original look, no cloning copyrighted franchises. Create a coherent palette, character proportion sheet, materials, lighting, architecture/vegetation pack and animated props.
- Replace handmade spheres/cylinders for hero avatars and architecture with licensed, curated GLB assets. Character skins/outfits must be distinct; custom outfits and face options later.
- Rigged humanoid models: verified skin weights, rig retarget, in-place idle/walk/run/celebration loops, correct pivot/scale/axis. Place and cache assets locally in repo after checking license; no runtime reliance on third-party GitHub raw URLs.
- Environment: modeled terrain, roads, pathways, bridges, buildings with identifiable silhouettes, baked lighting when possible, authored props, weather/sky/fog and controlled VFX.
- Mobile budget: textures compressed and appropriately sized, LOD/culling, pooled materials, limited dynamic shadows, optimized draw calls, streaming per world; measure bundle load time and frame stability.
- Compare a playable before/after on iPhone. "10x" is qualitative ambition, not an objectively proven outcome. Do not declare graphics improved solely because code compiled or Pages deployed.

## 5. Engineering and safety
- Keep current main branch prototype live until new version passes QA. Build next generation on a distinct branch and merge after device verification.
- Initial persistence currently localStorage: not secure family accounts or synced progress. Design proper cloud backend only after approved privacy and access controls; avoid storing child identifiers / PII in public repo.
- Automated smoke checks: JS syntax, asset fetch, load errors, question uniqueness, gating counters, save migration, mobile controls. Publish build number and diagnostics screen.
- No paid assets/services, Lovable credits, external AI calls or new third-party account setup without explicit permission.

## Delivery gates
1. P0 Stabilize existing rig and movement on target iPhone (before feature creep).
2. Playable graphics vertical slice: **one highly polished village, two quality animated avatars, one rich 5-question quest, one distinct unlock gate**.
3. QA of frame rate, geometry placement and input. Only then build the rest of world 2.
4. Expand vetted content, world gating and parent dashboards after first slice validated.
