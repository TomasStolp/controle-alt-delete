const fs = require('file-system');

const express = require('express')
const app = express()
const getUsers = require('./routes/Get')
const path = require('path')
app.use(express.static(__dirname + '/dist'));
 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
})

app.use('/api/get/', getUsers)
app.listen(3000)