import Post from "../models/Post.js";


export const createPost = async (req, res) => {
    try {
        const {githubLink, description} =req.body;

        if(!req.file){
            return res.status(400).json({ message: "Project image is required." });
        }
        if(!githubLink){
            return res.status(400).json({ message: "Link to project is required." });
        }

        const newPost = new Post({
            githubLink,
            description,
            projectImage: `/uploads/${req.file.filename}`,
            user: req.user._id,
        });

        await newPost.save();
        res.status(201).json({ message: "Post created successfully.", post: newPost });

    } catch (err) {
        res.status(500).json({ message: "Server error while creating post.", error: err.message });
    }
};

export const delPost= async (req,res)=>{
    try{
        const postId=req.params._id

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found."});
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({message:"Post deleted successfully."});
    }catch (error){
        res.status(500).json({message:"Server error.", error: error.message});
    }
}

export const editPost = async (req, res) => {
    try {
        const postId = req.params._id;
        const {githubLink, descriere} = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        if (githubLink) post.githubLink = githubLink;
        if (descriere) post.descriere = descriere;

        const updatedPost = await post.save();

        res.status(200).json({message: "Post updated successfully.",post: updatedPost});

    }catch(error){
        res.status(500).json({message: "Server error.", error: error.message});
    }
};


export const getPosts = async (req, res)=>{
  try{
    const page = Number(req.body.page)
    const limit=10;
    const skip=(page-1)*limit;

    const location=req.body.location;

    let postsQuery=Post.find()
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)
        .populate({
            path: "user",
            select: "fullName location university _id",
            match: location ? {location:{$regex:location, $options: "i"}} : {}
        });

    const posts = await postsQuery.exec();

    const filteredPosts = posts.filter(post => post.user !== null);

    res.status(200).json({
        totalPosts: filteredPosts.length,
        posts: filteredPosts,
    });
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const getMyPosts = async (req, res) => {
    try {
        const userId=req.user._id;

        const posts = await Post.find({user:userId}).sort({createdAt: -1});

        console.log(posts);

        res.status(200).json({
            message:"User posts fetched successfully.",
            posts,
        });
    } catch (error) {
        res.status(500).json({
            message:"Server error while fetching user posts.",
            error:error.message,
        });
    }
};