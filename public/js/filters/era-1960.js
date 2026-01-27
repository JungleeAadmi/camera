// 1960: Super 8
// Warm, yellow tint, slightly faded

export function apply(ctx, width, height) {
    // 1. Warm Wash
    ctx.filter = 'sepia(40%) saturate(120%) hue-rotate(-10deg)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. Yellow Cast
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = 'rgba(255, 240, 200, 0.2)';
    ctx.fillRect(0, 0, width, height);
}