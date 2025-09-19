"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f172a] text-gray-200 px-6 py-12 ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center flex flex-col items-center gap-6"
      >
        {/* Profile Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-lg border-4 border-amber-400"
        >
          <Image
            src="/my-photo.jpg" // replace with your image in public folder
            alt="My profile"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Name & Tagline */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Kaif Khan
          </h1>
          <p className="text-amber-400 mt-1">Full-Stack Developer</p>
        </div>

        {/* About Me Section */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-400 leading-relaxed text-sm md:text-base max-w-lg"
        >
          Hi 👋 I’m Kaif, a passionate developer who loves building clean,
          functional, and modern web applications. With a strong interest in
          backend systems, APIs, and problem solving, I enjoy turning ideas into
          reality using code.
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-6 mt-4"
        >
          {["twitter", "github", "linkedin"].map((icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.2, rotate: 3 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="text-gray-400 hover:text-amber-400 text-2xl"
            >
              <i className={`ri-${icon}-fill`} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
