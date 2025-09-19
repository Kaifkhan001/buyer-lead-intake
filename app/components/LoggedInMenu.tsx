import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';


interface InputType {
    isOpen: boolean;
    setIsOpen(str: boolean): void
}

const LoggedInMenu = ({ isOpen, setIsOpen}: InputType) => {
  return (
    <div
                    className={`absolute right-0 mt-2 w-56 bg-gray-800 text-gray-100 rounded-xl shadow-lg py-2 transform transition-all duration-200 origin-top-right ${
                        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                    }`}
                    >
                    {/* Links */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition"
                        onClick={() => setIsOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        href="/buyers/new"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition"
                        onClick={() => setIsOpen(false)}
                    >
                       Create Buyer
                    </Link>
                    <Link
                        href="/buyers"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition"
                        onClick={() => setIsOpen(false)}
                    >
                       All Buyers
                    </Link>
                    <Link
                        href="/auth/signup"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-blue-700  rounded-lg transition"
                        onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-blue-700  rounded-lg transition"
                        onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <hr className="my-2 border-gray-600" />

                    {/* Profile */}
                    {/* <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Da
                    </Link> */}

                    {/* Settings */}
                    <button
                        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-700 rounded-lg transition"
                        onClick={() => setIsOpen(false)}
                    >
                       Settings
                    </button>

                    {/* Logout */}
                    <button
                        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-600 rounded-lg transition"
                        onClick={() => {
                        setIsOpen(false);
                        signOut({ callbackUrl: `/auth/signin`});
                        }}
                    >
                        Logout
                    </button>
                    </div>
  )
}

export default LoggedInMenu
