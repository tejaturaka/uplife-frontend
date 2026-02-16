// import React, { useState, useEffect } from 'react';
// import Logo from '../components/Logo';
// import { 
//   Package, ShieldCheck, Clock, FileText, CheckCircle2, 
//   LogOut, Award, UserCheck, Key, Upload, FilePlus, X, ExternalLink, MessageSquare, Send, AlertTriangle, User
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// export default function UserDashboard() {
//   const navigate = useNavigate();
//   const session = JSON.parse(localStorage.getItem('session'));
  
//   const [liveData, setLiveData] = useState(null);
//   const [showQueryModal, setShowQueryModal] = useState(false);
//   const [queryText, setQueryText] = useState("");
  
//   // DOCUMENT STATES
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [myDocs, setMyDocs] = useState([]);

//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/users/all`);
//         const userInDb = response.data.find(u => u.id === session?.id);
//         if (userInDb) setLiveData(userInDb);
//       } catch (error) { console.error("Sync Error"); }
//     };

//     fetchProgress();
//     fetchMyDocs();
//     const interval = setInterval(fetchProgress, 5000); 
//     return () => clearInterval(interval);
//   }, [session?.id]);

//   const fetchMyDocs = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/documents/user/${session.id}`);
//       setMyDocs(res.data);
//     } catch (e) { console.error("Document fetch failed"); }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return alert("Please select a file.");
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     formData.append("userId", session.id);

//     try {
//       await axios.post("http://localhost:8080/api/documents/upload", formData);
//       alert("Document encrypted and saved to Node Ledger.");
//       setSelectedFile(null);
//       fetchMyDocs();
//     } catch (e) { alert("Upload failed."); } finally { setUploading(false); }
//   };

//   const steps = [
//     { label: 'Application Filed', icon: <FileText size={22}/> },
//     { label: 'Agent Verification', icon: <ShieldCheck size={22}/> },
//     { label: 'Final Settlement', icon: <Clock size={22}/> },
//     { label: 'Policy Settled', icon: <Award size={22}/> }
//   ];

