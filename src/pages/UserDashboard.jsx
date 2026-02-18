// import React, { useState, useEffect } from 'react';
// import Logo from '../components/Logo';
// import { Package, ShieldCheck, Clock, FileText, CheckCircle2, LogOut, Award, UserCheck, Key, Upload, FilePlus, X, ExternalLink, Send, User, XCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// export default function UserDashboard() {
//   const navigate = useNavigate();
//   const session = JSON.parse(localStorage.getItem('session'));
//   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";
//   const [liveData, setLiveData] = useState(null);
//   const [showQueryModal, setShowQueryModal] = useState(false);
//   const [queryText, setQueryText] = useState("");
//   const [myDocs, setMyDocs] = useState([]);

//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const response = await axios.get(`${API_BASE}/api/users/all`);
//         const userInDb = response.data.find(u => u.id === session?.id);
//         if (userInDb) setLiveData(userInDb);
//       } catch (error) { console.error("Sync Error"); }
//     };
//     fetchProgress(); const interval = setInterval(fetchProgress, 5000); return () => clearInterval(interval);
//   }, [session?.id]);

//   const getStepStatus = (index) => {
//     if (!liveData || liveData.claimStatus === -1) return 'canceled';
//     if (index < liveData.claimStatus) return 'completed'; 
//     if (index === liveData.claimStatus) return 'current';  
//     return 'upcoming';                               
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] p-6 md:p-16 font-sans text-left">
//       <div className="max-w-7xl mx-auto">
//         <header className="flex justify-between items-center mb-16">
//           <Logo />
//           <div className="flex items-center gap-8">
//              <div className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white">
//                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-slate-900 text-[#00ced1]'}`}><User size={24}/></div>
//                 <div className="text-right"><p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-0.5">Active Customer Node</p><p className="text-xl font-black text-slate-900 uppercase">{liveData?.name || session?.name}</p></div>
//              </div>
//              <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="p-4 bg-white rounded-2xl shadow-xl border border-white hover:text-red-500 transition-all cursor-pointer"><LogOut size={22}/></button>
//           </div>
//         </header>

//         <div className="grid lg:grid-cols-12 gap-10">
//           <div className="lg:col-span-8 space-y-8">
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-12 md:p-20 rounded-[4rem] shadow-3xl border border-white relative overflow-hidden ${liveData?.claimStatus === -1 ? 'bg-red-50/50' : 'bg-white'}`}>
//                <div className="flex justify-between items-start mb-20">
//                   <div>
//                     <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 uppercase">Hello, {liveData?.name}</h2>
//                     <div className="flex items-center gap-3">
//                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${liveData?.claimStatus === -1 ? 'bg-red-100 text-red-600' : 'bg-teal-50 text-[#00ced1]'}`}>{liveData?.claimStatus === -1 ? 'REJECTED NODE' : 'ACTIVE REGISTRY'}</span>
//                        <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">Status: {liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}</p>
//                     </div>
//                   </div>
//                   {liveData?.claimStatus === -1 && <XCircle size={48} className="text-red-500 opacity-20" />}
//                </div>
//                <div className="grid grid-cols-4 gap-4 relative">
//                   <div className="absolute top-10 left-10 right-10 h-1 bg-slate-50 -z-0"></div>
//                   {['Filed', 'Verification', 'Pending', 'Settled'].map((step, idx) => {
//                     const status = getStepStatus(idx);
//                     return (
//                       <div key={idx} className="relative z-10 flex flex-col items-center">
//                         <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-1000 ${status === 'completed' ? 'bg-green-600 text-white' : status === 'current' ? 'bg-slate-900 text-white ring-8 ring-slate-100' : status === 'canceled' ? 'bg-red-500 text-white' : 'bg-white text-slate-200 border-2 border-slate-50'}`}>{status === 'completed' ? <CheckCircle2 size={32}/> : <Clock size={22}/>}</div>
//                         <p className={`mt-6 text-[10px] font-black uppercase text-center tracking-widest leading-tight ${status === 'upcoming' ? 'text-slate-300' : 'text-slate-900'}`}>{step}</p>
//                       </div>
//                     );
//                   })}
//                </div>
//             </motion.div>
//           </div>

