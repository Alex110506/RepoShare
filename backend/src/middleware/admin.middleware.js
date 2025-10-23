import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const verifyAdmin =async (req,res,next)=>{
    try {
        const token=req.cookies.jwt

        if(!token){
            return res.status(401).json({ message: "Access denied. No token provided." })
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

        const user = await User.findById(decoded.id)
        if(!user)
            return res.status(404).json({message:"User not found."})

        if (!user.isAdmin){
            return res.status(403).json({message: "Access denied. Admins only."})
        }

        req.user = user

        next()
    } catch (err) {
        console.log("Error in admin route middleware",error);
        res.satus(500).json({message:"Internal Sserver Error"})
    }
};
