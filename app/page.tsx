import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-slate-900 text-gray-100 pt-12 lg:p-0">
      {/* Page 1 - Hero Section */}
      <section className="w-full lg:h-screen  flex flex-col md:flex-row items-center justify-between px-6 md:px-16 bg-slate-900 ">
        {/* Left Text */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            Build Something Amazing
          </h1>
          <p className="text-lg text-gray-300 max-w-md mx-auto md:mx-0">
            A modern landing page built with Next.js and Tailwind CSS. Fully
            responsive, minimal, and comfortable for your eyes.
          </p>
          <Link href={"/auth/signup"} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Get Started
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 mt-10 md:mt-0 flex justify-center pb-12">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Team working"
            width={400}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Page 2 - Minimalist Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-800 px-6 md:px-16 py-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
          Minimalist Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
          <div className="p-6 rounded-2xl bg-slate-700 hover:bg-slate-600 transition shadow text-center">
            <span className="text-4xl">⚡</span>
            <h3 className="text-xl font-semibold mt-4">Fast</h3>
            <p className="text-gray-300 mt-2">
              Optimized with Next.js for blazing fast performance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-700 hover:bg-slate-600 transition shadow text-center">
            <span className="text-4xl">🎨</span>
            <h3 className="text-xl font-semibold mt-4">Minimalist Design</h3>
            <p className="text-gray-300 mt-2">
              Clean, responsive, and distraction-free interface.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-700 hover:bg-slate-600 transition shadow text-center">
            <span className="text-4xl">🔒</span>
            <h3 className="text-xl font-semibold mt-4">Secure</h3>
            <p className="text-gray-300 mt-2">
              Built with modern security best practices in mind.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
