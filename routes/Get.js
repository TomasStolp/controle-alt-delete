const express = require('express');
const app = express();
var router = express.Router();



const jsonArray = require('../src/helpers/dataConverting.js')

// async function jsonArray (path, id) {
//     const data =  await csv().fromFile(path);

//     return id ? data[id] : data;
// };

router.get('/users/:id', (req, res)=>{

    jsonArray('data/Testdata_waardelabels.csv', req.params.id)
    .then(data => JSON.stringify(data, null, 4) )
        .then(data => {
            res.header("Content-Type",'application/json');
            res.send(data)
            res.end()
        })

})


function hasMigrationBg(data){
    const test = data.map(response => {


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
    })
return test;
}

router.get('/users', (req, res)=>{
    
    jsonArray('data/opgeschoonde_data.csv')
    // .then(data => console.log(data[0]))
    // .then((data) => {
    //     return hasMigrationBg(data)
    // })
        .then(data => JSON.stringify(data, null, 4) )
        
        .then(data => {
            // res.json(data);
            res.setHeader('Access-Control-Allow-Origin', 'https://epic-mayer-5c0b28.netlify.com');
            res.header("Content-Type",'application/json');
            res.send(data)
            res.end()
        })

})



module.exports = router