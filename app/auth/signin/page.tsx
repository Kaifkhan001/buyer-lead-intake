"use client"
import LoadingButton from '@/app/components/LoadingButton';
import { signIn } from 'next-auth/react';
// pages/signin.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface SignInFormState {
  email: string;
}

const SignInPage = () => {
  const [formData, setFormData] = useState<SignInFormState>({
    email: '',
  });
  const [errors, setErrors] = useState<Partial<SignInFormState>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
       });
       if(res?.error){
        toast.error("Error loging the user");
        console.log("Error loggind user", res.error);
        return;
       }else if(res?.ok && res.url){
        console.log(res.url);
          toast.success("User Logged In Successfully");
          console.log("Logged in succesfully");
          router.push("/dashboard");
          return;
       }
    } catch (error) {
        toast.error("Error siging up the user");
        console.log("Error Sign-in", error);
        return;
    }finally{
      setFormData({email: ""});
      setIsLoading(false);
    }
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
              className={`w-full px-5 py-3 rounded-lg bg-[#334155] text-cyan-100 placeholder-cyan-200 placeholder:opacity-70 border ${
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
          {isLoading ? (
            <LoadingButton/>
          ) : (
            <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition text-[#0f172a] font-semibold py-3 rounded-lg shadow-md shadow-cyan-600/50"
          >
            Sign In
          </button>
          )}

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
