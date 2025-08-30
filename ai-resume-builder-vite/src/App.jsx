import React, { useEffect } from "react";
import ResumeBuilder from "./components/ResumeBuilder";
import { motion } from "framer-motion";
import "./styles.css"; 

export default function App() {
  // ✅ add animated background to <body>
  useEffect(() => {
    document.body.classList.add("animated-bg");
    return () => document.body.classList.remove("animated-bg");
  }, []);

  return (
    <div className="app min-h-screen flex flex-col font-poppins">
      {/* Header */}
      <motion.header
        className="header py-10 text-center relative"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated gradient title */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          𝔸𝕀 ℝ𝕖𝕤𝕦𝕞𝕖 𝔹𝕦𝕚𝕝𝕕𝕖𝕣
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          𝚀𝚞𝚒𝚌𝚔𝚕𝚢 𝚋𝚞𝚒𝚕𝚍 𝚊𝚗𝚍 𝚙𝚛𝚒𝚗𝚝 𝚊   {" "}
          <span className="font-semibold text-black">
           𝚙𝚛𝚘𝚏𝚎𝚜𝚜𝚒𝚘𝚗𝚊𝚕 𝚛𝚎𝚜𝚞𝚖𝚎
          </span>
        </motion.p>
      </motion.header>

      {/* Main Content */}
      <motion.main
        className="flex-1 container mx-auto px-4 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <ResumeBuilder />
      </motion.main>

      {/* Footer */}
      <motion.footer
        className="footer py-6 text-center text-black text-sm relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{ scale: 1.05, color: "#000000" }}
      >
        ALl Right Reserved By-Satyam Singh{" "}
        <span className="font-semibold">𝔸𝕀 ℝ𝕖𝕤𝕦𝕞𝕖 𝔹𝕦𝕚𝕝𝕕𝕖𝕣</span>
      </motion.footer>
    </div>
  );
}
