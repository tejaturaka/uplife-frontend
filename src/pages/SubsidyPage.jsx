import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Banknote, Landmark, CheckCircle2, X } from 'lucide-react';
import axios from 'axios'; // Import axios for SQL connection

export default function SubsidyPage() {
  // Modal States
  const [showForm, setShowForm] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState("");
  
  // Form States
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    content: ""
  });

  const handleApplyClick = (schemeTitle) => {
    setSelectedScheme(schemeTitle);
    setShowForm(true);
  };

  // --- SAVE TO SQL DATABASE ---
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        content: formData.content,
        type: `Subsidy Application: ${selectedScheme}` // Labels which scheme they applied for
      };

      // Connect to your Spring Boot Backend
      await axios.post('http://localhost:8080/api/messages/send', payload);
      
      alert(`Success! Your application for ${selectedScheme} has been saved in the SQL Database.`);
      
      // Reset form and close
      setFormData({ fullName: "", email: "", content: "" });
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Error: Connection to SQL Database failed. Make sure Spring Boot is running.");
    }
  };

  const schemes = [
    {
      title: "Rural Business & Self Employment",
      icon: <Banknote className="text-green-600" size={32} />,
      desc: "Government financial support for villagers starting small businesses or self-employment.",
      points: ["Mudra loan assistance", "PMEGP subsidy", "SHG & women entrepreneur schemes", "Skill development programs"]
    },
    {
      title: "State & Central Government Schemes",
      icon: <Landmark className="text-green-600" size={32} />,
      desc: "Complete assistance for applying to various state and central government subsidy schemes.",
      points: ["Scheme eligibility check", "Application filing support", "Document preparation", "Status tracking"]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased overflow-x-hidden">
      <Navbar />

      <header className="py-20 px-6 bg-gradient-to-b from-green-50/50 to-white text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
        >
          Government Subsidy Schemes
        </motion.h1>
        <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
          Financial assistance and subsidies for villagers, farmers, and rural entrepreneurs to start or expand agricultural activities.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          {schemes.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
                  {item.icon}
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight">
                  {item.title}
                </h2>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                  {item.desc}
                </p>
                <ul className="space-y-4 mb-12">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                      <CheckCircle2 className="text-green-500 shrink-0" size={22} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => handleApplyClick(item.title)}
                className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white py-5 rounded-2xl font-black text-lg transition-all shadow-lg shadow-green-600/20 active:scale-95 cursor-pointer"
              >
                Apply for Subsidy Assistance
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      {/* --- APPLICATION MODAL FORM --- */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white p-12 rounded-[4rem] shadow-3xl border border-white"
            >
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-8 right-8 p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-400"
              >
                <X size={24} />
              </button>

              <div className="text-left">
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Apply for <span className="text-green-600">Subsidy</span></h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-8">Scheme: {selectedScheme}</p>
                
                <form className="space-y-6" onSubmit={handleSubmitApplication}>
                  <input 
                    placeholder="Full Name" 
                    required 
                    className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-green-600/10 font-bold" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-green-600/10 font-bold" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <textarea 
                    rows="4" 
                    placeholder="Briefly describe your requirements..." 
                    required 
                    className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-green-600/10 font-bold resize-none"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                  ></textarea>
                  <button type="submit" className="w-full bg-[#16a34a] text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-green-700 transition-all cursor-pointer">
                    Submit to Database
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center opacity-30 text-xs font-bold uppercase tracking-widest text-slate-400">
        UpLife India Pvt Ltd • SQL Integration Active
      </footer>
    </div>
  );
}