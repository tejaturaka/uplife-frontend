import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; // Import axios for database connection
import { 
  Shield, CheckCircle, Tractor, Check, X 
} from 'lucide-react';

export default function ServicesPage() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");

  // --- 1. STATE FOR FORM DATA ---
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    content: ""
  });

  const handleOpenForm = (type) => {
    setFormType(type);
    setShowForm(true);
  };

  // --- 2. FUNCTION TO SAVE TO SQL DATABASE ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        content: formData.content,
        type: `Service Inquiry: ${formType}` // Label for your database
      };

      // Call Spring Boot API
      await axios.post('http://localhost:8080/api/messages/send', payload);
      
      alert(`Success! Your request for ${formType} has been saved in the Database.`);
      
      // Reset form and close
      setFormData({ fullName: "", email: "", content: "" });
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Error: Database connection failed. Please check if Spring Boot is running.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Header Section */}
      <header className="py-24 bg-slate-900 text-white text-center rounded-b-[4rem] md:rounded-b-[6rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]"></div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black tracking-tighter"
        >
          Our <span className="text-teal-400">Services</span>
        </motion.h1>
      </header>

      {/* Claims Management Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-left">
          <div className="inline-block px-4 py-1.5 bg-teal-50 rounded-full text-teal-600 text-[10px] font-black uppercase tracking-widest">Policy Management</div>
          <h2 className="text-5xl font-black text-slate-900 leading-tight">Death Claim <br/>Management</h2>
          <p className="text-xl text-slate-500 leading-relaxed font-medium">We handle the entire process from document collection to final settlement deposit. Our team works with all major insurance providers in India to ensure your family's peace of mind.</p>
          <ul className="space-y-4">
            {['Document Verification', 'Legal Representation', 'Fast Settlement Tracking'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-700 font-bold">
                <CheckCircle className="text-teal-500" size={20} /> {item}
              </li>
            ))}
          </ul>
          
          <button 
            onClick={() => handleOpenForm("Death Claim Management")}
            className="bg-[#00ced1] text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#00ced1]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3"
          >
            Apply for Claim Support
          </button>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative h-full">
          <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070" className="rounded-[4rem] shadow-4xl w-full h-[500px] object-cover border-8 border-white relative z-10" alt="Claims Management" />
        </motion.div>
      </div>

      {/* Farmer & Tractor Subsidy Assistance Card */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-white text-left">
            <div className="w-16 h-16 bg-[#00ced1]/10 text-[#00ced1] rounded-2xl flex items-center justify-center mb-8">
              <Tractor size={36} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight leading-tight">Farmer & Tractor Subsidy Assistance</h3>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">Government subsidies for villagers to start farming, buy tractors, dairy units, and agricultural equipment.</p>
            <ul className="space-y-5 mb-12">
              {["Tractor & machinery subsidy", "New farm & irrigation subsidy", "Dairy, poultry & animal farming", "PMEGP & rural business support"].map((point, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                  <div className="w-6 h-6 rounded-full bg-[#00ced1]/10 flex items-center justify-center text-[#00ced1]"><Check size={14} strokeWidth={4} /></div>
                  {point}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate('/subsidy-schemes')}
              className="w-full bg-[#00ced1] text-white py-6 rounded-3xl font-black text-lg shadow-xl shadow-[#00ced1]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              View Subsidy Schemes
            </button>
          </motion.div>

          <div className="space-y-8 text-left">
            <h2 className="text-5xl font-black text-slate-900 leading-tight">Empowering Rural <br/><span className="text-[#00ced1]">Agriculture</span></h2>
            <p className="text-xl text-slate-500 leading-relaxed font-medium">We help farmers navigate complex government application portals to secure funding for modern equipment and sustainable farming practices nationwide.</p>
          </div>
        </div>
      </section>

      {/* --- FORM MODAL CONNECTED TO SQL --- */}
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
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Send Us a <span className="text-[#00ced1]">Message</span></h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-8">Inquiry for: {formType}</p>
                
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <input 
                    placeholder="Full Name" 
                    required 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#00ced1]/10 font-bold" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#00ced1]/10 font-bold" 
                  />
                  <textarea 
                    rows="4" 
                    placeholder="How can we help you today?" 
                    required 
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#00ced1]/10 font-bold resize-none"
                  ></textarea>
                  <button type="submit" className="w-full bg-[#00ced1] text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-teal-600 transition-all cursor-pointer">
                    Submit to Database
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}