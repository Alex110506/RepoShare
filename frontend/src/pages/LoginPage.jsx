import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../components/AuthContext'

const BASE_URL=import.meta.env.MODE==="development" ? "http://localhost:5001/api" : "/api"

const LoginPage = () => {

    const { user, logout,login } = useContext(AuthContext);

    const navigate=useNavigate()

    const [formState,setFormState]=useState({
        email:"",
        password:"",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
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
                toast.success("Login successful!");
                console.log("Server response:", data);
                navigate("/home")
            } else {
                console.log(data.message);
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

  return (
    <div className='flex flex-col items-center justify-center pt-8 px-4'>
        <form onSubmit={handleSubmit} className='w-full md:w-1/3 bg-base-300 p-6 rounded-lg shadow-lg hover:shadow-gray-700 hover:shadow-md transition-shadow duration-300'>
            <div className='flex flex-col gap-4 justify-start pb-4'>
                <h1 className='text-2xl font-bold'>
                    Email:
                </h1>
                <input type="email" 
                value={formState.email}
                onChange={(e)=>setFormState({...formState,email:e.target.value})}
                className='input bg-info-content text-lg pl-4 w-full'/>
            </div>
            <div className='flex flex-col mb-4 gap-4 justify-start pb-4 mt-6'>
                <h1 className='text-2xl font-bold'>
                    Password:
                </h1>
                <input type="password" 
                value={formState.password}
                onChange={(e)=>setFormState({...formState,password:e.target.value})}
                className='input bg-info-content text-lg pl-4 w-full'/>
            </div>

            <p className='mb-4'>Don't have an account?&nbsp;
                <Link to={"/signup"}>Signup!</Link>
            </p>

            <hr />

            <button className='btn w-full bg-secondary mt-8 text-2xl font-bold p-7'>
                Login
            </button>
        </form>
    </div>
  )
}

export default LoginPage