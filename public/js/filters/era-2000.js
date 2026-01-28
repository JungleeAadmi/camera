export function apply(ctx, video, width, height, time) {
    ctx.drawImage(video, 0, 0, width, height);

    // 1. Webcam Glow
    ctx.globalCompositeOperation = 'screen';
    ctx.filter = 'blur(8px) opacity(40%)';
    ctx.drawImage(video, 0, 0, width, height);
    ctx.filter = 'none';

    // 2. Cool Tint
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = 'rgba(0, 80, 200, 0.15)';
    ctx.fillRect(0, 0, width, height);
}