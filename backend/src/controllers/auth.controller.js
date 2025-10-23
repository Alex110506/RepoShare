import User from "../models/User.js";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

export async function signup(req,res){
    const {email,password,fullName,university,linkGit,bio}=req.body

    try {
        if(!email || !password || !fullName || !university || !linkGit || !location){
            return res.status(400).json({message:"All fields are required"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const gitRegex=/^https?:\/\/(www\.)?github\.com\/.+/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!gitRegex.test(linkGit)) {
            return res.status(400).json({ message: "Invalid github link format" });
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already exists. Please use a different one"})
        }

        const index=Math.floor(Math.random()*100)+1;
        const randomAvatar=`https://avatar.iran.liara.run/public/${index}.png`

        const newUser=await User.create({
            email,fullName,password,profilePic:randomAvatar,university,linkGit,bio,location
        })


        const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"30d"
        })

        res.cookie("jwt",token,{
            maxAge: 30*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="production"
        })

        res.status(201).json({success:true,user:newUser})

    } catch (error) {
        console.log("Signup error ",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function login(req,res){
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"Invalid email or password"})
        }

        const isPasswordCorrect=await user.matchPassword(password)
        if(!isPasswordCorrect){
            return res.status(401).json({message:"Invalid email or password"})
        }

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"30d"
        })

        res.cookie("jwt",token,{
            maxAge: 30*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="production"
        })

        res.status(200).json({success:true,user})
    } catch (error) {
        console.log("Signup error ",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function logout(req,res){
    res.clearCookie("jwt")
    res.status(200).json({success:true,message:"Logout successful"})
}

export async function deleteUser(req,res) {
    try {
        const userId=req.params.id;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found."});
        }

        await Post.deleteMany({user: userId});

        await User.findByIdAndDelete(userId);
        res.status(200).json({message:"User and related posts deleted successfully."});
    } catch (err) {
        res.status(500).json({message:"Server error.", error: err.message});
    }
}