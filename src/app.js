const express=require('express');

const app=express();

app.get("/admin", (req, res) => {
  try{
    throw new Error("You are not authorized");
    res.send("Admin Panel");
  }
  catch(err){
    res.status(500).send("Unauthorized");
  }
 
});

app.use("/",(err,req,res,next)=>{
     if(err){
          res.status(403).send("Unauthorized");
     }

})

app.listen(7777,()=>{
console.log('Server is running on port 7777');
})