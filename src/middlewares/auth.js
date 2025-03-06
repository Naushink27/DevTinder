const User=require("../models/user")
const jwt=require("jsonwebtoken")
const userAuth=async(req,res,next)=>{
   try {
    let token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if(!token){
    throw new Error("Please login first")
  }
  const decodedData= await jwt.verify(token,"Dev@Tinder$123")
         const{id}=decodedData;
         const user= await User.findById(id);
         if(!user){
            throw new Error ("Invalid User!!!!")
         }
         req.user=user;
         next();
}catch(err){
    res.status(500).send("ERROR " +err)
}
}

  module.exports={ 
    userAuth
};