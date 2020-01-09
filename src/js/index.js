import * as d3 from 'd3';
import {
    filterData
} from './filterData';


import {
    formatData
} from './formatData';

import{
    hasMigrationBg
} from './filterData';

console.log(d3)

// const margin = {
//     top: 10,
//     right: 5,
//     bottom: 10,
//     left: 5
// };

// var width = window.innerWidth - margin.left - margin.right;

// var height = window.innerHeight - margin.top - margin.bottom;

// const svg = d3.select("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom);

// const g = svg.append("g");

//     g
//     .attr("width", width)
//     .attr("height", height)
//     .style("transform", `translate(${margin.top}, ${margin.left})`);

const data = fetch('http://localhost:4000/api/get/users');



data.then(data => data.json())
    .then(data => filterData(data))
    // .then(data => formatData(data))
    .then(data => initDrawing(data))


function initDrawing(data) {

    // const scale = d3.scaleLinear().domain([0, 1200]).range([0, (height / 2)]);

    // const xScale = d3.axisRight().scale(scale).ticks(20);

    // g.append("g").call(xScale);

    // const ethnics = d3.nest()
    //     .key(d => d.afkomst)
    //     .entries(data);

    // console.log(ethnics)

    // const circles = g.selectAll("circle");

    // circles.data(ethnics).enter()
    //     .append('g')
    //         .attr("class", 'test')
    //         .attr('id', d => d.key)
    //         .attr('data-radius', d => scale(d.values.length))
    //     .append("circle")
    //         // .attr("width", 30)
    //         .attr("cx", (d, i) => {
    //             return i == 0 ? 40 : i * (scale(d.values.length) * 2);
    //         })
    //         .attr("cy", (d, i) => i * (scale(d.values.length) * 2))
    //         .transition().duration(2000)
    //         .attr("r", d => scale(d.values.length))

    const nestedRightfulness = formatData(data);

    const nestedMigrationBg = hasMigrationBg(data);

    console.log(nestedMigrationBg)


    // const test = d3.nest()
    // .key(d => d.stel_terecht)
    // .entries(data)

    

    // const nestedHeritage = formatData(data);
    const dropdown = d3.select('select');
    dropdown
        .style('display', 'block')

    dropdown.selectAll('option')
        .data(nestedMigrationBg)
        .enter()
        .append('option')
        .attr('value', d => d.key)
        .html(d => d.key)

    var margin = {
        top: 20,
        right: 20,
        bottom: 60,
        left: 60
    };
    var width = 960 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    var tooltip = d3.select("#chart").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    // var x = d3.scaleTime().range([0, width - margin.left]).nice();
    var y = d3.scaleBand().rangeRound([0, height]);

 



    y.domain(d3.map(nestedRightfulness, function (d) {
        return d.key;
    }).keys());
  


//  var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisRight(y);
    // yAxis.style('stroke', '#fff')

    // console.log(nestedRightfulness['Terecht'].values.length)
    console.log(nestedRightfulness.filter(e => e.key == 'Terecht')[0].values.length)

    const testing = data.map(function (d) {
        // const keyLength = nestedRightfulness
        //     .filter(e => e.key == d.stel_terecht)
        //     .reduce(e => e).values.length;
        
        return d.idealy = y(d.stel_terecht) + ((height / nestedRightfulness.length) / 2);
    });

    const xPosition = nestedRightfulness.map(group =>{
       return group.values.map((obj, i) => {
            return obj.x = i + 120;
        })
    });

    console.log(xPosition)


    // console.log(testing)

    console.log(data)

    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

    var scatter = svg.append("g")
        .attr("id", "scatterplot")
        .attr("clip-path", "url(#clip)");

    var colour = d3.scaleOrdinal()
        .domain(d3.map(data, function (d) {
            return d.stel_terecht;
        }).keys())
        .range(d3.schemeCategory10);


    // console.log(d3.map(data, function (d) {
    //     return d.stel_terecht;
    // }).keys())
    // x axis
    // svg.append("g")
    // .attr("class", "x axis")
    // .attr('id', "axis--x")
    // .attr("transform", "translate(0," + height + ")")
    // .call(xAxis)



    console.log(data)

    svg.append("text")
        .style("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 8)
    //  .text("Date");

    // y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "axis--y")
        // .style('stroke', '#fff')
        .call(yAxis);


    // svg.append("text")
    // .attr("transform", "rotate(-90)")
    // .attr("y", 6)
    // .attr("dy", "1em")
    // .style("text-anchor", "end")
    // .text("Time");

    var simulation = d3.forceSimulation(data)
       
        .force("x", d3.forceX(function(d, i) { return d.x; }))
        .force("y", d3.forceY(function (d) {
            // console.log( y(10000))
            return d.idealy;
        }))
        .force("collide", d3.forceCollide(4)
            .strength(1)
            .iterations(2))
        .stop();

    // console.log(data)

    // console.log(fullData[0]);
    for (let i = 0; i < 120; ++i) simulation.tick();

    scatter.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr('id', d => d.stel_terecht)
        .attr("class", "dot")
        .attr("r", 4)
        
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("cx", function(d, i) { 
            return d.x;
        })
        .attr("opacity", 0.7)
        .style("fill", function (d) {
            // return colour(d.pivot);
            return 'yellow'
        })
    // .on("mouseover", function(d) {
    //      tooltip.transition()
    //        .duration(200)
    //        .style("opacity", .9);
    //      tooltip.html(formatDateTime(d.datetime) + "<br/>" + d.pivot)
    //        .style("left", (d3.event.pageX) + "px")
    //        .style("top", (d3.event.pageY - 28) + "px");

    //    })
    //    .on("mouseout", function(d) {
    //      tooltip.transition()
    //        .duration(500)
    //        .style("opacity", 0);
    //    });


}