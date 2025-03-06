const User=require("../models/user")
const jwt=require("jsonwebtoken")
const userAuth=async(req,res,next)=>{
   try {
    cookies = req.cookies;
   const {token}=cookies;
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