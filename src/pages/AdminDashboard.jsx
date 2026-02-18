// // // // import React, { useState, useEffect } from 'react';
// // // // import { fetchLocations, getMandals } from '../services/locationService';
// // // // import Logo from '../components/Logo';
// // // // import { UserPlus, LogOut, MapPin, Trash2, Edit3, X, ShieldCheck, ArrowUpCircle, XCircle, Users, Briefcase, Clock, Activity, Award } from 'lucide-react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import axios from 'axios';

// // // // export default function AdminDashboard() {
// // // //   const navigate = useNavigate();
// // // //   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";
  
// // // //   const [locations, setLocations] = useState([]);
// // // //   const [mandals, setMandals] = useState([]); 
// // // //   const [db, setDb] = useState({ agents: [], users: [] }); 
// // // //   const [filterType, setFilterType] = useState("all"); 
// // // //   const [editingId, setEditingId] = useState(null); 
// // // //   const [showModal, setShowModal] = useState(false);
  
// // // //   const [form, setForm] = useState({ type: 'user', name: '', email: '', state: '', dist: '', mandal: '', password: '' });

// // // //   useEffect(() => { fetchLocations().then(setLocations); fetchData(); }, []);

// // // //   const fetchData = async () => {
// // // //     try {
// // // //       const response = await axios.get(`${API_BASE}/api/users/all`);
// // // //       setDb({ agents: response.data.filter(u => u.role === 'agent'), users: response.data.filter(u => u.role === 'user') });
// // // //     } catch (e) { console.error("Sync Error"); }
// // // //   };

// // // //   const handleOpenModal = (type) => {
// // // //     setEditingId(null);
// // // //     setForm({ type: type, name: '', email: '', state: '', dist: '', mandal: '', password: '' });
// // // //     setShowModal(true);
// // // //   };

// // // //   const startEdit = (item) => {
// // // //     setEditingId(item.id);
// // // //     setForm({ type: item.role, name: item.name, email: item.email, state: item.state, dist: item.dist, mandal: item.mandal, password: item.password });
// // // //     setMandals(getMandals(item.dist)); setShowModal(true);
// // // //   };

// // // //   const cancelEdit = () => { setEditingId(null); setShowModal(false); };

// // // //   const filteredItems = filterType === 'all' ? [...db.agents, ...db.users] : filterType === 'agent' ? db.agents : filterType === 'user' ? db.users : filterType === 'pending' ? db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3) : filterType === 'settled' ? db.users.filter(u => u.claimStatus === 3) : db.users.filter(u => u.claimStatus === -1);

// // // //   // --- LOGIC FIX: SPECIFIC STAGE UPGRADE ---
// // // //   const handleStageUpgrade = async (user) => {
// // // //     // 1. Force current status to be a number (handle nulls)
// // // //     const currentStage = parseInt(user.claimStatus || 0, 10);
// // // //     const nextStage = currentStage + 1;
    
// // // //     let statusMessage = "";

// // // //     // 2. Assign Name based on Next Stage
// // // //     if (nextStage === 1) statusMessage = "STAGE 1 COMPLETED";
// // // //     else if (nextStage === 2) statusMessage = "STAGE 2 COMPLETED";
// // // //     else if (nextStage === 3) statusMessage = "SETTLED";
// // // //     else return; // Stop if already settled

// // // //     // 3. Confirm
// // // //     if(!window.confirm(`Upgrade Claim to: ${statusMessage}?`)) return;

// // // //     try {
// // // //         // 4. Send Request
// // // //         await axios.post(`${API_BASE}/api/users/register`, { 
// // // //             ...user, 
// // // //             claimStatus: nextStage, 
// // // //             statusMessage: statusMessage 
// // // //         });
// // // //         alert(`Success! Status is now: ${statusMessage}`);
// // // //         fetchData();
// // // //     } catch (error) {
// // // //         alert("Network Error: Could not update status.");
// // // //     }
// // // //   };

// // // //   const rejectClaim = async (user) => {
// // // //       if(!window.confirm("Are you sure you want to REJECT this claim?")) return;
// // // //       try {
// // // //         await axios.post(`${API_BASE}/api/users/register`, { ...user, claimStatus: -1, statusMessage: "REJECTED" });
// // // //         fetchData();
// // // //       } catch (error) { alert("Failed to reject."); }
// // // //   };

// // // //   const handleDelete = async (id) => {
// // // //     if(window.confirm("Delete this user?")) { 
// // // //         try { await axios.delete(`${API_BASE}/api/users/${id}`); fetchData(); } 
// // // //         catch(e) { alert("Delete failed"); }
// // // //     }
// // // //   };

// // // //   const handleFormSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //         const payload = { ...form, id: editingId || "", role: form.type, claimStatus: editingId ? undefined : 0, statusMessage: editingId ? undefined : "PENDING", createdBy: "ADMIN_MASTER" };
// // // //         const res = await axios.post(`${API_BASE}/api/users/register`, payload);
// // // //         alert(editingId ? "Updated Successfully" : `SUCCESS! Generated ID: ${res.data.id}`);
// // // //         cancelEdit(); 
// // // //         fetchData();
// // // //     } catch(err) { alert("Registration Failed."); }
// // // //   };

// // // //   // --- VISUAL HELPERS ---
// // // //   const getStatusInfo = (status) => {
// // // //       const s = parseInt(status || 0, 10);
// // // //       if (s === -1) return { label: 'REJECTED', color: 'text-red-500 bg-red-50' };
// // // //       if (s === 3) return { label: 'SETTLED', color: 'text-green-600 bg-green-50' };
// // // //       if (s === 2) return { label: 'STAGE 2 DONE', color: 'text-purple-600 bg-purple-50' };
// // // //       if (s === 1) return { label: 'STAGE 1 DONE', color: 'text-blue-600 bg-blue-50' };
// // // //       return { label: 'PENDING', color: 'text-[#00ced1] bg-teal-50' };
// // // //   };

