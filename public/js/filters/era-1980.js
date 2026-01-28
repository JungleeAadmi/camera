import { applyGrain } from './shared-effects.js';

let scanlinePattern = null;
function getScanlines(ctx) {
    if (scanlinePattern) return scanlinePattern;
    const c = document.createElement('canvas');
    c.width = 1; c.height = 3;
    const cx = c.getContext('2d');
    cx.fillStyle = 'rgba(0,0,0,0.2)';
    cx.fillRect(0, 1, 1, 1);
    scanlinePattern = ctx.createPattern(c, 'repeat');
    return scanlinePattern;
}

export function apply(ctx, video, width, height) {
    // 1. Color: VHS (Washed out)
    ctx.filter = 'saturate(130%) contrast(110%) blur(0.5px)'; // Slight blur for tape softness
    ctx.drawImage(video, 0, 0, width, height); // No Jitter on VHS, it's tape!
    ctx.filter = 'none';

    // 2. Artifact: Scanlines
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = getScanlines(ctx);
    ctx.fillRect(0, 0, width, height);

    // 3. Artifact: Color Noise (Grain)
    applyGrain(ctx, width, height, 0.1);
}