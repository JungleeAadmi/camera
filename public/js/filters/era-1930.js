// 1930s: The Silver Screen (Silent/Talkie Era)
// Style: High Contrast B&W, Film Flicker, Heavy Grain

let noisePattern = null;

function createNoisePattern(ctx) {
    const w = 200;
    const h = 200;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const tempCtx = canvas.getContext('2d');
    
    // Fill with random noise
    const idata = tempCtx.createImageData(w, h);
    const buffer = new Uint32Array(idata.data.buffer);
    for (let i = 0; i < buffer.length; i++) {
        if (Math.random() < 0.5) buffer[i] = 0xff000000; // Black
    }
    tempCtx.putImageData(idata, 0, 0);
    return ctx.createPattern(canvas, 'repeat');
}

export function apply(ctx, width, height, time) {
    // 1. Base Filter (GPU Accelerated)
    // Grayscale + High Contrast
    ctx.filter = 'grayscale(100%) contrast(140%) brightness(110%)';
    
    // We must redraw the canvas content *onto itself* to apply the filter
    // Note: The main loop already drew the raw image. We are applying effects on top 
    // or re-drawing with filter. 
    // Efficient approach: Draw the image with filter enabled.
    // Since main loop draws raw, we just manipulate global composition here.
    
    // Actually, the main loop draws raw first. 
    // To apply `ctx.filter` to existing pixels, we need to redraw the canvas content.
    // Optimization: In canvas.js, we should move the drawImage call INSIDE the specific era if possible,
    // OR just overlay effects here.
    
    // FOR THIS APP: The simplest valid way given the canvas.js structure:
    // We redraw the current canvas content with the filter.
    ctx.drawImage(ctx.canvas, 0, 0); 
    ctx.filter = 'none';

    // 2. Film Flicker (Random Brightness)
    const flicker = 0.05 + Math.random() * 0.1;
    ctx.fillStyle = `rgba(0, 0, 0, ${flicker})`;
    ctx.fillRect(0, 0, width, height);

    // 3. Grain Overlay
    if (!noisePattern) noisePattern = createNoisePattern(ctx);
    
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = noisePattern;
    
    // Jitter the noise pattern position
    const offsetX = Math.random() * 100;
    const offsetY = Math.random() * 100;
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.fillRect(-offsetX, -offsetY, width + offsetX, height + offsetY);
    ctx.restore();
    
    ctx.globalCompositeOperation = 'source-over';
}