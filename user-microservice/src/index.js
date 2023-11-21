const express=require('express')
const morgan = require('morgan')
const restService=require("./rest-services")
const app=express()

app.use(express.json())
app.use(morgan('tiny'))

app.use('/',restService)

const port=3005
app.listen(port,()=>{
    console.log(`service started running on port ${port}...`);
})