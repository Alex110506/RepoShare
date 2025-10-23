import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    githubLink:{
        type:String,
        required:true,
        trim:true,
        match:[/^https?:\/\/(www\.)?github\.com\/.+/, "Invalid GitHub link"] //asta e generata de AI:))
    },
    projectImage:{
        type:String,
        required: true
    },
    description:{
        type:String,
        trim:true,
        maxlength:500,
        default:""
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps: true});

export default mongoose.model("Post", postSchema);
