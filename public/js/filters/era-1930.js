// 1930: Silent Film
// High Contrast B&W, Flicker, Soft Grain
// OPTIMIZED: Uses pre-rendered pattern

let noisePattern = null;

function getNoise(ctx) {
    if (noisePattern) return noisePattern;
    const c = document.createElement('canvas');
    c.width = 128; c.height = 128; // Small repeating texture
    const cx = c.getContext('2d');
    // Draw random noise once
    for(let i=0; i<4000; i++) {
        cx.fillStyle = Math.random() > 0.5 ? '#000' : '#fff';
        cx.fillRect(Math.random()*128, Math.random()*128, 1, 1);
    }
    noisePattern = ctx.createPattern(c, 'repeat');
    return noisePattern;
}

export function apply(ctx, width, height, time) {
    // 1. B&W High Contrast
    ctx.filter = 'grayscale(100%) contrast(150%) brightness(110%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. Grain (Overlay Mode)
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = getNoise(ctx);
    // Jitter pattern
    ctx.translate(Math.random()*20, Math.random()*20);
    ctx.globalAlpha = 0.3;
    ctx.fillRect(-20, -20, width+20, height+20);

    // 3. Flicker
    ctx.globalCompositeOperation = 'source-over'; // Multiply darkens
    ctx.globalAlpha = 0.1 + (Math.random() * 0.1);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
}