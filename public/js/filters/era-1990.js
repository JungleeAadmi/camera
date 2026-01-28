export function apply(ctx, video, width, height, time) {
    // 1. Base: Digital Sharpen (High Contrast)
    ctx.filter = 'contrast(130%) saturate(110%)';
    ctx.drawImage(video, 0, 0, width, height);
    ctx.filter = 'none';

    // 2. Date Stamp
    const date = new Date();
    const str = date.toLocaleDateString('en-US', { 
        month: 'short', day: '2-digit', year: 'numeric' 
    }).toUpperCase();
    
    const fontSize = Math.floor(width * 0.05); 
    ctx.font = `bold ${fontSize}px "Courier New", monospace`;
    ctx.textBaseline = 'bottom';
    const x = width * 0.05;
    const y = height - (height * 0.05);

    ctx.fillStyle = 'black';
    ctx.fillText(str, x+2, y+2);
    ctx.fillStyle = '#FF8800';
    ctx.fillText(str, x, y);
}