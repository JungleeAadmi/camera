import { applyVignette } from './shared-effects.js';

export function apply(ctx, video, width, height, time) {
    ctx.filter = 'contrast(125%) saturate(140%) sepia(20%)';
    ctx.drawImage(video, 0, 0, width, height);
    ctx.filter = 'none';

    // Teal/Orange Grad
    ctx.globalCompositeOperation = 'overlay';
    const grad = ctx.createLinearGradient(0,0,width,height);
    grad.addColorStop(0, 'rgba(255, 120, 0, 0.2)');
    grad.addColorStop(1, 'rgba(0, 100, 200, 0.2)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,width,height);

    applyVignette(ctx, width, height, 0.5);
}