const cookieParser = require('cookie-parser');
const validator=require('validator');
const validateSignup=(req)=>{
    const data= req.body;
       const isAllowed=["firstName","lastName","email","password"];
       const fieldAllowed= Object.keys(data).every((k)=>isAllowed.includes(k));
       if(!fieldAllowed){
        throw new Error("Invalid field")
       }
    const {firstName , lastName ,email, password}=req.body;

    if(!firstName || !lastName || !email || !password){
        throw new Error("All fields are required")
    }
    else if(!validator.isEmail(email)){
        throw new Error ("invalid Error")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is weak")
    }
    else{
        console.log("Signup data is valid")
    }
}
const validateEditProfileData =(req)=>{
  
   const data=req.body;
    const isAllowed=["age","skills","about","gender","imageUrl","firstName","lastName"];
    const fieldAllowed= Object.keys(data).every((k)=>isAllowed.includes(k));
    if(!fieldAllowed){
throw new Error("Cannot update this field")
    }
   return fieldAllowed;
    

}


module.exports={validateSignup,validateEditProfileData}