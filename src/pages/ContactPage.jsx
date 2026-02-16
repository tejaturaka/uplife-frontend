import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquareShare, ArrowUpRight } from 'lucide-react';
import axios from 'axios';

export default function ContactPage() {
  // --- 1. FORM STATE ---
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    assistance: "Death Claim Assistance",
    message: ""
  });

  const info = [
    { i: <Phone/>, l: "Call Us 24/7", v: "+91 1800 200 300", c: "Toll Free Support" },
    { i: <Mail/>, l: "Email Support", v: "claims@uplifeindia.com", c: "Guaranteed 2hr response" },
    { i: <Clock/>, l: "Office Hours", v: "09:00 AM - 08:00 PM", c: "Monday to Saturday" }
  ];

  // --- 2. SAVE TO SQL DATABASE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.phone, // Saving phone in email field as per existing DB structure
        content: formData.message,
        type: `Inquiry: ${formData.assistance}`
      };

      await axios.post('http://localhost:8080/api/messages/send', payload);
      alert("Success! Your inquiry has been saved to the SQL Database.");
      setFormData({ fullName: "", phone: "", assistance: "Death Claim Assistance", message: "" });
    } catch (error) {
      alert("Error: Connection to backend failed.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
              We're Here <br/>to <span className="text-[#00ced1]">Help.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-16 max-w-lg">
              Whether it's an emergency claim or a simple query about a government subsidy, our team is standing by.
            </p>

            <div className="space-y-8">
              {info.map((item, idx) => (
                <div key={idx} className="flex gap-8 items-center group">
                  <div className="w-16 h-16 bg-slate-50 text-[#00ced1] rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-[#00ced1] group-hover:text-white transition-all duration-500">{item.i}</div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.l}</p>
                    <p className="text-2xl font-black text-slate-900 mb-0.5">{item.v}</p>
                    <p className="text-sm font-bold text-[#00ced1]">{item.c}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 p-10 bg-teal-50 rounded-[3rem] flex items-center justify-between group cursor-pointer">
               <div className="flex items-center gap-6">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#00ced1] shadow-sm"><MessageSquareShare/></div>
                 <div className="text-left">
                    <p className="font-black text-slate-900 text-lg">Chat with an Agent</p>
                    <p className="text-sm font-bold text-teal-600">Avg response: 5 mins</p>
                 </div>
               </div>
               <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
            </div>
          </motion.div>

          {/* --- SQL CONNECTED FORM --- */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 md:p-16 rounded-[4rem] shadow-3xl border border-slate-50 relative"
          >
            <div className="absolute top-0 right-12 w-24 h-2 bg-[#00ced1] rounded-b-full"></div>
            <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight text-left">Request a Callback</h2>
            
            <form className="space-y-6 text-left" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Full Name</label>
                   <input required value={formData.fullName} onChange={(e)=>setFormData({...formData, fullName: e.target.value})} placeholder="John Doe" className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#00ced1]/10 font-bold transition-all" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Phone Number</label>
                   <input required value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} placeholder="+91 98XXX XXXXX" className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#00ced1]/10 font-bold transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-2">How can we assist you?</label>
                 <select value={formData.assistance} onChange={(e)=>setFormData({...formData, assistance: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#00ced1]/10 font-bold transition-all">
                    <option>Death Claim Assistance</option>
                    <option>Tractor / Agriculture Subsidy</option>
                    <option>Business Loan Inquiry</option>
                    <option>Other Legal Query</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Additional Message</label>
                 <textarea required value={formData.message} onChange={(e)=>setFormData({...formData, message: e.target.value})} rows="4" placeholder="Brief details about your policy or query..." className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-4 ring-[#00ced1]/10 font-bold resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-7 rounded-3xl font-black text-xl shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 cursor-pointer">
                Send Inquiry <ArrowUpRight/>
              </button>
              <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">
                🛡️ Your data is protected by ISO 27001 Protocol
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}