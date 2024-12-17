const express=require('express')
const productRoute=express.Router()
const fetch=require('../middlewares/Auth')
const Product =require('../models/Product')
const User = require('../models/User')

productRoute.get('/all',async (req,res)=>{
    try {
        const products=await Product.find({})
        res.json({sucess:true,products})  
    } catch (error) {
        res.json({sucess:false,error:"Some Internal error occured"})
    }
    
})
productRoute.get('/:id',async (req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
    if(product){res.json({sucess:true,product})}
    else{res.json({sucess:false,error:"Product not found"})}
    } catch (error) {
        res.json({sucess:false,error:"Some Internal error occured"})
    }
    
})
productRoute.put('/:id/review',fetch,async (req,res)=>{
    try {
        const user_details=await User.findById(req.user)
    const user_name=user_details.name
    const {rating,comment}=req.body
    
        const review={
            name:user_name,
            rating,
            comment,
            user:req.user
        }
        const product=await Product.findById(req.params.id)
        
        if(product){
            let sum=0
            product.rating=0
            product.reviews.push(review)
            product.numReview=product.reviews.length
            product.reviews.forEach(function (item, idx) {
            sum += item.rating;
            });
            sum=sum/product.reviews.length
            sum.toFixed(1)
            product.rating=sum
            const updated_product=await product.save()
            res.json({sucess:true,updated_product})}
         else{
            res.json({sucess:false,error:"Product not found"})
        }
    } catch (error) {
        res.json({sucess:false,error:"Some Internal error occured"})
    }
    
   
   
    
})
productRoute.get('/:id/show_all_review',async (req,res)=>{
    
    
    
        try {
            const product=await Product.findById(req.params.id)
        
            if(product){
                const data=product.reviews
                 res.json({sucess:true,data:data})}
             else{res.json({sucess:false,error:"Product not found"})}
        } catch (error) {
            res.json({sucess:false,error:"Some Internal error occured"})
        }
       
   
   
    
})



module.exports=productRoute