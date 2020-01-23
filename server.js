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


app.use('/api/get/', getUsers)

app.listen(4000)