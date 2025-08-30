import React from "react";
import { motion } from "framer-motion";

export default function ResumePreview({ name, email, phone, summary, skills, exps, edus }) {
  // fade up animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
    }),
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center py-12">
      {/* Background gradient + floating particles */}
      <motion.div
        className="absolute inset-0 -z-20 bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 opacity-20 blur-3xl"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        id="resume-content"
        className="relative max-w-4xl w-full p-10 space-y-12 rounded-3xl shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.header
          className="pb-6 mb-6 text-center border-b border-gray-200"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg hover:drop-shadow-[0_0_25px_rgba(167,139,250,0.9)] transition-all duration-500">
            {name || "Your Name"}
          </h1>
          <div className="text-gray-600 mt-3 text-lg tracking-wide flex flex-col sm:flex-row justify-center gap-3">
            <span>{email || "email@example.com"}</span>•<span>{phone || "+91-0000000000"}</span>
          </div>
        </motion.header>

        {/* Profile */}
        <motion.section variants={fadeInUp} custom={1} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3 border-l-4 border-indigo-500 pl-3">
            Profile
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{summary || "No profile summary yet"}</p>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section variants={fadeInUp} custom={2} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 border-l-4 border-purple-500 pl-3">
            Experience
          </h2>
          {exps && exps.length ? (
            <div className="relative border-l-2 border-purple-300 pl-6 space-y-10">
              {exps.map((x, i) => (
                <motion.div
                  key={x.id}
                  className="relative group"
                  variants={fadeInUp}
                  custom={i + 2}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-3 top-2 w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white shadow-lg group-hover:shadow-pink-400/90 transition-all duration-500" />

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50/90 to-gray-100/90 shadow-lg backdrop-blur-sm group-hover:shadow-xl group-hover:shadow-purple-300/60 transition-all duration-500 border-l-4 border-purple-300">
                    <strong className="block text-lg text-gray-800">{x.title} — {x.company}</strong>
                    <div className="text-sm text-gray-500">{x.start} — {x.end}</div>
                    <p className="mt-2 text-gray-700">{x.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">No experience yet</div>
          )}
        </motion.section>

        {/* Education Timeline */}
        <motion.section variants={fadeInUp} custom={3} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold text-pink-700 mb-6 border-l-4 border-pink-500 pl-3">
            Education
          </h2>
          {edus && edus.length ? (
            <div className="relative border-l-2 border-pink-300 pl-6 space-y-10">
              {edus.map((x, i) => (
                <motion.div
                  key={x.id}
                  className="relative group"
                  variants={fadeInUp}
                  custom={i + 3}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-3 top-2 w-5 h-5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full border-2 border-white shadow-lg group-hover:shadow-purple-400/90 transition-all duration-500" />

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50/90 to-gray-100/90 shadow-lg backdrop-blur-sm group-hover:shadow-xl group-hover:shadow-pink-300/60 transition-all duration-500 border-l-4 border-pink-300">
                    <strong className="block text-lg text-gray-800">{x.school}</strong>
                    <div className="text-sm text-gray-500">{x.degree} • {x.start} — {x.end}</div>
                    <p className="mt-2 text-gray-700">{x.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">No education yet</div>
          )}
        </motion.section>

        {/* Skills */}
        <motion.section variants={fadeInUp} custom={4} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-l-4 border-indigo-500 pl-3">
            Skills
          </h2>
          <motion.div
            className="flex flex-wrap gap-3"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {skills
              ? skills.split(",").map((skill, idx) => (
                  <motion.span
                    key={idx}
                    className="px-4 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-full shadow-md hover:bg-indigo-200 hover:shadow-xl hover:shadow-indigo-400/60 transition-all duration-500 cursor-pointer"
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.9 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.4, ease: "easeOut" },
                      },
                    }}
                    whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                  >
                    {skill.trim()}
                  </motion.span>
                ))
              : <span className="text-gray-500 italic">No skills added yet</span>}
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
}
