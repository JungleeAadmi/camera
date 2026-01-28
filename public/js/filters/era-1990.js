import { applyDateStamp } from './shared-effects.js';

export function apply(ctx, video, width, height) {
    // 1. Color: "Digital" Sharpening (High Contrast)
    ctx.filter = 'contrast(125%) saturate(110%)';
    ctx.drawImage(video, 0, 0, width, height);
    ctx.filter = 'none';

    // 2. Artifact: Date Stamp (Orange)
    applyDateStamp(ctx, width, height, '#FF8800');
}