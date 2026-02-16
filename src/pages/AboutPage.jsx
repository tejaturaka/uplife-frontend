import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Target, Award, HeartHandshake, Quote } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: <ShieldCheck size={32}/>, t: "Total Transparency", d: "We believe in clear communication. No hidden fees, no complex legal jargon." },
    { icon: <Target size={32}/>, t: "Result Oriented", d: "Our 99.8% success ratio speaks for our dedication to securing your rightful claims." },
    { icon: <HeartHandshake size={32}/>, t: "Empathetic Support", d: "We don't just process papers; we support families during their hardest times." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-teal-100">
      <Navbar />
      
      {/* --- HERO SECTION (Fixed Image Visibility) --- */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full text-teal-600 text-xs font-black uppercase tracking-widest mb-6">
              <Award size={14}/> Leading Claim Experts in India
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
              Empowering <span className="text-[#00ced1]">Families</span> with Dignity.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-10 max-w-xl">
              UpLife India was founded to navigate the complex maze of insurance claims so you don't have to.
            </p>
            <div className="flex gap-10">
              <div><p className="text-4xl font-black text-slate-900">12k+</p><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Happy Families</p></div>
              <div className="w-px h-12 bg-slate-100"></div>
              <div><p className="text-4xl font-black text-slate-900">₹45Cr</p><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recovered</p></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="absolute -inset-4 bg-[#00ced1]/20 blur-[100px] rounded-full"></div>
            {/* --- FIXED IMAGE URL --- */}
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974" 
              className="rounded-[4rem] shadow-4xl relative z-10 border-8 border-white object-cover h-[500px] md:h-[600px] w-full" 
              alt="UPLIFE Corporate Office" 
            />
          </motion.div>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="bg-white p-12 rounded-[3rem] shadow-xl border border-white">
                <div className="w-16 h-16 bg-teal-50 text-[#00ced1] rounded-2xl flex items-center justify-center mb-8">{v.icon}</div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{v.t}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REASON SECTION (Founder DP Replaced with Trust Content) --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-black text-slate-900 mb-12 tracking-tighter">Why We Do What We Do</h2>
          <p className="text-2xl text-slate-400 leading-relaxed font-medium italic">
            "We saw too many families losing their life savings because of a single missing document or a legal loophole. UPLIFE was created to be the shield that protects your legacy."
          </p>
          <div className="mt-12 flex flex-col items-center">
             {/* --- RELATABLE CONTENT IN PLACE OF DP --- */}
             <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center shadow-2xl mb-6 text-[#00ced1] rotate-3 hover:rotate-0 transition-transform duration-500">
                <ShieldCheck size={40} />
             </div>
             <p className="font-black text-slate-900 text-xl">UPLIFE Corporate Integrity</p>
             <p className="text-[10px] font-black text-[#00ced1] uppercase tracking-[0.4em] mt-1">Verified Claim Infrastructure</p>
          </div>
        </div>
      </section>
    </div>
  );
}