import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-base-300 border-b border-base-300 sticky top-0 z-20 h-16 flex items-center justify-between px-4">
            <div className="flex flex-1 items-center gap-10">
                <Link to={"/"} className="flex items-center gap-2">
                    <i className="bi bi-git text-3xl text-secondary"></i>
                    <span className="font-bold text-2xl">RepoShare</span>
                </Link>

                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="input w-full pl-4"
                    />
                </div>
            </div>

            {user && (
                <div className='flex flex-row gap-3 ml-4'>
                    <Link to={"/home"}><i className="bi bi-house text-2xl"></i></Link>
                    <Link to={"/post"}><i className="bi bi-patch-plus text-2xl"></i></Link>
                </div>
            )}

            <div className="ml-5">
                <Link
                    className="text-xl justify-center items-center flex flex-row gap-2"
                    to={user ? "/profile" : "/login"}
                >
                    <p className='hidden md:block'>
                        {user ? "My Profile" : "Login"}
                    </p>
                    
                    <i className="bi bi-person-circle text-2xl"></i>
                </Link>
            </div>
            </nav>
    );
};

export default Navbar;
