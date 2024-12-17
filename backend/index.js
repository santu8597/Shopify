const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const connect=require('./db')
const cors=require('cors')
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/users',require('./routes/user'))
app.use('/api/products',require('./routes/product'))
app.use('/api/orders',require('./routes/order'))
app.use('/api/cart',require('./routes/cart'))

//Server Listen
const PORT=process.env.PORT
app.listen(PORT || 6000,()=>{
    console.log(`Server running on Port ${PORT}`)
})
connect();