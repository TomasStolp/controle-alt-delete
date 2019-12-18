import * as d3 from './d3Import';
import {hasMigrationBg} from './filterData';



const margin = {
    top: 10,
    right: 5,
    bottom: 10,
    left: 5
};

const width = window.innerWidth - margin.left - margin.right;

const height = window.innerHeight - margin.top - margin.bottom;

const svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

const g = svg.append("g");

g
    .attr("width", width)
    .attr("height", height)
    .style("transform", `translate(${margin.top}, ${margin.left})`);



// const data = [{
//         id: 1,
//         highscore: 23
//     }, {
//         id: 2,
//         highscore: 34
//     },
//     {
//         id: 3,
//         highscore: 76
//     },
//     {
//         id: 45,
//         highscore: 54
//     }
// ];

const data = fetch('/api/get/users/');

data.then(data => data.json())
    .then(data => initDrawing(data))


    function initDrawing(data){



    console.log(hasMigrationBg(data))



    const scale = d3.scaleLinear().domain([0, 125]).range([0, (height / 2)]);

    const xScale = d3.axisRight().scale(scale).ticks(20);

    g.append("g").call(xScale);



    console.log(scale(122))
    


    const ethnics = d3.nest()
        .key(d => d.geboorteland_respondent)
        .entries(data);

        console.log(ethnics)



    const circles = g.selectAll("circle");

    circles.data(ethnics).enter()
   .append('g')
   .attr("class", 'test')
   .attr('id', d =>  d.key)
   .attr('data-radius', d => scale(d.values.length))


    .append("circle")
        
        .attr("width", 30)
        .attr("cx", (d, i) => {
            return i == 0 ? 40 : i * scale(d.values.length) + 40;
        })
        .attr("cy", d => scale(0))
        .transition().duration(2000)
        
        .attr("r", d => scale(d.values.length))


}