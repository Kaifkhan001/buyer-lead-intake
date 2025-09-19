// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import LoggedOutMenu from "./LoggedOutMenu";
import LoggedInMenu from "./LoggedInMenu";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-[#111827] fixed w-full border-b-2 border-b-[#1e293b] text-white shadow-md py-3 z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full  ">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Image 
            src={"/logo.png"}
            alt="Logo"
            width={60}
            height={60}

            />
            <Link href="/" className="text-xl font-bold">
                Buyer-Lead
            </Link>
          </div>

          {/* Desktop Menu */}
          {/* <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition">
              About
            </Link>
            {session && <Link href="/create-buyer" className="hover:text-blue-400 transition">
              Create Buyer
            </Link>}
          </div> */}

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {session ? (
                 <button
                 onClick={() => {
                    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin` });
                    console.log(`Something:- ${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`)
                    setIsOpen(false);
                 }}
              className="hidden md:inline-block bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition cursor-pointer"
            >
              Logout
            </button>
            ) : (
            <span className="flex gap-4">
                {/* <Link
              href="/auth/signup"
              className="hidden md:inline-block bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Get Started
            </Link> */}
            <Link
              href="/auth/signin"
              className="hidden md:inline-block bg-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Log-In
            </Link>
               </span>
            )}
            {/* Profile dropdown */}
            <div className="relative ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              {isOpen && (
                session ? (
                    <LoggedInMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
                ) : (
                    <LoggedOutMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
