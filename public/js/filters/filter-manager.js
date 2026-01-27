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
    '1930': Era1930, '1940': Era1940, '1950': Era1950,
    '1960': Era1960, '1970': Era1970, '1980': Era1980,
    '1990': Era1990, '2000': Era2000, '2010': Era2010,
    '2020': Era2020
};

let currentEra = '2020';

export const FilterManager = {
    applyCurrentFilter: (ctx, width, height, time) => {
        const filter = FILTERS[currentEra];
        if (filter) {
            ctx.save();
            filter.apply(ctx, width, height, time);
            ctx.restore();
        }
    }
};

export function setEra(era) {
    if (FILTERS[era]) currentEra = era;
}