let currentStream = null;
let currentFacingMode = 'user'; // 'user' (front) or 'environment' (back)
let currentDeviceId = null;

export async function initCamera(videoElement, facingMode = 'user') {
    currentFacingMode = facingMode;

    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
        audio: true,
        video: {
            facingMode: currentFacingMode,
            width: { ideal: 1080 }, // Lowering slightly to help heat/perf
            height: { ideal: 1920 },
            frameRate: { ideal: 30, max: 30 } // CAP AT 30FPS TO PREVENT HEATING
        }
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        currentStream = stream;
        videoElement.srcObject = stream;
        
        // Wait for ready
        return new Promise((resolve) => {
            videoElement.onloadedmetadata = () => {
                videoElement.play();
                resolve(true);
            };
        });
    } catch (err) {
        console.error("Camera Error:", err);
        alert("Unable to access camera. Please ensure permissions are granted.");
        throw err;
    }
}

export async function toggleCamera(videoElement) {
    const newMode = currentFacingMode === 'user' ? 'environment' : 'user';
    return await initCamera(videoElement, newMode);
}