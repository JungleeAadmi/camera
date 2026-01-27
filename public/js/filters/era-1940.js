// 1940: Noir
// Soft Sepia, Heavy Vignette

export function apply(ctx, width, height) {
    // 1. Sepia Tone
    ctx.filter = 'sepia(80%) grayscale(20%) contrast(120%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. Vignette (Radial Gradient)
    ctx.globalCompositeOperation = 'multiply';
    const grad = ctx.createRadialGradient(width/2, height/2, height*0.4, width/2, height/2, height*0.9);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.8)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
}