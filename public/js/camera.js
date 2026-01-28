let currentStream = null;
let deviceList = [];
let currentDeviceIndex = 0;

export async function initCamera(videoElement) {
    // 1. Get all video devices
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        deviceList = devices.filter(device => device.kind === 'videoinput');
        
        // Prioritize back cameras first
        deviceList.sort((a, b) => {
            const aLabel = a.label.toLowerCase();
            const bLabel = b.label.toLowerCase();
            // Put 'back' or 'environment' cameras first
            if (aLabel.includes('back') && !bLabel.includes('back')) return -1;
            if (bLabel.includes('back') && !aLabel.includes('back')) return 1;
            return 0;
        });

        if (deviceList.length === 0) throw new Error("No cameras found");
        
        // Start with the first one
        await startStream(videoElement, deviceList[currentDeviceIndex].deviceId);

    } catch (err) {
        console.error("Camera Init Error:", err);
        alert("Could not access cameras. Please ensure permissions are granted.");
    }
}

async function startStream(videoElement, deviceId) {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
        audio: true,
        video: {
            deviceId: { exact: deviceId },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { max: 30 } // Keep heat down
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
        console.error("Stream Error:", err);
        // Fallback to basic constraints if exact deviceId fails
        try {
            const basicStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            currentStream = basicStream;
            videoElement.srcObject = basicStream;
        } catch (e) {
            alert("Camera failed to start.");
        }
    }
}

export async function toggleCamera(videoElement) {
    if (deviceList.length < 2) return;

    // Cycle to next camera
    currentDeviceIndex = (currentDeviceIndex + 1) % deviceList.length;
    const newDevice = deviceList[currentDeviceIndex];
    
    console.log(`Switching to: ${newDevice.label || 'Camera ' + currentDeviceIndex}`);
    
    // Visual Feedback could go here
    return await startStream(videoElement, newDevice.deviceId);
}