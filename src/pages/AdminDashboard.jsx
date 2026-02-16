
// import React, { useState, useEffect } from 'react';
// import { fetchLocations, getMandals } from '../services/locationService';
// import Logo from '../components/Logo';
// import { 
//   UserPlus, LogOut, MapPin, Trash2, Edit3, X, Check, 
//   Eye, EyeOff, ShieldCheck, ArrowUpCircle, XCircle, Users, Briefcase, FilterX, 
//   Clock, FileText, Activity, MessageSquare, ChevronRight, Award, History, User, Settings, Key, Lock
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [locations, setLocations] = useState([]);
//   const [mandals, setMandals] = useState([]); 
//   const [db, setDb] = useState({ agents: [], users: [] }); 
//   const [filterType, setFilterType] = useState("all"); 
//   const [editingId, setEditingId] = useState(null); 
  
//   // UI States
//   const [showModal, setShowModal] = useState(false);
//   const [showAdminMenu, setShowAdminMenu] = useState(false); // To handle admin details popup

//   const [form, setForm] = useState({ 
//     type: 'agent', name: '', email: '', state: '', dist: '', mandal: '', password: '' 
//   });

//   useEffect(() => {
//     fetchLocations().then(setLocations);
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/users/all');
//       setDb({
//         agents: response.data.filter(u => u.role === 'agent'),
//         users: response.data.filter(u => u.role === 'user')
//       });
//     } catch (error) { console.error("SQL Error:", error); }
//   };

//   const handleOpenModal = (type) => {
//     setForm({ ...form, type: type });
//     setShowModal(true);
//   };

//   const startEdit = (item) => {
//     setEditingId(item.id);
//     setForm({
//       type: item.role, name: item.name, email: item.email, 
//       state: item.state, dist: item.dist, mandal: item.mandal, password: item.password
//     });
//     setMandals(getMandals(item.dist));
//     setShowModal(true);
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setShowModal(false);
//     setForm({ type: 'agent', name: '', email: '', state: '', dist: '', mandal: '', password: '' });
//   };

//   const stats = {
//     agentsCount: db.agents.length,
//     usersCount: db.users.length,
//     completed: db.users.filter(u => u.claimStatus === 3).length, 
//     canceled: db.users.filter(u => u.claimStatus === -1).length,
//     progress: db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length
//   };

//   // --- REQUIREMENT: UPDATE STATUS WITH POPUP MESSAGE ---
//   const updateStatus = async (user, nextStatus, msg) => {
//     const confirm = window.confirm(`Confirm update for ${user.name} to: ${msg}?`);
//     if(!confirm) return;

//     try {
//       const payload = { ...user, claimStatus: nextStatus, statusMessage: msg };
//       await axios.post('http://localhost:8080/api/users/register', payload);
//       alert(`Success: ${user.name} status is now ${msg}`);
//       fetchData(); 
//     } catch (error) { 
//       alert("Status Update Failed. Check Connection.");
//     }
//   };

//   const getFilteredData = (type, list) => {
//     if (filterType === 'all') return list;
//     if (filterType === 'agent') return type === 'agent' ? list : [];
//     if (filterType === 'user') return type === 'user' ? list : [];
//     if (type === 'agent') return []; 
//     if (filterType === 'completed') return list.filter(u => u.claimStatus === 3);
//     if (filterType === 'progress') return list.filter(u => u.claimStatus >= 0 && u.claimStatus < 3);
//     if (filterType === 'canceled') return list.filter(u => u.claimStatus === -1);
//     return list;
//   };

