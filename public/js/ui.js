import { setEra } from './filters/filter-manager.js';
import { toggleRecording } from './recorder.js';
import { toggleCamera } from './camera.js';

const DECADES = ['1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'];

export function initUI() {
    const dialContainer = document.getElementById('dial-container');
    const shutterBtn = document.getElementById('shutter-btn');
    const flipBtn = document.getElementById('flip-btn');
    const videoElement = document.getElementById('raw-video');
    
    // Generate Dial
    DECADES.forEach(decade => {
        const div = document.createElement('div');
        div.innerText = decade;
        div.className = 'dial-item cursor-pointer py-2';
        div.dataset.decade = decade;
        div.onclick = () => {
            selectDecade(decade);
            div.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        };
        dialContainer.appendChild(div);
    });

    // Default Selection
    selectDecade('2020');

    // Button Listeners
    shutterBtn.addEventListener('click', toggleRecording);
    
    flipBtn.addEventListener('click', async () => {
        flipBtn.classList.add('rotate-180');
        setTimeout(() => flipBtn.classList.remove('rotate-180'), 500);
        await toggleCamera(videoElement);
    });
}

function selectDecade(decade) {
    document.querySelectorAll('.dial-item').forEach(b => {
        if(b.dataset.decade === decade) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    setEra(decade);
}