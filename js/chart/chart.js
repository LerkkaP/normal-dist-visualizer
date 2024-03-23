// chart.js

import { generateData } from './data.js';
import { setupVisualization, createAxis, drawLine } from './visualization.js';

const containerId = 'container';
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = setupVisualization(containerId, width, height, margin);

const mean = 0; // Example mean value
const sigma = 1; // Example standard deviation value

const xMin = mean - 3 * sigma;
const xMax = mean + 3 * sigma;

const xScale = d3.scaleLinear().range([0, width]).domain([xMin, xMax]);
const yScale = d3.scaleLinear().range([height, 0]);

const xAxis = createAxis(xScale, 'bottom', d3.range(xMin, xMax + 1, sigma));
const yAxis = createAxis(yScale, 'left');

const lineGenerator = d3.line()
    .x(d => xScale(d.q))
    .y(d => yScale(d.p));

const sampleSize = 100000;
const data = generateData(sampleSize);

yScale.domain(d3.extent(data, d => d.p));

svg.append('g').attr('class', 'x axis').attr('transform', `translate(0,${height})`).call(xAxis);
svg.append('g').attr('class', 'y axis').call(yAxis);

drawLine(svg, data, lineGenerator);
