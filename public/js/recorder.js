let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

export function toggleRecording() {
    const canvas = document.getElementById('cinema-canvas');
    const rawVideo = document.getElementById('raw-video');
    const shutterInner = document.getElementById('shutter-inner');
    const recStatus = document.getElementById('recording-status');

    if (!isRecording) {
        // --- START ---
        
        // 1. Capture Stream from Canvas (Video)
        const canvasStream = canvas.captureStream(30); // 30 FPS
        
        // 2. Get Audio from Raw Camera
        const audioTracks = rawVideo.srcObject.getAudioTracks();
        if (audioTracks.length > 0) {
            canvasStream.addTrack(audioTracks[0]);
        }

        // 3. Init Recorder
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
        
        // UI Updates
        isRecording = true;
        shutterInner.classList.remove('bg-zinc-900');
        shutterInner.classList.add('bg-red-600', 'scale-75'); // Red square look
        recStatus.classList.remove('hidden');

    } else {
        // --- STOP ---
        mediaRecorder.stop();
        
        // UI Updates
        isRecording = false;
        shutterInner.classList.add('bg-zinc-900');
        shutterInner.classList.remove('bg-red-600', 'scale-75');
        recStatus.classList.add('hidden');
    }
}

function saveVideo() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `instax-cine-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}