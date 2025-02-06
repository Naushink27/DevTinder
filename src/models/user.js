const mongoose = require('mongoose');
const validator = require('validator');
const jwt= require('jsonwebtoken')
const bcrypt=require('bcrypt')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        maxlength: [50, "First name should be less than 50 characters"],
        minlength: [3, "First name should be greater than 3 characters"],
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error("Invalid First Name")
            }
        }

    },
    lastName: {
        type: String,
        maxlength: [50, "Last name should be less than 50 characters"],
        minlength: [3, "Last name should be greater than 3 characters"],
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error("Invalid Last Name")
            }
    }
},
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
       
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is weak")
            }
        }
    },
    age: {
        type: Number,
        min: [18, "Age should be greater than 18"],
    },
    imageUrl: {
        type: String,
        default: "https://www.healthatlastusa.com/wp-content/uploads/2023/09/35-350426_profile-icon-png-default-profile-picture-png-transparent.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL")
            }
        }
    },
    gender: {
        type: String,
        validate: {
            validator: function (value) {
                return ["male", "female", "others"].includes(value);
            },
            message: "Invalid Gender."
        }
    },
    skills: {
        type: [String],
       validate:{
        validator:function(value){
            return value.length<=10;
        },
        message:"Skills should be less than 10"
       }

    },
    about: {
        type: String,
        maxlength: [500, "About should be less than 500 characters"],
        default: "This is default about",
    }
}, {
    timestamps: true,
})

userSchema.methods.getJWT= async function(){
    const user=this;

    const token=  await jwt.sign({id:user.id},"Dev@Tinder$123",{expiresIn:'1d'})
    return token;
}

userSchema.methods.validatePassword= async function(passwordInputByUser){
    const user=this;
    const passwordHashed= user.password;

    const isPasswordValid= await bcrypt.compare(passwordInputByUser,passwordHashed);
    return isPasswordValid;
}

const User = mongoose.model('User', userSchema);

module.exports = User;