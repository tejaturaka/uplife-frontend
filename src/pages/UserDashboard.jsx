

// // // // import React, { useState, useEffect } from 'react';
// // // // import { fetchLocations, getMandals } from '../services/locationService';
// // // // import Logo from '../components/Logo';
// // // // import { 
// // // //   UserPlus, LogOut, MapPin, Trash2, Edit3, X, Check, 
// // // //   Eye, EyeOff, ShieldCheck, ArrowUpCircle, XCircle, Users, Briefcase, FilterX, 
// // // //   Clock, FileText, Activity, MessageSquare, ChevronRight, Award
// // // // } from 'lucide-react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import axios from 'axios';

// // // // export default function AdminDashboard() {
// // // //   const navigate = useNavigate();
// // // //   const API_BASE = import.meta.env.VITE_API_BASE_URL; // Uses your Cloud URL
  
// // // //   const [locations, setLocations] = useState([]);
// // // //   const [mandals, setMandals] = useState([]); 
// // // //   const [db, setDb] = useState({ agents: [], users: [] }); 
// // // //   const [filterType, setFilterType] = useState("all"); 
// // // //   const [editingId, setEditingId] = useState(null); 
// // // //   const [showModal, setShowModal] = useState(false);
// // // //   const [showAdminMenu, setShowAdminMenu] = useState(false);

// // // //   const [form, setForm] = useState({ 
// // // //     type: 'agent', name: '', email: '', state: '', dist: '', mandal: '', password: '' 
// // // //   });

// // // //   useEffect(() => {
// // // //     fetchLocations().then(setLocations);
// // // //     fetchData();
// // // //   }, []);

// // // //   const fetchData = async () => {
// // // //     try {
// // // //       const response = await axios.get(`${API_BASE}/api/users/all`);
// // // //       setDb({
// // // //         agents: response.data.filter(u => u.role === 'agent'),
// // // //         users: response.data.filter(u => u.role === 'user')
// // // //       });
// // // //     } catch (error) { console.error("Sync Error:", error); }
// // // //   };

// // // //   const handleOpenModal = (type) => {
// // // //     setForm({ ...form, type: type });
// // // //     setShowModal(true);
// // // //   };

// // // //   const startEdit = (item) => {
// // // //     setEditingId(item.id);
// // // //     setForm({
// // // //       type: item.role, name: item.name, email: item.email, 
// // // //       state: item.state, dist: item.dist, mandal: item.mandal, password: item.password
// // // //     });
// // // //     setMandals(getMandals(item.dist));
// // // //     setShowModal(true);
// // // //   };

// // // //   const cancelEdit = () => {
// // // //     setEditingId(null);
// // // //     setShowModal(false);
// // // //     setForm({ type: 'agent', name: '', email: '', state: '', dist: '', mandal: '', password: '' });
// // // //   };

// // // //   const stats = {
// // // //     agentsCount: db.agents.length,
// // // //     customersCount: db.users.length,
// // // //     settled: db.users.filter(u => u.claimStatus === 3).length, 
// // // //     rejected: db.users.filter(u => u.claimStatus === -1).length,
// // // //     pending: db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length
// // // //   };

// // // //   const updateStatus = async (user, nextStatus, msg) => {
// // // //     const confirm = window.confirm(`Confirm update for ${user.name} to: ${msg}?`);
// // // //     if(!confirm) return;
// // // //     try {
// // // //       const payload = { ...user, claimStatus: nextStatus, statusMessage: msg };
// // // //       await axios.post(`${API_BASE}/api/users/register`, payload);
// // // //       alert(`Success: ${user.name} status is now ${msg}`);
// // // //       fetchData(); 
// // // //     } catch (error) { alert("Status Update Failed."); }
// // // //   };

