const express=require('express')
const morgan = require('morgan')
const restServices=require("./rest-services")
const app =express()

app.use(express.json())
app.use(morgan('tiny'))

app.use('/',restServices)

const port=6001
app.listen(port,()=>{
    console.log(`Service started listening on port 6001...`);
})