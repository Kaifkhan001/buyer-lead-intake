"use client"
import LoadingButton from '@/app/components/LoadingButton';
import prisma from '@/app/utils/prisma';
import axios from 'axios';
import { signIn } from 'next-auth/react';
// pages/signup.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner';

interface SignUpFormState {
  name: string;
  email: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpFormState>({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<SignUpFormState>>({});
  const [isLoaoding, setIsLoaoding] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<SignUpFormState> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsLoaoding(true);
      const res = await axios.post("/api/auth/signup", formData);
      if(res.status === 201){
       toast.success(res.data.message);
       await signIn("credentials", {
        redirect: true,
        email: formData.email,
        callbackUrl: "/dashboard"
       });
      }
    } catch (error) {
      console.log("Error catched in the fronend while signing up", error);
      return;
    }finally{
      setIsLoaoding(false);
    }
    

  };

  return (
    <div className="lg:h-[120vh] h-[80vh] flex items-center justify-center bg-[#0f172a] px-4">
      <div className="max-w-md w-full bg-[#1e293b] p-8 rounded-xl shadow-lg shadow-cyan-700/50">
        <h2 className="text-3xl font-extrabold text-cyan-400 text-center mb-8 tracking-wide">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-semibold text-cyan-300 mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-5 py-3 rounded-lg bg-[#334155] text-cyan-100 placeholder-cyan-400 border ${
                errors.name ? 'border-[#f87171]' : 'border-[#334155]'
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 transition`}
              placeholder="Your full name"
              required
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-[#f87171] text-sm mt-1 font-medium">{errors.name}</p>
            )}
          </div>

          <div className="mb-8">
            <label htmlFor="email" className="block text-sm font-semibold text-cyan-300 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-5 py-3 rounded-lg bg-[#334155] text-cyan-100 placeholder-cyan-400 border ${
                errors.email ? 'border-[#f87171]' : 'border-[#334155]'
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 transition`}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-[#f87171] text-sm mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {isLoaoding ? (
            <LoadingButton/>
          ) : (
            <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition text-[#0f172a] font-semibold py-3 rounded-lg shadow-md shadow-cyan-600/50"
          >
            Sign Up
          </button>
          )}
        </form>

        <p className="mt-8 text-center text-cyan-300 text-sm">
          Already have an account?{' '}
          <a
            href="/auth/signin"
            className="text-cyan-400 hover:underline font-semibold"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
