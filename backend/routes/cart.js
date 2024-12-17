const express=require('express')
const cartRoute=express.Router()
const fetch=require('../middlewares/Auth')
const Product =require('../models/Product')
const User = require('../models/User')
cartRoute.put('/add/:id',fetch,async (req,res)=>{
        const user=await User.findById(req.user)
        const product=await Product.findById(req.params.id)
        if(!user){
            return res.json({sucess:false,error:"Some Internal error occured"})
        
        }
        if(!product){return res.json({sucess:false,error:"Product does not exist"})}
    const {quantity,variant}=req.body
        let cart=user.cart 
       
        for(let i=0;i<cart.length;i=i+1){
            if((cart[i].product==req.params.id) && ( JSON.stringify(cart[i].variant) === JSON.stringify(variant))){
                cart[i].qty++
                const updated_user=await user.save()
                return res.json({sucess:true,updated_user})
            }
        }
        
        const data={
                name:product.name,
                qty:quantity,
                image:product.image,
                price:product.price,
                variant:variant,
                product:product._id
                }
                user.cart.push(data)
                const updated_user=await user.save()
                return res.json({sucess:true,updated_user})
})
cartRoute.get('/getCart',fetch,async (req,res)=>{
    const user=await User.findById(req.user)
    if(!user){
        return res.json({sucess:false,error:"Some Internal error occured"})
    }
    if(user){
        const cart=user.cart
        res.json({sucess:true,cart})
    }
})
cartRoute.put('/:id/updateQuantity',fetch,async (req,res)=>{
        const user=await User.findById(req.user)
        if(!user){return res.json({sucess:false,error:"Some Internal error occured"})}
        const {quantity}=req.body
        let cart=user.cart 
        
        for(let i=0;i<cart.length;i=i+1){
            if((cart[i]._id==req.params.id)){
                const data=cart[i]
                cart[i].qty=quantity
                const updated_user=await user.save()
                return res.json({sucess:true,data})
            }
        }
})
cartRoute.put('/:id/delete',fetch,async (req,res)=>{
    const removeId=req.params.id
    try {
        const user=await User.findById(req.user)
    if(!user){return res.json({sucess:false,error:"Some Internal error occured"})}
    const cart=user.cart
   const newCart = cart.filter((item) => { return item._id != removeId} );
user.cart=newCart
const updated_user=await user.save()
return res.json({sucess:true,message:"Item Deleted"})
    } catch (error) {
        return res.json({sucess:false,message:"Some Internal error occured"})
    }
    
    
    
})
module.exports = cartRoute
