const express=require('express')
const orderRoute=express.Router()
const fetch=require('../middlewares/Auth')
const Order = require('../models/Order')

//order route

orderRoute.post('/',fetch,async (req,res)=>{
    try {
        const {orderItems,shippingAddress,paymentMethod,paymentResult,taxPrice,shippingPrice,totalPrice,isPaid,isDelivered,deliveredAt}=req.body
    if(orderItems && orderItems.length===0){
        res.json({sucess:false,error:"no Order items found"})
    }
    else{
        const order=new Order({
            user:req.user,
            orderItems:orderItems,
            shippingAddress:shippingAddress,
            paymentMethod:paymentMethod,
            paymentResult:paymentResult,
            taxPrice:taxPrice,
            shippingPrice:shippingPrice,
            totalPrice:totalPrice,
            isPaid:isPaid,
            isDelivered:isDelivered,
            deliveredAt:deliveredAt
            })
        const createOrder=await order.save()
        res.json(createOrder)
    }
    } catch (error) {
        res.json({sucess:false,error:"Some Internal error occured"})
    }
    
    
    
})   

//order update payment route

orderRoute.put('/:id/payment',fetch,async (req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            updated_time:req.body.updated_time,
            email_address:req.body.email_address
        }
        const updatedOrder=await order.save()
        res.json({sucess:true,updatedOrder})
    }
    else{
        res.json({sucess:false,error:"Order not Found"})
    }
})

//get all order
orderRoute.get('/all',fetch,async (req,res)=>{
    const orders=await Order.find({user:req.user}).sort({_id:-1})
    if(orders){
        res.json({sucess:true,orders})
    }
    else{
        res.json({sucess:false,error:"Order not Found"})
    }
})

//get a order using id
orderRoute.get('/:id',fetch,async (req,res)=>{
    const order=await Order.findById(req.params.id).populate("user","email")
    if(order){
        res.json({sucess:true,order})
    }
    else{
        res.json({sucess:false,error:"Order not Found"})
    }
})
module.exports=orderRoute