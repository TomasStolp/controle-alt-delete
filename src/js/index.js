import * as d3 from './d3Import';


console.log(d3)

const height = window.innerHeight / 4;
const width = window.innerWidth / 4;
const margin = {
    top: 20, 
    right: 20,
    bottom: 20,
    left: 20
};

const svg = d3.select('svg')
    .attr('height', height)
    .attr('width', width);

const g = svg.append('g');
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


const data = [{
    id: 1,
    name: 'Tomas',
    highscore: 20000
},
{
    id: 2,
    name: 'Sonja',
    highscore: 21000
},
{
    id: 3,
    name: 'Hopie',
    highscore: 25000
},
{
    id: 4,
    name: 'Luna',
    highscore: 23000
}];

const highscores = data.map(item => item.highscore);
const min = d3.min(highscores);
const max = d3.max(highscores);


const scale = d3.scaleLinear().domain([max, 0]).range([0, height]);
// console.log(height)
// console.log(scale(25000))

const bars = g.selectAll('rect');
bars.data(data)
        .enter()
        .append('rect')
        .attr('id', d => d.name)
        .attr('x', (d, i)=> i * 40)
        .attr('y', d => scale(d.highscore))
        .attr('width', 35)
        .transition().duration(2000)
        .attr('height', d => height - scale(d.highscore));
            