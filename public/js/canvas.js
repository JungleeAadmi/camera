import { FilterManager } from './filters/filter-manager.js';

let ctx;
let canvas;
let videoSource;
let animationId;
let lastFrameTime = 0;
const FPS_LIMIT = 30; // Limit rendering to 30fps to fix heating
const FRAME_INTERVAL = 1000 / FPS_LIMIT;

export function initCanvas(canvasEl, videoEl) {
    canvas = canvasEl;
    videoSource = videoEl;
    // 'alpha: false' improves performance
    ctx = canvas.getContext('2d', { willReadFrequently: false, alpha: false }); 

    const updateSize = () => {
        // Match internal resolution to video, but CSS handles display size
        canvas.width = videoSource.videoWidth || 1080;
        canvas.height = videoSource.videoHeight || 1920;
    };
    updateSize();
    videoSource.addEventListener('resize', updateSize);
}

export function startRenderLoop() {
    function render(time) {
        animationId = requestAnimationFrame(render);

        // Throttle FPS to reduce heat
        const delta = time - lastFrameTime;
        if (delta < FRAME_INTERVAL) return;
        lastFrameTime = time - (delta % FRAME_INTERVAL);

        if (!videoSource || !ctx) return;

        // 1. Draw raw frame
        ctx.drawImage(videoSource, 0, 0, canvas.width, canvas.height);

        // 2. Apply active filter (Optimized)
        FilterManager.applyCurrentFilter(ctx, canvas.width, canvas.height, time);
    }
    render(0);
}