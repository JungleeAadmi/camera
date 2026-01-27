let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

export function toggleRecording() {
    const canvas = document.getElementById('cinema-canvas');
    const rawVideo = document.getElementById('raw-video');
    const recStatus = document.getElementById('recording-status');
    const shutterBtn = document.getElementById('shutter-btn');

    if (!isRecording) {
        // --- START RECORDING ---
        
        // 1. Capture Stream from Canvas
        // We capture at 30fps to match the render loop (prevents lag/heat)
        const canvasStream = canvas.captureStream(30); 
        
        // 2. Get Audio from Raw Camera
        if (rawVideo.srcObject) {
            const audioTracks = rawVideo.srcObject.getAudioTracks();
            if (audioTracks.length > 0) {
                canvasStream.addTrack(audioTracks[0]);
            }
        }

        // 3. Init Recorder
        // Try VP9 for better quality, fallback to standard WebM
        const options = MediaRecorder.isTypeSupported('video/webm; codecs=vp9') 
            ? { mimeType: 'video/webm; codecs=vp9' } 
            : { mimeType: 'video/webm' };
            
        mediaRecorder = new MediaRecorder(canvasStream, options);
        recordedChunks = [];

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) recordedChunks.push(e.data);
        };

        mediaRecorder.onstop = saveVideo;
        mediaRecorder.start();
        
        // UI Updates (Add class for CSS animations defined in style.css)
        isRecording = true;
        document.body.classList.add('recording-active');
        recStatus.classList.remove('hidden');

    } else {
        // --- STOP RECORDING ---
        mediaRecorder.stop();
        
        // UI Updates
        isRecording = false;
        document.body.classList.remove('recording-active');
        recStatus.classList.add('hidden');
    }
}

function saveVideo() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    
    // Generate Timestamp Filename
    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}`;
    a.download = `JustCamera_${timestamp}.webm`;
    
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}