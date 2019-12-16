const express = require('express')
const app = express();
const fs = require('file-system');
var router = express.Router();

const csv=require('csvtojson')



router.get('/users', (req, res)=>{
    // fs.readFile('data/Testdata_waardelabels.csv', function(err, data){
    //     if(err){
    //         throw err;
    //     }
    //     // res.json(data)

    //     const json = JSON.stringify(data);
    //     res.json(json);
    // })

    

    const jsonArray = async (path) =>{
        const data =  await csv().fromFile(path);
        return data;
    };



    
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