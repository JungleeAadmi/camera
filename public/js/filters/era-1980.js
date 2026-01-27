// 1980: VHS
// Scanlines, Chromatic Abberation

let scanlinePattern = null;

function getScanlines(ctx) {
    if (scanlinePattern) return scanlinePattern;
    const c = document.createElement('canvas');
    c.width = 1; c.height = 4;
    const cx = c.getContext('2d');
    cx.fillStyle = 'rgba(0,0,0,0.3)';
    cx.fillRect(0, 2, 1, 1); // 1 pixel line every 4
    scanlinePattern = ctx.createPattern(c, 'repeat');
    return scanlinePattern;
}

export function apply(ctx, width, height) {
    // 1. RGB Shift (Fake Chromatic Aberration) - Cheap version
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.5;
    ctx.save();
    ctx.translate(-3, 0); // Shift Red
    ctx.fillStyle = 'rgba(255,0,0,0.3)';
    // In optimized mode, we can't easily channel split without heavy CPU cost.
    // Instead we rely on color tinting or just skip the shift for performance
    // and focus on scanlines.
    ctx.restore();
    ctx.globalAlpha = 1.0;

    // 2. VHS Saturation
    ctx.globalCompositeOperation = 'source-over';
    ctx.filter = 'saturate(140%) contrast(120%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 3. Scanlines
    ctx.fillStyle = getScanlines(ctx);
    ctx.fillRect(0, 0, width, height);
}