const express=require('express');

const app=express();



app.post("/user/:userId/:userName",(req,res)=>{
    console.log(req.params);
    res.send("Post method")
})
app.get("/user",(req,res)=>{
    res.send({firstname:"Naushin",lastname:"Khan"})
})

app.delete("/user",(req,res)=>{
    res.send("Delete method")
})

app.patch("/user",(req,res)=>{
    res.send("Patch method")
})

app.put("/user",(req,res)=>{
    res.send("Put method")
})



app.listen(7777,()=>{
console.log('Server is running on port 7777');
})