//   const getStepStatus = (index) => {
//     if (!liveData || liveData.claimStatus === -1) return 'canceled';
//     if (index < liveData.claimStatus) return 'completed'; 
//     if (index === liveData.claimStatus) return 'current';  
//     return 'upcoming';                               
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] p-6 md:p-16 font-sans text-left selection:bg-[#00ced1]/20">
//       <div className="max-w-7xl mx-auto">
        
//         {/* --- TOP HEADER WITH CLIENT NAME --- */}
//         <header className="flex justify-between items-center mb-16">
//           <Logo />
//           <div className="flex items-center gap-8">
//              {/* REQUIREMENT: CLIENT NAME IN TOP RIGHT */}
//              <div className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white">
//                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-slate-900 text-[#00ced1]'}`}>
//                    <User size={24}/>
//                 </div>
//                 <div className="text-right">
//                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-0.5">Active Client Node</p>
//                    <p className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">{liveData?.name || session?.name}</p>
//                 </div>
//              </div>

//              <div className="w-px h-12 bg-slate-200 hidden md:block"></div>

//              <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="p-4 bg-white rounded-2xl shadow-xl border border-white hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer">
//                <LogOut size={22}/>
//              </button>
//           </div>
//         </header>

//         <div className="grid lg:grid-cols-12 gap-10">
//           <div className="lg:col-span-8 space-y-8">
            
//             {/* 1. MAIN PROGRESS TRACKER CARD */}
//             <motion.div 
//                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                className={`p-12 md:p-20 rounded-[4rem] shadow-3xl border border-white relative overflow-hidden transition-all duration-700 ${liveData?.claimStatus === -1 ? 'bg-red-50/50' : 'bg-white'}`}
//             >
//                {liveData?.claimStatus === -1 && (
//                   <div className="absolute top-0 left-0 w-full h-2 bg-red-500 animate-pulse"></div>
//                )}
               
//                <div className="flex justify-between items-start mb-20">
//                   <div>
//                     <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase">Hello, {liveData?.name}</h2>
//                     <div className="flex items-center gap-3">
//                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${liveData?.claimStatus === -1 ? 'bg-red-100 text-red-600' : 'bg-teal-50 text-[#00ced1]'}`}>
//                           {liveData?.claimStatus === -1 ? 'Terminated Node' : 'Active Registry'}
//                        </span>
//                        <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">Status: {liveData?.statusMessage}</p>
//                     </div>
//                   </div>
//                   {liveData?.claimStatus === -1 && <AlertTriangle size={48} className="text-red-500 opacity-20" />}
//                </div>

//                {/* STEPPER UI */}
//                <div className="grid grid-cols-4 gap-4 relative">
//                   <div className="absolute top-10 left-10 right-10 h-1 bg-slate-50 -z-0"></div>
//                   {steps.map((step, idx) => {
//                     const status = getStepStatus(idx);
//                     return (
//                       <div key={idx} className="relative z-10 flex flex-col items-center">
//                         <motion.div 
//                           whileHover={{ scale: 1.1 }}
//                           className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-1000 ${
//                             status === 'completed' ? 'bg-green-600 text-white' 
//                             : status === 'current' ? 'bg-slate-900 text-white ring-8 ring-slate-100' 
//                             : status === 'canceled' ? 'bg-red-500 text-white' 
//                             : 'bg-white text-slate-200 border-2 border-slate-50'
//                           }`}
//                         >
//                           {status === 'completed' ? <CheckCircle2 size={32}/> : step.icon}
//                         </motion.div>
//                         <p className={`mt-6 text-[10px] font-black uppercase text-center tracking-widest leading-tight ${status === 'upcoming' ? 'text-slate-300' : 'text-slate-900'}`}>
//                           {step.label}
//                         </p>
//                       </div>
//                     );
//                   })}
//                </div>
//             </motion.div>

//             {/* 2. CREDENTIAL VAULT AREA */}
//             <div className="grid md:grid-cols-2 gap-8">
//                <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-white flex gap-6 items-center group hover:bg-slate-900 transition-all duration-500">
//                   <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:bg-white/10 group-hover:text-[#00ced1] transition-all"><UserCheck size={32}/></div>
//                   <div>
//                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-500">Identity Node ID</p>
//                     <p className="text-2xl font-black font-mono text-slate-900 group-hover:text-white tracking-widest">{liveData?.id}</p>
//                   </div>
//                </div>
//                <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-white flex gap-6 items-center group hover:bg-slate-900 transition-all duration-500">
//                   <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:bg-white/10 group-hover:text-[#00ced1] transition-all"><Key size={32}/></div>
//                   <div>
//                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-500">Node Password</p>
//                     <p className="text-2xl font-black font-mono text-[#00ced1] group-hover:text-[#00ced1] tracking-widest">{liveData?.password}</p>
//                   </div>
//                </div>
//             </div>

//             {/* 3. DOCUMENT MANAGEMENT AREA */}
//             <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-white">
//                <div className="flex items-center gap-4 mb-12">
//                   <div className="w-14 h-14 bg-[#00ced1]/10 text-[#00ced1] rounded-2xl flex items-center justify-center shadow-inner"><FilePlus size={28}/></div>
//                   <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Document Ledger</h3>
//                </div>

//                <div className="flex flex-col md:flex-row gap-6 items-center mb-12">
//                   <input type="file" id="file-upload" className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />
//                   <label htmlFor="file-upload" className="flex-1 w-full p-8 border-4 border-dashed border-slate-50 rounded-[2.5rem] flex items-center justify-center gap-4 cursor-pointer hover:border-[#00ced1] hover:bg-teal-50/30 transition-all group">
//                     <Upload size={24} className="text-slate-300 group-hover:text-[#00ced1]"/>
//                     <span className="font-black text-slate-400 group-hover:text-slate-600 uppercase text-xs tracking-widest">{selectedFile ? selectedFile.name : "Select Policy Node Documents"}</span>
//                   </label>
//                   <button onClick={handleUpload} disabled={uploading || !selectedFile} className="bg-slate-900 text-white px-12 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl active:scale-95 transition-all disabled:opacity-20">
//                     {uploading ? "Encrypting..." : "Sync to Node"}
//                   </button>
//                </div>

//                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {myDocs.map((doc, i) => (
//                     <a key={i} href={`http://localhost:8080/api/documents/download/${doc.id}`} target="_blank" rel="noreferrer" className="p-6 bg-[#fcfdfe] border border-slate-50 rounded-3xl flex items-center justify-between group hover:border-[#00ced1] hover:shadow-lg transition-all">
//                       <div className="flex items-center gap-4 overflow-hidden">
//                         <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-[#00ced1] transition-colors"><FileText size={20}/></div>
//                         <span className="text-sm font-black text-slate-700 truncate tracking-tight">{doc.fileName}</span>
//                       </div>
//                       <ExternalLink size={18} className="text-slate-200 group-hover:text-[#00ced1] transition-colors"/>
//                     </a>
//                   ))}
//                </div>
//             </div>
//           </div>

//           {/* --- SIDEBAR MODULES --- */}
//           <div className="lg:col-span-4 space-y-8">
//             <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-white text-center">
//                <div className={`w-24 h-24 mx-auto rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-[#00ced1]'}`}>
//                   <Package size={44}/>
//                </div>
//                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Live Node Status</p>
//                <h3 className={`text-4xl font-black uppercase tracking-tighter ${liveData?.claimStatus === -1 ? 'text-red-500' : 'text-slate-900'}`}>
//                   {liveData?.statusMessage || "IN_PROGRESS"}
//                </h3>
//                <div className="mt-8 pt-8 border-t border-slate-50">
//                   <p className="text-xs font-bold text-slate-400 italic leading-relaxed">"Your policy lifecycle is being monitored in real-time by the central node."</p>
//                </div>
//             </div>

//             <div className={`p-12 rounded-[3.5rem] shadow-3xl text-white relative overflow-hidden group transition-all duration-1000 ${liveData?.claimStatus === -1 ? 'bg-slate-900' : 'bg-[#00ced1]'}`}>
//                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
//                <h4 className="text-3xl font-black tracking-tighter leading-tight relative z-10">Priority Support Desk</h4>
//                <p className="text-white/70 text-xs mt-4 font-black uppercase tracking-widest relative z-10">Sync Stage: {liveData?.claimStatus === -1 ? 'Terminated' : `Level ${liveData?.claimStatus || 0}`}</p>
               
//                <button 
//                   onClick={() => setShowQueryModal(true)} 
//                   className="w-full bg-white text-slate-900 py-6 rounded-2xl font-black uppercase tracking-widest text-xs mt-10 cursor-pointer hover:bg-slate-50 hover:shadow-2xl active:scale-95 transition-all relative z-10"
//                >
//                   Send Inquiry
//                </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- INQUIRY MODAL POPUP --- */}
//       <AnimatePresence>
//         {showQueryModal && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-white w-full max-w-xl rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden"
//             >
//               <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ced1]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
//               <div className="flex justify-between items-center mb-10">
//                 <div>
//                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Direct <span className="text-[#00ced1]">Inquiry</span></h3>
//                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Institutional Priority Channel</p>
//                 </div>
//                 <button onClick={() => setShowQueryModal(false)} className="p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-300"><X size={24}/></button>
//               </div>

//               <div className="space-y-6">
//                  <div className="space-y-1">
//                     <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Inquiry Content</label>
//                     <textarea 
//                        placeholder="Describe your query or request for assistance..." 
//                        className="w-full p-8 bg-slate-50 rounded-[2.5rem] outline-none font-bold text-slate-700 border-2 border-transparent focus:border-[#00ced1] focus:bg-white resize-none min-h-[180px] transition-all" 
//                        value={queryText} onChange={(e) => setQueryText(e.target.value)} 
//                     />
//                  </div>
                 
//                  <button 
//                    onClick={async () => {
//                       if(!queryText) return alert("Please enter a message.");
//                       await axios.post('http://localhost:8080/api/messages/send', { 
//                          fullName: liveData.name, email: `NODE:${liveData.id}`, content: queryText, type: "Client Node Query" 
//                       });
//                       alert("Inquiry successfully transmitted to System Master."); 
//                       setShowQueryModal(false); setQueryText("");
//                    }} 
//                    className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-lg shadow-2xl flex items-center justify-center gap-4 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all"
//                  >
//                     Transmit Inquiry <Send size={20}/>
//                  </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { Package, ShieldCheck, Clock, FileText, CheckCircle2, LogOut, Award, UserCheck, Key, Upload, FilePlus, X, ExternalLink, Send, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function UserDashboard() {
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem('session'));
  const [liveData, setLiveData] = useState(null);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [queryText, setQueryText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [myDocs, setMyDocs] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/all`);
        const userInDb = response.data.find(u => u.id === session?.id);
        if (userInDb) setLiveData(userInDb);
      } catch (error) { console.error("Sync Error"); }
    };
    fetchProgress(); fetchMyDocs();
    const interval = setInterval(fetchProgress, 5000); 
    return () => clearInterval(interval);
  }, [session?.id]);

  const fetchMyDocs = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/documents/user/${session.id}`);
      setMyDocs(res.data);
    } catch (e) { console.error("Docs Sync Error"); }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Select a file.");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", session.id);
    try {
      await axios.post("http://localhost:8080/api/documents/upload", formData);
      alert("Document Secured.");
      setSelectedFile(null); fetchMyDocs();
    } catch (e) { alert("Upload failed."); } finally { setUploading(false); }
  };

  const steps = [
    { label: 'Application Filed', icon: <FileText size={22}/> },
    { label: 'Agent Verification', icon: <ShieldCheck size={22}/> },
    { label: 'Settlement Pending', icon: <Clock size={22}/> },
    { label: 'Policy Settled', icon: <Award size={22}/> }
  ];

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
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-slate-900 text-[#00ced1]'}`}>
                   <User size={24}/>
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-0.5">Active Customer Node</p>
                   <p className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">{liveData?.name || session?.name}</p>
                </div>
             </div>
             <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="p-4 bg-white rounded-2xl shadow-xl border border-white hover:text-red-500 transition-all cursor-pointer"><LogOut size={22}/></button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-12 md:p-20 rounded-[4rem] shadow-3xl border border-white relative overflow-hidden transition-all duration-700 ${liveData?.claimStatus === -1 ? 'bg-red-50/50' : 'bg-white'}`}>
               <div className="flex justify-between items-start mb-20">
                  <div>
                    <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase">Hello, {liveData?.name}</h2>
                    <div className="flex items-center gap-3">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${liveData?.claimStatus === -1 ? 'bg-red-100 text-red-600' : 'bg-teal-50 text-[#00ced1]'}`}>
                          {liveData?.claimStatus === -1 ? 'REJECTED NODE' : 'ACTIVE REGISTRY'}
                       </span>
                       <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">Status: {liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}</p>
                    </div>
                  </div>
               </div>
               <div className="grid grid-cols-4 gap-4 relative">
                  <div className="absolute top-10 left-10 right-10 h-1 bg-slate-50 -z-0"></div>
                  {steps.map((step, idx) => {
                    const status = getStepStatus(idx);
                    return (
                      <div key={idx} className="relative z-10 flex flex-col items-center">
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-1000 ${status === 'completed' ? 'bg-green-600 text-white' : status === 'current' ? 'bg-slate-900 text-white ring-8 ring-slate-100' : status === 'canceled' ? 'bg-red-500 text-white' : 'bg-white text-slate-200 border-2 border-slate-50'}`}>
                          {status === 'completed' ? <CheckCircle2 size={32}/> : step.icon}
                        </div>
                        <p className={`mt-6 text-[10px] font-black uppercase text-center tracking-widest leading-tight ${status === 'upcoming' ? 'text-slate-300' : 'text-slate-900'}`}>{step.label}</p>
                      </div>
                    );
                  })}
               </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border flex gap-6 items-center group hover:bg-slate-900 transition-all duration-500">
                  <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:text-[#00ced1] transition-all"><UserCheck size={32}/></div>
                  <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer ID</p><p className="text-2xl font-black font-mono text-slate-900 group-hover:text-white">{liveData?.id}</p></div>
               </div>
               <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border flex gap-6 items-center group hover:bg-slate-900 transition-all duration-500">
                  <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:text-[#00ced1] transition-all"><Key size={32}/></div>
                  <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Node Password</p><p className="text-2xl font-black font-mono text-[#00ced1]">{liveData?.password}</p></div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border text-center">
               <div className={`w-24 h-24 mx-auto rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-[#00ced1]'}`}>
                  <Package size={44}/>
               </div>
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Lifecycle Status</p>
               <h3 className={`text-4xl font-black uppercase tracking-tighter ${liveData?.claimStatus === -1 ? 'text-red-500' : 'text-slate-900'}`}>
                  {liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}
               </h3>
            </div>
            <div className={`p-12 rounded-[3.5rem] shadow-3xl text-white relative overflow-hidden group transition-all duration-1000 ${liveData?.claimStatus === -1 ? 'bg-slate-900' : 'bg-[#00ced1]'}`}>
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
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Direct <span className="text-[#00ced1]">Inquiry</span></h3>
                <button onClick={() => setShowQueryModal(false)} className="p-3 bg-slate-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-300"><X size={24}/></button>
              </div>
              <textarea placeholder="Describe your query..." className="w-full p-8 bg-slate-50 rounded-[2.5rem] outline-none font-bold text-slate-700 border-2 border-transparent focus:border-[#00ced1] resize-none min-h-[180px] transition-all" value={queryText} onChange={(e) => setQueryText(e.target.value)} />
              <button onClick={async () => {
                  if(!queryText) return alert("Enter message.");
                  await axios.post('http://localhost:8080/api/messages/send', { fullName: liveData.name, email: `NODE:${liveData.id}`, content: queryText, type: "Client Node Query" });
                  alert("Transmitted Successfully."); setShowQueryModal(false); setQueryText("");
              }} className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-lg shadow-2xl flex items-center justify-center gap-4 hover:bg-black transition-all mt-6">Transmit Inquiry <Send size={20}/></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}