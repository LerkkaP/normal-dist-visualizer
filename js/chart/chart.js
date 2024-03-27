import { generateData } from "./data.js";
var data = generateData(100000); 

var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
.range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) {
        return x(d.q);
    })
    .y(function(d) {
        return y(d.p);
    });

var svg = d3.select("#container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var mean = 0; // Example mean value
var sigma = 1; // Example standard deviation value

// Calculate the minimum and maximum values for the x-axis domain
var xMin = mean - 3 * sigma;
var xMax = mean + 3 * sigma;

// Set the domain of the x-axis scale
x.domain([xMin, xMax]);

// Adjust the tick values on the x-axis
xAxis.tickValues(d3.range(xMin, xMax + 1, sigma)); // Add +

x.domain(d3.extent(data, function(d) {
    return d.q;
}));
y.domain(d3.extent(data, function(d) {
    return d.p;
}));

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

// indexes for points/ranges
var index1 = d3.bisectLeft(data.map(function(d) { return d.q; }), 1);
var index2 = d3.bisectLeft(data.map(function(d) { return d.q; }), 2);
var indexStart = d3.bisectLeft(data.map(function(d) { return d.q; }), 1.5);
var indexEnd = d3.bisectLeft(data.map(function(d) { return d.q; }), 2.5);

var areaAbovePoint = d3.svg.area()
    .x(function(d) { return x(d.q); })
    .y0(height)
    .y1(function(d, i) { return i >= index1 ? y(d.p) : height; });

svg.append("path")
    .datum(data)
    .attr("class", "area")
    .style("fill", "#ADD8E6") 
    .attr("d", areaAbovePoint);

var areaBelowPoint = d3.svg.area()
    .x(function(d) { return x(d.q); })
    .y0(function(d, i) { return i < index2 ? y(d.p) : height; })
    .y1(height);

svg.append("path")
    .datum(data)
    .attr("class", "area")
    .style("fill", "#FFA07A")
    .attr("d", areaBelowPoint);

var areaBetweenPoints = d3.svg.area()
    .x(function(d) { return x(d.q); })
    .y0(function(d, i) { return i >= indexStart && i <= indexEnd ? y(d.p) : height; })
    .y1(height);

svg.append("path")
    .datum(data)
    .attr("class", "area")
    .style("fill", "#98FB98") // Set the fill color
    .attr("d", areaBetweenPoints);

