// 1990s: Hi-8 Camcorder
// Style: Digital Sharpening, Orange Date Stamp

export function apply(ctx, width, height, time) {
    // 1. Base Filter: "Digital" look (High Contrast, slightly cool)
    ctx.filter = 'contrast(130%) saturate(110%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. The Orange Date Stamp
    // Format: 'JAN 28 2026' in blocky font
    const date = new Date();
    const dateStr = date.toLocaleDateString('en-US', { 
        month: 'short', day: '2-digit', year: 'numeric' 
    }).toUpperCase();
    
    // Time
    const timeStr = date.toLocaleTimeString('en-US', {
        hour12: true, hour: '2-digit', minute: '2-digit'
    });

    ctx.font = 'bold 40px "Courier New", monospace'; // Fallback font
    ctx.textBaseline = 'bottom';
    
    // Shadow
    ctx.fillStyle = 'black';
    ctx.fillText(dateStr, 52, height - 52);
    ctx.fillText(timeStr, width - 250, height - 52); // Approx position

    // Text
    ctx.fillStyle = '#FF6600'; // Classic Camcorder Orange
    ctx.fillText(dateStr, 50, height - 50);
    ctx.fillText(timeStr, width - 252, height - 50);
}