const express=require('express');
const connectDB=require("./config/database")
const app=express();
const User=require('./models/user');
const {validateSignup}=require("./utils/validate")
const bcrypt=require("bcrypt");
const cookie=require("cookie-parser");
const jwt=require("jsonwebtoken");
const { userAuth } = require('./middlewares/auth');

app.use(express.json());
app.use(cookie())


app.post('/signup',async(req,res)=>{
  try{
   //Validate the data before creating a user.
    validateSignup(req);

   //Encrypt the password.
   const {firstName,lastName,email}= req.body;
   const password=req.body.password;
   const hashedPassword= await bcrypt.hash(password,10);
   console.log(hashedPassword);
    
  //Creating new instance of the User model.

    const user=new User({
      firstName,
      lastName,
      email,
      password:hashedPassword
    });
    //Saving the user to the database.
   
      
      await user.save();
      res.send("User created successfully")
      
    }
    catch(err){
      res.status(500).send("ERROR: "+" "+err)
    }
   
})



app.post("/login",async(req,res)=>{
  try{
    const {email,password}=req.body;
    if(!email || !password){
      throw new Error("Email and password are required")
    }
    const user= await User.findOne({email:email});
    const id= user._id;
    if(!user){
      throw new Error("invalid Credentials");

    }
    const isPassword= await bcrypt.compare(password,user.password);
    if(isPassword){
        const token= await jwt.sign({id},"Dev@Tinder$123",{expiresIn:'1d'})
        console.log(token)
      res.cookie("token",token);
      res.send("Login successful")
    }
    else{
      throw new Error("Invalid Credentials")
    }

  }catch(err){
    res.status(500).send("ERROR: "+err)
  }
   
  

})
app.get("/profile",userAuth,async(req,res)=>{
 try{ 
  const user=req.user;
   res.send(user)
}
 catch(err){
  res.status(500).send("ERROR: "+err)
 }
})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
   const user=req.user;
   res.send("Request sent by:"+user.firstName);
})
connectDB().then(()=>{
  console.log("Database connected")
  app.listen(7777,()=>{
    console.log('Server is running on port 7777');
    })
}).catch(err=>{
  console.log("Error in connecting database",err)
})
