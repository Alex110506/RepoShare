import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-base-300 border-b border-base-300 sticky top-0 z-20 h-16 flex items-center justify-between px-4">
            <div className="flex flex-1 items-center gap-10">
                <div className="flex items-center gap-2">
                    <i className="bi bi-git text-3xl text-secondary"></i>
                    <span className="font-bold text-2xl">RepoShare</span>
                </div>

                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="input w-full pl-4"
                    />
                </div>
            </div>

            <div className="ml-5">
                <Link
                    className="text-xl justify-center items-center flex flex-row gap-2"
                    to={"profile"}
                >
                    My Profile
                    <i className="bi bi-person-circle text-2xl"></i>
                </Link>
            </div>
            </nav>
    );
};

export default Navbar;
