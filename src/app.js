const express=require('express');

const app=express();
/**Multiple Route Handlers */
app.use(
    "/user",
    [(req,res,next)=>{
    console.log("User1")
    // res.send("User1")
    next();
},
(req,res,next)=>{
  console.log("User2")
//   res.send("User2")
next();
},
(req,res,next)=>{
    console.log("User3")
    // res.send("User3")
    next();
  },
  (req,res,next)=>{
    console.log("User4")
    res.send("User4")
    next();
  },
  (req,res,next)=>{
    console.log("User5")
    res.send("User5")
    
  }]

)

/** Different API Methods
  

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

 */

app.listen(7777,()=>{
console.log('Server is running on port 7777');
})