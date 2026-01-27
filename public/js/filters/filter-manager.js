import * as Era1930 from './era-1930.js';
import * as Era1940 from './era-1940.js';
import * as Era1950 from './era-1950.js';
import * as Era1960 from './era-1960.js';
import * as Era1970 from './era-1970.js';
import * as Era1980 from './era-1980.js';
import * as Era1990 from './era-1990.js';
import * as Era2000 from './era-2000.js';
import * as Era2010 from './era-2010.js';
import * as Era2020 from './era-2020.js';

const FILTERS = {
    '1930': Era1930,
    '1940': Era1940,
    '1950': Era1950,
    '1960': Era1960,
    '1970': Era1970, // Placeholder until generated
    '1980': Era1980, // Placeholder until generated
    '1990': Era1990, // Placeholder until generated
    '2000': Era2000, // Placeholder until generated
    '2010': Era2010, // Placeholder until generated
    '2020': Era2020  // Placeholder until generated
};

let currentEra = '2020';

export const FilterManager = {
    applyCurrentFilter: (ctx, width, height, time) => {
        const filterModule = FILTERS[currentEra];
        if (filterModule && filterModule.apply) {
            // Reset context filter before applying new one to prevent bleeding
            ctx.filter = 'none';
            ctx.globalCompositeOperation = 'source-over';
            
            filterModule.apply(ctx, width, height, time);
        }
    }
};

export function setEra(era) {
    if (FILTERS[era]) {
        currentEra = era;
        console.log(`Switched to Era: ${era}`);
    }
}