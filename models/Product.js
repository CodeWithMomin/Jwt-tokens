const mongoose=require('mongoose')
const ProductSchema={
    id:Number,
title:String,
description:String,
category:String,

price:Number,

discountPercentage:Number,

rating:Number,

stock:Number,
brand:String,
weight:Number,

}
const productSchema=new mongoose.Schema(ProductSchema)
const Product=mongoose.model('Product',productSchema)
module.exports=Product;