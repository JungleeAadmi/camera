// 2010s: Social Media / Hipster Filter
// Style: Heavy Vignette, Teal/Orange Grading, Border

export function apply(ctx, width, height, time) {
    // 1. "Instant Filter" Look
    ctx.filter = 'contrast(120%) saturate(140%) sepia(20%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. Teal shadows / Orange highlights (Simple implementation)
    ctx.globalCompositeOperation = 'overlay';
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(255, 165, 0, 0.3)'); // Orange top-left
    gradient.addColorStop(1, 'rgba(0, 128, 128, 0.3)'); // Teal bottom-right
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 3. Thick Black Border (Cinematic/Artistic)
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 50;
    ctx.strokeRect(0, 0, width, height);
}