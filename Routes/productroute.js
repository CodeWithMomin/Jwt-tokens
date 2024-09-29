const express=require('express');
const Product = require('../models/Product');
const { body,validationResult } = require('express-validator');
const productRoute=express();
productRoute.use(express.json())
productRoute.route('/').get(async(req,res)=>{
  let products=await Product.find()
  res.send(products)
})
productRoute.get('/singleProduct',body('title').notEmpty(),async(req,res)=>{
    const result=validationResult(req)
    if(!result.isEmpty())
    {
        res.send({errors:result.array()})
    }
    let singleProduct=await Product.findOne({title:req.body.title})
    res.send(singleProduct)
})
module.exports=productRoute