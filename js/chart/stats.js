export function normal(mean = 0, sigma = 1) {
    let x, y, rds, c;
    do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        rds = x * x + y * y;
    } while (rds === 0 || rds > 1);
    c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
    return mean + x * sigma * c; // throw away extra sample y * c
}

export function gaussian(x, mean = 0, sigma = 1) {
    const gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
    x = (x - mean) / sigma;
    return gaussianConstant * Math.exp(-0.5 * x * x) / sigma;
}

