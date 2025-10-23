import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    bio:{
        type:String,
        default:"No bio"
    },
    university:{
        type:String,
        default:"",
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },
    linkGit:{
        type:String,
        required:true,
        trim:true,
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        default:"user"
    }
},{timestamps:true})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password"))
        return next();
    try {
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.matchPassword=async function (enteredPassword) {
    const isCorrect=await bcrypt.compare(enteredPassword,this.password)
    return isCorrect;
}

const User=mongoose.model("User",userSchema);


export default User