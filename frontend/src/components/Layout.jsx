import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar></Navbar>
        <div className='flex flex-1'>
            <main className='flex-1 overflow-y-auto transition-all duration-200'>
                <Outlet></Outlet>
            </main>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Layout