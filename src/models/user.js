const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
        maxlength:[50,"First name should be less than 50 characters"],
        minlength:[3,"First name should be greater than 3 characters"]

    },
    lastName:{
        type:String,
        maxlength:[50,"Last name should be less than 50 characters"],
        minlength:[3,"Last name should be greater than 3 characters"]
    },
    email:{
        type:String,
        unique: [true,"Email already exists"],
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
 
    },
    password:{
        type:String ,
        required:[true,"Password is required"],
        trim:true,
        minlength:[8,"Password should be greater than 8 characters"]
    },
    age:{
        type:Number,
        min:[18,"Age should be greater than 18"],
    },
    imageUrl:{
        type:String,
        default:"https://www.healthatlastusa.com/wp-content/uploads/2023/09/35-350426_profile-icon-png-default-profile-picture-png-transparent.jpg"
    },
    gender:{
        type: String,
        validate: {
            validator: function(value) {
                return ["male", "female", "others"].includes(value);
            },
            message: "Invalid Gender."
        }
    },
    skills:{
        type:[String],
        
    },
    about:{
        type:String,
        maxlength:[500,"About should be less than 500 characters"],
        default:"This is default about",
    }
},{
    timestamps:true,
})

const User=mongoose.model('User',userSchema);
module.exports=User;