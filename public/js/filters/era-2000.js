export function apply(ctx, video, width, height) {
    // 1. Color: Cool Tint
    ctx.drawImage(video, 0, 0, width, height);
    
    // 2. Optical: "Webcam" Glow
    ctx.globalCompositeOperation = 'screen';
    ctx.filter = 'blur(6px) opacity(40%)';
    ctx.drawImage(video, 0, 0, width, height);
    ctx.filter = 'none';

    // 3. Tint: Blue
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = 'rgba(0, 50, 200, 0.1)';
    ctx.fillRect(0, 0, width, height);
}