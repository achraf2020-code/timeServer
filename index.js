const express = require('express')
const moment = require('moment')
const app = express()
app.use('/public',express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
  res.sendfile(__dirname+'/views/index.html')
})
app.get('/api',(req,res)=>{
  const dateNow = new Date().toString()
  res.json({unix:moment().unix(dateNow),utc:moment(dateNow).format('ddd, D MMM YYYY HH:mm:ss [GMT]')})
})
app.get('/api/:unixDate',(req,res)=>{
  const {unixDate} = req.params
  const utcDate = moment(parseInt(unixDate)).format('ddd, D MMM YYYY HH:mm:ss [GMT]')
  const x =  Number(unixDate)
  if(!x){
    return res.json({ error : "Invalid Date" })
  }
  res.json({unix:unixDate,utc:utcDate})
})


app.listen('3000')