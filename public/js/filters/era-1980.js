// 1980s: The VHS Era
// Style: Scanlines, Chromatic Aberration (RGB Shift), High Saturation

export function apply(ctx, width, height, time) {
    // 1. RGB Shift (Chromatic Aberration)
    // We simulate poor convergence by drawing the Red and Blue channels slightly offset
    
    // Create a temporary clone of the current frame
    // Note: For performance on mobile, we might skip full channel splitting 
    // and just do a "ghosting" effect which is faster.
    
    // Fast Ghosting Method:
    ctx.globalCompositeOperation = 'screen';
    
    // Shift Red Left
    ctx.save();
    ctx.translate(-4, 0);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'red'; // Tint doesn't work well with drawImage alone without blend mode tricks
    // Actually, just drawing the image again with 'screen' is the "ghosting" look of cheap camcorders
    ctx.filter = 'opacity(0.4)';
    ctx.drawImage(ctx.canvas, 0, 0); 
    ctx.restore();

    ctx.globalCompositeOperation = 'source-over';
    ctx.filter = 'none';
    ctx.globalAlpha = 1.0;

    // 2. Base VHS Color Grading
    ctx.filter = 'saturate(150%) contrast(120%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 3. Scanlines (Directly on Canvas for Recording)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    // Draw a line every 4 pixels
    for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 2);
    }
    
    // 4. Tracking Distortion (The "Glitch")
    // Occasionally distort a horizontal slice
    if (Math.random() < 0.1) {
        const y = Math.random() * height;
        const h = 20 + Math.random() * 50;
        const shift = (Math.random() - 0.5) * 50;
        
        // Grab a slice and redraw it shifted
        try {
            // Check bounds to prevent error
            if(y + h < height) {
                const slice = ctx.getImageData(0, y, width, h);
                ctx.putImageData(slice, shift, y);
            }
        } catch(e) { /* ignore bounds errors */ }
    }
}