//           <div className="lg:col-span-4 space-y-8">
//             <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border text-center">
//                <div className={`w-24 h-24 mx-auto rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-[#00ced1]'}`}><Package size={44}/></div>
//                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Lifecycle Status</p>
//                <h3 className={`text-4xl font-black uppercase tracking-tighter ${liveData?.claimStatus === -1 ? 'text-red-500' : 'text-slate-900'}`}>{liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}</h3>
//             </div>
//             <div className={`p-12 rounded-[3.5rem] shadow-3xl text-white relative overflow-hidden transition-all duration-1000 ${liveData?.claimStatus === -1 ? 'bg-slate-900' : 'bg-[#00ced1]'}`}>
//                <h4 className="text-3xl font-black tracking-tighter relative z-10">Priority Support Desk</h4>
//                <button onClick={() => setShowQueryModal(true)} className="w-full bg-white text-slate-900 py-6 rounded-2xl font-black uppercase tracking-widest text-xs mt-10 hover:shadow-2xl transition-all relative z-10">Send Inquiry</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {showQueryModal && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
//             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-xl rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
//               <div className="flex justify-between items-center mb-10"><h3 className="text-4xl font-black text-slate-900 tracking-tighter">Direct <span className="text-[#00ced1]">Inquiry</span></h3><button onClick={() => setShowQueryModal(false)} className="p-3 bg-slate-50 hover:text-red-500 rounded-2xl transition-all text-slate-300"><X size={24}/></button></div>
//               <textarea placeholder="Describe your query..." className="w-full p-8 bg-slate-50 rounded-[2.5rem] outline-none font-bold text-slate-700 border-2 border-transparent focus:border-[#00ced1] resize-none min-h-[180px] transition-all" value={queryText} onChange={(e) => setQueryText(e.target.value)} />
//               <button onClick={async () => { if(!queryText) return alert("Enter message."); await axios.post(`${API_BASE}/api/messages/send`, { fullName: liveData.name, email: `NODE:${liveData.id}`, content: queryText, type: "Client Node Query" }); alert("Transmitted Successfully."); setShowQueryModal(false); setQueryText(""); }} className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-lg shadow-2xl flex items-center justify-center gap-4 hover:bg-black transition-all mt-6">Transmit Inquiry <Send size={20}/></button>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { Package, Clock, CheckCircle2, LogOut, X, Send, User, XCircle, Upload, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function UserDashboard() {
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem('session'));
  const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";
  
  const [liveData, setLiveData] = useState(null);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [queryText, setQueryText] = useState("");
  
  // New States for Upload
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/users/all`);
        const userInDb = response.data.find(u => u.id === session?.id);
        if (userInDb) setLiveData(userInDb);
      } catch (error) { console.error("Sync Error"); }
    };
    fetchProgress(); 
    const interval = setInterval(fetchProgress, 5000); 
    return () => clearInterval(interval);
  }, [session?.id]);

  const handleFileUpload = async () => {
    if (!uploadFile || !liveData) return alert("Please select a file.");
    
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("userId", liveData.id);

    setIsUploading(true);
    try {
        await axios.post(`${API_BASE}/api/documents/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Document Uploaded Successfully!");
        setUploadFile(null);
    } catch (error) {
        alert("Upload Failed.");
    } finally {
        setIsUploading(false);
    }
  };

  const getStepStatus = (index) => {
    if (!liveData || liveData.claimStatus === -1) return 'canceled';
    if (index < liveData.claimStatus) return 'completed'; 
    if (index === liveData.claimStatus) return 'current';  
    return 'upcoming';                               
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-16 font-sans text-left">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-16">
          <Logo />
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-slate-900 text-[#00ced1]'}`}><User size={24}/></div>
                <div className="text-right"><p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-0.5">Active Customer Node</p><p className="text-xl font-black text-slate-900 uppercase">{liveData?.name || session?.name}</p></div>
             </div>
             <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="p-4 bg-white rounded-2xl shadow-xl border border-white hover:text-red-500 transition-all cursor-pointer"><LogOut size={22}/></button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-12 md:p-20 rounded-[4rem] shadow-3xl border border-white relative overflow-hidden ${liveData?.claimStatus === -1 ? 'bg-red-50/50' : 'bg-white'}`}>
               <div className="flex justify-between items-start mb-20">
                  <div>
                    <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 uppercase">Hello, {liveData?.name}</h2>
                    <div className="flex items-center gap-3">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${liveData?.claimStatus === -1 ? 'bg-red-100 text-red-600' : 'bg-teal-50 text-[#00ced1]'}`}>{liveData?.claimStatus === -1 ? 'REJECTED NODE' : 'ACTIVE REGISTRY'}</span>
                       <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">Status: {liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}</p>
                    </div>
                  </div>
                  {liveData?.claimStatus === -1 && <XCircle size={48} className="text-red-500 opacity-20" />}
               </div>
               <div className="grid grid-cols-4 gap-4 relative">
                  <div className="absolute top-10 left-10 right-10 h-1 bg-slate-50 -z-0"></div>
                  {['Filed', 'Verification', 'Pending', 'Settled'].map((step, idx) => {
                    const status = getStepStatus(idx);
                    return (
                      <div key={idx} className="relative z-10 flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-1000 ${status === 'completed' ? 'bg-green-600 text-white' : status === 'current' ? 'bg-slate-900 text-white ring-8 ring-slate-100' : status === 'canceled' ? 'bg-red-500 text-white' : 'bg-white text-slate-200 border-2 border-slate-50'}`}>{status === 'completed' ? <CheckCircle2 size={32}/> : <Clock size={22}/>}</div>
                        <p className={`mt-6 text-[10px] font-black uppercase text-center tracking-widest leading-tight ${status === 'upcoming' ? 'text-slate-300' : 'text-slate-900'}`}>{step}</p>
                      </div>
                    );
                  })}
               </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border text-center">
               <div className={`w-24 h-24 mx-auto rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-[#00ced1]'}`}><Package size={44}/></div>
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Lifecycle Status</p>
               <h3 className={`text-4xl font-black uppercase tracking-tighter ${liveData?.claimStatus === -1 ? 'text-red-500' : 'text-slate-900'}`}>{liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}</h3>
            </div>

            {/* --- NEW UPLOAD SECTION --- */}
            <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-50 relative overflow-hidden">
                <h4 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2"><FileText size={20}/> Upload Documents</h4>
                <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#00ced1] transition-colors">
                    <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} className="w-full text-xs font-bold text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#00ced1]/10 file:text-[#00ced1] hover:file:bg-[#00ced1]/20"/>
                </div>
                {uploadFile && (
                    <button onClick={handleFileUpload} disabled={isUploading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest mt-4 shadow-lg flex items-center justify-center gap-2">
                        {isUploading ? "Uploading..." : <><Upload size={14}/> Upload Now</>}
                    </button>
                )}
            </div>

            <div className={`p-12 rounded-[3.5rem] shadow-3xl text-white relative overflow-hidden transition-all duration-1000 ${liveData?.claimStatus === -1 ? 'bg-slate-900' : 'bg-[#00ced1]'}`}>
               <h4 className="text-3xl font-black tracking-tighter relative z-10">Priority Support Desk</h4>
               <button onClick={() => setShowQueryModal(true)} className="w-full bg-white text-slate-900 py-6 rounded-2xl font-black uppercase tracking-widest text-xs mt-10 hover:shadow-2xl transition-all relative z-10">Send Inquiry</button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showQueryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-xl rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
              <div className="flex justify-between items-center mb-10"><h3 className="text-4xl font-black text-slate-900 tracking-tighter">Direct <span className="text-[#00ced1]">Inquiry</span></h3><button onClick={() => setShowQueryModal(false)} className="p-3 bg-slate-50 hover:text-red-500 rounded-2xl transition-all text-slate-300"><X size={24}/></button></div>
              <textarea placeholder="Describe your query..." className="w-full p-8 bg-slate-50 rounded-[2.5rem] outline-none font-bold text-slate-700 border-2 border-transparent focus:border-[#00ced1] resize-none min-h-[180px] transition-all" value={queryText} onChange={(e) => setQueryText(e.target.value)} />
              <button onClick={async () => { if(!queryText) return alert("Enter message."); await axios.post(`${API_BASE}/api/messages/send`, { fullName: liveData.name, email: `NODE:${liveData.id}`, content: queryText, type: "Client Node Query" }); alert("Transmitted Successfully."); setShowQueryModal(false); setQueryText(""); }} className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-lg shadow-2xl flex items-center justify-center gap-4 hover:bg-black transition-all mt-6">Transmit Inquiry <Send size={20}/></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}