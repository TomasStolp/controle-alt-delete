const fs = require('file-system');

const express = require('express')
const app = express()
const get = require('./routes/Get')


 
app.get('/', function (req, res) {
//   fs.readFile('data/Testdata_waardelabels.csv', function(err, data){
//     if(err){
//         throw err;
//     }
//     // res.json(data)

//     const json = JSON.stringify(data);

//     console.log(data)
res.send('fwef')
//     res.json(json);
// })
})

app.use('/api/get/', get)
app.listen(3000)