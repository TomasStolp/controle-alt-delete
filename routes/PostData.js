const express = require('express');
const app = express();
var router = express.Router();


const jsonArray = require('../src/helpers/dataConverting.js')



router.post('/users', (req, res)=>{
    
    
    // jsonArray('data/Testdata_waardelabels.csv')
    // // .then(data => console.log(data[0]))
    //     .then(data => JSON.stringify(data, null, 4) )
    //     .then(data => {
    //         // res.json(data);
    //         res.header("Content-Type",'application/json');
    //         res.send(data)
    //         res.end()
    //     })


    console.log(req.json())

})

module.exports = router