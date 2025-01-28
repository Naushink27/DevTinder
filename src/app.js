const express=require('express');
const connectDB=require("./config/database")
const app=express();
const User=require('./models/user');

app.use(express.json());
app.get("/user",async(req,res)=>{
  const emailId= req.body.email;

  try{
    //  const user= await User.find({email:emailId});
    //  if(user.length==0){
    //     res.status(404).send("User not found")
    //  }
    //  else{
    //   res.send(user);
    //  }
     const user= await User.findOne({email:emailId});
     if(!user){
        res.status(404).send("User not found")
     }
     else{
      res.send(user);
     }
  }catch(err){
    res.status(500).send("Server error")
  }
})
app.get("/feed",async(req,res)=>{
  const users=await User.find({})
  if(users.length===0){
    res.status(404).send("No user found")
  }
  else{
    res.send(users)
  }
})
app.post('/signup',async(req,res)=>{

  //Creating new instance of the User model.

    const user=new User(req.body);
    //Saving the user to the database.
    try{
      await user.save();
      res.send("User created successfully")
    }
    catch(err){
      res.status(500).send("Server error")
    }
   
})
connectDB().then(()=>{
  console.log("Database connected")
  app.listen(7777,()=>{
    console.log('Server is running on port 7777');
    })
}).catch(err=>{
  console.log("Error in connecting database",err)
})
