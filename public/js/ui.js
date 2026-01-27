import { setEra } from './filters/filter-manager.js';
import { toggleRecording } from './recorder.js';

const DECADES = [
    '1930', '1940', '1950', '1960', '1970', 
    '1980', '1990', '2000', '2010', '2020'
];

export function initUI() {
    const dialContainer = document.getElementById('dial-container');
    const shutterBtn = document.getElementById('shutter-btn');
    
    // Generate Dial Buttons
    DECADES.forEach(decade => {
        const btn = document.createElement('button');
        btn.innerText = decade;
        btn.className = `
            dial-btn px-4 py-2 rounded-full border border-zinc-700 
            bg-zinc-800 text-zinc-400 font-mono text-sm
            transition-all duration-300 hover:bg-zinc-700
            flex-shrink-0
        `;
        btn.dataset.decade = decade;
        
        btn.onclick = () => {
            selectDecade(decade);
        };
        
        dialContainer.appendChild(btn);
    });

    // Select default
    selectDecade('2020');

    // Shutter Listener
    shutterBtn.addEventListener('click', () => {
        toggleRecording();
    });
}

function selectDecade(decade) {
    // Update visual state
    document.querySelectorAll('.dial-btn').forEach(b => {
        if(b.dataset.decade === decade) {
            b.classList.remove('bg-zinc-800', 'text-zinc-400', 'border-zinc-700');
            b.classList.add('bg-yellow-500', 'text-black', 'border-yellow-400', 'scale-110', 'font-bold');
        } else {
            b.classList.add('bg-zinc-800', 'text-zinc-400', 'border-zinc-700');
            b.classList.remove('bg-yellow-500', 'text-black', 'border-yellow-400', 'scale-110', 'font-bold');
        }
    });

    // Notify Manager
    setEra(decade);
}