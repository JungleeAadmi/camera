// 1970s: Vintage Instant / Faded Film
// Style: Low Contrast, Washed-out Blacks, Greenish Tint (Expired Film)

export function apply(ctx, width, height, time) {
    // 1. Base Filter: Faded Look
    // Lower contrast + slight sepia for the paper feel
    ctx.filter = 'brightness(110%) contrast(90%) sepia(20%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. "Expired Film" Tint (Cyan/Green Shadows)
    // We use 'screen' or 'exclusion' blend modes to tint the darks
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = 'rgba(0, 50, 100, 0.15)'; // Deep subtle blue/green
    ctx.fillRect(0, 0, width, height);
    
    // 3. Warm Highlights
    ctx.globalCompositeOperation = 'soft-light';
    ctx.fillStyle = 'rgba(255, 200, 100, 0.2)'; // Faint orange
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'source-over';
}