//   const logoutAction = () => {
//     localStorage.removeItem('session'); 
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex text-left font-sans selection:bg-[#00ced1]/20">
      
//       {/* SIDEBAR */}
//       <aside className="w-[340px] bg-white border-r p-8 fixed h-full flex flex-col z-20 shadow-sm">
//         <div className="mb-12"><Logo /></div>

//         <nav className="space-y-3 flex-1">
//           <p className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-4 tracking-[0.2em]">Management</p>
          
//           <button onClick={() => setFilterType('all')} className={`w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest transition-all ${filterType === 'all' ? 'bg-slate-900 text-white shadow-2xl scale-[1.02]' : 'text-slate-500 hover:bg-slate-50'}`}>
//             <Activity size={20}/> Dashboard Home
//           </button>

//           <div className="h-px bg-slate-100 my-6 mx-4"></div>

//           <button onClick={() => handleOpenModal('agent')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest text-[#00ced1] bg-teal-50/50 border border-teal-100 hover:bg-teal-50 transition-all">
//             <Briefcase size={20}/> Register Agent
//           </button>

//           <button onClick={() => handleOpenModal('user')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest text-indigo-600 bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition-all">
//             <Users size={20}/> Register User
//           </button>
//         </nav>

//         <button onClick={logoutAction} className="flex items-center gap-4 text-red-500 font-black p-6 hover:bg-red-50 rounded-[2rem] transition-all cursor-pointer border border-transparent hover:border-red-100">
//           <LogOut size={22}/> Exit System
//         </button>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <main className="ml-[340px] flex-1 p-16">
//         <header className="flex justify-between items-center mb-16 relative">
//           <div>
//             <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Admin <span className="text-[#00ced1]">Dashboard</span></h1>
//             <p className="text-slate-400 font-bold mt-3 uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Secure Node Ledger Control
//             </p>
//           </div>

//           {/* --- WORKABLE ADMIN DETAILS (CLICKABLE) --- */}
//           <div className="relative">
//             <div 
//               onClick={() => setShowAdminMenu(!showAdminMenu)}
//               className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white relative group cursor-pointer hover:bg-slate-50 transition-all active:scale-95"
//             >
//               <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-[#00ced1] shadow-lg group-hover:rotate-6 transition-transform">
//                   <ShieldCheck size={28}/>
//               </div>
//               <div>
//                   <p className="text-[9px] font-black uppercase text-[#00ced1] tracking-widest mb-0.5">Primary Administrator</p>
//                   <div className="flex items-center gap-2">
//                     <p className="text-xl font-black text-slate-900 leading-none tracking-tight">System Master</p>
//                     <ChevronRight size={14} className={`text-slate-300 transition-transform ${showAdminMenu ? 'rotate-90' : ''}`} />
//                   </div>
//               </div>
//             </div>

//             {/* POPUP FOR ADMIN DETAILS */}
//             <AnimatePresence>
//               {showAdminMenu && (
//                 <motion.div 
//                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                   className="absolute top-full right-0 mt-4 w-72 bg-white rounded-[2rem] shadow-3xl border border-white p-6 z-[100]"
//                 >
//                    <div className="space-y-4">
//                       <div className="p-4 bg-slate-50 rounded-2xl">
//                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Identification ID</p>
//                          <div className="flex items-center gap-2 text-slate-900 font-bold"><User size={16} className="text-[#00ced1]"/> 123</div>
//                       </div>
//                       <div className="p-4 bg-slate-50 rounded-2xl">
//                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">System Password</p>
//                          <div className="flex items-center gap-2 text-slate-900 font-bold font-mono"><Key size={16} className="text-[#00ced1]"/> admin123</div>
//                       </div>
//                       <button 
//                         onClick={logoutAction}
//                         className="w-full py-4 bg-red-50 text-red-500 font-black uppercase text-[10px] tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 transition-all"
//                       >
//                          <LogOut size={14}/> Logout Session
//                       </button>
//                    </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </header>

//         {/* STAT CARDS */}
//         <div className="grid grid-cols-5 gap-6 mb-16">
//           {[
//             { label: 'Agents', val: stats.agentsCount, type: 'agent', icon: <Briefcase size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
//             { label: 'Users', val: stats.usersCount, type: 'user', icon: <Users size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
//             { label: 'Settled', val: stats.completed, type: 'completed', icon: <Award size={20}/>, color: 'text-green-600', bg: 'bg-green-50' },
//             { label: 'Active', val: stats.progress, type: 'progress', icon: <Clock size={20}/>, color: 'text-[#00ced1]', bg: 'bg-teal-50' },
//             { label: 'Failed', val: stats.canceled, type: 'canceled', icon: <XCircle size={20}/>, color: 'text-red-500', bg: 'bg-red-50' },
//           ].map((stat, i) => (
//             <button key={i} onClick={() => setFilterType(stat.type)} className={`p-8 rounded-[3rem] border-2 transition-all text-left shadow-sm relative overflow-hidden group ${filterType === stat.type ? 'border-[#00ced1] bg-white ring-8 ring-teal-50' : 'border-transparent bg-white hover:shadow-xl hover:-translate-y-1'}`}>
//               <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>{stat.icon}</div>
//               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
//               <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
//             </button>
//           ))}
//         </div>

//         {/* DYNAMIC LISTS */}
//         <div className="space-y-12">
//           {['agent', 'user'].map(type => {
//             const items = getFilteredData(type, db[type === 'agent' ? 'agents' : 'users']);
//             if (items.length === 0 && filterType !== 'all') return null;
            
//             return (
//               <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} key={type} className="bg-white rounded-[4rem] shadow-2xl p-12 border border-white">
//                 <div className="flex justify-between items-center mb-10">
//                    <h3 className="font-black text-3xl capitalize text-slate-900 tracking-tight">{type} Directory</h3>
//                    <div className="h-px flex-1 bg-slate-50 mx-8"></div>
//                    <span className="text-[10px] font-black uppercase text-slate-300 tracking-[0.3em]">Total: {items.length}</span>
//                 </div>
//                 <div className="grid gap-4">
//                   {items.map(item => (
//                     <div key={item.id} className="flex justify-between items-center p-8 bg-[#fcfdfe] rounded-[2.5rem] border border-slate-50 hover:border-[#00ced1] transition-all group">
//                       <div className="flex items-center gap-6">
//                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${type === 'agent' ? 'bg-teal-50 text-[#00ced1]' : 'bg-indigo-50 text-indigo-600'}`}>
//                            {item.name.charAt(0).toUpperCase()}
//                         </div>
//                         <div className="text-left">
//                            <p className="font-black text-2xl text-slate-900 group-hover:text-[#00ced1] transition-colors">{item.name}</p>
//                            <p className="text-[10px] font-black text-slate-400 flex items-center gap-1 uppercase tracking-widest mt-1"><MapPin size={12}/> {item.mandal}, {item.dist}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         {type === 'user' && item.claimStatus !== -1 && (
//                           <div className="flex gap-2 mr-6 bg-white p-2 rounded-2xl shadow-sm border border-slate-50">
//                             {/* POPUP TRIGGER BUTTONS */}
//                             <button onClick={() => { const nextVal = (item.claimStatus || 0) + 1; if(nextVal > 3) return; updateStatus(item, nextVal, nextVal === 3 ? "COMPLETED" : `STAGE ${nextVal} DONE`); }} className="p-3 bg-[#00ced1] text-white rounded-xl hover:scale-110 transition-transform cursor-pointer"><ArrowUpCircle size={22}/></button>
//                             <button onClick={() => updateStatus(item, -1, "CANCELED")} className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform cursor-pointer"><XCircle size={22}/></button>
//                           </div>
//                         )}
//                         <div className="text-right px-6 border-r border-slate-100 mr-2">
//                            <p className="font-mono text-sm font-black tracking-widest text-slate-800">{item.id}</p>
//                            <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${item.claimStatus === -1 ? 'text-red-500' : item.claimStatus === 3 ? 'text-green-600' : 'text-[#00ced1]'}`}>{item.statusMessage}</p>
//                         </div>
//                         <div className="flex gap-3">
//                            <button onClick={() => startEdit(item)} className="p-4 bg-white text-slate-400 rounded-2xl border border-slate-100 hover:text-[#00ced1] hover:border-[#00ced1] hover:shadow-lg transition-all"><Edit3 size={20}/></button>
//                            <button onClick={async () => { if(window.confirm("Permanent Delete?")) { await axios.delete(`http://localhost:8080/api/users/${item.id}`); fetchData(); }}} className="p-4 bg-white text-slate-400 rounded-2xl border border-slate-100 hover:text-red-500 hover:border-red-500 hover:shadow-lg transition-all"><Trash2 size={20}/></button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )
//           })}
//         </div>
//       </main>

//       {/* --- REGISTRATION MODAL POPUP --- */}
//       <AnimatePresence>
//         {showModal && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
//             <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
//                 <div className="absolute top-0 right-0 w-40 h-40 bg-[#00ced1]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                
//                 <button onClick={cancelEdit} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-400">
//                     <X size={24}/>
//                 </button>

//                 <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
//                    {editingId ? 'Update' : 'Register'} <span className={form.type === 'agent' ? 'text-[#00ced1]' : 'text-indigo-600'}>{form.type === 'agent' ? 'Agent' : 'User'}</span>
//                 </h2>
//                 <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-10">Node ID Authentication Portal</p>

//                 <form onSubmit={async (e) => {
//                   e.preventDefault();
//                   let id = editingId;
//                   if (!id) {
//                     if (form.type === 'agent') {
//                       const st = form.state.substring(0, 2).toUpperCase();
//                       const di = form.dist.substring(0, 2).toUpperCase();
//                       const ma = form.mandal.substring(0, 2).toUpperCase();
//                       id = `${st}${di}${ma}${Math.floor(1000 + Math.random() * 9000)}`;
//                     } else { id = ""; }
//                   }
//                   await axios.post('http://localhost:8080/api/users/register', { ...form, id, role: form.type, claimStatus: editingId ? undefined : 0, statusMessage: editingId ? undefined : "IN_PROGRESS", createdBy: "ADMIN_MASTER" });
//                   alert("Registry Update Successful.");
//                   cancelEdit(); fetchData();
//                 }} className="space-y-4">
//                   <div className="space-y-1">
//                       <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Full Identity Name</label>
//                       <input placeholder="Ex: John Doe" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
//                   </div>

//                   <div className="space-y-1">
//                       <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Gmail Registry</label>
//                       <input type="email" placeholder="example@gmail.com" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#00ced1]" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: '', mandal: ''})} required>
//                         <option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
//                     </select>
//                     <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#00ced1]" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value, mandal: ''}); setMandals(getMandals(e.target.value)); }} required>
//                         <option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}
//                     </select>
//                   </div>
                  
//                   <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#00ced1]" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required>
//                       <option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}
//                   </select>

//                   <div className="space-y-1">
//                       <label className="text-[10px] font-black uppercase text-slate-400 ml-4">System Password</label>
//                       <input type="password" placeholder="••••••••" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
//                   </div>

//                   <button className={`w-full py-7 rounded-[2.5rem] font-black text-lg tracking-tight shadow-2xl hover:brightness-110 active:scale-95 transition-all mt-6 ${form.type === 'agent' ? 'bg-[#00ced1] text-white' : 'bg-indigo-600 text-white'}`}>
//                     {editingId ? "Update Node Ledger" : `Generate New ${form.type === 'agent' ? 'Agent' : 'User'}`}
//                   </button>
//                 </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { fetchLocations, getMandals } from '../services/locationService';
import Logo from '../components/Logo';
import { 
  UserPlus, LogOut, MapPin, Trash2, Edit3, X, Check, 
  Eye, EyeOff, ShieldCheck, ArrowUpCircle, XCircle, Users, Briefcase, FilterX, 
  Clock, FileText, Activity, MessageSquare, ChevronRight, Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [mandals, setMandals] = useState([]); 
  const [db, setDb] = useState({ agents: [], users: [] }); 
  const [filterType, setFilterType] = useState("all"); 
  const [editingId, setEditingId] = useState(null); 
  
  const [showModal, setShowModal] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const [form, setForm] = useState({ 
    type: 'agent', name: '', email: '', state: '', dist: '', mandal: '', password: '' 
  });

  useEffect(() => {
    fetchLocations().then(setLocations);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/all');
      setDb({
        agents: response.data.filter(u => u.role === 'agent'),
        users: response.data.filter(u => u.role === 'user')
      });
    } catch (error) { console.error("SQL Error:", error); }
  };

  const handleOpenModal = (type) => {
    setForm({ ...form, type: type });
    setShowModal(true);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      type: item.role, name: item.name, email: item.email, 
      state: item.state, dist: item.dist, mandal: item.mandal, password: item.password
    });
    setMandals(getMandals(item.dist));
    setShowModal(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowModal(false);
    setForm({ type: 'agent', name: '', email: '', state: '', dist: '', mandal: '', password: '' });
  };

  const stats = {
    agentsCount: db.agents.length,
    customersCount: db.users.length,
    settled: db.users.filter(u => u.claimStatus === 3).length, 
    rejected: db.users.filter(u => u.claimStatus === -1).length,
    pending: db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length
  };

  const updateStatus = async (user, nextStatus, msg) => {
    const confirm = window.confirm(`Confirm update for ${user.name} to: ${msg}?`);
    if(!confirm) return;
    try {
      const payload = { ...user, claimStatus: nextStatus, statusMessage: msg };
      await axios.post('http://localhost:8080/api/users/register', payload);
      alert(`Success: ${user.name} status is now ${msg}`);
      fetchData(); 
    } catch (error) { alert("Status Update Failed."); }
  };

  const getFilteredData = (type, list) => {
    if (filterType === 'all') return list;
    if (filterType === 'agent') return type === 'agent' ? list : [];
    if (filterType === 'user') return type === 'user' ? list : [];
    if (type === 'agent') return []; 
    if (filterType === 'completed') return list.filter(u => u.claimStatus === 3);
    if (filterType === 'progress') return list.filter(u => u.claimStatus >= 0 && u.claimStatus < 3);
    if (filterType === 'canceled') return list.filter(u => u.claimStatus === -1);
    return list;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-left font-sans selection:bg-[#00ced1]/20">
      <aside className="w-[340px] bg-white border-r p-8 fixed h-full flex flex-col z-20 shadow-sm">
        <div className="mb-12"><Logo /></div>
        <nav className="space-y-3 flex-1">
          <p className="text-[10px] font-black uppercase text-slate-400 ml-4 mb-4 tracking-[0.2em]">Management</p>
          <button onClick={() => setFilterType('all')} className={`w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest transition-all ${filterType === 'all' ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-500 hover:bg-slate-50'}`}>
            <Activity size={20}/> Dashboard Home
          </button>
          <div className="h-px bg-slate-100 my-6 mx-4"></div>
          <button onClick={() => handleOpenModal('agent')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest text-[#00ced1] bg-teal-50/50 border border-teal-100 hover:bg-teal-50 transition-all">
            <Briefcase size={20}/> Register Agent
          </button>
          <button onClick={() => handleOpenModal('user')} className="w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest text-indigo-600 bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition-all">
            <Users size={20}/> Register Customer
          </button>
        </nav>
        <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="flex items-center gap-4 text-red-500 font-black p-6 hover:bg-red-50 rounded-[2rem] transition-all cursor-pointer">
          <LogOut size={22}/> Exit System
        </button>
      </aside>

      <main className="ml-[340px] flex-1 p-16">
        <header className="flex justify-between items-center mb-16 relative">
          <div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Admin <span className="text-[#00ced1]">Dashboard</span></h1>
            <p className="text-slate-400 font-bold mt-3 uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Secure Node Ledger Control
            </p>
          </div>
          <div onClick={() => setShowAdminMenu(!showAdminMenu)} className="flex items-center gap-5 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl border border-white cursor-pointer hover:bg-slate-50 transition-all">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-[#00ced1] shadow-lg"><ShieldCheck size={28}/></div>
              <div><p className="text-[9px] font-black uppercase text-[#00ced1] tracking-widest mb-0.5">Primary Administrator</p><p className="text-xl font-black text-slate-900 leading-none">System Master</p></div>
          </div>
        </header>

        {/* ORDERED STATS: Agents, Customers, Pending, Settled, Rejected */}
        <div className="grid grid-cols-5 gap-6 mb-16">
          {[
            { label: 'Agents', val: stats.agentsCount, type: 'agent', icon: <Briefcase size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Customers', val: stats.customersCount, type: 'user', icon: <Users size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Pending', val: stats.pending, type: 'progress', icon: <Clock size={20}/>, color: 'text-[#00ced1]', bg: 'bg-teal-50' },
            { label: 'Settled', val: stats.settled, type: 'completed', icon: <Award size={20}/>, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Rejected', val: stats.rejected, type: 'canceled', icon: <XCircle size={20}/>, color: 'text-red-500', bg: 'bg-red-50' },
          ].map((stat, i) => (
            <button key={i} onClick={() => setFilterType(stat.type)} className={`p-8 rounded-[3rem] border-2 transition-all text-left shadow-sm group ${filterType === stat.type ? 'border-[#00ced1] bg-white ring-8 ring-teal-50' : 'border-transparent bg-white hover:shadow-xl hover:-translate-y-1'}`}>
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>{stat.icon}</div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {['agent', 'user'].map(type => {
            const items = getFilteredData(type, db[type === 'agent' ? 'agents' : 'users']);
            if (items.length === 0 && filterType !== 'all') return null;
            return (
              <div key={type} className="bg-white rounded-[4rem] shadow-2xl p-12 border border-white">
                <div className="flex justify-between items-center mb-10">
                   <h3 className="font-black text-3xl capitalize text-slate-900 tracking-tight">{type === 'user' ? 'Customer' : 'Agent'} Directory</h3>
                   <div className="h-px flex-1 bg-slate-50 mx-8"></div>
                   <span className="text-[10px] font-black uppercase text-slate-300 tracking-[0.3em]">Total: {items.length}</span>
                </div>
                <div className="grid gap-4">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-8 bg-[#fcfdfe] rounded-[2.5rem] border border-slate-50 hover:border-[#00ced1] transition-all">
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl ${type === 'agent' ? 'bg-teal-50 text-[#00ced1]' : 'bg-indigo-50 text-indigo-600'}`}>{item.name.charAt(0).toUpperCase()}</div>
                        <div className="text-left"><p className="font-black text-2xl text-slate-900">{item.name}</p><p className="text-[10px] font-black text-slate-400 flex items-center gap-1 uppercase tracking-widest mt-1"><MapPin size={12}/> {item.mandal}, {item.dist}</p></div>
                      </div>
                      <div className="flex items-center gap-4">
                        {type === 'user' && item.claimStatus !== -1 && (
                          <div className="flex gap-2 mr-6 bg-white p-2 rounded-2xl shadow-sm border border-slate-50">
                            <button onClick={() => { const nextVal = (item.claimStatus || 0) + 1; updateStatus(item, nextVal, nextVal === 3 ? "SETTLED" : `STAGE ${nextVal} DONE`); }} className="p-3 bg-[#00ced1] text-white rounded-xl hover:scale-110 transition-transform"><ArrowUpCircle size={22}/></button>
                            <button onClick={() => updateStatus(item, -1, "REJECTED")} className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform"><XCircle size={22}/></button>
                          </div>
                        )}
                        <div className="text-right px-6 border-r border-slate-100 mr-2">
                           <p className="font-mono text-sm font-black text-slate-800">{item.id}</p>
                           <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${item.claimStatus === -1 ? 'text-red-500' : item.claimStatus === 3 ? 'text-green-600' : 'text-[#00ced1]'}`}>
                              {item.claimStatus === -1 ? 'REJECTED' : item.claimStatus === 3 ? 'SETTLED' : item.statusMessage}
                           </p>
                        </div>
                        <div className="flex gap-3">
                           <button onClick={() => startEdit(item)} className="p-4 bg-white text-slate-400 rounded-2xl border hover:text-[#00ced1] transition-all"><Edit3 size={20}/></button>
                           <button onClick={async () => { if(window.confirm("Permanent Delete?")) { await axios.delete(`http://localhost:8080/api/users/${item.id}`); fetchData(); }}} className="p-4 bg-white text-slate-400 rounded-2xl border hover:text-red-500 transition-all"><Trash2 size={20}/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-3xl border border-white relative overflow-hidden">
                <button onClick={cancelEdit} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-400"><X size={24}/></button>
                <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
                   {editingId ? 'Update' : 'Register'} <span className={form.type === 'agent' ? 'text-[#00ced1]' : 'text-indigo-600'}>{form.type === 'agent' ? 'Agent' : 'Customer'}</span>
                </h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">Node ID Authentication Portal</p>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  let id = editingId || "";
                  await axios.post('http://localhost:8080/api/users/register', { ...form, id, role: form.type, claimStatus: editingId ? undefined : 0, statusMessage: editingId ? undefined : "PENDING" });
                  alert("Registry Update Successful.");
                  cancelEdit(); fetchData();
                }} className="space-y-4">
                  <input placeholder="Full Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <input type="email" placeholder="Gmail Registry" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required>
                        <option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
                    </select>
                    <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value}); setMandals(getMandals(e.target.value)); }} required>
                        <option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required>
                      <option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <input type="password" placeholder="System Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                  <button className={`w-full py-7 rounded-[2.5rem] font-black text-lg tracking-tight shadow-2xl transition-all mt-6 ${form.type === 'agent' ? 'bg-[#00ced1] text-white' : 'bg-indigo-600 text-white'}`}>
                    {editingId ? "Update Node Ledger" : `Generate New ${form.type === 'agent' ? 'Agent' : 'Customer'}`}
                  </button>
                </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}