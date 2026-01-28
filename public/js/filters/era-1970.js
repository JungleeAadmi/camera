import { applyGateWeave, applyGrain } from './shared-effects.js';

export function apply(ctx, video, width, height, time) {
    // 1. Base: Faded
    ctx.filter = 'contrast(90%) brightness(110%) sepia(20%)';
    applyGateWeave(ctx, video, width, height, time, 0.5);
    ctx.filter = 'none';

    // 2. Color Bias: Greenish Shadows (Exclusion trick)
    ctx.globalCompositeOperation = 'exclusion';
    ctx.fillStyle = 'rgba(20, 50, 100, 0.15)';
    ctx.fillRect(0,0,width,height);
    
    applyGrain(ctx, width, height, time, 0.15);
}