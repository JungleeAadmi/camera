import { initCamera } from './camera.js';
import { initCanvas, startRenderLoop } from './canvas.js';
import { initUI } from './ui.js';
import { FilterManager } from './filters/filter-manager.js';

// Application Entry Point
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Instax Cinema: Booting...');
    
    // 1. Initialize UI (Dial, Buttons)
    initUI();

    // 2. Start Camera
    const videoElement = document.getElementById('raw-video');
    try {
        await initCamera(videoElement);
        
        // 3. Initialize Canvas & Renderer
        const canvas = document.getElementById('cinema-canvas');
        initCanvas(canvas, videoElement);
        
        // 4. Start the render loop
        startRenderLoop();
        
        console.log('Instax Cinema: Ready.');
    } catch (error) {
        console.error('Boot Failed:', error);
        alert('Camera failed to start. Ensure HTTPS is enabled.');
    }
});