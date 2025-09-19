"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-gray-200 px-6 text-center">
      {/* Animated 404 number */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="text-7xl md:text-9xl font-extrabold text-amber-400 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-lg md:text-xl text-gray-400"
      >
        Oops! The page you are looking for doesn’t exist.
      </motion.p>

      {/* Go Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="mt-6 inline-block bg-amber-400 text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-amber-300 transition-all"
        >
          Go Back Home
        </Link>
      </motion.div>
    </main>
  );
}
    