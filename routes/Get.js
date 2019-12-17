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


router.get('/users', (req, res)=>{
    
    jsonArray('data/Testdata_waardelabels.csv')
    // .then(data => console.log(data[0]))
        .then(data => JSON.stringify(data, null, 4) )
        .then(data => {
            // res.json(data);
            res.header("Content-Type",'application/json');
            res.send(data)
            res.end()
        })

})

module.exports = router