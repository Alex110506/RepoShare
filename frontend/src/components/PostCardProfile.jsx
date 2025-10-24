import React from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';

const PostCardProfile = ({postId,image,githubLink,description,fullName,userId,profilePic,university, location}) => {
    
    const handleDelete = async () => {
        const id=postId
        console.log(id);
        try {
            const res = await fetch(`http://localhost:5001/api/post/delPost/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Post deleted successfully");
                window.location.reload()
            } else {
                toast.error(data.message || "Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Something went wrong while deleting the post");
        }
    };
  
    return (
    <div className='bg-slate-300 text-black rounded-lg w-96'>
        <div className='flex flex-row gap-4 p-4 pb-0 mb-2'>
            <div className='h-12 w-12 rounded-full'>
                <img src={profilePic} alt="profile picture" />
            </div>
            <div className='flex flex-col'>
                <h3 className='text-xl font-bold'><Link to={`/users/${userId}`}>{fullName}</Link></h3>
                <p>{university}, {location}</p>
            </div>
        </div>

        <hr></hr>
        
        <div className='flex w-full'>
            <img src={`http://localhost:5001${image}`} className='w-96 h-96' alt="porject image" />
        </div>
        <div className='flex px-4'>
            <h1 className='text-xl font-bold'><a href={githubLink}>{githubLink}</a></h1>
        </div>
        <div className='flex p-4 pt-0'>
            <span>
                {description}
            </span>
        </div>
        <div className='flex flex-row gap-4 justify-end items-end px-2 pb-2'>


            <button onClick={handleDelete} className='flex flex-row gap-2 p-2 rounded-md bg-red-400 hover:bg-red-600'>
                <h3 className='text-lg font-bold'>Delete Post</h3>
                <i className="bi bi-trash-fill text-xl"></i>
            </button>
            

        </div>
    </div>
  )
}

export default PostCardProfile