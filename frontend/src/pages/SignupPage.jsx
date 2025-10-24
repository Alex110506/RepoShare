import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shuffle,Camera } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../components/AuthContext'

const BASE_URL=import.meta.env.MODE==="development" ? "http://localhost:5001/api" : "/api"

const SignupPage = () => {

    const { user, logout,login } = useContext(AuthContext);

    const navigate=useNavigate()

    const [formState,setFormState]=useState({
        fullName:"",
        email:"",
        password:"",
        profilePic:"https://avatar.iran.liara.run/public/1.png",
        bio:"",
        university:"",
        linkGit:"",
        location:""
    })

    const handleRandomAvatar=()=>{
        const idx=Math.floor(Math.random()*100)+1;
        const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`
        setFormState({...formState,profilePic:randomAvatar})
        toast.success("Avatar changed successfully")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${BASE_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
                credentials:"include"
            });

            const data = await res.json();

            if (res.ok) {
                login(formState.email)
                toast.success("Signup successful!");
                console.log("Server response:", data);
                navigate("/home")
            } else {
                console.log(data.message);
                toast.error(data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };


  return (
    <div className='flex flex-col items-center justify-center pt-8 px-4 pb-10'>
        <form onSubmit={handleSubmit} className='w-full md:w-1/3 bg-base-300 p-6 rounded-lg shadow-lg hover:shadow-gray-700 hover:shadow-md transition-shadow duration-300'>
            <div className='flex flex-col items-center justify-center space-y-4'>
                <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                    {formState.profilePic ? (
                        <img src={formState?.profilePic} alt="Profile Preview" className='w-full h-full object-cover'/>
                    ):(
                        <div className='flex items-center justify-center h-full'>
                            <Camera className='size-12 text-base-content opacity-40'></Camera>
                        </div>
                    )}
                </div>

                <div className='felx items-center gap-2'>
                    <button type='button' onClick={handleRandomAvatar} className='btn bg-accent p-2'>
                        <Shuffle className='size-4 mr-2'></Shuffle>
                        Generate Random Avatar
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-4 justify-start pb-4'>
                <h1 className='text-2xl font-bold'>
                    Full name:
                </h1>
                <input type="text" 
                value={formState.fullName}
                onChange={(e)=>setFormState({...formState,fullName:e.target.value})}
                className='input bg-info-content text-lg pl-4 w-full'/>
            </div>
            
            <div className='flex flex-col gap-4 justify-start'>
                <h1 className='text-2xl font-bold'>
                    Email:
                </h1>
                <input type="email" 
                value={formState.email}
                onChange={(e)=>setFormState({...formState,email:e.target.value})}
                className='input bg-info-content text-lg pl-4 w-full'/>
            </div>
            <div className='flex flex-col gap-4 justify-start pb-4 mt-6'>
                <h1 className='text-2xl font-bold'>
                    Password:
                </h1>
                <input type="password" 
                value={formState.password}
                onChange={(e)=>setFormState({...formState,password:e.target.value})}
                className='input bg-info-content text-lg pl-4 w-full'/>
            </div>

            <div className='flex flex-col gap-4 justify-start pb-4'>
                <h1 className='text-2xl font-bold'>
                    Bio:
                </h1>
                <input type="text" 
                value={formState.bio}
                onChange={(e)=>setFormState({...formState,bio:e.target.value})}
                className='input bg-info-content text-lg pl-4 w-full'/>
            </div>

            <div className='flex flex-col gap-4 justify-start pb-4'>
                <h1 className='text-2xl font-bold'>
                    City:
                </h1>
                <input type="text" 
                value={formState.location}
                onChange={(e)=>setFormState({...formState,location:e.target.value})}
                className='input bg-info-content text-lg pl-4 w-full'/>
            </div>

            <div className='flex flex-col gap-4 justify-start pb-4'>
                <h1 className='text-2xl font-bold'>
                    University:
                </h1>
                <input type="text" 
                value={formState.university}
                onChange={(e)=>setFormState({...formState,university:e.target.value})}
                className='input bg-info-content text-lg pl-4 w-full'/>
            </div>

            <div className='flex flex-col gap-4 justify-start pb-4'>
                <h1 className='text-2xl font-bold'>
                    Github Profile Link:
                </h1>
                <input type="text" 
                value={formState.linkGit}
                onChange={(e)=>setFormState({...formState,linkGit:e.target.value})}
                className='input bg-info-content text-lg pl-4 w-full'/>
            </div>

            <p className='mb-4'>Already have an account?&nbsp;
                <Link to={"/login"}>Login!</Link>
            </p>

            <hr />

            <button className='btn w-full bg-secondary mt-8 text-2xl font-bold p-7'>
                Signup
            </button>
        </form>
    </div>
  )
}

export default SignupPage