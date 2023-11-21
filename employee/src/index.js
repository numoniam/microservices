const express=require('express')
const morgan = require('morgan')
const {consumerHandler}=require("./handlers")
const restServices=require('./rest-services')

const app=express()

app.use(express.json())
app.use(morgan('tiny'))

consumerHandler()
app.use('/',restServices)

const port=3001
app.listen(port,()=>{
    console.log(`service started running on port ${port}...`);
})