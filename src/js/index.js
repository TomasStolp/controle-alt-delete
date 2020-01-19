import * as d3 from 'd3';
import {
    filterData
} from './filterData';


import {
    formatData
} from './formatData';

import {
    hasMigrationBg
} from './filterData';

// console.log(d3)

const margin = {
    top: 10,
    right: 5,
    bottom: 10,
    left: 5
};

var width = window.innerWidth - margin.left - margin.right;

var height = window.innerHeight - margin.top - margin.bottom;

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
    .then(data => initDrawing(data))


function initDrawing(data) {

    const nestedMigrationBg = hasMigrationBg(data);
    const nestedRightfulness = formatData(nestedMigrationBg);


    nestedRightfulness.forEach(e =>{
        e.length = e.values.length;
    })

    // console.log(nestedRightfulness)

    // const temp = hasMigrationBg(nestedMigrationBg);
    const priority_order = ['Zeer terecht', 'Terecht', 'Niet terecht, niet onterecht', 'Onterecht', 'Zeer onterecht']
    const doubleNest = d3.nest()
        .key(d => d.stel_terecht)
        .sortKeys(function(a,b) { 
            // console.log(priority_order[(priority_order.indexOf(a) - priority_order.indexOf(b))])
            return priority_order.indexOf(a) - priority_order.indexOf(b); 
        })
        .key(d => d.migratieachtergrond)
        .entries(nestedMigrationBg);

 
        
        doubleNest.forEach((e) => {
            e.values.forEach((e, i) =>{
             
                e.values.forEach((d, i)=>{
                    console.log(i)
                    d.plek = i;
                    d.parentLength = e.values.length;
                    // e.values.forEach((e, i)=>{
                       
                    // })
                   
                })
            })
        })


        console.log(doubleNest      )

        // console.log(doubleNest)

   

    // const dropdown = d3.select('select');
    // dropdown
    //     .style('display', 'block')

    // dropdown.selectAll('option')
    //     .data(nestedMigrationBg)
    //     .enter()
    //     .append('option')
    //     .attr('value', d => d.key)
    //     .html(d => d.key)

    const margin = {
        top: 20,
        right: 20,
        bottom: 60,
        left: 60
    };
    // const width = 960 - margin.left - margin.right;
    // const height = 800 - margin.top - margin.bottom;

    // const width = 200 - margin.left - margin.right;
    // const height = 150 - margin.top - margin.bottom;

    const y = d3.scaleBand().rangeRound([0, height]);

    // From https://bl.ocks.org/chloerulesok/e45c8bb1241c4f6051ef30623e6fe552
    // Author: chloerulesok’s
    y.domain(d3.map(doubleNest, function (d) {
        return d.key;
    }).keys());


    


    //  var xAxis = d3.axisBottom(x);
    const yAxis = d3.axisRight(y);

    // yAxis.tickSize(200)


    // console.log(nestedRightfulness.filter(e => e.key =()= 'Terecht')[0].values.length)

    const testing = data.map(function (d) {
        // const keyLength = nestedRightfulness
        //     .filter(e => e.key == d.stel_terecht)
        //     .reduce(e => e).values.length;

        return d.idealy = y(d.stel_terecht) + ((height / doubleNest.length) / 2);
    });

    const xPosition = doubleNest.map(group => {
        return group.values.map((obj, i) => {
            return obj.x = i + 120;
        })
    });

    // console.log(xPosition)


    // console.log(testing)



    console.log(data)

    const svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("viewBox", `0 0 800 900`)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // From https://bl.ocks.org/chloerulesok/e45c8bb1241c4f6051ef30623e6fe552
    // Author: chloerulesok’s
    // var clip = svg.append("defs").append("svg:clipPath")
    //     .attr("id", "clip")
    //     .append("svg:rect")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .attr("x", 0)
    //     .attr("y", 0);


    var colour = d3.scaleOrdinal()
    .domain(d3.map(nestedMigrationBg, function(d){      
        return d.key;
    }))
    .range(d3.schemeCategory10);


    const test = d3.map(nestedMigrationBg, function(d){
        
        return d.key;
    })

    // console.log(test)


    const scatter = svg.append("g")
        .attr("id", "scatterplot");

    // From https://bl.ocks.org/chloerulesok/e45c8bb1241c4f6051ef30623e6fe552
    // Author: chloerulesok’s
    // y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "axis--y")
        .call(yAxis);

    // From https://bl.ocks.org/chloerulesok/e45c8bb1241c4f6051ef30623e6fe552
    // Author: chloerulesok’s
    const simulation = d3.forceSimulation(data)


        .force("x", d3.forceX(function (d, i) {
            return d.x;
        }))
        .force("y", d3.forceY(function (d) {
            // console.log( y(10000))
            return d.idealy;
        }))
        // .force("collide", d3.forceCollide(1)
        //     .strength(0)
        //     .iterations(2))
        // .stop();

    // From https://bl.ocks.org/chloerulesok/e45c8bb1241c4f6051ef30623e6fe552
    // Author: chloerulesok’s
    for (let i = 0; i < 120; ++i) simulation.tick();

    scatter.selectAll(".dot")
        .data(data)
        // .enter().append("g")
        // .attr('id', d => d.key)
        
        // .data(d => d)
        // .data(d => {
        //     console.log(d)
        //     return [d.values];
        // })
        // .data(o => {
        //     console.log(o.values)
        //     return o.values;
        // })
        .enter().append("circle")
        .attr('id', d => d.stel_terecht)
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function (d, i) {
          
            

            // return i == 0 ? 20 : i * 20
            console.log(d, 'fwef')
            return d.plek == 0 ? 10 : d.plek * 10
            
        })

        .attr("cy", function (d, i, j) {
            
            // if(d.parentLength > 10){
            //     return d.y + (d.migratieachtergrond == 'Deelnemers met migratieachtergrond' ? 15 : 0)
            // }


            return d.y + (d.migratieachtergrond == 'Deelnemers met migratieachtergrond' ? 5 : -5)

           
        })
        // .attr("cx", function (d, i) {
        //     return d.x;
        // })
        .style("fill", d=> colour(d.migratieachtergrond));


    //    console.log( scatter.selectAll(".dot")
    //     .data(nestedRightfulness))

    //     scatter.selectAll(".dot")
    //     .data(nestedRightfulness.length)
    //     .attr("cx", function (d, i) {
          
    //         // return d.x;

    //         return i == 0 ? 10 : i * 10 + 10;
            
    //     })

    
        // svg.select('.tick text')
        //     // .style('fill', 'yellow')
        //     // .select('text')
        //     // .data(population)
        //     // .enter()
        //     // .append('text')

        //         .text('fwefwefwef')
}