// // // //   const getFilteredData = (type, list) => {
// // // //     if (filterType === 'all') return list;
// // // //     if (filterType === 'agent') return type === 'agent' ? list : [];
// // // //     if (filterType === 'user') return type === 'user' ? list : [];
// // // //     if (type === 'agent') return []; 
// // // //     if (filterType === 'completed') return list.filter(u => u.claimStatus === 3);
// // // //     if (filterType === 'progress') return list.filter(u => u.claimStatus >= 0 && u.claimStatus < 3);
// // // //     if (filterType === 'canceled') return list.filter(u => u.claimStatus === -1);
// // // //     return list;
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-[#f8fafc] flex text-left font-sans selection:bg-[#00ced1]/20">
// // // //       <aside className="w-[340px] bg-white border-r p-8 fixed h-full flex flex-col z-20 shadow-sm">
// // // //         <div className="mb-12"><Logo /></div>
// // // //         <nav className="space-y-3 flex-1">
// // // //           <p className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-4 tracking-[0.2em]">Management</p>
// // // //           <button onClick={() => setFilterType('all')} className={`w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest transition-all ${filterType === 'all' ? 'bg-slate-900 text-white shadow-2xl scale-[1.02]' : 'text-slate-500 hover:bg-slate-50'}`}>
// // // //             <Activity size={20}/> Dashboard Home
// // // //           </button>
// // // //           <div className="h-px bg-slate-100 my-6 mx-4"></div>
// // // //           <button onClick={() => handleOpenModal('agent')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest text-[#00ced1] bg-teal-50/50 border border-teal-100 hover:bg-teal-50 transition-all">
// // // //             <Briefcase size={20}/> Register Agent
// // // //           </button>
// // // //           <button onClick={() => handleOpenModal('user')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest text-indigo-600 bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition-all">
// // // //             <Users size={20}/> Register Customer
// // // //           </button>
// // // //         </nav>
// // // //         <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="flex items-center gap-4 text-red-500 font-black p-6 hover:bg-red-50 rounded-[2rem] transition-all cursor-pointer">
// // // //           <LogOut size={22}/> Exit System
// // // //         </button>
// // // //       </aside>

// // // //       <main className="ml-[340px] flex-1 p-16">
// // // //         <header className="flex justify-between items-center mb-16 relative">
// // // //           <div>
// // // //             <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Admin <span className="text-[#00ced1]">Dashboard</span></h1>
// // // //             <p className="text-slate-400 font-bold mt-3 uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
// // // //               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Secure Node Ledger Control
// // // //             </p>
// // // //           </div>
// // // //           <div onClick={() => setShowAdminMenu(!showAdminMenu)} className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white cursor-pointer hover:bg-slate-50 transition-all">
// // // //               <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-[#00ced1] shadow-lg"><ShieldCheck size={28}/></div>
// // // //               <div><p className="text-[9px] font-black uppercase text-[#00ced1] tracking-widest mb-0.5">Primary Administrator</p><p className="text-xl font-black text-slate-900 leading-none">System Master</p></div>
// // // //           </div>
// // // //         </header>

// // // //         {/* ORDERED STATS: Agents, Customers, Pending, Settled, Rejected */}
// // // //         <div className="grid grid-cols-5 gap-6 mb-16">
// // // //           {[
// // // //             { label: 'Agents', val: stats.agentsCount, type: 'agent', icon: <Briefcase size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
// // // //             { label: 'Customers', val: stats.customersCount, type: 'user', icon: <Users size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
// // // //             { label: 'Pending', val: stats.pending, type: 'progress', icon: <Clock size={20}/>, color: 'text-[#00ced1]', bg: 'bg-teal-50' },
// // // //             { label: 'Settled', val: stats.settled, type: 'completed', icon: <Award size={20}/>, color: 'text-green-600', bg: 'bg-green-50' },
// // // //             { label: 'Rejected', val: stats.rejected, type: 'canceled', icon: <XCircle size={20}/>, color: 'text-red-500', bg: 'bg-red-50' },
// // // //           ].map((stat, i) => (
// // // //             <button key={i} onClick={() => setFilterType(stat.type)} className={`p-8 rounded-[3rem] border-2 transition-all text-left shadow-sm group ${filterType === stat.type ? 'border-[#00ced1] bg-white ring-8 ring-teal-50' : 'border-transparent bg-white hover:shadow-xl hover:-translate-y-1'}`}>
// // // //               <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>{stat.icon}</div>
// // // //               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
// // // //               <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
// // // //             </button>
// // // //           ))}
// // // //         </div>

// // // //         <div className="space-y-12">
// // // //           {['agent', 'user'].map(type => {
// // // //             const items = getFilteredData(type, db[type === 'agent' ? 'agents' : 'users']);
// // // //             if (items.length === 0 && filterType !== 'all') return null;
// // // //             return (
// // // //               <div key={type} className="bg-white rounded-[4rem] shadow-2xl p-12 border border-white">
// // // //                 <div className="flex justify-between items-center mb-10">
// // // //                    <h3 className="font-black text-3xl capitalize text-slate-900 tracking-tight">{type === 'user' ? 'Customer' : 'Agent'} Directory</h3>
// // // //                    <div className="h-px flex-1 bg-slate-50 mx-8"></div>
// // // //                    <span className="text-[10px] font-black uppercase text-slate-300 tracking-[0.3em]">Total: {items.length}</span>
// // // //                 </div>
// // // //                 <div className="grid gap-4">
// // // //                   {items.map(item => (
// // // //                     <div key={item.id} className="flex justify-between items-center p-8 bg-[#fcfdfe] rounded-[2.5rem] border border-slate-50 hover:border-[#00ced1] transition-all group">
// // // //                       <div className="flex items-center gap-6">
// // // //                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${type === 'agent' ? 'bg-teal-50 text-[#00ced1]' : 'bg-indigo-50 text-indigo-600'}`}>{item.name.charAt(0).toUpperCase()}</div>
// // // //                         <div className="text-left"><p className="font-black text-2xl text-slate-900 group-hover:text-[#00ced1] transition-colors">{item.name}</p><p className="text-[10px] font-black text-slate-400 flex items-center gap-1 uppercase tracking-widest mt-1"><MapPin size={12}/> {item.mandal}, {item.dist}</p></div>
// // // //                       </div>
// // // //                       <div className="flex items-center gap-4">
// // // //                         {type === 'user' && item.claimStatus !== -1 && (
// // // //                           <div className="flex gap-2 mr-6 bg-white p-2 rounded-2xl shadow-sm border border-slate-50">
// // // //                             <button onClick={() => { const nextVal = (item.claimStatus || 0) + 1; updateStatus(item, nextVal, nextVal === 3 ? "SETTLED" : `STAGE ${nextVal} DONE`); }} className="p-3 bg-[#00ced1] text-white rounded-xl hover:scale-110 transition-transform cursor-pointer"><ArrowUpCircle size={22}/></button>
// // // //                             <button onClick={() => updateStatus(item, -1, "REJECTED")} className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform cursor-pointer"><XCircle size={22}/></button>
// // // //                           </div>
// // // //                         )}
// // // //                         <div className="text-right px-6 border-r border-slate-100 mr-2">
// // // //                            <p className="font-mono text-sm font-black text-slate-800">{item.id}</p>
// // // //                            <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${item.claimStatus === -1 ? 'text-red-500' : item.claimStatus === 3 ? 'text-green-600' : 'text-[#00ced1]'}`}>
// // // //                               {item.claimStatus === -1 ? 'REJECTED' : item.claimStatus === 3 ? 'SETTLED' : item.statusMessage}
// // // //                            </p>
// // // //                         </div>
// // // //                         <div className="flex gap-3">
// // // //                            <button onClick={() => startEdit(item)} className="p-4 bg-white text-slate-400 rounded-2xl border hover:text-[#00ced1] transition-all"><Edit3 size={20}/></button>
// // // //                            <button onClick={async () => { if(window.confirm("Permanent Delete?")) { await axios.delete(`${API_BASE}/api/users/${item.id}`); fetchData(); }}} className="p-4 bg-white text-slate-400 rounded-2xl border hover:text-red-500 transition-all"><Trash2 size={20}/></button>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             )
// // // //           })}
// // // //         </div>
// // // //       </main>

// // // //       <AnimatePresence>
// // // //         {showModal && (
// // // //           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
// // // //             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-3xl border border-white relative overflow-hidden text-left">
// // // //                 <button onClick={cancelEdit} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-400"><X size={24}/></button>
// // // //                 <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
// // // //                    {editingId ? 'Update' : 'Register'} <span className={form.type === 'agent' ? 'text-[#00ced1]' : 'text-indigo-600'}>{form.type === 'agent' ? 'Agent' : 'Customer'}</span>
// // // //                 </h2>
// // // //                 <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-10">Node ID Authentication Portal</p>
// // // //                 <form onSubmit={async (e) => {
// // // //                   e.preventDefault();
// // // //                   let id = editingId || "";
// // // //                   await axios.post(`${API_BASE}/api/users/register`, { ...form, id, role: form.type, claimStatus: editingId ? undefined : 0, statusMessage: editingId ? undefined : "PENDING", createdBy: "ADMIN_MASTER" });
// // // //                   alert("Registry Update Successful.");
// // // //                   cancelEdit(); fetchData();
// // // //                 }} className="space-y-4">
// // // //                   <input placeholder="Full Identity Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
// // // //                   <input type="email" placeholder="Gmail Registry" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
// // // //                   <div className="grid grid-cols-2 gap-4">
// // // //                     <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: '', mandal: ''})} required>
// // // //                         <option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
// // // //                     </select>
// // // //                     <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value, mandal: ''}); setMandals(getMandals(e.target.value)); }} required>
// // // //                         <option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}
// // // //                     </select>
// // // //                   </div>
// // // //                   <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required>
// // // //                       <option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}
// // // //                   </select>
// // // //                   <input type="password" placeholder="System Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
// // // //                   <button className={`w-full py-7 rounded-[2.5rem] font-black text-lg tracking-tight shadow-2xl transition-all mt-6 ${form.type === 'agent' ? 'bg-[#00ced1] text-white' : 'bg-indigo-600 text-white'}`}>
// // // //                     {editingId ? "Update Node Ledger" : `Generate New ${form.type === 'agent' ? 'Agent' : 'Customer'}`}
// // // //                   </button>
// // // //                 </form>
// // // //             </motion.div>
// // // //           </div>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // }





// // import React, { useState, useEffect } from 'react';
// // import Logo from '../components/Logo';
// // import { Package, ShieldCheck, Clock, FileText, CheckCircle2, LogOut, Award, UserCheck, Key, Upload, FilePlus, X, ExternalLink, Send, User } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import axios from 'axios';

// // export default function UserDashboard() {
// //   const navigate = useNavigate();
// //   const session = JSON.parse(localStorage.getItem('session'));
// //   const API_BASE = import.meta.env.VITE_API_BASE_URL;

// //   const [liveData, setLiveData] = useState(null);
// //   const [showQueryModal, setShowQueryModal] = useState(false);
// //   const [queryText, setQueryText] = useState("");
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [myDocs, setMyDocs] = useState([]);

// //   useEffect(() => {
// //     const fetchProgress = async () => {
// //       try {
// //         const response = await axios.get(`${API_BASE}/api/users/all`);
// //         const userInDb = response.data.find(u => u.id === session?.id);
// //         if (userInDb) setLiveData(userInDb);
// //       } catch (error) { console.error("Sync Error"); }
// //     };
// //     fetchProgress(); fetchMyDocs();
// //     const interval = setInterval(fetchProgress, 5000); 
// //     return () => clearInterval(interval);
// //   }, [session?.id, API_BASE]);

// //   const fetchMyDocs = async () => {
// //     try {
// //       const res = await axios.get(`${API_BASE}/api/documents/user/${session.id}`);
// //       setMyDocs(res.data);
// //     } catch (e) { console.error("Docs Sync Error"); }
// //   };

// //   const handleUpload = async () => {
// //     if (!selectedFile) return alert("Select a file.");
// //     setUploading(true);
// //     const formData = new FormData();
// //     formData.append("file", selectedFile);
// //     formData.append("userId", session.id);
// //     try {
// //       await axios.post(`${API_BASE}/api/documents/upload`, formData);
// //       alert("Document Secured.");
// //       setSelectedFile(null); fetchMyDocs();
// //     } catch (e) { alert("Upload failed."); } finally { setUploading(false); }
// //   };

// //   const steps = [
// //     { label: 'Application Filed', icon: <FileText size={22}/> },
// //     { label: 'Agent Verification', icon: <ShieldCheck size={22}/> },
// //     { label: 'Settlement Pending', icon: <Clock size={22}/> },
// //     { label: 'Policy Settled', icon: <Award size={22}/> }
// //   ];

// //   const getStepStatus = (index) => {
// //     if (!liveData || liveData.claimStatus === -1) return 'canceled';
// //     if (index < liveData.claimStatus) return 'completed'; 
// //     if (index === liveData.claimStatus) return 'current';  
// //     return 'upcoming';                               
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#f8fafc] p-6 md:p-16 font-sans text-left">
// //       <div className="max-w-7xl mx-auto">
// //         <header className="flex justify-between items-center mb-16">
// //           <Logo />
// //           <div className="flex items-center gap-8">
// //              <div className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white">
// //                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-slate-900 text-[#00ced1]'}`}>
// //                    <User size={24}/>
// //                 </div>
// //                 <div className="text-right">
// //                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-0.5">Active Customer Node</p>
// //                    <p className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">{liveData?.name || session?.name}</p>
// //                 </div>
// //              </div>
// //              <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="p-4 bg-white rounded-2xl shadow-xl border border-white hover:text-red-500 transition-all cursor-pointer"><LogOut size={22}/></button>
// //           </div>
// //         </header>

// //         <div className="grid lg:grid-cols-12 gap-10">
// //           <div className="lg:col-span-8 space-y-8">
// //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-12 md:p-20 rounded-[4rem] shadow-3xl border border-white relative overflow-hidden transition-all duration-700 ${liveData?.claimStatus === -1 ? 'bg-red-50/50' : 'bg-white'}`}>
// //                <div className="flex justify-between items-start mb-20">
// //                   <div>
// //                     <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase">Hello, {liveData?.name}</h2>
// //                     <div className="flex items-center gap-3">
// //                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${liveData?.claimStatus === -1 ? 'bg-red-100 text-red-600' : 'bg-teal-50 text-[#00ced1]'}`}>
// //                           {liveData?.claimStatus === -1 ? 'REJECTED NODE' : 'ACTIVE REGISTRY'}
// //                        </span>
// //                        <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">Status: {liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}</p>
// //                     </div>
// //                   </div>
// //                </div>
// //                <div className="grid grid-cols-4 gap-4 relative">
// //                   <div className="absolute top-10 left-10 right-10 h-1 bg-slate-50 -z-0"></div>
// //                   {steps.map((step, idx) => {
// //                     const status = getStepStatus(idx);
// //                     return (
// //                       <div key={idx} className="relative z-10 flex flex-col items-center">
// //                         <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-1000 ${status === 'completed' ? 'bg-green-600 text-white' : status === 'current' ? 'bg-slate-900 text-white ring-8 ring-slate-100' : status === 'canceled' ? 'bg-red-500 text-white' : 'bg-white text-slate-200 border-2 border-slate-50'}`}>
// //                           {status === 'completed' ? <CheckCircle2 size={32}/> : step.icon}
// //                         </div>
// //                         <p className={`mt-6 text-[10px] font-black uppercase text-center tracking-widest leading-tight ${status === 'upcoming' ? 'text-slate-300' : 'text-slate-900'}`}>{step.label}</p>
// //                       </div>
// //                     );
// //                   })}
// //                </div>
// //             </motion.div>

// //             <div className="grid md:grid-cols-2 gap-8">
// //                <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border flex gap-6 items-center group hover:bg-slate-900 transition-all duration-500">
// //                   <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:text-[#00ced1] transition-all"><UserCheck size={32}/></div>
// //                   <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer ID</p><p className="text-2xl font-black font-mono text-slate-900 group-hover:text-white">{liveData?.id}</p></div>
// //                </div>
// //                <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border flex gap-6 items-center group hover:bg-slate-900 transition-all duration-500">
// //                   <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:text-[#00ced1] transition-all"><Key size={32}/></div>
// //                   <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Node Password</p><p className="text-2xl font-black font-mono text-[#00ced1]">{liveData?.password}</p></div>
// //                </div>
// //             </div>

// //             <div className="bg-white p-12 rounded-[4rem] shadow-2xl border">
// //                <div className="flex items-center gap-4 mb-12">
// //                   <div className="w-14 h-14 bg-[#00ced1]/10 text-[#00ced1] rounded-2xl flex items-center justify-center shadow-inner"><FilePlus size={28}/></div>
// //                   <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Document Ledger</h3>
// //                </div>
// //                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {myDocs.map((doc, i) => (
// //                     <a key={i} href={`${API_BASE}/api/documents/download/${doc.id}`} target="_blank" rel="noreferrer" className="p-6 bg-[#fcfdfe] border border-slate-50 rounded-3xl flex items-center justify-between group hover:border-[#00ced1] hover:shadow-lg transition-all">
// //                       <div className="flex items-center gap-4 overflow-hidden">
// //                         <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-[#00ced1] transition-colors"><FileText size={20}/></div>
// //                         <span className="text-sm font-black text-slate-700 truncate tracking-tight">{doc.fileName}</span>
// //                       </div>
// //                       <ExternalLink size={18} className="text-slate-200 group-hover:text-[#00ced1] transition-colors"/>
// //                     </a>
// //                   ))}
// //                </div>
// //             </div>
// //           </div>

// //           <div className="lg:col-span-4 space-y-8">
// //             <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border text-center">
// //                <div className={`w-24 h-24 mx-auto rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-[#00ced1]'}`}>
// //                   <Package size={44}/>
// //                </div>
// //                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Lifecycle Status</p>
// //                <h3 className={`text-4xl font-black uppercase tracking-tighter ${liveData?.claimStatus === -1 ? 'text-red-500' : 'text-slate-900'}`}>
// //                   {liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}
// //                </h3>
// //             </div>
// //             <div className={`p-12 rounded-[3.5rem] shadow-3xl text-white relative overflow-hidden group transition-all duration-1000 ${liveData?.claimStatus === -1 ? 'bg-slate-900' : 'bg-[#00ced1]'}`}>
// //                <h4 className="text-3xl font-black tracking-tighter relative z-10">Priority Support Desk</h4>
// //                <button onClick={() => setShowQueryModal(true)} className="w-full bg-white text-slate-900 py-6 rounded-2xl font-black uppercase tracking-widest text-xs mt-10 hover:shadow-2xl transition-all relative z-10">Send Inquiry</button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <AnimatePresence>
// //         {showQueryModal && (
// //           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
// //             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-xl rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
// //               <div className="flex justify-between items-center mb-10">
// //                 <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Direct <span className="text-[#00ced1]">Inquiry</span></h3>
// //                 <button onClick={() => setShowQueryModal(false)} className="p-3 bg-slate-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-300"><X size={24}/></button>
// //               </div>
// //               <textarea placeholder="Describe your query..." className="w-full p-8 bg-slate-50 rounded-[2.5rem] outline-none font-bold text-slate-700 border-2 border-transparent focus:border-[#00ced1] resize-none min-h-[180px] transition-all" value={queryText} onChange={(e) => setQueryText(e.target.value)} />
// //               <button onClick={async () => {
// //                   if(!queryText) return alert("Enter message.");
// //                   await axios.post(`${API_BASE}/api/messages/send`, { fullName: liveData.name, email: `NODE:${liveData.id}`, content: queryText, type: "Client Node Query" });
// //                   alert("Transmitted Successfully."); setShowQueryModal(false); setQueryText("");
// //               }} className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-lg shadow-2xl flex items-center justify-center gap-4 hover:bg-black transition-all mt-6">Transmit Inquiry <Send size={20}/></button>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }


// // import React, { useState, useEffect } from 'react';
// // import Logo from '../components/Logo';
// // import { 
// //   Package, ShieldCheck, Clock, FileText, CheckCircle2, 
// //   LogOut, Award, UserCheck, Key, Upload, FilePlus, X, ExternalLink, Send, User, XCircle
// // } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import axios from 'axios';

// // export default function UserDashboard() {
// //   const navigate = useNavigate();
// //   const session = JSON.parse(localStorage.getItem('session'));
// //   const API_BASE = import.meta.env.VITE_API_BASE_URL;
  
// //   const [liveData, setLiveData] = useState(null);
// //   const [showQueryModal, setShowQueryModal] = useState(false);
// //   const [queryText, setQueryText] = useState("");
  
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [myDocs, setMyDocs] = useState([]);

// //   useEffect(() => {
// //     const fetchProgress = async () => {
// //       try {
// //         const response = await axios.get(`${API_BASE}/api/users/all`);
// //         const userInDb = response.data.find(u => u.id === session?.id);
// //         if (userInDb) setLiveData(userInDb);
// //       } catch (error) { console.error("Sync Error"); }
// //     };
// //     fetchProgress(); fetchMyDocs();
// //     const interval = setInterval(fetchProgress, 5000); 
// //     return () => clearInterval(interval);
// //   }, [session?.id, API_BASE]);

// //   const fetchMyDocs = async () => {
// //     try {
// //       const res = await axios.get(`${API_BASE}/api/documents/user/${session.id}`);
// //       setMyDocs(res.data);
// //     } catch (e) { console.error("Docs Fetch Error"); }
// //   };

// //   const handleUpload = async () => {
// //     if (!selectedFile) return alert("Select a file.");
// //     setUploading(true);
// //     const formData = new FormData();
// //     formData.append("file", selectedFile);
// //     formData.append("userId", session.id);
// //     try {
// //       await axios.post(`${API_BASE}/api/documents/upload`, formData);
// //       alert("Document Secured.");
// //       setSelectedFile(null); fetchMyDocs();
// //     } catch (e) { alert("Upload Failed."); } finally { setUploading(false); }
// //   };

// //   const steps = [
// //     { label: 'Application Filed', icon: <FileText size={22}/> },
// //     { label: 'Agent Verification', icon: <ShieldCheck size={22}/> },
// //     { label: 'Settlement Pending', icon: <Clock size={22}/> },
// //     { label: 'Policy Settled', icon: <Award size={22}/> }
// //   ];

// //   const getStepStatus = (index) => {
// //     if (!liveData || liveData.claimStatus === -1) return 'canceled';
// //     if (index < liveData.claimStatus) return 'completed'; 
// //     if (index === liveData.claimStatus) return 'current';  
// //     return 'upcoming';                               
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#f8fafc] p-6 md:p-16 font-sans text-left selection:bg-[#00ced1]/20">
// //       <div className="max-w-7xl mx-auto">
// //         <header className="flex justify-between items-center mb-16">
// //           <Logo />
// //           <div className="flex items-center gap-8">
// //              <div className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white">
// //                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-slate-900 text-[#00ced1]'}`}><User size={24}/></div>
// //                 <div className="text-right"><p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-0.5">Active Customer Node</p><p className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">{liveData?.name || session?.name}</p></div>
// //              </div>
// //              <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="p-4 bg-white rounded-2xl shadow-xl border border-white hover:text-red-500 transition-all cursor-pointer"><LogOut size={22}/></button>
// //           </div>
// //         </header>

// //         <div className="grid lg:grid-cols-12 gap-10">
// //           <div className="lg:col-span-8 space-y-8">
// //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-12 md:p-20 rounded-[4rem] shadow-3xl border border-white relative overflow-hidden transition-all duration-700 ${liveData?.claimStatus === -1 ? 'bg-red-50/50' : 'bg-white'}`}>
// //                <div className="flex justify-between items-start mb-20">
// //                   <div>
// //                     <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase">Hello, {liveData?.name}</h2>
// //                     <div className="flex items-center gap-3">
// //                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${liveData?.claimStatus === -1 ? 'bg-red-100 text-red-600' : 'bg-teal-50 text-[#00ced1]'}`}>{liveData?.claimStatus === -1 ? 'REJECTED NODE' : 'ACTIVE REGISTRY'}</span>
// //                        <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">Status: {liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}</p>
// //                     </div>
// //                   </div>
// //                   {liveData?.claimStatus === -1 && <XCircle size={48} className="text-red-500 opacity-20" />}
// //                </div>
// //                <div className="grid grid-cols-4 gap-4 relative">
// //                   <div className="absolute top-10 left-10 right-10 h-1 bg-slate-50 -z-0"></div>
// //                   {steps.map((step, idx) => {
// //                     const status = getStepStatus(idx);
// //                     return (
// //                       <div key={idx} className="relative z-10 flex flex-col items-center">
// //                         <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-1000 ${status === 'completed' ? 'bg-green-600 text-white' : status === 'current' ? 'bg-slate-900 text-white ring-8 ring-slate-100' : status === 'canceled' ? 'bg-red-500 text-white' : 'bg-white text-slate-200 border-2 border-slate-50'}`}>{status === 'completed' ? <CheckCircle2 size={32}/> : step.icon}</div>
// //                         <p className={`mt-6 text-[10px] font-black uppercase text-center tracking-widest leading-tight ${status === 'upcoming' ? 'text-slate-300' : 'text-slate-900'}`}>{step.label}</p>
// //                       </div>
// //                     );
// //                   })}
// //                </div>
// //             </motion.div>

// //             <div className="grid md:grid-cols-2 gap-8">
// //                <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border flex gap-6 items-center group hover:bg-slate-900 transition-all duration-500">
// //                   <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:text-[#00ced1] transition-all"><UserCheck size={32}/></div>
// //                   <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-500">Customer ID</p><p className="text-2xl font-black font-mono text-slate-900 group-hover:text-white tracking-widest">{liveData?.id}</p></div>
// //                </div>
// //                <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border flex gap-6 items-center group hover:bg-slate-900 transition-all duration-500">
// //                   <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:text-[#00ced1] transition-all"><Key size={32}/></div>
// //                   <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-500">Node Password</p><p className="text-2xl font-black font-mono text-[#00ced1] group-hover:text-[#00ced1] tracking-widest">{liveData?.password}</p></div>
// //                </div>
// //             </div>

// //             <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-white">
// //                <div className="flex items-center gap-4 mb-12"><div className="w-14 h-14 bg-[#00ced1]/10 text-[#00ced1] rounded-2xl flex items-center justify-center shadow-inner"><FilePlus size={28}/></div><h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Document Ledger</h3></div>
// //                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {myDocs.map((doc, i) => (
// //                     <a key={i} href={`${API_BASE}/api/documents/download/${doc.id}`} target="_blank" rel="noreferrer" className="p-6 bg-[#fcfdfe] border border-slate-50 rounded-3xl flex items-center justify-between group hover:border-[#00ced1] hover:shadow-lg transition-all">
// //                       <div className="flex items-center gap-4 overflow-hidden"><div className="p-3 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-[#00ced1] transition-colors"><FileText size={20}/></div><span className="text-sm font-black text-slate-700 truncate tracking-tight">{doc.fileName}</span></div>
// //                       <ExternalLink size={18} className="text-slate-200 group-hover:text-[#00ced1] transition-colors"/>
// //                     </a>
// //                   ))}
// //                </div>
// //             </div>
// //           </div>

// //           <div className="lg:col-span-4 space-y-8">
// //             <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-white text-center">
// //                <div className={`w-24 h-24 mx-auto rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-[#00ced1]'}`}><Package size={44}/></div>
// //                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Node Lifecycle Status</p>
// //                <h3 className={`text-4xl font-black uppercase tracking-tighter ${liveData?.claimStatus === -1 ? 'text-red-500' : 'text-slate-900'}`}>{liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}</h3>
// //             </div>
// //             <div className={`p-12 rounded-[3.5rem] shadow-3xl text-white relative overflow-hidden group transition-all duration-1000 ${liveData?.claimStatus === -1 ? 'bg-slate-900' : 'bg-[#00ced1]'}`}>
// //                <h4 className="text-3xl font-black tracking-tighter leading-tight relative z-10">Priority Support Desk</h4>
// //                <button onClick={() => setShowQueryModal(true)} className="w-full bg-white text-slate-900 py-6 rounded-2xl font-black uppercase tracking-widest text-xs mt-10 hover:shadow-2xl transition-all relative z-10">Send Inquiry</button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <AnimatePresence>
// //         {showQueryModal && (
// //           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
// //             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-xl rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
// //               <div className="flex justify-between items-center mb-10">
// //                 <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Direct <span className="text-[#00ced1]">Inquiry</span></h3>
// //                 <button onClick={() => setShowQueryModal(false)} className="p-3 bg-slate-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-300"><X size={24}/></button>
// //               </div>
// //               <textarea placeholder="Describe your inquiry..." className="w-full p-8 bg-slate-50 rounded-[2.5rem] outline-none font-bold text-slate-700 border-2 border-transparent focus:border-[#00ced1] resize-none min-h-[180px] transition-all" value={queryText} onChange={(e) => setQueryText(e.target.value)} />
// //               <button onClick={async () => {
// //                   if(!queryText) return alert("Enter message.");
// //                   await axios.post(`${API_BASE}/api/messages/send`, { fullName: liveData.name, email: `NODE:${liveData.id}`, content: queryText, type: "Client Node Query" });
// //                   alert("Transmitted Successfully."); setShowQueryModal(false); setQueryText("");
// //               }} className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-lg shadow-2xl flex items-center justify-center gap-4 hover:bg-black transition-all mt-6">Transmit Inquiry <Send size={20}/></button>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect } from 'react';
// import Logo from '../components/Logo';
// import { Package, ShieldCheck, Clock, FileText, CheckCircle2, LogOut, Award, UserCheck, Key, Upload, FilePlus, X, ExternalLink, Send, User, XCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// export default function UserDashboard() {
//   const navigate = useNavigate();
//   const session = JSON.parse(localStorage.getItem('session'));
//   const API_BASE = import.meta.env.VITE_API_BASE_URL;

//   const [liveData, setLiveData] = useState(null);
//   const [showQueryModal, setShowQueryModal] = useState(false);
//   const [queryText, setQueryText] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [myDocs, setMyDocs] = useState([]);

//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const response = await axios.get(`${API_BASE}/api/users/all`);
//         const userInDb = response.data.find(u => u.id === session?.id);
//         if (userInDb) setLiveData(userInDb);
//       } catch (error) { console.error("Sync Error"); }
//     };
//     fetchProgress(); fetchMyDocs();
//     const interval = setInterval(fetchProgress, 5000); 
//     return () => clearInterval(interval);
//   }, [session?.id, API_BASE]);

//   const fetchMyDocs = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/documents/user/${session.id}`);
//       setMyDocs(res.data);
//     } catch (e) { console.error("Docs Sync Error"); }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return alert("Select a file.");
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     formData.append("userId", session.id);
//     try {
//       await axios.post(`${API_BASE}/api/documents/upload`, formData);
//       alert("Document Secured.");
//       setSelectedFile(null); fetchMyDocs();
//     } catch (e) { alert("Upload failed."); } finally { setUploading(false); }
//   };

//   const steps = [
//     { label: 'Application Filed', icon: <FileText size={22}/> },
//     { label: 'Agent Verification', icon: <ShieldCheck size={22}/> },
//     { label: 'Settlement Pending', icon: <Clock size={22}/> },
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
//         <header className="flex justify-between items-center mb-16">
//           <Logo />
//           <div className="flex items-center gap-8">
//              <div className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white">
//                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-slate-900 text-[#00ced1]'}`}>
//                    <User size={24}/>
//                 </div>
//                 <div className="text-right">
//                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-0.5">Active Customer Node</p>
//                    <p className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">{liveData?.name || session?.name}</p>
//                 </div>
//              </div>
//              <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="p-4 bg-white rounded-2xl shadow-xl border border-white hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"><LogOut size={22}/></button>
//           </div>
//         </header>

//         <div className="grid lg:grid-cols-12 gap-10">
//           <div className="lg:col-span-8 space-y-8">
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-12 md:p-20 rounded-[4rem] shadow-3xl border border-white relative overflow-hidden transition-all duration-700 ${liveData?.claimStatus === -1 ? 'bg-red-50/50' : 'bg-white'}`}>
//                <div className="flex justify-between items-start mb-20">
//                   <div>
//                     <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase">Hello, {liveData?.name}</h2>
//                     <div className="flex items-center gap-3">
//                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${liveData?.claimStatus === -1 ? 'bg-red-100 text-red-600' : 'bg-teal-50 text-[#00ced1]'}`}>
//                           {liveData?.claimStatus === -1 ? 'REJECTED NODE' : 'ACTIVE REGISTRY'}
//                        </span>
//                        <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">Status: {liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}</p>
//                     </div>
//                   </div>
//                   {liveData?.claimStatus === -1 && <XCircle size={48} className="text-red-500 opacity-20" />}
//                </div>
//                <div className="grid grid-cols-4 gap-4 relative">
//                   <div className="absolute top-10 left-10 right-10 h-1 bg-slate-50 -z-0"></div>
//                   {steps.map((step, idx) => {
//                     const status = getStepStatus(idx);
//                     return (
//                       <div key={idx} className="relative z-10 flex flex-col items-center">
//                         <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-1000 ${status === 'completed' ? 'bg-green-600 text-white' : status === 'current' ? 'bg-slate-900 text-white ring-8 ring-slate-100' : status === 'canceled' ? 'bg-red-500 text-white' : 'bg-white text-slate-200 border-2 border-slate-50'}`}>
//                           {status === 'completed' ? <CheckCircle2 size={32}/> : step.icon}
//                         </div>
//                         <p className={`mt-6 text-[10px] font-black uppercase text-center tracking-widest leading-tight ${status === 'upcoming' ? 'text-slate-300' : 'text-slate-900'}`}>{step.label}</p>
//                       </div>
//                     );
//                   })}
//                </div>
//             </motion.div>

