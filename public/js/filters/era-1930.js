import { applyGateWeave, applyGrain, applyFlicker } from './shared-effects.js';

export function apply(ctx, video, width, height, time) {
    // 1. Base: Monochrome + High Contrast S-Curve
    ctx.filter = 'grayscale(100%) contrast(140%) brightness(110%)';
    
    // 2. Motion: Strong Gate Weave (Jitter)
    applyGateWeave(ctx, video, width, height, time, 1.5);
    ctx.filter = 'none';

    // 3. Texture: Coarse Grain
    applyGrain(ctx, width, height, time, 0.4);

    // 4. Light: Strong Flicker
    applyFlicker(ctx, width, height, time, 0.15);
}