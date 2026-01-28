import { applyGateWeave } from './shared-effects.js';

export function apply(ctx, video, width, height) {
    // 1. Color: Technicolor (High Saturation)
    ctx.filter = 'saturate(160%) contrast(110%)';
    applyGateWeave(ctx, video, width, height, 0.2); // Very stable
    ctx.filter = 'none';

    // 2. Optical: Halation / Bloom
    // Draw a blurred copy on top in 'soft-light' mode
    ctx.globalCompositeOperation = 'soft-light';
    ctx.filter = 'blur(10px) opacity(60%)';
    ctx.drawImage(video, 0, 0, width, height);
    ctx.filter = 'none';
}