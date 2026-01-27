// 1940s: Classic Noir / Newsreel
// Style: Sepia B&W, Vignette, Softness

let vignetteGradient = null;

function getVignette(ctx, width, height) {
    if (!vignetteGradient || vignetteGradient.width !== width) {
        vignetteGradient = ctx.createRadialGradient(
            width / 2, height / 2, height * 0.3, // Inner circle
            width / 2, height / 2, height * 0.8  // Outer circle
        );
        vignetteGradient.addColorStop(0, 'rgba(0,0,0,0)');
        vignetteGradient.addColorStop(1, 'rgba(0,0,0,0.7)');
        vignetteGradient.width = width; // Cache key
    }
    return vignetteGradient;
}

export function apply(ctx, width, height, time) {
    // 1. Base Filter: Sepia + Grayscale mix
    ctx.filter = 'sepia(30%) grayscale(100%) contrast(120%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. Vignette (Dark Corners)
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = getVignette(ctx, width, height);
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
}