import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo'; 
import Navbar from '../components/Navbar';
import axios from 'axios'; // Import axios
import { 
  Shield, ArrowRight, CheckCircle, PhoneCall, 
  FileSearch, Landmark, Mail, MapPin, Award 
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  // --- 1. STATE FOR CONTACT FORM ---
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    content: ""
  });

  // --- 2. FUNCTION TO SAVE TO DATABASE ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: contactData.fullName,
        email: contactData.email,
        content: contactData.content,
        type: "General Inquiry" // Default type for Home Page
      };

      await axios.post('http://localhost:8080/api/messages/send', payload);
      
      alert("Success! Your message has been saved in our Database.");
      setContactData({ fullName: "", email: "", content: "" }); // Clear form
    } catch (error) {
      console.error(error);
      alert("Error: Could not connect to the Database. Make sure Spring Boot is running.");
    }
  };

  const steps = [
    { n: '01', t: 'Consultation', icon: <PhoneCall />, d: 'Free analysis via phone or web.', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400' },
    { n: '02', t: 'Verification', icon: <FileSearch />, d: 'Real-time policy validity checks.', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=400'},
    { n: '03', t: 'Legal Case', icon: <Shield />, d: 'Gathering all legal documentation.', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=400' },
    { n: '04', t: 'Submission', icon: <Landmark />, d: 'Formal filing with insurance nodes.', img: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=400' },
    { n: '05', t: 'Settlement', icon: <CheckCircle />, d: 'Final payout to family account.', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074" className="w-full h-full object-cover scale-105" alt="Support" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/20"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 py-32 text-white text-left">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-10 tracking-tighter">Supporting Families <br /> Through <span className="text-[#00ced1]">Policy Claims.</span></h1>
            <p className="text-lg md:text-2xl text-slate-200/90 mb-14 max-w-3xl leading-relaxed font-medium">Digital transparency and legal expertise for grieving families.</p>
            <button onClick={() => navigate('/login')} className="bg-[#00ced1] text-white px-12 py-6 rounded-3xl font-black text-xl flex items-center gap-4 shadow-3xl hover:bg-teal-400 transition-all cursor-pointer">Get Started <ArrowRight size={28} /></button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-slate-900 text-white text-center">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div><p className="text-6xl font-black text-[#00ced1]">12k+</p><p className="opacity-50 font-bold uppercase tracking-widest mt-2">Families Guided</p></div>
          <div><p className="text-6xl font-black text-[#00ced1]">₹45Cr+</p><p className="opacity-50 font-bold uppercase tracking-widest mt-2">Recovered</p></div>
          <div><p className="text-6xl font-black text-[#00ced1]">99.8%</p><p className="opacity-50 font-bold uppercase tracking-widest mt-2">Success Ratio</p></div>
          <div><p className="text-6xl font-black text-[#00ced1]">ISO</p><p className="opacity-50 font-bold uppercase tracking-widest mt-2">Certified Node</p></div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 px-6 bg-blue-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-slate-900 mb-24 tracking-tighter text-center">How It <span className="text-[#00ced1]">Works</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-[3rem] shadow-xl flex flex-col items-center text-center overflow-hidden pb-10">
                <img src={step.img} className="w-full h-32 object-cover mb-8" alt={step.t} />
                <div className="px-6 flex flex-col items-center">
                    <div className="text-3xl font-black text-teal-100 mb-4 tracking-widest">{step.n}</div>
                    <h4 className="text-xl font-black mb-4 text-slate-900 leading-tight">{step.t}</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION (NOW CONNECTED TO SQL) --- */}
      <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-slate-900 rounded-[6rem] mx-4 mb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="text-white text-left">
            <h2 className="text-6xl font-black mb-10 tracking-tighter">Send Us a <span className="text-[#00ced1]">Message</span></h2>
            <div className="space-y-12">
              <div className="flex items-center gap-8"><div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-[#00ced1]"><Mail size={28}/></div><div><p className="text-slate-500 text-xs font-black uppercase tracking-widest">Email Support</p><p className="text-2xl font-bold">help@uplifeindia.com</p></div></div>
              <div className="flex items-center gap-8"><div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-[#00ced1]"><MapPin size={28}/></div><div><p className="text-slate-500 text-xs font-black uppercase tracking-widest">Office Hub</p><p className="text-2xl font-bold">Hyderabad, India</p></div></div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[4rem] shadow-3xl">
            {/* Form Action */}
            <form onSubmit={handleSendMessage} className="space-y-6">
              <input 
                placeholder="Full Name" 
                required
                value={contactData.fullName}
                onChange={(e) => setContactData({...contactData, fullName: e.target.value})}
                className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#00ced1]/10 font-bold" 
              />
              <input 
                placeholder="Email Address" 
                type="email"
                required
                value={contactData.email}
                onChange={(e) => setContactData({...contactData, email: e.target.value})}
                className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#00ced1]/10 font-bold" 
              />
              <textarea 
                rows="4" 
                placeholder="How can we help?" 
                required
                value={contactData.content}
                onChange={(e) => setContactData({...contactData, content: e.target.value})}
                className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#00ced1]/10 font-bold resize-none"
              ></textarea>
              <button type="submit" className="w-full bg-[#00ced1] text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-teal-600 transition-all cursor-pointer">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 text-center border-t border-slate-50">
        <div className="flex justify-center mb-10"><Logo /></div>
        <p className="text-slate-300 font-bold text-xs uppercase tracking-[0.4em]">© 2024 UPLIFE India Pvt Ltd • SQL Connected</p>
      </footer>
    </div>
  );
}