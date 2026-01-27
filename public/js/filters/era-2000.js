// 2000s: Early Digital / Webcam (Y2K)
// Style: Pixelation, Cool Blue Tint, Blown Highlights

let tempCanvas = null;

export function apply(ctx, width, height, time) {
    // 1. Pixelation (Downsample -> Upsample)
    // We draw the full image into a tiny temporary canvas, then draw it back stretched
    
    const scaleFactor = 0.2; // 20% resolution
    const wScaled = Math.floor(width * scaleFactor);
    const hScaled = Math.floor(height * scaleFactor);

    if (!tempCanvas) {
        tempCanvas = document.createElement('canvas');
    }
    // Update size if needed
    if (tempCanvas.width !== wScaled) {
        tempCanvas.width = wScaled;
        tempCanvas.height = hScaled;
    }

    const tempCtx = tempCanvas.getContext('2d');
    
    // Draw current frame small
    tempCtx.drawImage(ctx.canvas, 0, 0, wScaled, hScaled);

    // Draw back large with 'pixelated' smoothing disabled
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, width, height);
    ctx.imageSmoothingEnabled = true;

    // 2. Cool Blue Tint (Bad White Balance)
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = 'rgba(0, 50, 200, 0.2)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
}