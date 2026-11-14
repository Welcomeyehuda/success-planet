# כוכב ההצלחה — Premium Fantasy Art Direction (Build 9)
Date: 2026-11-14
Status: approved visual target, work in progress. Reference: first stylized hero illustration shown in chat. This is **visual inspiration**, not an owned production asset.

## Creative north star
Stylized, high-end, warm fantasy adventure. Lovable playful characters with readable silhouettes, expressive gestures, balanced proportions and polished materials. The world should feel designed: winding paths, layered greenery, distinct rooftops, lamps, floating particles, a central crystal portal and intentional compositions. Avoid mixing arbitrary free packs, excessive bloom or primitive block houses in a final scene.

## Character art requirements
- Distinct, original boy and girl hero models; same coherent art language, distinct clothing colors, accessories and expressive poses.
- Verified GLB rig with correct local forward vector, bind pose, foot alignment and in-place walk/run/idle/celebrate.
- Parent controller owns movement, visuals are parented under a non-animated offset, and camera follows controller, not animated mesh.
- Before approval: screenshots from front, side and rear plus a 360-degree rotation test and two-minute touch-control movement test on iPhone Safari.
- Existing Rogue/Mage CC0 models are temporary stand-ins, **not** final visual quality.

## Environment and lighting
- Hero village area: a sculpted floating meadow; curved paths; layered fantasy cottages; planting beds with tall and short foliage; carefully placed stones; readable learning landmarks; a glowing crystal/portal landmark.
- Materials: warm ivory, peach/coral, fresh greens, violet accents, sky turquoise and soft gold. Contrasting midtones to keep UI and character legible.
- PBR materials with restrained highlights; natural sun and soft fill; subtle, not washed-out shadows; selective emissive lighting.
- Environmental storytelling through details (benches, signposts, garden fences, flowers, lanterns).
- The art cannot be considered “premium” just because native-resolution anti-aliasing and color grading are enabled: geometry, textures and animation quality matter most.

## Technical quality and iPhone
- Babylon.js candidate; present PlayCanvas baseline until on-device comparison closes.
- Cap pixel ratio if native rendering drops below sustainable frame rates; progressively disable shadow quality, particles and postprocessing.
- Avoid hundreds of individual draw calls; instance repeated props, freeze static world transforms/materials where safe.
- Asset sizes, texture compression and loading skeleton must be measured.
- No paid assets or tools without prior approval, and verify third-party model licenses before production distribution.

## Deliverable
A standalone premium vertical slice under `/premium-slice/` for mobile review. Preserve current child PIN, progress, questions and world preview in the original game. Only integrate after stability, visual quality and performance are accepted. The visual slice is not a completed Build 9.

## Acceptance
1. Avatar stays near fixed visual center under all direction changes and animation transitions.
2. Color palette, material response, and architecture feel visually cohesive with the approved hero reference.
3. A child can immediately recognize landmarks, objective and where to travel.
4. Camera, touch controls and FPS feel good on real target phone.
5. One coherent finished area before expanding to other worlds.
