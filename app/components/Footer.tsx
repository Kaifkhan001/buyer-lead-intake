"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-8 px-4 md:px-12 lg:px-20 border-t-2 border-[#1e293b]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand / Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg font-semibold text-white"
        >
          Buyer-Lead-Intake<span className="text-amber-400">.</span>
        </motion.div>

        {/* Links */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap gap-6 text-sm"
        >
          {["Home", "About", "Services", "Contact"].map((link, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.1, color: "#fbbf24" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer hover:text-blue-400"
              onClick={() => {router.push(`/${link.toLowerCase()}`)}}
            >
              {link}
            </motion.li>
          ))}
        </motion.ul>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex gap-5"
        >
          {["twitter", "github", "linkedin"].map((icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="w-6 h-6 text-gray-400 hover:text-amber-400"
            >
              <i className={`ri-${icon}-fill text-xl`} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-center text-xs text-gray-500 mt-6"
      >
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </motion.div>
    </footer>
  );
}
