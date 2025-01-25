const adminAuth=(req,res,next)=>{
    const token="xyz";
    const isAuthorized= token==="xyz";
    
    if(!isAuthorized){
        res.status(403).send("Unauthorized");

    }
    else{
        console.log("User is authorized");
        next();
        }
        }

const userAuth=(req,res,next)=>{
    const token="xyz";
    const isAuthorized= token==="xyz";
    
    if(!isAuthorized){
        res.status(403).send("Unauthorized");

    }
    else{
        console.log("User is authorized");
        next();
        }
        }

  module.exports={ 
    userAuth,
    adminAuth,
};