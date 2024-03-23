import { normal, gaussian } from './stats.js';

export function generateData(sampleSize) {
    const data = [];
    for (let i = 0; i < sampleSize; i++) {
        const q = normal();
        const p = gaussian(q);
        data.push({ q, p });
    }
    data.sort((a, b) => a.q - b.q);
    return data;
}