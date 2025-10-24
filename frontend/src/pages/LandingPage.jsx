import React from 'react'
import landingImg from '../assets/landing.png';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-6 px-4 md:px-16 lg:px-32 py-16">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="flex-1 gap-6 bg-info-content shadow-xl hover:shadow-gray-600 hover:shadow-lg transition-shadow duration-300 rounded-xl p-8 text-center md:text-left flex flex-col items-start justify-center md:justify-start text-5xl md:text-7xl font-bold text-gray-900">
                <div className='flex flex-row gap-2'>
                    <i className="bi bi-git text-5xl text-secondary"></i>
                    <span className="font-bold text-4xl text-primary-content">RepoShare</span>
                </div>
                
                <h1 className="text-white">
                    Share Your Projects, <span className='text-secondary'>Build Your Future</span>
                </h1>

                <h3 className='text-lg text-secondary-content'>
                    Join the community where students share code, collaborate on projects, and showcase their skills to the world.
                </h3>
            </div>

            <div className="flex-1 flex shadow-xl">
            <img
                src={landingImg}
                alt="landing photo"
                className="w-full h-full object-cover rounded-lg hover:shadow-gray-600 hover:shadow-lg transition-shadow duration-300"
            />
            </div>
            
        </div>
        <h1 className='font-bold text-4xl justify-self-center self-center'>
            Why RepoShare?
        </h1>
        <div className='flex flex-col md:flex-row justify-center gap-4'>
            <div className='flex flex-col gap-2 p-4 bg-base-300 rounded-xl shadow-xl'>
                <span className='text-3xl font-bold'>Share Projects</span>
                Upload and showcase your work with the student community
            </div>

            <div className='flex flex-col gap-2 p-4 bg-base-300 rounded-xl shadow-xl'>
                <span className='text-3xl font-bold'>Connect</span>
                Find teammates and collaborate on exciting projects
            </div>

            <div className='flex flex-col gap-2 p-4 bg-base-300 rounded-xl shadow-xl'>
                <span className='text-3xl font-bold'>Get Discovered</span>
                Let recruiters and peers discover your talent
            </div>
        </div>

        <div className='flex justify-center flex-col gap-4 items-center'>
            <p className='text-xl'>Have we convinced you?</p>
            <Link to={"login"} className='btn shadow-xl hover:shadow-gray-600 hover:bg-accent hover:shadow-lg p-7 bg-secondary px-12 text-2xl font-bold '>Login And Start Sharing</Link>
        </div>
    </div>
  )
}

export default LandingPage