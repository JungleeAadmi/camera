import { FilterManager } from './filters/filter-manager.js';

let ctx;
let canvas;
let videoSource;
let animationId;

export function initCanvas(canvasEl, videoEl) {
    canvas = canvasEl;
    videoSource = videoEl;
    ctx = canvas.getContext('2d', { willReadFrequently: true }); // Optimized for pixel manipulation

    // Set canvas size to match video source aspect ratio (but maintain high res)
    // We wait for metadata in initCamera, but double check here
    const updateSize = () => {
        canvas.width = videoSource.videoWidth || 1080;
        canvas.height = videoSource.videoHeight || 1920;
    };
    updateSize();
    videoSource.addEventListener('resize', updateSize);
}

export function startRenderLoop() {
    function render(time) {
        if (!videoSource || !ctx) return;

        // 1. Draw raw frame
        ctx.drawImage(videoSource, 0, 0, canvas.width, canvas.height);

        // 2. Apply active filter
        FilterManager.applyCurrentFilter(ctx, canvas.width, canvas.height, time);

        // 3. Loop
        animationId = requestAnimationFrame(render);
    }
    render(0);
}