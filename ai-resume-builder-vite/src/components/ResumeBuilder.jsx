import React, { useState, useRef } from "react";
import ResumePreview from "./ResumePreview";
import { motion, AnimatePresence } from "framer-motion";

function emptyExp() {
  return { id: Date.now() + Math.random(), title: "", company: "", start: "", end: "", description: "" };
}
function emptyEdu() {
  return { id: Date.now() + Math.random(), school: "", degree: "", start: "", end: "", description: "" };
}

export default function ResumeBuilder() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 555 555 555");
  const [summary, setSummary] = useState("Experienced software engineer with a passion for building products.");
  const [skills, setSkills] = useState("React, Node.js, Vite, HTML, CSS");
  const [exps, setExps] = useState([emptyExp()]);
  const [edus, setEdus] = useState([emptyEdu()]);
  const previewRef = useRef();

  function addExp() { setExps((s) => [...s, emptyExp()]); }
  function removeExp(id) { setExps((s) => s.filter((x) => x.id !== id)); }
  function updateExp(id, key, val) { setExps((s) => s.map((x) => (x.id === id ? { ...x, [key]: val } : x))); }

  function addEdu() { setEdus((s) => [...s, emptyEdu()]); }
  function removeEdu(id) { setEdus((s) => s.filter((x) => x.id !== id)); }
  function updateEdu(id, key, val) { setEdus((s) => s.map((x) => (x.id === id ? { ...x, [key]: val } : x))); }

  function handlePrint() {
    const content = previewRef.current?.innerHTML || "";
    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) return alert("Pop-up blocked. Please allow popups for this site to print.");
    w.document.write("<html><head><title>Resume</title>");
    w.document.write("<style>body{font-family: Arial, Helvetica, sans-serif;padding:24px;color:#0f172a} .section{margin-bottom:12px} h1{font-size:22px;margin-bottom:6px}</style>");
    w.document.write("</head><body>");
    w.document.write(content);
    w.document.write("</body></html>");
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 400);
  }

  // Animation presets
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="layout" style={{ display: "flex", gap: 24, padding: 20, background: "linear-gradient(135deg,#f0f4ff,#fafafa)" }}>
      
      {/* LEFT COLUMN - Form */}
      <motion.div
        className="column"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)"
        }}
      >
        {/* Top bar */}
        <motion.div className="download-bar" style={{ display: "flex", gap: 12, marginBottom: 20 }} variants={fadeUp}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="small-btn ghost"
            onClick={() => {
              setName("John Doe");
              setEmail("john@example.com");
              setPhone("+1 555 555 555");
              setSummary("Experienced software engineer with a passion for building products.");
              setSkills("React, Node.js, Vite, HTML, CSS");
              setExps([emptyExp()]);
              setEdus([emptyEdu()]);
            }}
          >
            Reset
          </motion.button>

          <div style={{ flex: 1 }} />

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#2563eb", color: "#fff" }}
            whileTap={{ scale: 0.9 }}
            style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: "#3b82f6", color: "#fff" }}
            onClick={handlePrint}
          >
            ⬇ Download / Print
          </motion.button>
        </motion.div>

        {/* BASIC INFO */}
        <motion.div className="section" variants={fadeUp}>
          <h3>👤 Basic Info</h3>
          <div className="form-row"><label>Name</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="form-row"><label>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="form-row"><label>Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <div className="form-row"><label>Summary</label><textarea rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} /></div>
        </motion.div>

        {/* EXPERIENCE */}
        <motion.div className="section" variants={fadeUp}>
          <h3>💼 Experience</h3>
          <AnimatePresence>
            {exps.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{
                  border: "1px solid #e5e7eb",
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 12,
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="form-row"><label>Title</label><input value={exp.title} onChange={(e) => updateExp(exp.id, "title", e.target.value)} /></div>
                <div className="form-row"><label>Company</label><input value={exp.company} onChange={(e) => updateExp(exp.id, "company", e.target.value)} /></div>
                <div className="form-row"><label>Start — End</label><input value={exp.start} onChange={(e) => updateExp(exp.id, "start", e.target.value)} placeholder="2020" /><input value={exp.end} onChange={(e) => updateExp(exp.id, "end", e.target.value)} placeholder="2022" style={{ marginLeft: 8 }} /></div>
                <div className="form-row"><label>Description</label><textarea rows={3} value={exp.description} onChange={(e) => updateExp(exp.id, "description", e.target.value)} /></div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <motion.button whileHover={{ scale: 1.05 }} className="small-btn ghost" onClick={() => removeExp(exp.id)}>Remove</motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div style={{ textAlign: "right" }}>
            <motion.button whileHover={{ scale: 1.1 }} className="small-btn" onClick={addExp}>+ Add Experience</motion.button>
          </div>
        </motion.div>

        {/* EDUCATION */}
        <motion.div className="section" variants={fadeUp}>
          <h3>🎓 Education</h3>
          <AnimatePresence>
            {edus.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{
                  border: "1px solid #e5e7eb",
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 12,
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="form-row"><label>School</label><input value={edu.school} onChange={(e) => updateEdu(edu.id, "school", e.target.value)} /></div>
                <div className="form-row"><label>Degree</label><input value={edu.degree} onChange={(e) => updateEdu(edu.id, "degree", e.target.value)} /></div>
                <div className="form-row"><label>Start — End</label><input value={edu.start} onChange={(e) => updateEdu(edu.id, "start", e.target.value)} placeholder="2016" /><input value={edu.end} onChange={(e) => updateEdu(edu.id, "end", e.target.value)} placeholder="2020" style={{ marginLeft: 8 }} /></div>
                <div className="form-row"><label>Description</label><textarea rows={2} value={edu.description} onChange={(e) => updateEdu(edu.id, "description", e.target.value)} /></div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <motion.button whileHover={{ scale: 1.05 }} className="small-btn ghost" onClick={() => removeEdu(edu.id)}>Remove</motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div style={{ textAlign: "right" }}>
            <motion.button whileHover={{ scale: 1.1 }} className="small-btn" onClick={addEdu}>+ Add Education</motion.button>
          </div>
        </motion.div>

        {/* SKILLS */}
        <motion.div className="section" variants={fadeUp}>
          <h3>⚡ Skills</h3>
          <div className="form-row"><label>Skills</label><input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="comma separated" /></div>
        </motion.div>
      </motion.div>

      {/* RIGHT COLUMN - Preview */}
      <motion.div
        className="column"
        style={{
          flex: 1,
          background: "linear-gradient(145deg,#ffffff,#f9fafb)",
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
        }}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${name}-${email}-${phone}-${summary}-${skills}-${exps.length}-${edus.length}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            ref={previewRef}
            className="preview"
          >
            <ResumePreview name={name} email={email} phone={phone} summary={summary} skills={skills} exps={exps} edus={edus} />
          </motion.div>
        </AnimatePresence>

        <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
          <motion.button whileHover={{ scale: 1.1 }} className="small-btn" onClick={() => { navigator.clipboard?.writeText(document.title); alert("Copied page title (for demo)") }}>
            🔗 Share
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
