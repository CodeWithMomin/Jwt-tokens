const mongoose=require('mongoose')
const UserSchema={
    name:String,
    email:String,
    password:String
}
const userSchema=new mongoose.Schema(UserSchema)
const User=mongoose.model('User',userSchema)
module.exports=User;