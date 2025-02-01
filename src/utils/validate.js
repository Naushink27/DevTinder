const validator=require('validator');
const validateSignup=(req)=>{
    const data= req.body;
       const isAllowed=["firstName","lastName","email","password"];
       const fieldAllowed= Object.keys(data).every((k)=>isAllowed.includes(k));
       if(!fieldAllowed){
        throw new Error("Invalid field")
       }
    const {firstName , lastName ,email, password}=req.body;

    if(!firstName || !lastName){
        throw new Error("First name and last name are required")
    }
    else if(!validator.isEmail(email)){
        throw new Error ("invalid Error")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is weak")
    }
}

module.exports={validateSignup}