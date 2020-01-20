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

var width = 1230 - margin.left - margin.right;

var height = 500 - margin.top - margin.bottom;

// const svg = d3.select("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom);

// const g = svg.append("g");

//     g
//     .attr("width", width)
//     .attr("height", height)
//     .style("transform", `translate(${margin.top}, ${margin.left})`);

const data = fetch('http://localhost:4000/api/get/users');

// d3.csv("../data/opgeschoonde_data.csv").then(function(data) {
//   console.log(data[0]);
// });

data.then(data => data.json())
    .then(data => filterData(data))
    .then(data => initDrawing(data))


function initDrawing(data) {

    const migrationBackground = hasMigrationBg(data);
    const nestedMigrationBg = d3.nest()
                                    .key(d => d.migratieachtergrond)
                                    .entries(migrationBackground);

    const nestedRightfulness = formatData(data);

    const migrationKeys = nestedMigrationBg.map(d => d.key)
        console.log(nestedMigrationBg)
    const colorscale = d3.scaleOrdinal()
        .domain(migrationKeys)
        .range(d3.schemeCategory10);

    nestedRightfulness.forEach(e => {
        e.length = e.values.length;
    })

    // console.log(nestedRightfulness)

    // const temp = hasMigrationBg(nestedMigrationBg);
    const priority_order = ['Zeer terecht', 'Terecht', 'Niet terecht, niet onterecht', 'Onterecht', 'Zeer onterecht']
    const doubleNest = d3.nest()
        .key(d => d.stel_terecht)
        .sortKeys(function (a, b) {
            // console.log(priority_order[(priority_order.indexOf(a) - priority_order.indexOf(b))])
            return priority_order.indexOf(a) - priority_order.indexOf(b);
        })
        .key(d => d.migratieachtergrond)
        .entries(migrationBackground);



    doubleNest.forEach((e) => {
        e.values.forEach((e, i) => {

            e.values.forEach((d, i) => {
                // console.log(i)
                d.plek = i;
                d.parentLength = e.values.length;
                // e.values.forEach((e, i)=>{

                // })

            })
        })
    })


    console.log(doubleNest)

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
    const yAxis = d3.axisLeft(y);

    yAxis.tickSize(-1300);
  


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
        .attr("height", height + margin.top + margin.bottom);
        // .attr("viewBox", `0 0 800 900`)
        svg.append("g");

    // From https://bl.ocks.org/chloerulesok/e45c8bb1241c4f6051ef30623e6fe552
    // Author: chloerulesok’s
    // var clip = svg.append("defs").append("svg:clipPath")
    //     .attr("id", "clip")
    //     .append("svg:rect")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .attr("x", 0)
    //     .attr("y", 0);



    // const test = d3.map(nestedMigrationBg, function (d) {

    //     return d.key;
    // })

    // console.log(test)


    const scatter = svg.append("g")
        .attr("id", "scatterplot");

        scatter.append("rect")
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', '100%')
          .attr('height', '100%');

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

    update(data)

    

    function update(data) {
        scatter.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr('id', d => d.stel_terecht)
            .attr("class", "dot")
            .attr("r", 3)
            .attr("cx", function (d, i) {

                // return i == 0 ? 20 : i * 20
                // console.log(d, 'fwef')
                return d.plek == 0 ? 10 : d.plek * 10

            })

            .attr("cy", function (d, i, j) {

                // if(d.parentLength > 10){
                //     return d.y + (d.migratieachtergrond == 'Deelnemers met migratieachtergrond' ? 15 : 0)
                // }

                return d.y + (d.migratieachtergrond == 'Deelnemers met migratieachtergrond' ? 5 : -5)

            })

            .style("fill", d => colorscale(d.migratieachtergrond));
    }



    const consequenceMenu = d3.select('nav[data-filter="gevolg-contact"]');

    consequenceMenu
      .on("click", function(){
        console.log(event.target.dataset.value);
      })

    const nestedConsequence = d3.nest()
      .key(d => d.polben_gevolg_controle)
      .entries(data);

      console.log(nestedConsequence)

    function selectData(category) {

        // Wrote this myself.
        const newArray = doubleNest.filter(item => {
          return item.key == category
        }).reduce(item => item)
    
        console.log(newArray)
        update(newArray.values)
    
        return;
    
      }

    createLegend()
    function createLegend() {
        // Wrote this myself
        const legendWrapper = svg.append('g')
          .attr("class", "legend");
    
    
        legendWrapper
          .append("rect")
          .attr("x", 5)
          .attr("class", "legend-wrapper");
        // .on('click', console.log('f'));
        let clickCount = 0;
        const legendContainer = legendWrapper.append('g')
          .attr('class', 'legend-container')
          .attr('data-legend', 'container') 
          .on('click', function () {
    
            // console.log(event.target)\
    
            /* Event delegation (a little ugly, yet better than multiple eventlisteners)
    
              Works pretty much the same way as a normal eventlistener (event), exept that the 
              event object is available already within the eventlistener.
    
              If the parent of all legend items it's data-legend value equals container,
              I know I'm in the right place. Itemparent is the legend item it's parent group which holds
              the text and the rect. That group contains the category and I can put an active class on it.
    
            */
            const upperParent = event.target.parentNode.parentNode.dataset.legend;
    
    
            if (upperParent === 'container') {
              const itemParent = event.target.parentNode;
    
              legendContainer.selectAll('.legend-item')
                .classed('active', false)
                .attr('class', 'legend-item');
    
              // if(clickCount % 2 === 0){
              //   console.log('fefefef')
              itemParent.classList.add('active');
              //   clickCount++;
              // }else{
              //   clickCount = 0;
              //   console.log('yeaa?')
              //   itemParent.classList.remove('active');  
              // }
    
              // Call function and give category name of the legend-item group as argument
              selectData(itemParent.dataset.category)
            }
    
    
          })
    
        const legend = legendContainer.selectAll(".legend")
          .data(colorscale.domain())
          .enter()
          .append("g")
          .attr("class", "legend-item")
          .attr('data-category', d => d)
          .attr("transform", function (d, i) {
            return "translate(0," + i * 35 + ")";
          })
          .on('click', function () {
            // selectData(d3.event.target.parentNode.dataset.category)
            // console.log(d)
          });
    
        legend.append("circle")
          .attr("cx", 185 - 5)
          .attr("cy", 9)
          .attr("r", 10)
          .style("fill", colorscale);
    
        legend.append("text")
          .attr("x", 200)
          .attr("y", 9)
          .attr("dy", ".35em")
          .attr("class", "legend-text")
    
          .text(function (d) {
            return d;
          })
    
        legendWrapper
          .style("transform", `translate(0px, ${height + 5}px)`);
    
      }

}