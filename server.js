const fs = require('file-system');

const express = require('express')
const app = express()
const getUsers = require('./routes/Get')
// const PostData = require('./routes/PostData')
const path = require('path')


const jsonArray = require('./src/helpers/dataConverting')



app.use(express.static(__dirname + '/dist'));
 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
})



// app.use('/api/post/', PostData)

app.use('/api/get/', getUsers)


// app.get('/writecsv', (req, res)=>{
//   function hasMigrationBg(json){
//     const test = json.map(response => {


//         if(response.geboorteland_respondent != 'Nederland'){
//             Object.assign(response, {afkomst :response.geboorteland_respondent})
//             return response;
//         }else if(response.geboorteland_vader != 'Nederland' || response.geboorteland_moeder){
//             Object.assign(response, {
//                 afkomst : 
//                     (response.geboorteland_vader != 'Nederland') ? 
//                     response.geboorteland_vader : response.geboorteland_moeder
                
//             })
           
//             return response;
//         }
//     })
// return test;
// }


// const { parse } = require('json2csv');
 
// const fields = ['field1', 'field2', 'field3'];

 



// jsonArray('data/Testdata_waardelabels.csv')




//     // .then(data => console.log(data[0]) )
//     .then((data) => {
      
//       return hasMigrationBg(data)
//     }).then(data => {

//       const fields = data.map(item=> Object.keys(item)).reduce(item => item)
//         const opts = { fields };
//         const csv = parse(data, opts);
      
//       try {
        
//         console.log(csv);

//         fs.writeFile('./testmap', csv)


//       } catch (err) {
//         console.error(err);
//       }
      
      
//     })



// })





app.listen(4000)