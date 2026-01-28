import { FilterManager } from './filters/filter-manager.js';

let ctx;
let canvas;
let videoSource;
let lastFrameTime = 0;
const FPS_LIMIT = 24; // Cinema Standard (24fps) - Also reduces heat!

export function initCanvas(canvasEl, videoEl) {
    canvas = canvasEl;
    videoSource = videoEl;
    // 'willReadFrequently: false' is CRITICAL for GPU performance
    ctx = canvas.getContext('2d', { willReadFrequently: false, alpha: false }); 

    const updateSize = () => {
        canvas.width = videoSource.videoWidth || 1080;
        canvas.height = videoSource.videoHeight || 1920;
    };
    updateSize();
    videoSource.addEventListener('resize', updateSize);
}

export function startRenderLoop() {
    function render(time) {
        requestAnimationFrame(render);

        const delta = time - lastFrameTime;
        if (delta < (1000 / FPS_LIMIT)) return;
        lastFrameTime = time - (delta % (1000 / FPS_LIMIT));

        if (!videoSource || !ctx || videoSource.readyState < 2) return;

        // Clear? No, some filters rely on "trails" (Motion Blur)
        // We let the FilterManager handle the drawing entirely.
        FilterManager.applyCurrentFilter(ctx, videoSource, canvas.width, canvas.height, time);
    }
    render(0);
}