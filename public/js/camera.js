export async function initCamera(videoElement) {
    // Request permission and stream
    // We explicitly ask for 720p or 1080p vertical
    const constraints = {
        audio: true,
        video: {
            facingMode: 'user', // 'environment' for back camera
            width: { ideal: 1080 },
            height: { ideal: 1920 },
            aspectRatio: { ideal: 0.5625 } // 9:16
        }
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        
        return new Promise((resolve) => {
            videoElement.onloadedmetadata = () => {
                videoElement.play();
                resolve(true);
            };
        });
    } catch (err) {
        console.error("Camera Error:", err);
        throw err;
    }
}