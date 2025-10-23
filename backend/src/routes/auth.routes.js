import express from 'express';
import { signup,login,logout,deleteUser } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { verifyAdmin } from '../middleware/admin.middleware.js';

const router=express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.delete("/deleteUser/:id",verifyAdmin,deleteUser)


//check if user is logged in or not
router.get("/me",protectedRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user})
})

export default router