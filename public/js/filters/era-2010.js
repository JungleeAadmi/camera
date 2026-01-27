// 2010: Instagram X-Pro
// High Contrast, Vignette, Teal/Orange

export function apply(ctx, width, height) {
    // 1. Cross Process
    ctx.filter = 'contrast(130%) saturate(140%) sepia(20%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. Vignette
    ctx.globalCompositeOperation = 'multiply';
    const grad = ctx.createRadialGradient(width/2, height/2, height*0.2, width/2, height/2, height);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(20,0,40,0.6)'); // Dark blueish vignette
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
}