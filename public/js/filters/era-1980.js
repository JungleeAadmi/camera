import { applyGrain } from './shared-effects.js';

let scanlinePattern = null;
function getScanlines(ctx) {
    if (scanlinePattern) return scanlinePattern;
    const c = document.createElement('canvas');
    c.width = 1; c.height = 4;
    const cx = c.getContext('2d');
    cx.fillStyle = 'rgba(0,0,0,0.25)';
    cx.fillRect(0, 2, 1, 2);
    scanlinePattern = ctx.createPattern(c, 'repeat');
    return scanlinePattern;
}

export function apply(ctx, video, width, height, time) {
    // 1. Base: Washed Out
    ctx.filter = 'saturate(140%) contrast(115%) blur(0.8px)'; // Resolution loss
    
    // 2. RGB Shift (Simplified for Web Canvas)
    // Draw Red Channel offset
    ctx.globalCompositeOperation = 'screen';
    ctx.save();
    ctx.translate(-4, 0);
    ctx.globalAlpha = 0.6;
    // We can't easily isolate R channel efficiently in 2D canvas without puttingImageData
    // So we just draw the image again with 'screen' blend to simulate ghosting
    ctx.drawImage(video, 0, 0, width, height);
    ctx.restore();
    
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    
    // Main Draw
    ctx.drawImage(video, 0, 0, width, height);
    ctx.filter = 'none';

    // 3. Artifacts: Scanlines + Noise
    ctx.fillStyle = getScanlines(ctx);
    ctx.fillRect(0,0,width,height);
    
    // "Horizontal Noise Bands"
    if (Math.random() > 0.95) {
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        const y = Math.random() * height;
        ctx.fillRect(0, y, width, 10);
    }
}