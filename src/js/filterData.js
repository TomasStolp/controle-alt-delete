function filterData(data){
    console.log(data.filter(e => e.stel_terecht != "99999"))

const newData = data.filter(e =>{
    if(e.stel_terecht != "99999"){
        if(e.Totstand == "De politie kwam naar mij toe"){
                return true;
        }
    }
})

    return newData;
}

export { filterData }