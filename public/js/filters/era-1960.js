import { applyGateWeave, applyGrain, applyVignette, applyColorBias } from './shared-effects.js';

export function apply(ctx, video, width, height, time) {
    // 1. Base: Warm Tint + Softness
    ctx.filter = 'sepia(30%) saturate(120%) blur(0.5px)';
    applyGateWeave(ctx, video, width, height, time, 1.0); // Handheld feel
    ctx.filter = 'none';

    // 2. Color Bias: Warm Yellow
    applyColorBias(ctx, width, height, 'rgba(255, 220, 150, 0.15)', 'multiply');

    // 3. Texture: Heavy Color Grain
    applyGrain(ctx, width, height, time, 0.3);
    applyVignette(ctx, width, height, 0.4);
}