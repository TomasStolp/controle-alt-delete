import * as d3 from 'd3';

function formatData(data){

       
        const ethnics = d3.nest()
        .key(d => d.stel_terecht)
        .entries(data)

        // const newData = ethnics.filter(e => e.stel_terecht != "99999")

        return ethnics;
}


export { formatData }