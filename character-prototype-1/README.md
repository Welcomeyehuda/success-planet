# Character Prototype 1 — Build 9 R&D

This is an **isolated movement/rig validation page**, NOT the premium game or an integrated user profile.

## Why this exists
The current KayKit Rogue/Mage GLB characters drift from their controller origin when turning or playing animation in the main game. Several patches failed real iPhone testing. Do not reintroduce those rigs or promote new characters without an actual iPhone pass.

## New assets being evaluated
- **Quaternius Knight** (CC0; redistributed in public GitHub by `ilrein/warptracker` at `public/models/knight.glb`, sourced from the Quaternius Animated Knight Pack). The GitHub repo's `ASSETS.md` identifies its provenance.
- Alternate `ilrein/warptracker/public/models/hero.glb` for second A/B testing; verify provenance before shipping in production.
- Sources remain remote in this prototype. If accepted, obtain official asset with license file and vendor an optimized local GLB. Do not assume CDN uptime is permanent.

## Technical design
`CONTROLLER → FACING → STATIC_VISUAL_OFFSET → GLB roots`. Touch/keyboard movement updates controller only. Facing rotates a dedicated node. Imported model scales/offsets are computed once, before animation. Camera tracks controller only. No frame-time centering hack.

Independent animation toggle makes it possible to distinguish model geometry centering from clip-induced skeletal/root motion. The drift readout is based on the visible skinned mesh's world AABB once per second; yaw-dependent width variations can change AABB center even without real drift. Thus it is *diagnostic* and not a definitive root-bone measurement.

## Acceptance protocol (real iPhone Safari)
1. Load Quaternius Knight and wait until it shows “✓ ... נטען.”
2. **Animation OFF**: walk 60 seconds in four directions + diagonal changes; check yellow controller marker and bounding drift.
3. **Animation ON**: repeat same movement, noting whether character visibly moves away from yellow marker.
4. Run automatic 8-direction test; confirm direction keys match screen-relative input.
5. Switch to alternate model and repeat if it loads. Record model name, FPS and screenshots.
6. If either fails, debug model's bind pose, animation root tracks and forward axis before choosing it.
7. Only select a hero after a high-quality style check. A low-poly placeholder passing movement does *not* meet premium art requirements.

## Status
Syntax checked in repository tooling. No automated browser or on-device rendering verification claimed. The existing Success Planet app (PINs, quests, world map) is not changed.

## Sources
- Quaternius character packs: https://quaternius.com/packs/
- Babylon root motion: https://doc.babylonjs.com/features/featuresDeepDive/animation/rootMotion/
- Warptracker provenance: https://github.com/ilrein/warptracker/blob/main/ASSETS.md