//             <div className="grid md:grid-cols-2 gap-8">
//                <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border flex gap-6 items-center group hover:bg-slate-900 transition-all duration-500">
//                   <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:text-[#00ced1] transition-all"><UserCheck size={32}/></div>
//                   <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-500">Customer ID</p><p className="text-2xl font-black font-mono text-slate-900 group-hover:text-white tracking-widest">{liveData?.id}</p></div>
//                </div>
//                <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border flex gap-6 items-center group hover:bg-slate-900 transition-all duration-500">
//                   <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:text-[#00ced1] transition-all"><Key size={32}/></div>
//                   <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-500">Node Password</p><p className="text-2xl font-black font-mono text-[#00ced1] group-hover:text-[#00ced1] tracking-widest">{liveData?.password}</p></div>
//                </div>
//             </div>

//             <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-white">
//                <div className="flex items-center gap-4 mb-12">
//                   <div className="w-14 h-14 bg-[#00ced1]/10 text-[#00ced1] rounded-2xl flex items-center justify-center shadow-inner"><FilePlus size={28}/></div>
//                   <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Document Ledger</h3>
//                </div>
//                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {myDocs.map((doc, i) => (
//                     <a key={i} href={`${API_BASE}/api/documents/download/${doc.id}`} target="_blank" rel="noreferrer" className="p-6 bg-[#fcfdfe] border border-slate-50 rounded-3xl flex items-center justify-between group hover:border-[#00ced1] hover:shadow-lg transition-all">
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

