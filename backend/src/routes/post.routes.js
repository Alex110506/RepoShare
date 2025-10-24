import express from 'express';
import {createPost, delPost,editPost,getPosts,getMyPosts } from '../controllers/posts.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router=express.Router();

router.post("/createPost",protectedRoute,upload.single("image"),createPost)
router.delete("/delPost/:id",protectedRoute,delPost)
router.put("/editPost/:id",protectedRoute,editPost)
router.get("/getRecentPosts",getPosts)
router.get("/getMyPosts",protectedRoute,getMyPosts)

export default router