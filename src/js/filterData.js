import * as d3 from 'd3';

function hasMigrationBg(data){

    const noMigrationBg = data.filter(obj =>{
            if(obj.Herkomst_def == 'Nederlands'){
                    obj.migratieachtergrond = 'Deelnemers zonder migratieachtergrond';
                    return true;
            }
    })

    const hasMigrationBg = data.filter(obj =>{
             if(obj.Herkomst_def != 'Nederlands'){
                     obj.migratieachtergrond = 'Deelnemers met migratieachtergrond';
                     return true;
             }
     })

     return ( d3.nest()
                .key(d => d.migratieachtergrond)
                .entries( [...noMigrationBg, ...hasMigrationBg])
         )
     
}

function filterData(data){
    console.log(data.filter(e => e.stel_terecht != "99999"))

const newData = data.filter(e =>{
    if(e.stel_terecht != "99999" && e.stel_terecht != "Geen antwoord"){
        if(e.Totstand == "De politie kwam naar mij toe"){
                return true;
        }
    }
})

    return newData;
}

export { filterData, hasMigrationBg }