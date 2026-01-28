import { applyGateWeave, applyVignette } from './shared-effects.js';

export function apply(ctx, video, width, height) {
    // 1. Color: Sepia + Soft Contrast
    ctx.filter = 'sepia(80%) grayscale(20%) contrast(115%)';
    
    // 2. Motion: Mild Jitter
    applyGateWeave(ctx, video, width, height, 0.5);
    
    ctx.filter = 'none';

    // 3. Optical: Vignette
    applyVignette(ctx, width, height, 0.7);
}