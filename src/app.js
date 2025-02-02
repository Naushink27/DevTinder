const express=require('express');
const connectDB=require("./config/database")
const app=express();
const User=require('./models/user');
const {validateSignup}=require("./utils/validate")
const bcrypt=require("bcrypt");
const cookie=require("cookie-parser");
const jwt=require("jsonwebtoken");

app.use(express.json());
app.use(cookie())

app.get("/user",async(req,res)=>{
  const email= req.body.email;

  try{
 
     const user= await User.findOne({email:email});
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
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No user found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});
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

app.delete("/user",async(req,res)=>{
  const userId= req.body.userId;
   try{
    const user= await User.findByIdAndDelete(userId);
    if(!user){
       res.status(404).send("User not found")
    }
    else{
      res.status(200).send("User deleted successfully")
    }
   
   }catch(err){
    res.status(500).send("Server error")
  }
})
//Update user by id.
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  const { skills, imageUrl, about, password,age } = data;

  let hashedPassword;
  if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
      // Validate update fields before updating
      const isAllowed = [  "password", "skills", "imageUrl", "about", "age", "gender"];
      const updateAllowed = Object.keys(data).every((k) => isAllowed.includes(k));

      if (!updateAllowed) {
          return res.status(400).send("Invalid updates");
      }

      // Prepare update object
      const updateFields = {   skills, imageUrl, about ,age};
      if (password) {
          updateFields.password = hashedPassword;
      }

      // Update user
      const user = await User.findByIdAndUpdate(userId, updateFields, {
          returnDocument: "after",
          runValidators: true,
      });

      if (!user) {
          return res.status(404).send("User not found");
      }

      console.log(user);
      if (data.skills) {
          console.log(data.skills);
      }

      res.status(200).send("User Updated Successfully");
  } catch (err) {
      res.status(500).send("ERROR: " + err.message);
  }
});

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
        const token= await jwt.sign({id},"Dev@Tinder$123")
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
app.get("/profile",async(req,res)=>{
 try{ 
 const cookies= req.cookies;
 const {token}=cookies;
 if(!token){
  throw new Error("Invalid Token");
 }
 const decoded= await jwt.verify(token,"Dev@Tinder$123")
  const{id}=decoded;
   const user= await User.findById(id)
   if(!user){
    throw new Error("Invalid User")
   }
   res.send(user)
}
 catch(err){
  res.status(500).send("ERROR: "+err)
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
