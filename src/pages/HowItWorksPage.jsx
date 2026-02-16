import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, FileSearch, ShieldCheck, Landmark, CheckCircle, Zap, X } from 'lucide-react';
import axios from 'axios';

export default function HowItWorksPage() {
  const [showModal, setShowModal] = useState(false);
  const [appData, setAppData] = useState({ name: "", email: "", details: "" });

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/messages/send', {
        fullName: appData.name,
        email: appData.email,
        content: appData.details,
        type: "Direct Application"
      });
      alert("Application Submitted to SQL Database!");
      setShowModal(false);
      setAppData({ name: "", email: "", details: "" });
    } catch (error) { alert("Submission failed."); }
  };

  const steps = [
    { n: '01', t: 'Initial Consultation', icon: <PhoneCall />, d: 'Free case analysis. Tell us about your policy, and our experts evaluate the claim viability instantly.', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000' },
    { n: '02', t: 'Document Verification', icon: <FileSearch />, d: 'We collect and verify all legal, medical, and insurance records to build a solid foundation for your claim.', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000' },
    { n: '03', t: 'Legal Structuring', icon: <ShieldCheck />, d: 'Our legal team structures the case to comply with the latest insurance norms and regulations.', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000' },
    { n: '04', t: 'Institutional Filing', icon: <Landmark />, d: 'We file the claim through official channels, handling all queries and follow-ups with the insurance node.', img: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1000' },
    { n: '05', t: 'Settlement Release', icon: <CheckCircle />, d: 'Once approved, we ensure the funds are disbursed directly into the beneficiary\'s verified account.', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000' }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar />
      
      <header className="py-24 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-7xl font-black text-slate-900 mb-6 tracking-tighter">The <span className="text-[#00ced1]">Seamless</span> Way.</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">From complexity to clarity. Discover how we turn months of paperwork into a simple 5-step digital journey.</p>
        </motion.div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="space-y-12">
          {steps.map((s, i) => (
            <motion.div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center bg-white p-8 rounded-[4rem] border border-slate-50 shadow-2xl shadow-slate-200/40`}>
              <div className="lg:w-1/2 relative overflow-hidden rounded-[3rem]">
                <img src={s.img} className="rounded-[3rem] h-[400px] w-full object-cover relative z-10" alt={s.t} />
                <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl font-black text-[#00ced1] text-2xl shadow-xl">{s.n}</div>
              </div>
              <div className="lg:w-1/2 p-8 text-left">
                <div className="w-14 h-14 bg-teal-50 text-[#00ced1] rounded-2xl flex items-center justify-center mb-6">{s.icon}</div>
                <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">{s.t}</h3>
                <p className="text-xl text-slate-500 leading-relaxed font-medium">{s.d}</p>
                <div className="mt-10 flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-xs"><Zap size={14}/> Real-time Status Tracking Active</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 bg-slate-900 text-white rounded-[6rem] mx-6 mb-16 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ced1]/20 blur-[120px] rounded-full"></div>
         <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter">Ready to secure your claim?</h2>
            <p className="text-xl text-slate-400 mb-12 font-medium">Join thousands of families who trusted UPLIFE for a stress-free experience.</p>
            {/* WORKABLE BUTTON */}
            <button onClick={() => setShowModal(true)} className="bg-[#00ced1] text-white px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-3xl shadow-[#00ced1]/30 cursor-pointer">Start Application Now</button>
         </div>
      </section>

      {/* --- APPLICATION MODAL --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-xl rounded-[4rem] p-12 shadow-3xl border border-white text-left relative">
              <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-red-500"><X size={28}/></button>
              <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">New <span className="text-[#00ced1]">Application</span></h2>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">Institutional Claim Node</p>
              <form onSubmit={handleApply} className="space-y-6">
                <input required placeholder="Full Name" className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#00ced1] transition-all" value={appData.name} onChange={(e)=>setAppData({...appData, name: e.target.value})} />
                <input required type="email" placeholder="Email / Phone" className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#00ced1] transition-all" value={appData.email} onChange={(e)=>setAppData({...appData, email: e.target.value})} />
                <textarea required rows="4" placeholder="Briefly describe your case..." className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#00ced1] transition-all resize-none" value={appData.details} onChange={(e)=>setAppData({...appData, details: e.target.value})} />
                <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-black transition-all">Submit</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}