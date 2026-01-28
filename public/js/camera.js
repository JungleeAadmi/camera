let currentStream = null;
let currentFacingMode = 'user';

export async function initCamera(videoElement, facingMode = 'user') {
    currentFacingMode = facingMode;

    // 1. Stop existing tracks completely
    if (currentStream) {
        currentStream.getTracks().forEach(track => {
            track.stop();
        });
        videoElement.srcObject = null;
    }

    // 2. Constraints (Use 'exact' to force switch on some Androids/iOS)
    const constraints = {
        audio: true,
        video: {
            facingMode: { ideal: currentFacingMode },
            width: { ideal: 1080 },
            height: { ideal: 1920 },
            frameRate: { max: 30 } // Cap FPS to prevent heating
        }
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        currentStream = stream;
        videoElement.srcObject = stream;
        
        return new Promise((resolve) => {
            videoElement.onloadedmetadata = () => {
                videoElement.play().catch(e => console.error("Play error:", e));
                resolve(true);
            };
        });
    } catch (err) {
        console.error("Camera Error:", err);
        alert("Camera access failed. If switching cameras, try refreshing.");
        throw err;
    }
}

export async function toggleCamera(videoElement) {
    // Toggle Mode
    const newMode = currentFacingMode === 'user' ? 'environment' : 'user';
    console.log(`Switching to: ${newMode}`);
    return await initCamera(videoElement, newMode);
}