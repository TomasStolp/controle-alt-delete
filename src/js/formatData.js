import * as d3 from 'd3';


function formatData(data){
        // .key(d => d.stel_terecht)
       var priority_order = ['Zeer terecht', 'Terecht', 'Niet terecht, niet onterecht', 'Onterecht', 'Zeer onterecht']
        const ethnics = d3.nest()
       
        .key(function(d) { return d.stel_terecht; })
        .sortKeys(function(a,b) { 
                // console.log(priority_order[(priority_order.indexOf(a) - priority_order.indexOf(b))])
                return priority_order.indexOf(a) - priority_order.indexOf(b); 
        })
        .entries(data)

        // const newData = ethnics.filter(e => e.stel_terecht != "99999")

        return ethnics;
}




export { formatData }