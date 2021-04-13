

var express = require('express')
var bodyParser = require('body-parser')

var app = express()


app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

//app.use('/api', router)
app.use('/Personal', require('./Routes/Personal'))




var port = process.env.port || 8090
app.listen(port,()=>{
    console.log('running at '+ port);
})




