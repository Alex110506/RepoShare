import React from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';

const BASE_URL=import.meta.env.MODE==="development" ? "http://localhost:5001/" : "/"

const PostCardProfile = ({postId,image,githubLink,description,fullName,userId,profilePic,university, location}) => {
  
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
            <img src={`${image}`} className='w-96 h-96' alt="porject image" />
        </div>
        <div className='flex px-4 overflow-x-auto'>
            <h1 className='text-xl font-bold'><a href={githubLink}>{githubLink}</a></h1>
        </div>
        <div className='flex p-4 pt-0'>
            <span>
                {description}
            </span>
        </div>
    </div>
  )
}

export default PostCardProfile