// // // //   // Stats Logic
// // // //   const stats = {
// // // //     agents: db.agents.length, customers: db.users.length,
// // // //     pending: db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length,
// // // //     settled: db.users.filter(u => u.claimStatus === 3).length, 
// // // //     rejected: db.users.filter(u => u.claimStatus === -1).length
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-[#f8fafc] flex text-left font-sans">
// // // //       <aside className="w-[340px] bg-white border-r p-8 fixed h-full flex flex-col z-20 shadow-sm">
// // // //         <div className="mb-12"><Logo /></div>
// // // //         <nav className="space-y-3 flex-1">
// // // //           <button onClick={() => setFilterType('all')} className={`w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase ${filterType === 'all' ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-50'}`}><Activity size={20}/> Dashboard Home</button>
// // // //           <div className="h-px bg-slate-100 my-6 mx-4"></div>
// // // //           <button onClick={() => handleOpenModal('agent')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase text-[#00ced1] bg-teal-50/50 border border-teal-100 hover:bg-teal-50 transition-all"><Briefcase size={20}/> Register Agent</button>
// // // //           <button onClick={() => handleOpenModal('user')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase text-indigo-600 bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition-all"><Users size={20}/> Register Customer</button>
// // // //         </nav>
// // // //         <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="flex items-center gap-4 text-red-500 font-black p-6 hover:bg-red-50 transition-all"><LogOut size={22}/> Exit System</button>
// // // //       </aside>

// // // //       <main className="ml-[340px] flex-1 p-16">
// // // //         <header className="flex justify-between items-center mb-16 relative">
// // // //           <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Admin <span className="text-[#00ced1]">Dashboard</span></h1>
// // // //           <div className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white"><div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-[#00ced1] shadow-lg"><ShieldCheck size={28}/></div><div><p className="text-[9px] font-black uppercase text-[#00ced1]">Primary Admin</p><p className="text-xl font-black text-slate-900 leading-none">System Master</p></div></div>
// // // //         </header>

// // // //         <div className="grid grid-cols-5 gap-6 mb-16">
// // // //           {[
// // // //             { label: 'Agents', val: stats.agents, type: 'agent', icon: <Briefcase size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
// // // //             { label: 'Customers', val: stats.customers, type: 'user', icon: <Users size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
// // // //             { label: 'Pending', val: stats.pending, type: 'pending', icon: <Clock size={20}/>, color: 'text-[#00ced1]', bg: 'bg-teal-50' },
// // // //             { label: 'Settled', val: stats.settled, type: 'settled', icon: <Award size={20}/>, color: 'text-green-600', bg: 'bg-green-50' },
// // // //             { label: 'Rejected', val: stats.rejected, type: 'rejected', icon: <XCircle size={20}/>, color: 'text-red-500', bg: 'bg-red-50' },
// // // //           ].map((stat, i) => (
// // // //             <button key={i} onClick={() => setFilterType(stat.type)} className={`p-8 rounded-[3rem] border-2 transition-all text-left shadow-sm ${filterType === stat.type ? 'border-[#00ced1] bg-white ring-8 ring-teal-50' : 'border-transparent bg-white hover:shadow-xl'}`}>
// // // //               <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>{stat.icon}</div>
// // // //               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
// // // //               <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
// // // //             </button>
// // // //           ))}
// // // //         </div>

// // // //         <div className="bg-white rounded-[4rem] shadow-2xl p-12 border border-white">
// // // //             <h3 className="font-black text-3xl capitalize text-slate-900 mb-10">Directory View: {filterType}</h3>
// // // //             <div className="grid gap-4">
// // // //                 {filteredItems.map(item => {
// // // //                     const statusInfo = getStatusInfo(item.claimStatus); 
// // // //                     return (
// // // //                     <div key={item.id} className="flex justify-between items-center p-6 bg-[#fcfdfe] rounded-[2.5rem] border border-slate-50 hover:border-[#00ced1] transition-all">
// // // //                         <div className="flex items-center gap-6 w-1/2">
// // // //                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${item.role === 'agent' ? 'bg-teal-50 text-[#00ced1]' : 'bg-indigo-50 text-indigo-600'}`}>
// // // //                                 {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
// // // //                             </div>
// // // //                             <div className="text-left">
// // // //                                 <p className="font-black text-2xl text-slate-900">{item.name}</p>
// // // //                                 <div className="flex flex-col gap-1 mt-1">
// // // //                                     <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1"><MapPin size={12}/> {item.mandal}, {item.dist}</p>
// // // //                                     <div className="bg-slate-100 px-3 py-1 rounded-md w-fit border border-slate-200">
// // // //                                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider mr-2">ID:</span>
// // // //                                         <span className="text-sm font-bold text-[#00ced1] font-mono">{item.id || "PROCESSING..."}</span>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>

// // // //                         <div className="flex items-center gap-6 justify-end w-1/2">
// // // //                             {/* ACTION BUTTONS */}
// // // //                             {item.role === 'user' && item.claimStatus !== -1 && item.claimStatus < 3 && (
// // // //                                 <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-50">
// // // //                                     {/* THIS IS THE FIXED ARROW BUTTON */}
// // // //                                     <button 
// // // //                                         onClick={() => handleStageUpgrade(item)} 
// // // //                                         className="p-3 bg-[#00ced1] text-white rounded-xl hover:scale-110 transition-transform cursor-pointer shadow-sm"
// // // //                                         title="Move to Next Stage"
// // // //                                     >
// // // //                                         <ArrowUpCircle size={22}/>
// // // //                                     </button>
                                    
// // // //                                     <button 
// // // //                                         onClick={() => rejectClaim(item)} 
// // // //                                         className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform cursor-pointer shadow-sm"
// // // //                                         title="Reject Claim"
// // // //                                     >
// // // //                                         <XCircle size={22}/>
// // // //                                     </button>
// // // //                                 </div>
// // // //                             )}
                            
// // // //                             {/* STATUS BADGE */}
// // // //                             <div className="text-right">
// // // //                                 <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Status</p>
// // // //                                 <p className={`text-sm font-black uppercase tracking-widest ${statusInfo.color.split(' ')[0]}`}>
// // // //                                     {statusInfo.label}
// // // //                                 </p>
// // // //                             </div>
                            
// // // //                             <div className="flex gap-3 pl-6 border-l">
// // // //                                 <button onClick={() => startEdit(item)} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-[#00ced1] hover:border-[#00ced1] transition-all"><Edit3 size={18}/></button>
// // // //                                 <button onClick={() => handleDelete(item.id)} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-red-500 hover:border-red-500 transition-all"><Trash2 size={18}/></button>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 )})}
// // // //             </div>
// // // //         </div>
// // // //       </main>

// // // //       <AnimatePresence>
// // // //         {showModal && (
// // // //           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
// // // //             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
// // // //                 <button onClick={cancelEdit} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-400"><X size={24}/></button>
// // // //                 <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{editingId ? 'Update' : 'Register'} <span className={form.type === 'agent' ? 'text-[#00ced1]' : 'text-indigo-600'}>{form.type === 'agent' ? 'Agent' : 'Customer'}</span></h2>
// // // //                 <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">{form.type === 'agent' ? "Will generate: DADADA0001 (Location)" : "Will generate: 0000000001 (Sequential)"}</p>
// // // //                 <form onSubmit={handleFormSubmit} className="space-y-4">
// // // //                   <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
// // // //                   <input type="email" placeholder="Gmail" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
// // // //                   <div className="grid grid-cols-2 gap-4">
// // // //                     <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
// // // //                     <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value, mandal: ''}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
// // // //                   </div>
// // // //                   <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
// // // //                   <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
// // // //                   <button type="submit" className={`w-full py-7 rounded-[2.5rem] font-black text-lg shadow-2xl transition-all mt-6 cursor-pointer ${form.type === 'agent' ? 'bg-[#00ced1] text-white' : 'bg-indigo-600 text-white'}`}>{editingId ? "Update Record" : "Generate & Save"}</button>
// // // //                 </form>
// // // //             </motion.div>
// // // //           </div>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // }



// // // import React, { useState, useEffect } from 'react';
// // // import { fetchLocations, getMandals } from '../services/locationService';
// // // import Logo from '../components/Logo';
// // // import { UserPlus, LogOut, MapPin, Trash2, Edit3, X, ShieldCheck, ArrowUpCircle, XCircle, Users, Briefcase, Clock, Activity, Award, FileText, Eye } from 'lucide-react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import axios from 'axios';

// // // export default function AdminDashboard() {
// // //   const navigate = useNavigate();
// // //   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";
  
// // //   const [locations, setLocations] = useState([]);
// // //   const [mandals, setMandals] = useState([]); 
// // //   const [db, setDb] = useState({ agents: [], users: [] }); 
// // //   const [filterType, setFilterType] = useState("all"); 
  
// // //   // Modals
// // //   const [editingId, setEditingId] = useState(null); 
// // //   const [showModal, setShowModal] = useState(false);
  
// // //   // Documents View State
// // //   const [showDocsModal, setShowDocsModal] = useState(false);
// // //   const [currentDocs, setCurrentDocs] = useState([]);
// // //   const [viewingUser, setViewingUser] = useState("");

// // //   const [form, setForm] = useState({ type: 'user', name: '', email: '', state: '', dist: '', mandal: '', password: '' });

// // //   useEffect(() => { fetchLocations().then(setLocations); fetchData(); }, []);

// // //   const fetchData = async () => {
// // //     try {
// // //       const response = await axios.get(`${API_BASE}/api/users/all`);
// // //       setDb({ agents: response.data.filter(u => u.role === 'agent'), users: response.data.filter(u => u.role === 'user') });
// // //     } catch (e) { console.error("Sync Error"); }
// // //   };

// // //   const handleOpenModal = (type) => {
// // //     setEditingId(null);
// // //     setForm({ type: type, name: '', email: '', state: '', dist: '', mandal: '', password: '' });
// // //     setShowModal(true);
// // //   };

// // //   const startEdit = (item) => {
// // //     setEditingId(item.id);
// // //     setForm({ type: item.role, name: item.name, email: item.email, state: item.state, dist: item.dist, mandal: item.mandal, password: item.password });
// // //     setMandals(getMandals(item.dist)); setShowModal(true);
// // //   };

// // //   // --- NEW: FETCH DOCUMENTS ---
// // //   const handleViewDocs = async (user) => {
// // //     try {
// // //         const res = await axios.get(`${API_BASE}/api/documents/user/${user.id}`);
// // //         setCurrentDocs(res.data);
// // //         setViewingUser(user.name);
// // //         setShowDocsModal(true);
// // //     } catch (error) {
// // //         alert("Could not fetch documents");
// // //     }
// // //   };

// // //   const cancelEdit = () => { setEditingId(null); setShowModal(false); };

// // //   const filteredItems = filterType === 'all' ? [...db.agents, ...db.users] : filterType === 'agent' ? db.agents : filterType === 'user' ? db.users : filterType === 'pending' ? db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3) : filterType === 'settled' ? db.users.filter(u => u.claimStatus === 3) : db.users.filter(u => u.claimStatus === -1);

// // //   const handleStageUpgrade = async (user) => {
// // //     const currentStage = parseInt(user.claimStatus || 0, 10);
// // //     const nextStage = currentStage + 1;
// // //     let statusMessage = "";
// // //     if (nextStage === 1) statusMessage = "STAGE 1 COMPLETED";
// // //     else if (nextStage === 2) statusMessage = "STAGE 2 COMPLETED";
// // //     else if (nextStage === 3) statusMessage = "SETTLED";
// // //     else return;

// // //     if(!window.confirm(`Upgrade Claim to: ${statusMessage}?`)) return;

// // //     try {
// // //         await axios.post(`${API_BASE}/api/users/register`, { ...user, claimStatus: nextStage, statusMessage: statusMessage });
// // //         alert(`Success! Status is now: ${statusMessage}`);
// // //         fetchData();
// // //     } catch (error) { alert("Network Error"); }
// // //   };

// // //   const rejectClaim = async (user) => {
// // //       if(!window.confirm("Are you sure you want to REJECT this claim?")) return;
// // //       try {
// // //         await axios.post(`${API_BASE}/api/users/register`, { ...user, claimStatus: -1, statusMessage: "REJECTED" });
// // //         fetchData();
// // //       } catch (error) { alert("Failed to reject."); }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     if(window.confirm("Delete this user?")) { 
// // //         try { await axios.delete(`${API_BASE}/api/users/${id}`); fetchData(); } 
// // //         catch(e) { alert("Delete failed"); }
// // //     }
// // //   };

// // //   const handleFormSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //         const payload = { ...form, id: editingId || "", role: form.type, claimStatus: editingId ? undefined : 0, statusMessage: editingId ? undefined : "PENDING", createdBy: "ADMIN_MASTER" };
// // //         const res = await axios.post(`${API_BASE}/api/users/register`, payload);
// // //         alert(editingId ? "Updated Successfully" : `SUCCESS! Generated ID: ${res.data.id}`);
// // //         cancelEdit(); 
// // //         fetchData();
// // //     } catch(err) { alert("Registration Failed."); }
// // //   };

// // //   const getStatusInfo = (status) => {
// // //       const s = parseInt(status || 0, 10);
// // //       if (s === -1) return { label: 'REJECTED', color: 'text-red-500 bg-red-50' };
// // //       if (s === 3) return { label: 'SETTLED', color: 'text-green-600 bg-green-50' };
// // //       if (s === 2) return { label: 'STAGE 2 DONE', color: 'text-purple-600 bg-purple-50' };
// // //       if (s === 1) return { label: 'STAGE 1 DONE', color: 'text-blue-600 bg-blue-50' };
// // //       return { label: 'PENDING', color: 'text-[#00ced1] bg-teal-50' };
// // //   };

// // //   const stats = {
// // //     agents: db.agents.length, customers: db.users.length,
// // //     pending: db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length,
// // //     settled: db.users.filter(u => u.claimStatus === 3).length, 
// // //     rejected: db.users.filter(u => u.claimStatus === -1).length
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-[#f8fafc] flex text-left font-sans">
// // //       <aside className="w-[340px] bg-white border-r p-8 fixed h-full flex flex-col z-20 shadow-sm">
// // //         <div className="mb-12"><Logo /></div>
// // //         <nav className="space-y-3 flex-1">
// // //           <button onClick={() => setFilterType('all')} className={`w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase ${filterType === 'all' ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-50'}`}><Activity size={20}/> Dashboard Home</button>
// // //           <div className="h-px bg-slate-100 my-6 mx-4"></div>
// // //           <button onClick={() => handleOpenModal('agent')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase text-[#00ced1] bg-teal-50/50 border border-teal-100 hover:bg-teal-50 transition-all"><Briefcase size={20}/> Register Agent</button>
// // //           <button onClick={() => handleOpenModal('user')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase text-indigo-600 bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition-all"><Users size={20}/> Register Customer</button>
// // //         </nav>
// // //         <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="flex items-center gap-4 text-red-500 font-black p-6 hover:bg-red-50 transition-all"><LogOut size={22}/> Exit System</button>
// // //       </aside>

// // //       <main className="ml-[340px] flex-1 p-16">
// // //         <header className="flex justify-between items-center mb-16 relative">
// // //           <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Admin <span className="text-[#00ced1]">Dashboard</span></h1>
// // //           <div className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white"><div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-[#00ced1] shadow-lg"><ShieldCheck size={28}/></div><div><p className="text-[9px] font-black uppercase text-[#00ced1]">Primary Admin</p><p className="text-xl font-black text-slate-900 leading-none">System Master</p></div></div>
// // //         </header>

// // //         <div className="grid grid-cols-5 gap-6 mb-16">
// // //           {[
// // //             { label: 'Agents', val: stats.agents, type: 'agent', icon: <Briefcase size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
// // //             { label: 'Customers', val: stats.customers, type: 'user', icon: <Users size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
// // //             { label: 'Pending', val: stats.pending, type: 'pending', icon: <Clock size={20}/>, color: 'text-[#00ced1]', bg: 'bg-teal-50' },
// // //             { label: 'Settled', val: stats.settled, type: 'settled', icon: <Award size={20}/>, color: 'text-green-600', bg: 'bg-green-50' },
// // //             { label: 'Rejected', val: stats.rejected, type: 'rejected', icon: <XCircle size={20}/>, color: 'text-red-500', bg: 'bg-red-50' },
// // //           ].map((stat, i) => (
// // //             <button key={i} onClick={() => setFilterType(stat.type)} className={`p-8 rounded-[3rem] border-2 transition-all text-left shadow-sm ${filterType === stat.type ? 'border-[#00ced1] bg-white ring-8 ring-teal-50' : 'border-transparent bg-white hover:shadow-xl'}`}>
// // //               <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>{stat.icon}</div>
// // //               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
// // //               <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
// // //             </button>
// // //           ))}
// // //         </div>

// // //         <div className="bg-white rounded-[4rem] shadow-2xl p-12 border border-white">
// // //             <h3 className="font-black text-3xl capitalize text-slate-900 mb-10">Directory View: {filterType}</h3>
// // //             <div className="grid gap-4">
// // //                 {filteredItems.map(item => {
// // //                     const statusInfo = getStatusInfo(item.claimStatus); 
// // //                     return (
// // //                     <div key={item.id} className="flex justify-between items-center p-6 bg-[#fcfdfe] rounded-[2.5rem] border border-slate-50 hover:border-[#00ced1] transition-all">
// // //                         <div className="flex items-center gap-6 w-1/2">
// // //                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${item.role === 'agent' ? 'bg-teal-50 text-[#00ced1]' : 'bg-indigo-50 text-indigo-600'}`}>
// // //                                 {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
// // //                             </div>
// // //                             <div className="text-left">
// // //                                 <p className="font-black text-2xl text-slate-900">{item.name}</p>
// // //                                 <div className="flex flex-col gap-1 mt-1">
// // //                                     <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1"><MapPin size={12}/> {item.mandal}, {item.dist}</p>
// // //                                     <div className="bg-slate-100 px-3 py-1 rounded-md w-fit border border-slate-200">
// // //                                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider mr-2">ID:</span>
// // //                                         <span className="text-sm font-bold text-[#00ced1] font-mono">{item.id || "PROCESSING..."}</span>
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>

// // //                         <div className="flex items-center gap-6 justify-end w-1/2">
// // //                             {/* NEW: View Docs Button */}
// // //                             {item.role === 'user' && (
// // //                                 <button onClick={() => handleViewDocs(item)} className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all" title="View Documents">
// // //                                     <FileText size={18} />
// // //                                 </button>
// // //                             )}

// // //                             {item.role === 'user' && item.claimStatus !== -1 && item.claimStatus < 3 && (
// // //                                 <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-50">
// // //                                     <button onClick={() => handleStageUpgrade(item)} className="p-3 bg-[#00ced1] text-white rounded-xl hover:scale-110 transition-transform cursor-pointer shadow-sm" title="Next Stage"><ArrowUpCircle size={22}/></button>
// // //                                     <button onClick={() => rejectClaim(item)} className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform cursor-pointer shadow-sm" title="Reject"><XCircle size={22}/></button>
// // //                                 </div>
// // //                             )}
                            
// // //                             <div className="text-right">
// // //                                 <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Status</p>
// // //                                 <p className={`text-sm font-black uppercase tracking-widest ${statusInfo.color.split(' ')[0]}`}>{statusInfo.label}</p>
// // //                             </div>
                            
// // //                             <div className="flex gap-3 pl-6 border-l">
// // //                                 <button onClick={() => startEdit(item)} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-[#00ced1] hover:border-[#00ced1] transition-all"><Edit3 size={18}/></button>
// // //                                 <button onClick={() => handleDelete(item.id)} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-red-500 hover:border-red-500 transition-all"><Trash2 size={18}/></button>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 )})}
// // //             </div>
// // //         </div>
// // //       </main>

// // //       {/* --- EDIT MODAL --- */}
// // //       <AnimatePresence>
// // //         {showModal && (
// // //           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
// // //             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
// // //                 <button onClick={cancelEdit} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-400"><X size={24}/></button>
// // //                 <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{editingId ? 'Update' : 'Register'} <span className={form.type === 'agent' ? 'text-[#00ced1]' : 'text-indigo-600'}>{form.type === 'agent' ? 'Agent' : 'Customer'}</span></h2>
// // //                 <form onSubmit={handleFormSubmit} className="space-y-4 mt-6">
// // //                   <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
// // //                   <input type="email" placeholder="Gmail" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
// // //                   <div className="grid grid-cols-2 gap-4">
// // //                     <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
// // //                     <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value, mandal: ''}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
// // //                   </div>
// // //                   <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
// // //                   <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
// // //                   <button type="submit" className={`w-full py-7 rounded-[2.5rem] font-black text-lg shadow-2xl transition-all mt-6 cursor-pointer ${form.type === 'agent' ? 'bg-[#00ced1] text-white' : 'bg-indigo-600 text-white'}`}>{editingId ? "Update Record" : "Generate & Save"}</button>
// // //                 </form>
// // //             </motion.div>
// // //           </div>
// // //         )}
// // //       </AnimatePresence>

// // //       {/* --- DOCUMENTS MODAL --- */}
// // //       <AnimatePresence>
// // //         {showDocsModal && (
// // //           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
// // //              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-10 shadow-3xl border border-white relative">
// // //                  <button onClick={() => setShowDocsModal(false)} className="absolute top-8 right-8 p-3 bg-slate-50 hover:bg-slate-200 rounded-full transition-all text-slate-400"><X size={24}/></button>
// // //                  <h2 className="text-3xl font-black text-slate-900 mb-2">Documents for <span className="text-indigo-600">{viewingUser}</span></h2>
// // //                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Secure Cloud Storage View</p>
                 
// // //                  {currentDocs.length === 0 ? (
// // //                     <div className="py-20 text-center text-slate-400 font-bold">No documents uploaded yet.</div>
// // //                  ) : (
// // //                     <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
// // //                         {currentDocs.map(doc => (
// // //                             <div key={doc.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
// // //                                 <div className="h-48 rounded-xl bg-white overflow-hidden flex items-center justify-center border mb-3">
// // //                                     <img 
// // //                                         src={`${API_BASE}/api/documents/view/${doc.id}`} 
// // //                                         alt={doc.fileName} 
// // //                                         className="w-full h-full object-cover hover:scale-105 transition-transform"
// // //                                     />
// // //                                 </div>
// // //                                 <p className="text-[10px] font-bold text-slate-500 truncate">{doc.fileName}</p>
// // //                                 <a 
// // //                                     href={`${API_BASE}/api/documents/view/${doc.id}`} 
// // //                                     target="_blank" 
// // //                                     rel="noreferrer"
// // //                                     className="block text-center mt-2 bg-indigo-600 text-white py-2 rounded-lg text-xs font-bold"
// // //                                 >
// // //                                     View Full Size
// // //                                 </a>
// // //                             </div>
// // //                         ))}
// // //                     </div>
// // //                  )}
// // //              </motion.div>
// // //           </div>
// // //         )}
// // //       </AnimatePresence>
// // //     </div>
// // //   );
// // // }



// // import React, { useState, useEffect } from 'react';
// // import { fetchLocations, getMandals } from '../services/locationService';
// // import Logo from '../components/Logo';
// // import { UserPlus, LogOut, MapPin, Trash2, Edit3, X, ShieldCheck, ArrowUpCircle, XCircle, Users, Briefcase, Clock, Activity, Award, FileText } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import axios from 'axios';

// // export default function AdminDashboard() {
// //   const navigate = useNavigate();
// //   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";
  
// //   const [locations, setLocations] = useState([]);
// //   const [mandals, setMandals] = useState([]); 
// //   const [db, setDb] = useState({ agents: [], users: [] }); 
// //   const [filterType, setFilterType] = useState("all"); 
// //   const [editingId, setEditingId] = useState(null); 
// //   const [showModal, setShowModal] = useState(false);
  
// //   // --- NEW: DOCUMENT VIEW STATE ---
// //   const [showDocsModal, setShowDocsModal] = useState(false);
// //   const [userDocs, setUserDocs] = useState([]);
// //   const [viewingUser, setViewingUser] = useState("");

// //   const [form, setForm] = useState({ type: 'user', name: '', email: '', state: '', dist: '', mandal: '', password: '' });

// //   useEffect(() => { fetchLocations().then(setLocations); fetchData(); }, []);

// //   const fetchData = async () => {
// //     try {
// //       const response = await axios.get(`${API_BASE}/api/users/all`);
// //       setDb({ agents: response.data.filter(u => u.role === 'agent'), users: response.data.filter(u => u.role === 'user') });
// //     } catch (e) { console.error("Sync Error"); }
// //   };

// //   const handleOpenModal = (type) => {
// //     setEditingId(null);
// //     setForm({ type: type, name: '', email: '', state: '', dist: '', mandal: '', password: '' });
// //     setShowModal(true);
// //   };

// //   // --- NEW: FETCH AND SHOW DOCUMENTS ---
// //   const handleViewDocs = async (user) => {
// //     try {
// //         const res = await axios.get(`${API_BASE}/api/documents/user/${user.id}`);
// //         setUserDocs(res.data);
// //         setViewingUser(user.name);
// //         setShowDocsModal(true);
// //     } catch (e) {
// //         alert("Failed to fetch documents.");
// //     }
// //   };

// //   const startEdit = (item) => {
// //     setEditingId(item.id);
// //     setForm({ type: item.role, name: item.name, email: item.email, state: item.state, dist: item.dist, mandal: item.mandal, password: item.password });
// //     setMandals(getMandals(item.dist)); setShowModal(true);
// //   };

// //   const cancelEdit = () => { setEditingId(null); setShowModal(false); };

// //   const filteredItems = filterType === 'all' ? [...db.agents, ...db.users] : filterType === 'agent' ? db.agents : filterType === 'user' ? db.users : filterType === 'pending' ? db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3) : filterType === 'settled' ? db.users.filter(u => u.claimStatus === 3) : db.users.filter(u => u.claimStatus === -1);

// //   const handleStageUpgrade = async (user) => {
// //     const currentStage = parseInt(user.claimStatus || 0, 10);
// //     const nextStage = currentStage + 1;
// //     let statusMessage = "";
// //     if (nextStage === 1) statusMessage = "STAGE 1 COMPLETED";
// //     else if (nextStage === 2) statusMessage = "STAGE 2 COMPLETED";
// //     else if (nextStage === 3) statusMessage = "SETTLED";
// //     else return;

// //     if(!window.confirm(`Upgrade Claim to: ${statusMessage}?`)) return;

// //     try {
// //         await axios.post(`${API_BASE}/api/users/register`, { ...user, claimStatus: nextStage, statusMessage: statusMessage });
// //         alert(`Success! Status is now: ${statusMessage}`);
// //         fetchData();
// //     } catch (error) { alert("Network Error"); }
// //   };

// //   const rejectClaim = async (user) => {
// //       if(!window.confirm("Are you sure you want to REJECT this claim?")) return;
// //       try {
// //         await axios.post(`${API_BASE}/api/users/register`, { ...user, claimStatus: -1, statusMessage: "REJECTED" });
// //         fetchData();
// //       } catch (error) { alert("Failed to reject."); }
// //   };

// //   const handleDelete = async (id) => {
// //     if(window.confirm("Delete this user?")) { 
// //         try { await axios.delete(`${API_BASE}/api/users/${id}`); fetchData(); } 
// //         catch(e) { alert("Delete failed"); }
// //     }
// //   };

// //   const handleFormSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //         const payload = { ...form, id: editingId || "", role: form.type, claimStatus: editingId ? undefined : 0, statusMessage: editingId ? undefined : "PENDING", createdBy: "ADMIN_MASTER" };
// //         const res = await axios.post(`${API_BASE}/api/users/register`, payload);
// //         alert(editingId ? "Updated Successfully" : `SUCCESS! Generated ID: ${res.data.id}`);
// //         cancelEdit(); 
// //         fetchData();
// //     } catch(err) { alert("Registration Failed."); }
// //   };

// //   const getStatusInfo = (status) => {
// //       const s = parseInt(status || 0, 10);
// //       if (s === -1) return { label: 'REJECTED', color: 'text-red-500 bg-red-50' };
// //       if (s === 3) return { label: 'SETTLED', color: 'text-green-600 bg-green-50' };
// //       if (s === 2) return { label: 'STAGE 2 DONE', color: 'text-purple-600 bg-purple-50' };
// //       if (s === 1) return { label: 'STAGE 1 DONE', color: 'text-blue-600 bg-blue-50' };
// //       return { label: 'PENDING', color: 'text-[#00ced1] bg-teal-50' };
// //   };

// //   const stats = {
// //     agents: db.agents.length, customers: db.users.length,
// //     pending: db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length,
// //     settled: db.users.filter(u => u.claimStatus === 3).length, 
// //     rejected: db.users.filter(u => u.claimStatus === -1).length
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#f8fafc] flex text-left font-sans">
// //       <aside className="w-[340px] bg-white border-r p-8 fixed h-full flex flex-col z-20 shadow-sm">
// //         <div className="mb-12"><Logo /></div>
// //         <nav className="space-y-3 flex-1">
// //           <button onClick={() => setFilterType('all')} className={`w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase ${filterType === 'all' ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-50'}`}><Activity size={20}/> Dashboard Home</button>
// //           <div className="h-px bg-slate-100 my-6 mx-4"></div>
// //           <button onClick={() => handleOpenModal('agent')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase text-[#00ced1] bg-teal-50/50 border border-teal-100 hover:bg-teal-50 transition-all"><Briefcase size={20}/> Register Agent</button>
// //           <button onClick={() => handleOpenModal('user')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase text-indigo-600 bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition-all"><Users size={20}/> Register Customer</button>
// //         </nav>
// //         <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="flex items-center gap-4 text-red-500 font-black p-6 hover:bg-red-50 transition-all"><LogOut size={22}/> Exit System</button>
// //       </aside>

// //       <main className="ml-[340px] flex-1 p-16">
// //         <header className="flex justify-between items-center mb-16 relative">
// //           <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Admin <span className="text-[#00ced1]">Dashboard</span></h1>
// //           <div className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white"><div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-[#00ced1] shadow-lg"><ShieldCheck size={28}/></div><div><p className="text-[9px] font-black uppercase text-[#00ced1]">Primary Admin</p><p className="text-xl font-black text-slate-900 leading-none">System Master</p></div></div>
// //         </header>

// //         <div className="grid grid-cols-5 gap-6 mb-16">
// //           {[
// //             { label: 'Agents', val: stats.agents, type: 'agent', icon: <Briefcase size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
// //             { label: 'Customers', val: stats.customers, type: 'user', icon: <Users size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
// //             { label: 'Pending', val: stats.pending, type: 'pending', icon: <Clock size={20}/>, color: 'text-[#00ced1]', bg: 'bg-teal-50' },
// //             { label: 'Settled', val: stats.settled, type: 'settled', icon: <Award size={20}/>, color: 'text-green-600', bg: 'bg-green-50' },
// //             { label: 'Rejected', val: stats.rejected, type: 'rejected', icon: <XCircle size={20}/>, color: 'text-red-500', bg: 'bg-red-50' },
// //           ].map((stat, i) => (
// //             <button key={i} onClick={() => setFilterType(stat.type)} className={`p-8 rounded-[3rem] border-2 transition-all text-left shadow-sm ${filterType === stat.type ? 'border-[#00ced1] bg-white ring-8 ring-teal-50' : 'border-transparent bg-white hover:shadow-xl'}`}>
// //               <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>{stat.icon}</div>
// //               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
// //               <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
// //             </button>
// //           ))}
// //         </div>

// //         <div className="bg-white rounded-[4rem] shadow-2xl p-12 border border-white">
// //             <h3 className="font-black text-3xl capitalize text-slate-900 mb-10">Directory View: {filterType}</h3>
// //             <div className="grid gap-4">
// //                 {filteredItems.map(item => {
// //                     const statusInfo = getStatusInfo(item.claimStatus); 
// //                     return (
// //                     <div key={item.id} className="flex justify-between items-center p-6 bg-[#fcfdfe] rounded-[2.5rem] border border-slate-50 hover:border-[#00ced1] transition-all">
// //                         <div className="flex items-center gap-6 w-1/2">
// //                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${item.role === 'agent' ? 'bg-teal-50 text-[#00ced1]' : 'bg-indigo-50 text-indigo-600'}`}>
// //                                 {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
// //                             </div>
// //                             <div className="text-left">
// //                                 <p className="font-black text-2xl text-slate-900">{item.name}</p>
// //                                 <div className="flex flex-col gap-1 mt-1">
// //                                     <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1"><MapPin size={12}/> {item.mandal}, {item.dist}</p>
// //                                     <div className="bg-slate-100 px-3 py-1 rounded-md w-fit border border-slate-200">
// //                                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider mr-2">ID:</span>
// //                                         <span className="text-sm font-bold text-[#00ced1] font-mono">{item.id || "PROCESSING..."}</span>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         <div className="flex items-center gap-6 justify-end w-1/2">
// //                             {/* --- NEW: VIEW DOCS BUTTON FOR USERS --- */}
// //                             {item.role === 'user' && (
// //                                 <button onClick={() => handleViewDocs(item)} className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title="View Documents">
// //                                     <FileText size={22}/>
// //                                 </button>
// //                             )}

// //                             {item.role === 'user' && item.claimStatus !== -1 && item.claimStatus < 3 && (
// //                                 <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-50">
// //                                     <button onClick={() => handleStageUpgrade(item)} className="p-3 bg-[#00ced1] text-white rounded-xl hover:scale-110 transition-transform cursor-pointer shadow-sm" title="Move to Next Stage"><ArrowUpCircle size={22}/></button>
// //                                     <button onClick={() => rejectClaim(item)} className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform cursor-pointer shadow-sm" title="Reject Claim"><XCircle size={22}/></button>
// //                                 </div>
// //                             )}
                            
// //                             <div className="text-right">
// //                                 <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Status</p>
// //                                 <p className={`text-sm font-black uppercase tracking-widest ${statusInfo.color.split(' ')[0]}`}>{statusInfo.label}</p>
// //                             </div>
                            
// //                             <div className="flex gap-3 pl-6 border-l">
// //                                 <button onClick={() => startEdit(item)} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-[#00ced1] hover:border-[#00ced1] transition-all"><Edit3 size={18}/></button>
// //                                 <button onClick={() => handleDelete(item.id)} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-red-500 hover:border-red-500 transition-all"><Trash2 size={18}/></button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )})}
// //             </div>
// //         </div>
// //       </main>

// //       {/* --- EDIT MODAL --- */}
// //       <AnimatePresence>
// //         {showModal && (
// //           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
// //             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
// //                 <button onClick={cancelEdit} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-400"><X size={24}/></button>
// //                 <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{editingId ? 'Update' : 'Register'} <span className={form.type === 'agent' ? 'text-[#00ced1]' : 'text-indigo-600'}>{form.type === 'agent' ? 'Agent' : 'Customer'}</span></h2>
// //                 <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">{form.type === 'agent' ? "Will generate: DADADA0001 (Location)" : "Will generate: 0000000001 (Sequential)"}</p>
// //                 <form onSubmit={handleFormSubmit} className="space-y-4">
// //                   <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
// //                   <input type="email" placeholder="Gmail" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
// //                     <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value, mandal: ''}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
// //                   </div>
// //                   <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
// //                   <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
// //                   <button type="submit" className={`w-full py-7 rounded-[2.5rem] font-black text-lg shadow-2xl transition-all mt-6 cursor-pointer ${form.type === 'agent' ? 'bg-[#00ced1] text-white' : 'bg-indigo-600 text-white'}`}>{editingId ? "Update Record" : "Generate & Save"}</button>
// //                 </form>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>

// //       {/* --- NEW: DOCUMENTS VIEW MODAL --- */}
// //       <AnimatePresence>
// //         {showDocsModal && (
// //             <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
// //                 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[3rem] p-12 shadow-3xl border border-white relative">
// //                     <button onClick={() => setShowDocsModal(false)} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-slate-200 rounded-full transition-all text-slate-400"><X size={24}/></button>
// //                     <h2 className="text-3xl font-black text-slate-900 mb-2">Documents for <span className="text-[#00ced1]">{viewingUser}</span></h2>
// //                     <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">Secure Cloud Retrieval</p>
                    
// //                     {userDocs.length === 0 ? (
// //                         <div className="p-10 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
// //                             <p className="font-bold text-slate-400">No documents uploaded by this user.</p>
// //                         </div>
// //                     ) : (
// //                         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
// //                             {userDocs.map(doc => (
// //                                 <div key={doc.id} className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
// //                                     <div className="bg-white rounded-2xl h-48 flex items-center justify-center overflow-hidden border border-slate-100 mb-4">
// //                                         <img src={`${API_BASE}/api/documents/download/${doc.id}`} alt="Doc" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
// //                                     </div>
// //                                     <p className="font-bold text-xs text-slate-500 truncate mb-3">{doc.fileName}</p>
// //                                     <a href={`${API_BASE}/api/documents/download/${doc.id}`} target="_blank" rel="noreferrer" className="block w-full text-center bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00ced1] transition-colors">
// //                                         View Full Size
// //                                     </a>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     )}
// //                 </motion.div>
// //             </div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }




// import React, { useState, useEffect } from 'react';
// import { fetchLocations, getMandals } from '../services/locationService';
// import Logo from '../components/Logo';
// import { UserPlus, LogOut, MapPin, Trash2, Edit3, X, ShieldCheck, ArrowUpCircle, XCircle, Users, Briefcase, Clock, Activity, Award, FileText } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";
  
//   const [locations, setLocations] = useState([]);
//   const [mandals, setMandals] = useState([]); 
//   const [db, setDb] = useState({ agents: [], users: [] }); 
//   const [filterType, setFilterType] = useState("all"); 
//   const [editingId, setEditingId] = useState(null); 
//   const [showModal, setShowModal] = useState(false);
  
//   // --- DOCUMENT VIEW STATE ---
//   const [showDocsModal, setShowDocsModal] = useState(false);
//   const [userDocs, setUserDocs] = useState([]);
//   const [viewingUser, setViewingUser] = useState("");

//   const [form, setForm] = useState({ type: 'user', name: '', email: '', state: '', dist: '', mandal: '', password: '' });

//   useEffect(() => { fetchLocations().then(setLocations); fetchData(); }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${API_BASE}/api/users/all`);
//       setDb({ agents: response.data.filter(u => u.role === 'agent'), users: response.data.filter(u => u.role === 'user') });
//     } catch (e) { console.error("Sync Error"); }
//   };

//   const handleOpenModal = (type) => {
//     setEditingId(null);
//     setForm({ type: type, name: '', email: '', state: '', dist: '', mandal: '', password: '' });
//     setShowModal(true);
//   };

//   const handleViewDocs = async (user) => {
//     try {
//         const res = await axios.get(`${API_BASE}/api/documents/user/${user.id}`);
//         setUserDocs(res.data);
//         setViewingUser(user.name);
//         setShowDocsModal(true);
//     } catch (e) {
//         alert("Failed to fetch documents.");
//     }
//   };

//   const startEdit = (item) => {
//     setEditingId(item.id);
//     setForm({ type: item.role, name: item.name, email: item.email, state: item.state, dist: item.dist, mandal: item.mandal, password: item.password });
//     setMandals(getMandals(item.dist)); setShowModal(true);
//   };

//   const cancelEdit = () => { setEditingId(null); setShowModal(false); };

//   const filteredItems = filterType === 'all' ? [...db.agents, ...db.users] : filterType === 'agent' ? db.agents : filterType === 'user' ? db.users : filterType === 'pending' ? db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3) : filterType === 'settled' ? db.users.filter(u => u.claimStatus === 3) : db.users.filter(u => u.claimStatus === -1);

//   const handleStageUpgrade = async (user) => {
//     const currentStage = parseInt(user.claimStatus || 0, 10);
//     const nextStage = currentStage + 1;
//     let statusMessage = "";
//     if (nextStage === 1) statusMessage = "STAGE 1 COMPLETED";
//     else if (nextStage === 2) statusMessage = "STAGE 2 COMPLETED";
//     else if (nextStage === 3) statusMessage = "SETTLED";
//     else return;

//     if(!window.confirm(`Upgrade Claim to: ${statusMessage}?`)) return;

//     try {
//         await axios.post(`${API_BASE}/api/users/register`, { ...user, claimStatus: nextStage, statusMessage: statusMessage });
//         alert(`Success! Status is now: ${statusMessage}`);
//         fetchData();
//     } catch (error) { alert("Network Error"); }
//   };

//   const rejectClaim = async (user) => {
//       if(!window.confirm("Are you sure you want to REJECT this claim?")) return;
//       try {
//         await axios.post(`${API_BASE}/api/users/register`, { ...user, claimStatus: -1, statusMessage: "REJECTED" });
//         fetchData();
//       } catch (error) { alert("Failed to reject."); }
//   };

//   const handleDelete = async (id) => {
//     if(window.confirm("Delete this user?")) { 
//         try { await axios.delete(`${API_BASE}/api/users/${id}`); fetchData(); } 
//         catch(e) { alert("Delete failed"); }
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const payload = { ...form, id: editingId || "", role: form.type, claimStatus: editingId ? undefined : 0, statusMessage: editingId ? undefined : "PENDING", createdBy: "ADMIN_MASTER" };
//         const res = await axios.post(`${API_BASE}/api/users/register`, payload);
//         alert(editingId ? "Updated Successfully" : `SUCCESS! Generated ID: ${res.data.id}`);
//         cancelEdit(); 
//         fetchData();
//     } catch(err) { alert("Registration Failed."); }
//   };

//   const getStatusInfo = (status) => {
//       const s = parseInt(status || 0, 10);
//       if (s === -1) return { label: 'REJECTED', color: 'text-red-500 bg-red-50' };
//       if (s === 3) return { label: 'SETTLED', color: 'text-green-600 bg-green-50' };
//       if (s === 2) return { label: 'STAGE 2 DONE', color: 'text-purple-600 bg-purple-50' };
//       if (s === 1) return { label: 'STAGE 1 DONE', color: 'text-blue-600 bg-blue-50' };
//       return { label: 'PENDING', color: 'text-[#00ced1] bg-teal-50' };
//   };

//   const stats = {
//     agents: db.agents.length, customers: db.users.length,
//     pending: db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length,
//     settled: db.users.filter(u => u.claimStatus === 3).length, 
//     rejected: db.users.filter(u => u.claimStatus === -1).length
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex text-left font-sans">
//       <aside className="w-[340px] bg-white border-r p-8 fixed h-full flex flex-col z-20 shadow-sm">
//         <div className="mb-12"><Logo /></div>
//         <nav className="space-y-3 flex-1">
//           <button onClick={() => setFilterType('all')} className={`w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase ${filterType === 'all' ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-50'}`}><Activity size={20}/> Dashboard Home</button>
//           <div className="h-px bg-slate-100 my-6 mx-4"></div>
//           <button onClick={() => handleOpenModal('agent')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase text-[#00ced1] bg-teal-50/50 border border-teal-100 hover:bg-teal-50 transition-all"><Briefcase size={20}/> Register Agent</button>
//           <button onClick={() => handleOpenModal('user')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase text-indigo-600 bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition-all"><Users size={20}/> Register Customer</button>
//         </nav>
//         <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="flex items-center gap-4 text-red-500 font-black p-6 hover:bg-red-50 transition-all"><LogOut size={22}/> Exit System</button>
//       </aside>

//       <main className="ml-[340px] flex-1 p-16">
//         <header className="flex justify-between items-center mb-16 relative">
//           <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Admin <span className="text-[#00ced1]">Dashboard</span></h1>
//           <div className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white"><div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-[#00ced1] shadow-lg"><ShieldCheck size={28}/></div><div><p className="text-[9px] font-black uppercase text-[#00ced1]">Primary Admin</p><p className="text-xl font-black text-slate-900 leading-none">System Master</p></div></div>
//         </header>

//         <div className="grid grid-cols-5 gap-6 mb-16">
//           {[
//             { label: 'Agents', val: stats.agents, type: 'agent', icon: <Briefcase size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
//             { label: 'Customers', val: stats.customers, type: 'user', icon: <Users size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
//             { label: 'Pending', val: stats.pending, type: 'pending', icon: <Clock size={20}/>, color: 'text-[#00ced1]', bg: 'bg-teal-50' },
//             { label: 'Settled', val: stats.settled, type: 'settled', icon: <Award size={20}/>, color: 'text-green-600', bg: 'bg-green-50' },
//             { label: 'Rejected', val: stats.rejected, type: 'rejected', icon: <XCircle size={20}/>, color: 'text-red-500', bg: 'bg-red-50' },
//           ].map((stat, i) => (
//             <button key={i} onClick={() => setFilterType(stat.type)} className={`p-8 rounded-[3rem] border-2 transition-all text-left shadow-sm ${filterType === stat.type ? 'border-[#00ced1] bg-white ring-8 ring-teal-50' : 'border-transparent bg-white hover:shadow-xl'}`}>
//               <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>{stat.icon}</div>
//               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
//               <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
//             </button>
//           ))}
//         </div>

//         <div className="bg-white rounded-[4rem] shadow-2xl p-12 border border-white">
//             <h3 className="font-black text-3xl capitalize text-slate-900 mb-10">Directory View: {filterType}</h3>
//             <div className="grid gap-4">
//                 {filteredItems.map(item => {
//                     const statusInfo = getStatusInfo(item.claimStatus); 
//                     return (
//                     <div key={item.id} className="flex justify-between items-center p-6 bg-[#fcfdfe] rounded-[2.5rem] border border-slate-50 hover:border-[#00ced1] transition-all">
//                         <div className="flex items-center gap-6 w-1/2">
//                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${item.role === 'agent' ? 'bg-teal-50 text-[#00ced1]' : 'bg-indigo-50 text-indigo-600'}`}>
//                                 {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
//                             </div>
//                             <div className="text-left">
//                                 <p className="font-black text-2xl text-slate-900">{item.name}</p>
//                                 <div className="flex flex-col gap-1 mt-1">
//                                     <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1"><MapPin size={12}/> {item.mandal}, {item.dist}</p>
//                                     <div className="bg-slate-100 px-3 py-1 rounded-md w-fit border border-slate-200">
//                                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider mr-2">ID:</span>
//                                         <span className="text-sm font-bold text-[#00ced1] font-mono">{item.id || "PROCESSING..."}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-6 justify-end w-1/2">
//                             {/* VIEW DOCS BUTTON */}
//                             {item.role === 'user' && (
//                                 <button onClick={() => handleViewDocs(item)} className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title="View Documents">
//                                     <FileText size={22}/>
//                                 </button>
//                             )}
                            
//                             {item.role === 'user' && item.claimStatus !== -1 && item.claimStatus < 3 && (
//                                 <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-50">
//                                     <button onClick={() => handleStageUpgrade(item)} className="p-3 bg-[#00ced1] text-white rounded-xl hover:scale-110 transition-transform cursor-pointer shadow-sm" title="Move to Next Stage"><ArrowUpCircle size={22}/></button>
//                                     <button onClick={() => rejectClaim(item)} className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform cursor-pointer shadow-sm" title="Reject Claim"><XCircle size={22}/></button>
//                                 </div>
//                             )}
                            
//                             <div className="text-right">
//                                 <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Status</p>
//                                 <p className={`text-sm font-black uppercase tracking-widest ${statusInfo.color.split(' ')[0]}`}>{statusInfo.label}</p>
//                             </div>
                            
//                             <div className="flex gap-3 pl-6 border-l">
//                                 <button onClick={() => startEdit(item)} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-[#00ced1] hover:border-[#00ced1] transition-all"><Edit3 size={18}/></button>
//                                 <button onClick={() => handleDelete(item.id)} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-red-500 hover:border-red-500 transition-all"><Trash2 size={18}/></button>
//                             </div>
//                         </div>
//                     </div>
//                 )})}
//             </div>
//         </div>
//       </main>

//       {/* --- EDIT MODAL --- */}
//       <AnimatePresence>
//         {showModal && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
//             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
//                 <button onClick={cancelEdit} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-400"><X size={24}/></button>
//                 <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{editingId ? 'Update' : 'Register'} <span className={form.type === 'agent' ? 'text-[#00ced1]' : 'text-indigo-600'}>{form.type === 'agent' ? 'Agent' : 'Customer'}</span></h2>
//                 <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">{form.type === 'agent' ? "Will generate: DADADA0001 (Location)" : "Will generate: 0000000001 (Sequential)"}</p>
//                 <form onSubmit={handleFormSubmit} className="space-y-4">
//                   <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
//                   <input type="email" placeholder="Gmail" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
//                   <div className="grid grid-cols-2 gap-4">
//                     <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
//                     <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value, mandal: ''}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
//                   </div>
//                   <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
//                   <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
//                   <button type="submit" className={`w-full py-7 rounded-[2.5rem] font-black text-lg shadow-2xl transition-all mt-6 cursor-pointer ${form.type === 'agent' ? 'bg-[#00ced1] text-white' : 'bg-indigo-600 text-white'}`}>{editingId ? "Update Record" : "Generate & Save"}</button>
//                 </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* --- DOCUMENTS MODAL (UPDATED FOR PDF) --- */}
//       <AnimatePresence>
//         {showDocsModal && (
//             <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
//                 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[3rem] p-12 shadow-3xl border border-white relative">
//                     <button onClick={() => setShowDocsModal(false)} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-slate-200 rounded-full transition-all text-slate-400"><X size={24}/></button>
//                     <h2 className="text-3xl font-black text-slate-900 mb-2">Documents for <span className="text-[#00ced1]">{viewingUser}</span></h2>
//                     <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">Secure Cloud Retrieval</p>
                    
//                     {userDocs.length === 0 ? (
//                         <div className="p-10 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
//                             <p className="font-bold text-slate-400">No documents uploaded by this user.</p>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {userDocs.map(doc => {
//                                 const downloadUrl = `${API_BASE}/api/documents/download/${doc.id}`;
//                                 // Check if it's a PDF to render iframe, else img
//                                 const isPdf = doc.fileName.toLowerCase().endsWith('.pdf') || (doc.fileType && doc.fileType.includes('pdf'));

//                                 return (
//                                     <div key={doc.id} className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col">
//                                         <div className="bg-white rounded-2xl h-48 flex items-center justify-center overflow-hidden border border-slate-100 mb-4 relative group">
//                                             {isPdf ? (
//                                                 <iframe src={downloadUrl + "#toolbar=0"} className="w-full h-full object-cover pointer-events-none" title="PDF Preview"></iframe>
//                                             ) : (
//                                                 <img src={downloadUrl} alt="Doc" className="w-full h-full object-cover"/>
//                                             )}
//                                         </div>
//                                         <p className="font-bold text-xs text-slate-500 truncate mb-3" title={doc.fileName}>{doc.fileName}</p>
//                                         <a href={downloadUrl} target="_blank" rel="noreferrer" className="mt-auto block w-full text-center bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00ced1] transition-colors">
//                                             {isPdf ? "Open PDF" : "View Image"}
//                                         </a>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </motion.div>
//             </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { fetchLocations, getMandals } from '../services/locationService';
import Logo from '../components/Logo';
import { UserPlus, LogOut, MapPin, Trash2, Edit3, X, ShieldCheck, ArrowUpCircle, XCircle, Users, Briefcase, Clock, Activity, Award, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";
  
  const [locations, setLocations] = useState([]);
  const [mandals, setMandals] = useState([]); 
  const [db, setDb] = useState({ agents: [], users: [] }); 
  const [filterType, setFilterType] = useState("all"); 
  const [editingId, setEditingId] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  
  // --- DOCUMENT VIEW STATE ---
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [userDocs, setUserDocs] = useState([]);
  const [viewingUser, setViewingUser] = useState("");

  const [form, setForm] = useState({ type: 'user', name: '', email: '', state: '', dist: '', mandal: '', password: '' });

  useEffect(() => { fetchLocations().then(setLocations); fetchData(); }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/users/all`);
      setDb({ agents: response.data.filter(u => u.role === 'agent'), users: response.data.filter(u => u.role === 'user') });
    } catch (e) { console.error("Sync Error"); }
  };

  const handleOpenModal = (type) => {
    setEditingId(null);
    setForm({ type: type, name: '', email: '', state: '', dist: '', mandal: '', password: '' });
    setShowModal(true);
  };

  const handleViewDocs = async (user) => {
    try {
        const res = await axios.get(`${API_BASE}/api/documents/user/${user.id}`);
        setUserDocs(res.data);
        setViewingUser(user.name);
        setShowDocsModal(true);
    } catch (e) {
        alert("Failed to fetch documents.");
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ type: item.role, name: item.name, email: item.email, state: item.state, dist: item.dist, mandal: item.mandal, password: item.password });
    setMandals(getMandals(item.dist)); setShowModal(true);
  };

  const cancelEdit = () => { setEditingId(null); setShowModal(false); };

  const filteredItems = filterType === 'all' ? [...db.agents, ...db.users] : filterType === 'agent' ? db.agents : filterType === 'user' ? db.users : filterType === 'pending' ? db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3) : filterType === 'settled' ? db.users.filter(u => u.claimStatus === 3) : db.users.filter(u => u.claimStatus === -1);

  const handleStageUpgrade = async (user) => {
    const currentStage = parseInt(user.claimStatus || 0, 10);
    const nextStage = currentStage + 1;
    let statusMessage = "";
    if (nextStage === 1) statusMessage = "STAGE 1 COMPLETED";
    else if (nextStage === 2) statusMessage = "STAGE 2 COMPLETED";
    else if (nextStage === 3) statusMessage = "SETTLED";
    else return;

    if(!window.confirm(`Upgrade Claim to: ${statusMessage}?`)) return;

    try {
        await axios.post(`${API_BASE}/api/users/register`, { ...user, claimStatus: nextStage, statusMessage: statusMessage });
        alert(`Success! Status is now: ${statusMessage}`);
        fetchData();
    } catch (error) { alert("Network Error"); }
  };

  const rejectClaim = async (user) => {
      if(!window.confirm("Are you sure you want to REJECT this claim?")) return;
      try {
        await axios.post(`${API_BASE}/api/users/register`, { ...user, claimStatus: -1, statusMessage: "REJECTED" });
        fetchData();
      } catch (error) { alert("Failed to reject."); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this user?")) { 
        try { await axios.delete(`${API_BASE}/api/users/${id}`); fetchData(); } 
        catch(e) { alert("Delete failed"); }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        const payload = { ...form, id: editingId || "", role: form.type, claimStatus: editingId ? undefined : 0, statusMessage: editingId ? undefined : "PENDING", createdBy: "ADMIN_MASTER" };
        const res = await axios.post(`${API_BASE}/api/users/register`, payload);
        alert(editingId ? "Updated Successfully" : `SUCCESS! Generated ID: ${res.data.id}`);
        cancelEdit(); 
        fetchData();
    } catch(err) { alert("Registration Failed."); }
  };

  const getStatusInfo = (status) => {
      const s = parseInt(status || 0, 10);
      if (s === -1) return { label: 'REJECTED', color: 'text-red-500 bg-red-50' };
      if (s === 3) return { label: 'SETTLED', color: 'text-green-600 bg-green-50' };
      if (s === 2) return { label: 'STAGE 2 DONE', color: 'text-purple-600 bg-purple-50' };
      if (s === 1) return { label: 'STAGE 1 DONE', color: 'text-blue-600 bg-blue-50' };
      return { label: 'PENDING', color: 'text-[#00ced1] bg-teal-50' };
  };

  const stats = {
    agents: db.agents.length, customers: db.users.length,
    pending: db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length,
    settled: db.users.filter(u => u.claimStatus === 3).length, 
    rejected: db.users.filter(u => u.claimStatus === -1).length
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-left font-sans">
      <aside className="w-[340px] bg-white border-r p-8 fixed h-full flex flex-col z-20 shadow-sm">
        <div className="mb-12"><Logo /></div>
        <nav className="space-y-3 flex-1">
          <button onClick={() => setFilterType('all')} className={`w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase ${filterType === 'all' ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-50'}`}><Activity size={20}/> Dashboard Home</button>
          <div className="h-px bg-slate-100 my-6 mx-4"></div>
          <button onClick={() => handleOpenModal('agent')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase text-[#00ced1] bg-teal-50/50 border border-teal-100 hover:bg-teal-50 transition-all"><Briefcase size={20}/> Register Agent</button>
          <button onClick={() => handleOpenModal('user')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase text-indigo-600 bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition-all"><Users size={20}/> Register Customer</button>
        </nav>
        <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="flex items-center gap-4 text-red-500 font-black p-6 hover:bg-red-50 transition-all"><LogOut size={22}/> Exit System</button>
      </aside>

      <main className="ml-[340px] flex-1 p-16">
        <header className="flex justify-between items-center mb-16 relative">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Admin <span className="text-[#00ced1]">Dashboard</span></h1>
          <div className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white"><div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-[#00ced1] shadow-lg"><ShieldCheck size={28}/></div><div><p className="text-[9px] font-black uppercase text-[#00ced1]">Primary Admin</p><p className="text-xl font-black text-slate-900 leading-none">System Master</p></div></div>
        </header>

        <div className="grid grid-cols-5 gap-6 mb-16">
          {[
            { label: 'Agents', val: stats.agents, type: 'agent', icon: <Briefcase size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Customers', val: stats.customers, type: 'user', icon: <Users size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Pending', val: stats.pending, type: 'pending', icon: <Clock size={20}/>, color: 'text-[#00ced1]', bg: 'bg-teal-50' },
            { label: 'Settled', val: stats.settled, type: 'settled', icon: <Award size={20}/>, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Rejected', val: stats.rejected, type: 'rejected', icon: <XCircle size={20}/>, color: 'text-red-500', bg: 'bg-red-50' },
          ].map((stat, i) => (
            <button key={i} onClick={() => setFilterType(stat.type)} className={`p-8 rounded-[3rem] border-2 transition-all text-left shadow-sm ${filterType === stat.type ? 'border-[#00ced1] bg-white ring-8 ring-teal-50' : 'border-transparent bg-white hover:shadow-xl'}`}>
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>{stat.icon}</div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[4rem] shadow-2xl p-12 border border-white">
            <h3 className="font-black text-3xl capitalize text-slate-900 mb-10">Directory View: {filterType}</h3>
            <div className="grid gap-4">
                {filteredItems.map(item => {
                    const statusInfo = getStatusInfo(item.claimStatus); 
                    return (
                    <div key={item.id} className="flex justify-between items-center p-6 bg-[#fcfdfe] rounded-[2.5rem] border border-slate-50 hover:border-[#00ced1] transition-all">
                        <div className="flex items-center gap-6 w-1/2">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${item.role === 'agent' ? 'bg-teal-50 text-[#00ced1]' : 'bg-indigo-50 text-indigo-600'}`}>
                                {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="text-left">
                                <p className="font-black text-2xl text-slate-900">{item.name}</p>
                                <div className="flex flex-col gap-1 mt-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1"><MapPin size={12}/> {item.mandal}, {item.dist}</p>
                                    <div className="bg-slate-100 px-3 py-1 rounded-md w-fit border border-slate-200">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider mr-2">ID:</span>
                                        <span className="text-sm font-bold text-[#00ced1] font-mono">{item.id || "PROCESSING..."}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 justify-end w-1/2">
                            {/* VIEW DOCS BUTTON */}
                            {item.role === 'user' && (
                                <button onClick={() => handleViewDocs(item)} className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title="View Documents">
                                    <FileText size={22}/>
                                </button>
                            )}
                            
                            {item.role === 'user' && item.claimStatus !== -1 && item.claimStatus < 3 && (
                                <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-50">
                                    <button onClick={() => handleStageUpgrade(item)} className="p-3 bg-[#00ced1] text-white rounded-xl hover:scale-110 transition-transform cursor-pointer shadow-sm" title="Move to Next Stage"><ArrowUpCircle size={22}/></button>
                                    <button onClick={() => rejectClaim(item)} className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform cursor-pointer shadow-sm" title="Reject Claim"><XCircle size={22}/></button>
                                </div>
                            )}
                            
                            <div className="text-right">
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Status</p>
                                <p className={`text-sm font-black uppercase tracking-widest ${statusInfo.color.split(' ')[0]}`}>{statusInfo.label}</p>
                            </div>
                            
                            <div className="flex gap-3 pl-6 border-l">
                                <button onClick={() => startEdit(item)} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-[#00ced1] hover:border-[#00ced1] transition-all"><Edit3 size={18}/></button>
                                <button onClick={() => handleDelete(item.id)} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-red-500 hover:border-red-500 transition-all"><Trash2 size={18}/></button>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </div>
      </main>

      {/* --- EDIT MODAL --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
                <button onClick={cancelEdit} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-400"><X size={24}/></button>
                <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{editingId ? 'Update' : 'Register'} <span className={form.type === 'agent' ? 'text-[#00ced1]' : 'text-indigo-600'}>{form.type === 'agent' ? 'Agent' : 'Customer'}</span></h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">{form.type === 'agent' ? "Will generate: DADADA0001 (Location)" : "Will generate: 0000000001 (Sequential)"}</p>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <input type="email" placeholder="Gmail" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
                    <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value, mandal: ''}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
                  </div>
                  <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
                  <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                  <button type="submit" className={`w-full py-7 rounded-[2.5rem] font-black text-lg shadow-2xl transition-all mt-6 cursor-pointer ${form.type === 'agent' ? 'bg-[#00ced1] text-white' : 'bg-indigo-600 text-white'}`}>{editingId ? "Update Record" : "Generate & Save"}</button>
                </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- DOCUMENTS MODAL (PDF SUPPORT) --- */}
      <AnimatePresence>
        {showDocsModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[3rem] p-12 shadow-3xl border border-white relative">
                    <button onClick={() => setShowDocsModal(false)} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-slate-200 rounded-full transition-all text-slate-400"><X size={24}/></button>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Documents for <span className="text-[#00ced1]">{viewingUser}</span></h2>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">Secure Cloud Retrieval</p>
                    
                    {userDocs.length === 0 ? (
                        <div className="p-10 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <p className="font-bold text-slate-400">No documents uploaded by this user.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userDocs.map(doc => {
                                const downloadUrl = `${API_BASE}/api/documents/download/${doc.id}`;
                                const isPdf = doc.fileName.toLowerCase().endsWith('.pdf') || (doc.fileType && doc.fileType.includes('pdf'));

                                return (
                                    <div key={doc.id} className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col">
                                        <div className="bg-white rounded-2xl h-48 flex items-center justify-center overflow-hidden border border-slate-100 mb-4 relative group">
                                            {isPdf ? (
                                                <iframe src={downloadUrl + "#toolbar=0"} className="w-full h-full object-cover pointer-events-none" title="PDF Preview"></iframe>
                                            ) : (
                                                <img src={downloadUrl} alt="Doc" className="w-full h-full object-cover"/>
                                            )}
                                        </div>
                                        <p className="font-bold text-xs text-slate-500 truncate mb-3" title={doc.fileName}>{doc.fileName}</p>
                                        <a href={downloadUrl} target="_blank" rel="noreferrer" className="mt-auto block w-full text-center bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00ced1] transition-colors">
                                            {isPdf ? "Open PDF" : "View Image"}
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}