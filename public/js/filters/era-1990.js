// 1990: Camcorder
// Sharpened, Date Stamp

export function apply(ctx, width, height) {
    // 1. Sharpen (Simulated by high contrast)
    ctx.filter = 'contrast(130%) saturate(110%)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. Date Stamp
    const date = new Date();
    const str = date.toLocaleDateString('en-US', { 
        month: 'short', day: '2-digit', year: 'numeric' 
    }).toUpperCase();
    
    // Responsive font size
    const fontSize = Math.floor(width * 0.05); 
    ctx.font = `bold ${fontSize}px "Courier New", monospace`;
    ctx.textBaseline = 'bottom';
    
    // Position
    const x = width * 0.05;
    const y = height - (height * 0.05);

    // Shadow
    ctx.fillStyle = 'black';
    ctx.fillText(str, x + 2, y + 2);

    // Text
    ctx.fillStyle = '#FF6600'; // Orange
    ctx.fillText(str, x, y);
}