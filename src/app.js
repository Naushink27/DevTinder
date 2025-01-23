const express=require('express');

const app=express();

app.use("/hello",(req,res)=>{
    res.send("Hello World")
})
app.use("/user",(req,res)=>{
    res.send("Cannot acessss this page")
})
app.use("/",(req,res)=>{
    res.send("This is a test page")
})
app.listen(7777,()=>{
console.log('Server is running on port 7777');
})