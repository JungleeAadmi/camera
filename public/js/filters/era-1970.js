// 1970: Polaroid
// Greenish shadows, washed blacks

export function apply(ctx, width, height) {
    // 1. Low Contrast Faded
    ctx.filter = 'contrast(90%) brightness(110%) sepia(20%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. Green Shadows (Exclusion/Lighten trick)
    ctx.globalCompositeOperation = 'lighten';
    ctx.fillStyle = 'rgba(20, 40, 50, 0.15)';
    ctx.fillRect(0, 0, width, height);
}