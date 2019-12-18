function hasMigrationBg(json){
    // const test = json.filter(respondent => respondent.geboorteland_respondent == 'Nederland')
    // .filter(i => i.geboorteland_moeder != 'Nederland' || i.geboorteland_vader != 'Nederland')
    // .filter(i => i.geboorteland_moeder != '#NULL!');


    // const test = json.filter(response => {
    //     if(response.geboorteland_respondent == 'Nederland'){
    //         if(response.geboorteland_vader != 'Nederland' || response.geboorteland_moeder != 'Nederland'){
    //             return true;
    //         }
    //     }else if(response.geboorteland_respondent != 'Nederland'){
    //         return true
    //     }else{
    //         return false
    //     }
    // })


    const test = json.map(response => {


        if(response.geboorteland_respondent != 'Nederland'){
            Object.assign(response, {afkomst :response.geboorteland_respondent})
            return response;
        }else if(response.geboorteland_vader != 'Nederland' || response.geboorteland_moeder){
            Object.assign(response, {
                afkomst : [
                    (response.geboorteland_vader != 'Nederland') ? 
                    response.geboorteland_vader : response.geboorteland_moeder
                ]
            })
           
            return response;
        }

        // if(response.geboorteland_respondent == 'Nederland'){
        //     if(response.geboorteland_vader != 'Nederland' || response.geboorteland_moeder != 'Nederland'){
                
        //         Object.assign(response, {afkomst : response.geboorteland_vader})
        //         return response;
        //     }else{

        //     }
        // }else{
        //     Object.assign(response, {afkomst :response.geboorteland_respondent})
        //     console.log('naha')
        //     return response;
        // }
    })
return test;
}

export { hasMigrationBg }