//           <div className="lg:col-span-4 space-y-8">
//             <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-white text-center">
//                <div className={`w-24 h-24 mx-auto rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl ${liveData?.claimStatus === -1 ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-[#00ced1]'}`}>
//                   <Package size={44}/>
//                </div>
//                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Lifecycle Status</p>
//                <h3 className={`text-4xl font-black uppercase tracking-tighter ${liveData?.claimStatus === -1 ? 'text-red-500' : 'text-slate-900'}`}>
//                   {liveData?.claimStatus === -1 ? 'REJECTED' : (liveData?.claimStatus === 3 ? 'SETTLED' : 'PENDING')}
//                </h3>
//             </div>
//             <div className={`p-12 rounded-[3.5rem] shadow-3xl text-white relative overflow-hidden group transition-all duration-1000 ${liveData?.claimStatus === -1 ? 'bg-slate-900' : 'bg-[#00ced1]'}`}>
//                <h4 className="text-3xl font-black tracking-tighter relative z-10">Priority Support Desk</h4>
//                <button onClick={() => setShowQueryModal(true)} className="w-full bg-white text-slate-900 py-6 rounded-2xl font-black uppercase tracking-widest text-xs mt-10 hover:shadow-2xl transition-all relative z-10">Send Inquiry</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {showQueryModal && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
//             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-xl rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
//               <div className="flex justify-between items-center mb-10">
//                 <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Direct <span className="text-[#00ced1]">Inquiry</span></h3>
//                 <button onClick={() => setShowQueryModal(false)} className="p-3 bg-slate-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-300"><X size={24}/></button>
//               </div>
//               <textarea placeholder="Describe your query..." className="w-full p-8 bg-slate-50 rounded-[2.5rem] outline-none font-bold text-slate-700 border-2 border-transparent focus:border-[#00ced1] resize-none min-h-[180px] transition-all" value={queryText} onChange={(e) => setQueryText(e.target.value)} />
//               <button onClick={async () => {
//                   if(!queryText) return alert("Enter message.");
//                   await axios.post(`${API_BASE}/api/messages/send`, { fullName: liveData.name, email: `NODE:${liveData.id}`, content: queryText, type: "Client Node Query" });
//                   alert("Transmitted Successfully."); setShowQueryModal(false); setQueryText("");
//               }} className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-lg shadow-2xl flex items-center justify-center gap-4 hover:bg-black transition-all mt-6">Transmit Inquiry <Send size={20}/></button>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { Package, ShieldCheck, Clock, FileText, CheckCircle2, LogOut, Award, UserCheck, Key, Upload, FilePlus, X, ExternalLink, Send, User, XCircle } from 'lucide-react';
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
  const [myDocs, setMyDocs] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/users/all`);
        const userInDb = response.data.find(u => u.id === session?.id);
        if (userInDb) setLiveData(userInDb);
      } catch (error) { console.error("Sync Error"); }
    };
    fetchProgress(); const interval = setInterval(fetchProgress, 5000); return () => clearInterval(interval);
  }, [session?.id]);

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