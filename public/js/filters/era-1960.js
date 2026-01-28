import { applyGateWeave, applyGrain, applyVignette } from './shared-effects.js';

export function apply(ctx, video, width, height) {
    // 1. Color: Warm Ektachrome look
    ctx.filter = 'sepia(30%) saturate(130%) hue-rotate(-10deg)';
    applyGateWeave(ctx, video, width, height, 0.8);
    ctx.filter = 'none';

    // 2. Optical: Soft Focus (Blur)
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = 'rgba(255, 200, 100, 0.1)'; // Yellow tint
    ctx.fillRect(0,0,width,height);

    // 3. Texture: Large Grain
    applyGrain(ctx, width, height, 0.2);
    applyVignette(ctx, width, height, 0.4);
}