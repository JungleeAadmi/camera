import { applyVignette } from './shared-effects.js';

export function apply(ctx, video, width, height) {
    // 1. Color: X-Pro (Cross Process)
    ctx.filter = 'contrast(120%) saturate(140%) sepia(20%)';
    ctx.drawImage(video, 0, 0, width, height);
    ctx.filter = 'none';

    // 2. Optical: Teal/Orange Gradient
    ctx.globalCompositeOperation = 'overlay';
    const grad = ctx.createLinearGradient(0,0,width,height);
    grad.addColorStop(0, 'rgba(255, 100, 0, 0.2)'); // Orange
    grad.addColorStop(1, 'rgba(0, 100, 255, 0.2)'); // Teal
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,width,height);

    applyVignette(ctx, width, height, 0.5);
}