// 2000: Y2K Digital
// Cool Blue, "Webcam" feel
// Note: Pixelation removed as it caused heating/lag. Replaced with blur/sharpen mix.

export function apply(ctx, width, height) {
    // 1. Cool Tint
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = 'rgba(0, 50, 200, 0.15)';
    ctx.fillRect(0, 0, width, height);
    
    // 2. Slight Bloom (blown highlights)
    ctx.globalCompositeOperation = 'screen';
    ctx.filter = 'blur(4px) opacity(30%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';
}