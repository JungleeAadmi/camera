// 1950: Technicolor
// Saturated Reds/Cyans

export function apply(ctx, width, height) {
    // 1. Hyper Saturation
    ctx.filter = 'saturate(180%) contrast(110%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. Warm Highlight Bloom
    ctx.globalCompositeOperation = 'soft-light';
    ctx.fillStyle = 'rgba(255, 200, 150, 0.3)';
    ctx.fillRect(0, 0, width, height);
}