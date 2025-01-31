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

  //Creating new instance of the User model.

    const user=new User(req.body);
    //Saving the user to the database.
    try{
      
      await user.save();
      res.send("User created successfully")
      
    }
    catch(err){
      res.status(500).send("Something went wrong"+" "+err)
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
app.patch("/user/:userId",async(req,res)=>{
  const userId= req.params.userId;
  const data =req.body;
  try{
   
  const user=  await User.findByIdAndUpdate(userId,data, { returnDocument: 'after' ,runValidators: true } );
  console.log(user);
  console.log(data.skills);
  if(!user){
    res.status(404).send("User not found")
 }
 const isAllowed=["age","gender","password","skills","imageUrl","about"];
 const updateAllowed= Object.keys(data).every((k)=>isAllowed.includes(k));
 if(!updateAllowed){
   throw new Error("Invalid updates")
 }

 else{
   res.status(200).send("User Updated successfully")
 }
}
  catch(err){
    res.status(500).send("Update failed"+err)}
})
//update user by email.
// app.patch("/user",async(req,res)=>{
//   const email= req.body.email;
//   const data =req.body;
//   try{
//   const user=  await User.findOneAndUpdate(email,data );
//     console.log(user);
//     res.status(200).send("User updated successfully")
//   }
//   catch(err){
//     res.status(500).send("Server error")}
// })
connectDB().then(()=>{
  console.log("Database connected")
  app.listen(7777,()=>{
    console.log('Server is running on port 7777');
    })
}).catch(err=>{
  console.log("Error in connecting database",err)
})
