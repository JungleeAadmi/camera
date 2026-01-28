import { applyGateWeave, applyVignette } from './shared-effects.js';

export function apply(ctx, video, width, height, time) {
    // 1. Base: Soft Sepia
    ctx.filter = 'sepia(60%) grayscale(40%) contrast(120%)';
    applyGateWeave(ctx, video, width, height, time, 0.8);
    ctx.filter = 'none';

    // 2. Optical: Heavy Vignette
    applyVignette(ctx, width, height, 0.8);
}