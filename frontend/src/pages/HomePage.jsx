import React, { useContext } from 'react'
import NewsletterPopup from '../components/Newsletter'
import { AuthContext } from '../components/AuthContext'

const HomePage = () => {

    const {user}=useContext(AuthContext)

  return (
    <div className='flex flex-col justify-center items-center p-6 gap-8'>
        <NewsletterPopup email={user}></NewsletterPopup>
        <h1 className='font-bold text-3xl'>My Feed</h1>
        <div className='flex flex-col gap-4'>

        </div>
        <div className='flex'>
            <button className='btn bg-base-300 p-7'>Load More</button>
        </div>
    </div>
  )
}

export default HomePage