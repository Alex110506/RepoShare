import React from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';

const BASE_URL=import.meta.env.MODE==="development" ? "http://localhost:5001" : ""

const PostCardProfile = ({postId,image,githubLink,description,fullName,userId,profilePic,university, location}) => {
    
    const [edit,setEdit]=React.useState(false)

    const [post,setPost]=React.useState({
        githubLink:githubLink,
        description:description
    })

    const handleEdit=async ()=>{

        console.log(post);
        try {
            const res=await fetch(`${BASE_URL}/api/post/editPost/${postId}`,{
                method:"PUT",
                credentials:"include",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    githubLink: post.githubLink,
                    description: post.description
                }),
            })

            const data=await res.json();

            if(res.ok){
                toast.success("Post updated successfully")
            }else{
                toast.error(data.message || "Failed to uodate post")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while editing the post")
        }
    }

    const handleDelete = async () => {
        const id=postId
        console.log(id);
        try {
            const res = await fetch(`${BASE_URL}/api/post/delPost/${id}`, {
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
            <img src={`${BASE_URL}${image}`} className='w-96 h-96' alt="porject image" />
        </div>
        <div className='flex px-4 overflow-x-auto mt-1'>
            {
                !edit ? 
                    <h1 className='text-xl font-bold'><a href={githubLink}>{githubLink}</a></h1>
                :
                    <input
                        type="text"
                        className="w-full bg-gray-100 border-b border-gray-100 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                        value={post.githubLink}
                        onChange={(e) => setPost({ ...post, githubLink: e.target.value })}
                    />
            }
            
        </div>
        <div className='flex p-4 pt-0 mt-1'>
            <textarea
                readOnly={!edit}
                className={`w-full resize-none overflow-hidden bg-transparent transition-colors duration-300 ${
                    edit ? 'bg-gray-100' : 'bg-transparent'
                }`}
                value={post.description}
                onChange={(e) => {
                    setPost({ ...post, description: e.target.value });
                    e.target.style.height = 'auto'
                    e.target.style.height = `${e.target.scrollHeight}px`
                }}
            />
        </div>
        <div className='flex flex-row gap-2 justify-end items-end px-2 pb-2'>

            <button onClick={()=>{
                setEdit(edit ? false : true);
                if(edit){
                    handleEdit()
                }
            }} className='flex flex-row transition-colors duration-300 gap-1 p-1 rounded-md bg-accent hover:bg-accent-content'>
                <h3 className='text-md font-bold'>{edit ? "Save Post" : "Edit Post"}</h3>
                <i className="bi bi-trash-fill text-md"></i>
            </button>

            <button onClick={()=>handleDelete()} className='flex flex-row transition-colors duration-300 gap-1 p-1 rounded-md bg-red-400 hover:bg-red-600'>
                <h3 className='text-md font-bold'>Delete Post</h3>
                <i class="bi bi-pencil-fill text-md"></i>
            </button>
            

        </div>
    </div>
  )
}

export default PostCardProfile