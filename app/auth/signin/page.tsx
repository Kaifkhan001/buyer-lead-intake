"use client"
// pages/signin.tsx
import { useState, ChangeEvent, FormEvent } from 'react';

interface SignInFormState {
  email: string;
}

const SignInPage = () => {
  const [formData, setFormData] = useState<SignInFormState>({
    email: '',
  });
  const [errors, setErrors] = useState<Partial<SignInFormState>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<SignInFormState> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // TODO: Add your sign-in logic here
    alert(`Signing in with email: ${formData.email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="max-w-md w-full bg-[#1e293b] p-8 rounded-xl shadow-lg shadow-cyan-700/50">
        <h2 className="text-3xl font-extrabold text-cyan-400 text-center mb-8 tracking-wide">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
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

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition text-[#0f172a] font-semibold py-3 rounded-lg shadow-md shadow-cyan-600/50"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-cyan-300 text-sm">
          Don&apos;t have an account?{' '}
          <a
            href="/auth/signup"
            className="text-cyan-400 hover:underline font-semibold"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
