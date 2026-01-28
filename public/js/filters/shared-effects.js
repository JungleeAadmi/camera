// --- OPTICAL SIMULATION PRIMITIVES ---

// 1. GATE WEAVE (Frame Jitter)
// Simulates the film strip shaking in the gate
// "Jitter must move subtly over time, not flicker randomly" -> We use Math.sin with time
export function applyGateWeave(ctx, video, width, height, time, intensity = 1.0) {
    // Instax Spec: "Sub-pixel X/Y shift per frame"
    // We use a sine wave based on time to create "weave" rather than random jitter
    const xShift = Math.sin(time * 0.012) * (width * 0.002 * intensity); 
    const yShift = Math.cos(time * 0.009) * (height * 0.002 * intensity);
    
    // Scale up slightly to avoid black edges
    const scale = 1.02; 
    const sw = width * scale;
    const sh = height * scale;
    
    ctx.drawImage(video, 
        -(sw - width)/2 + xShift, 
        -(sh - height)/2 + yShift, 
        sw, sh
    );
}

// 2. FILM GRAIN (Luma-based Texture)
let grainPattern = null;
function getGrain(ctx) {
    if (grainPattern) return grainPattern;
    const s = 256;
    const c = document.createElement('canvas');
    c.width = s; c.height = s;
    const cx = c.getContext('2d');
    
    // "Coarse, color-biased" noise
    for(let i=0; i < (s*s)/1.5; i++) {
        const v = Math.random();
        cx.fillStyle = v > 0.5 ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)';
        cx.fillRect(Math.random()*s, Math.random()*s, 2, 2);
    }
    grainPattern = ctx.createPattern(c, 'repeat');
    return grainPattern;
}

export function applyGrain(ctx, width, height, time, strength = 0.2) {
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = strength;
    ctx.fillStyle = getGrain(ctx);
    
    // "Grain moves slowly over time"
    const offset = (time * 0.05) % 256;
    ctx.save();
    ctx.translate(offset, Math.random() * 20); // Horizontal scroll + slight vertical jitter
    ctx.fillRect(-offset, -20, width + 256, height + 40);
    ctx.restore();
    
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
}

// 3. FLICKER (Exposure Breathing)
export function applyFlicker(ctx, width, height, time, strength = 0.05) {
    // "Random brightness modulation per frame"
    // Using sine + random to simulate "breathing"
    const flicker = Math.abs(Math.sin(time * 0.008)) * strength + (Math.random() * strength * 0.5);
    
    ctx.globalCompositeOperation = 'multiply'; // Darken only
    // 1.0 = no change, 0.0 = black. 
    // We want slight darkening, so brightness should be 1.0 - flicker
    const brightness = 1.0 - flicker;
    
    ctx.fillStyle = `rgb(${255*brightness}, ${255*brightness}, ${255*brightness})`;
    ctx.fillRect(0,0,width,height);
    ctx.globalCompositeOperation = 'source-over';
}

// 4. VIGNETTE & HALATION
export function applyVignette(ctx, width, height, strength = 0.5) {
    ctx.globalCompositeOperation = 'multiply';
    const grad = ctx.createRadialGradient(width/2, height/2, height*0.35, width/2, height/2, height*0.95);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, `rgba(0,0,0,${strength})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,width,height);
    ctx.globalCompositeOperation = 'source-over';
}

// 5. COLOR BIAS HELPER
export function applyColorBias(ctx, width, height, color, mode = 'overlay') {
    ctx.globalCompositeOperation = mode;
    ctx.fillStyle = color;
    ctx.fillRect(0,0,width,height);
    ctx.globalCompositeOperation = 'source-over';
}