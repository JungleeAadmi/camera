import { applyGateWeave } from './shared-effects.js';

export function apply(ctx, video, width, height, time) {
    // 1. Base: Hyper Saturation
    ctx.filter = 'saturate(160%) contrast(110%)';
    applyGateWeave(ctx, video, width, height, time, 0.3); // Very stable
    ctx.filter = 'none';

    // 2. Optical: Bloom (Halation)
    ctx.globalCompositeOperation = 'soft-light';
    ctx.filter = 'blur(15px) opacity(50%)';
    ctx.drawImage(video, 0, 0, width, height);
    ctx.filter = 'none';
}