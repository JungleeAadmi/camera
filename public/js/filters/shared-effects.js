// --- SHARED PRIMITIVES FOR INSTAX CINEMA ---

// 1. GATE WEAVE (Frame Jitter)
// Simulates the film strip shaking in the gate
export function applyGateWeave(ctx, video, width, height, intensity = 1.0) {
    const maxShift = width * 0.004 * intensity; // 0.4% shift
    const x = (Math.random() - 0.5) * maxShift;
    const y = (Math.random() - 0.5) * maxShift;
    
    // Draw video slightly offset
    // Scale up slightly to hide black edges from shaking
    const scale = 1.01 + (0.005 * intensity);
    const sw = width * scale;
    const sh = height * scale;
    
    ctx.drawImage(video, -(sw-width)/2 + x, -(sh-height)/2 + y, sw, sh);
}

// 2. FILM GRAIN (Luma Noise)
// Uses a pre-rendered pattern for performance (No CPU looping!)
let grainPattern = null;
function getGrain(ctx) {
    if (grainPattern) return grainPattern;
    const s = 256;
    const c = document.createElement('canvas');
    c.width = s; c.height = s;
    const cx = c.getContext('2d');
    
    // Create harsh noise
    for(let i=0; i < (s*s)/2; i++) {
        cx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';
        cx.fillRect(Math.random()*s, Math.random()*s, 2, 2);
    }
    grainPattern = ctx.createPattern(c, 'repeat');
    return grainPattern;
}

export function applyGrain(ctx, width, height, alpha = 0.2) {
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = alpha;
    ctx.fillStyle = getGrain(ctx);
    // Jitter grain position so it looks alive
    ctx.save();
    ctx.translate(Math.random()*100, Math.random()*100);
    ctx.fillRect(-100, -100, width+200, height+200);
    ctx.restore();
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
}

// 3. FLICKER (Light Breathing)
export function applyFlicker(ctx, width, height, intensity = 0.05) {
    const flicker = 1 - (Math.random() * intensity);
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = `rgb(${255*flicker}, ${255*flicker}, ${255*flicker})`;
    ctx.fillRect(0,0,width,height);
    ctx.globalCompositeOperation = 'source-over';
}

// 4. VIGNETTE (Lens Darkening)
export function applyVignette(ctx, width, height, strength = 0.6) {
    ctx.globalCompositeOperation = 'multiply';
    const grad = ctx.createRadialGradient(width/2, height/2, height*0.3, width/2, height/2, height*0.9);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, `rgba(0,0,0,${strength})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,width,height);
    ctx.globalCompositeOperation = 'source-over';
}

// 5. DATE STAMP
export function applyDateStamp(ctx, width, height, color='#FF6600', font='Courier New') {
    const date = new Date();
    const str = date.toLocaleDateString('en-US', { 
        month: 'short', day: '2-digit', year: 'numeric' 
    }).toUpperCase();
    
    const fontSize = Math.floor(width * 0.05); 
    ctx.font = `bold ${fontSize}px "${font}", monospace`;
    ctx.textBaseline = 'bottom';
    const x = width * 0.05;
    const y = height - (height * 0.05);

    ctx.fillStyle = 'black'; // Shadow
    ctx.fillText(str, x+2, y+2);
    ctx.fillStyle = color;
    ctx.fillText(str, x, y);
}