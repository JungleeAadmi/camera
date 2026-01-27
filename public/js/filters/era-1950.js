// 1950s: Technicolor Bloom
// Style: High Saturation, Red Tint, "Bloom" (Glow)

export function apply(ctx, width, height, time) {
    // 1. Base Filter: Technicolor look (High Saturation)
    ctx.filter = 'saturate(180%) contrast(110%) brightness(110%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. Bloom Effect (Dreamy Glow)
    // We draw a low-opacity, blurred version of the screen on top using 'lighten'
    ctx.globalCompositeOperation = 'lighten';
    ctx.filter = 'blur(8px) opacity(40%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';
    
    ctx.globalCompositeOperation = 'source-over';
}