// 1960s: Super 8 Home Movie
// Style: Warm/Orange, Dust & Scratches, Low Frame Rate feel

const scratches = [];
const MAX_SCRATCHES = 3;

function updateScratches(width, height) {
    // Randomly add scratches
    if (Math.random() < 0.05 && scratches.length < MAX_SCRATCHES) {
        scratches.push({
            x: Math.random() * width,
            life: 0
        });
    }

    // Draw and update
    for (let i = scratches.length - 1; i >= 0; i--) {
        const s = scratches[i];
        s.life++;
        // Remove old scratches
        if (s.life > 5) scratches.splice(i, 1); 
    }
}

export function apply(ctx, width, height, time) {
    // 1. Base Filter: Warm Super 8 look
    // hue-rotate(-10deg) pushes colors towards orange/red
    ctx.filter = 'sepia(40%) saturate(140%) hue-rotate(-10deg)';
    ctx.drawImage(ctx.canvas, 0, 0);
    ctx.filter = 'none';

    // 2. Draw Scratches (Vertical white lines)
    updateScratches(width, height);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    scratches.forEach(s => {
        // Jitter x slightly
        const jitter = (Math.random() - 0.5) * 2;
        ctx.moveTo(s.x + jitter, 0);
        ctx.lineTo(s.x + jitter, height);
    });
    ctx.stroke();

    // 3. Random Dust specs
    if (Math.random() < 0.2) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 3;
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}