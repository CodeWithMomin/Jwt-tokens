const  express=require('express')
const mongoose=require('mongoose')
const Product = require('./models/Product')
const productRoute = require('./Routes/productroute')
const { body, validationResult } = require('express-validator')
var cors=require('cors')
const User = require('./models/User')
var jwt=require('jsonwebtoken')

const app=express()
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017/products')

app.get('/',(req,res)=>{
    res.send("Welcome to Our Store")
})
function checkAuth(req, res, next){

    let {authorization} = req.headers;
 
    if(!authorization){
      res.send("you are not authorized")
    }
    let token = authorization.split(' ')[1]
    var decoded = jwt.verify(token, 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ', (err, decoded)=>{
        if(err){
            res.send("In valid token")
        }
        else{
            req.userData = decoded
           next()
        }
    });
    
}

app.post('/register',body('username','email','password').notEmpty(),async(req,res)=>{
    
    const result=validationResult(req)
    if(!result.isEmpty())
    {
        res.send({errors:result.array()})
    }
    const { username, email, password } = req.body;

    let newUser = new User({
        name: username,
        email: email,
        password: password,
      });
       await newUser.save();
      res.send(newUser)
})
app.post('/login',body('email','password').notEmpty(),async(req,res)=>{
const result=validationResult(req)
if(!result.isEmpty())
    {
        res.send({errors:result.array()})
    }
    const {  email, password } = req.body;
    const compareUser= await User.find({email:email,password:password})
    if(compareUser.length>0)
    {
        const token=jwt.sign({name:compareUser[0].name},'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ');
        // console.log("token",token);
        res.send({token})
    }
    else{
        res.status(401).send({ message: 'Invalid credentials' });
    }

})
app.get('/profile',checkAuth, (req, res)=>{
    res.send(req.userData)
  })
app.use('/products',productRoute)
app.listen(2000,()=>{
    console.log("server is listening on http://127.0.0.1:2000")
})