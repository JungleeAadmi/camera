import { applyGateWeave, applyGrain, applyFlicker } from './shared-effects.js';

export function apply(ctx, video, width, height) {
    // 1. Primitive: Color Science (Monochrome S-Curve)
    ctx.filter = 'grayscale(100%) contrast(140%) brightness(110%)';
    
    // 2. Primitive: Gate Weave (The "Jitter")
    // Note: We draw the video HERE, not in canvas.js
    applyGateWeave(ctx, video, width, height, 1.5); 
    
    ctx.filter = 'none';

    // 3. Primitive: Texture
    applyGrain(ctx, width, height, 0.25); // Heavy grain
    applyFlicker(ctx, width, height, 0.1); // Strong flicker
}