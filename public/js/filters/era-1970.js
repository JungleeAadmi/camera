import { applyGateWeave, applyGrain } from './shared-effects.js';

export function apply(ctx, video, width, height) {
    // 1. Color: Faded + Green Tint
    ctx.filter = 'contrast(90%) brightness(105%) sepia(20%)';
    applyGateWeave(ctx, video, width, height, 0.4);
    ctx.filter = 'none';

    // 2. Optical: Green Shadows (Lighten trick)
    ctx.globalCompositeOperation = 'lighten';
    ctx.fillStyle = 'rgba(10, 30, 40, 0.2)'; // Dark Cyan/Green
    ctx.fillRect(0,0,width,height);
    
    applyGrain(ctx, width, height, 0.15);
}