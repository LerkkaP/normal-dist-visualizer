// visualization.js

export function setupVisualization(containerId, width, height, margin) {
    return d3.select(`#${containerId}`)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
}

export function createAxis(scale, orientation, tickValues = null) {
    const axis = d3.axisBottom(scale);
    axis.scale(scale)
        .orient(orientation);
    if (tickValues) {
        axis.tickValues(tickValues);
    }
    return axis;
}

export function drawLine(svg, data, lineGenerator) {
    svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', lineGenerator);
}
