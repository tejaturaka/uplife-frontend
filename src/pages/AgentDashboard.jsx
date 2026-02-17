
// // import React, { useState, useEffect } from 'react';
// // import { fetchLocations, getMandals } from '../services/locationService';
// // import Logo from '../components/Logo';
// // import { UserPlus, LogOut, MapPin, Trash2, Edit3, Activity, Award, ChevronRight } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';

// // export default function AgentDashboard() {
// //   const navigate = useNavigate();
// //   const session = JSON.parse(localStorage.getItem('session'));
// //   const [locations, setLocations] = useState([]);
// //   const [mandals, setMandals] = useState([]);
// //   const [clientList, setClientList] = useState([]);
// //   const [editingId, setEditingId] = useState(null); 
// //   const [form, setForm] = useState({ 
// //     name: '', email: '', password: '', state: '', dist: '', mandal: '',
// //     claimStatus: 0, statusMessage: "PENDING" 
// //   });

// //   useEffect(() => { 
// //     fetchLocations().then(setLocations);
// //     fetchClients(); 
// //     const interval = setInterval(fetchClients, 3000); 
// //     return () => clearInterval(interval); 
// //   }, []);

// //   const fetchClients = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:8080/api/users/all');
// //       const myClients = res.data.filter(u => u.createdBy === session?.id);
// //       setClientList(myClients);
// //     } catch (error) { console.error("Sync Error"); }
// //   };

// //   const stats = {
// //     settled: clientList.filter(u => u.claimStatus === 3).length,
// //     rejected: clientList.filter(u => u.claimStatus === -1).length,
// //     pending: clientList.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length
// //   };

// //   const startEdit = (user) => {
// //     setEditingId(user.id);
// //     setForm({
// //       name: user.name, email: user.email, password: user.password,
// //       state: user.state, dist: user.dist, mandal: user.mandal,
// //       claimStatus: user.claimStatus, statusMessage: user.statusMessage 
// //     });
// //     setMandals(getMandals(user.dist));
// //   };

// //   const cancelEdit = () => {
// //     setEditingId(null);
// //     setForm({ name: '', email: '', password: '', state: '', dist: '', mandal: '', claimStatus: 0, statusMessage: "PENDING" });
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#f8fafc] flex flex-col text-left font-sans">
// //       <header className="p-10 bg-white shadow-sm flex justify-between items-center sticky top-0 z-30 border-b">
// //         <Logo />
// //         <div className="flex gap-10 items-center">
// //            <div className="flex gap-6 border-r pr-10">
// //               <div className="text-center">
// //                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pending</p>
// //                 <p className="font-black text-xl text-[#00ced1]">{stats.pending}</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Settled</p>
// //                 <p className="font-black text-xl text-green-600">{stats.settled}</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Rejected</p>
// //                 <p className="font-black text-xl text-red-500">{stats.rejected}</p>
// //               </div>
// //            </div>
// //            <div className="text-right">
// //               <p className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Agent Node</p>
// //               <p className="font-black text-slate-900">{session?.name} <span className="opacity-30">({session?.id})</span></p>
// //            </div>
// //            <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="text-red-500 p-4 rounded-2xl border hover:bg-red-50 cursor-pointer transition-all shadow-sm">
// //               <LogOut size={20}/>
// //            </button>
// //         </div>
// //       </header>

// //       <main className="p-16 max-w-[1600px] mx-auto w-full">
// //         <div className="grid lg:grid-cols-12 gap-12">
// //             <div className="lg:col-span-4 bg-white p-12 rounded-[3.5rem] shadow-xl border h-fit sticky top-32">
// //               <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-slate-800">
// //                   {editingId ? <Edit3 className="text-[#00ced1]"/> : <UserPlus className="text-[#00ced1]"/>} 
// //                   {editingId ? "Update Node" : "Registration Node"}
// //               </h2>
// //               <form onSubmit={async (e) => {
// //                   e.preventDefault();
// //                   const payload = { ...form, id: editingId || "", role:'user', createdBy: session.id };
// //                   await axios.post('http://localhost:8080/api/users/register', payload);
// //                   cancelEdit(); fetchClients();
// //               }} className="space-y-4">
// //                   <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
// //                   <input type="email" placeholder="Gmail" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
// //                     <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
// //                   </div>
// //                   <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
// //                   <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
// //                   <button className={`w-full py-6 rounded-3xl font-black shadow-2xl transition-all cursor-pointer ${editingId ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`}>{editingId ? "Save Changes" : "Generate Client Node"}</button>
// //               </form>
// //             </div>

// //             <div className="lg:col-span-8 bg-white p-12 rounded-[3.5rem] shadow-xl border overflow-hidden">
// //               <h3 className="font-black text-3xl mb-10 text-slate-800">Customer Registry</h3>
// //               <div className="space-y-4 max-h-[700px] overflow-auto pr-4 custom-scrollbar">
// //                   {clientList.map(user => (
// //                       <div key={user.id} className="flex justify-between items-center p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-[#00ced1] transition-all">
// //                         <div className="text-left">
// //                             <p className="font-black text-2xl text-slate-900">{user.name}</p>
// //                             <div className="flex items-center gap-3 mt-2"><p className="font-mono text-[#00ced1] font-bold text-sm">#{user.id}</p><span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${user.claimStatus === 3 ? 'bg-green-100 text-green-600' : user.claimStatus === -1 ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-600'}`}>
// //                                {user.claimStatus === -1 ? 'REJECTED' : user.claimStatus === 3 ? 'SETTLED' : user.statusMessage}
// //                             </span></div>
// //                             <p className="text-[10px] font-black text-slate-400 mt-2 uppercase flex items-center gap-1"><MapPin size={12}/> {user.mandal}, {user.dist}, {user.state}</p>
// //                         </div>
// //                         <div className="flex gap-4">
// //                             <button onClick={() => startEdit(user)} className="p-4 bg-white text-[#00ced1] rounded-2xl border shadow-sm hover:bg-teal-50 cursor-pointer transition-transform hover:scale-110"><Edit3 size={20}/></button>
// //                             <button onClick={async () => { if(window.confirm("Delete node?")) { await axios.delete(`http://localhost:8080/api/users/${user.id}`); fetchClients(); }}} className="p-4 bg-white text-red-500 rounded-2xl border shadow-sm hover:bg-red-50 cursor-pointer transition-transform hover:scale-110"><Trash2 size={20}/></button>
// //                         </div>
// //                       </div>
// //                   ))}
// //               </div>
// //             </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }




// // import React, { useState, useEffect } from 'react';
// // import { fetchLocations, getMandals } from '../services/locationService';
// // import Logo from '../components/Logo';
// // import { UserPlus, LogOut, MapPin, Trash2, Edit3, Activity, Award, ChevronRight } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';

// // export default function AgentDashboard() {
// //   const navigate = useNavigate();
// //   const session = JSON.parse(localStorage.getItem('session'));
// //   const API_BASE = import.meta.env.VITE_API_BASE_URL;

// //   const [locations, setLocations] = useState([]);
// //   const [mandals, setMandals] = useState([]);
// //   const [clientList, setClientList] = useState([]);
// //   const [editingId, setEditingId] = useState(null); 
// //   const [form, setForm] = useState({ 
// //     name: '', email: '', password: '', state: '', dist: '', mandal: '',
// //     claimStatus: 0, statusMessage: "PENDING" 
// //   });

// //   useEffect(() => { 
// //     fetchLocations().then(setLocations);
// //     fetchClients(); 
// //     const interval = setInterval(fetchClients, 3000); 
// //     return () => clearInterval(interval); 
// //   }, []);

// //   const fetchClients = async () => {
// //     try {
// //       const res = await axios.get(`${API_BASE}/api/users/all`);
// //       const myClients = res.data.filter(u => u.createdBy === session?.id);
// //       setClientList(myClients);
// //     } catch (error) { console.error("Sync Error"); }
// //   };

// //   const stats = {
// //     settled: clientList.filter(u => u.claimStatus === 3).length,
// //     rejected: clientList.filter(u => u.claimStatus === -1).length,
// //     pending: clientList.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length
// //   };

// //   const startEdit = (user) => {
// //     setEditingId(user.id);
// //     setForm({
// //       name: user.name, email: user.email, password: user.password,
// //       state: user.state, dist: user.dist, mandal: user.mandal,
// //       claimStatus: user.claimStatus, statusMessage: user.statusMessage 
// //     });
// //     setMandals(getMandals(user.dist));
// //   };

// //   const cancelEdit = () => {
// //     setEditingId(null);
// //     setForm({ name: '', email: '', password: '', state: '', dist: '', mandal: '', claimStatus: 0, statusMessage: "PENDING" });
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#f8fafc] flex flex-col text-left font-sans">
// //       <header className="p-10 bg-white shadow-sm flex justify-between items-center sticky top-0 z-30 border-b">
// //         <Logo />
// //         <div className="flex gap-10 items-center">
// //            <div className="flex gap-6 border-r pr-10">
// //               <div className="text-center">
// //                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pending</p>
// //                 <p className="font-black text-xl text-[#00ced1]">{stats.pending}</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Settled</p>
// //                 <p className="font-black text-xl text-green-600">{stats.settled}</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Rejected</p>
// //                 <p className="font-black text-xl text-red-500">{stats.rejected}</p>
// //               </div>
// //            </div>
// //            <div className="text-right">
// //               <p className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Agent Node</p>
// //               <p className="font-black text-slate-900">{session?.name} <span className="opacity-30">({session?.id})</span></p>
// //            </div>
// //            <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="text-red-500 p-4 rounded-2xl border hover:bg-red-50 cursor-pointer transition-all shadow-sm">
// //               <LogOut size={20}/>
// //            </button>
// //         </div>
// //       </header>

// //       <main className="p-16 max-w-[1600px] mx-auto w-full">
// //         <div className="grid lg:grid-cols-12 gap-12">
// //             <div className="lg:col-span-4 bg-white p-12 rounded-[3.5rem] shadow-xl border h-fit sticky top-32">
// //               <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-slate-800">
// //                   {editingId ? <Edit3 className="text-[#00ced1]"/> : <UserPlus className="text-[#00ced1]"/>} 
// //                   {editingId ? "Update Node" : "Registration Node"}
// //               </h2>
// //               <form onSubmit={async (e) => {
// //                   e.preventDefault();
// //                   const payload = { ...form, id: editingId || "", role:'user', createdBy: session.id };
// //                   await axios.post(`${API_BASE}/api/users/register`, payload);
// //                   cancelEdit(); fetchClients();
// //               }} className="space-y-4">
// //                   <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
// //                   <input type="email" placeholder="Gmail Identity" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
// //                     <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
// //                   </div>
// //                   <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
// //                   <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
// //                   <button className={`w-full py-6 rounded-3xl font-black shadow-2xl transition-all cursor-pointer ${editingId ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`}>{editingId ? "Save Changes" : "Generate Client Node"}</button>
// //               </form>
// //             </div>

// //             <div className="lg:col-span-8 bg-white p-12 rounded-[3.5rem] shadow-xl border overflow-hidden">
// //               <h3 className="font-black text-3xl mb-10 text-slate-800">Customer Registry</h3>
// //               <div className="space-y-4 max-h-[700px] overflow-auto pr-4 custom-scrollbar">
// //                   {clientList.map(user => (
// //                       <div key={user.id} className="flex justify-between items-center p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-[#00ced1] transition-all">
// //                         <div className="text-left">
// //                             <p className="font-black text-2xl text-slate-900">{user.name}</p>
// //                             <div className="flex items-center gap-3 mt-2"><p className="font-mono text-[#00ced1] font-bold text-sm">#{user.id}</p><span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${user.claimStatus === 3 ? 'bg-green-100 text-green-600' : user.claimStatus === -1 ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-600'}`}>
// //                                {user.claimStatus === -1 ? 'REJECTED' : user.claimStatus === 3 ? 'SETTLED' : user.statusMessage}
// //                             </span></div>
// //                             <p className="text-[10px] font-black text-slate-400 mt-2 uppercase flex items-center gap-1"><MapPin size={12}/> {user.mandal}, {user.dist}, {user.state}</p>
// //                         </div>
// //                         <div className="flex gap-4">
// //                             <button onClick={() => startEdit(user)} className="p-4 bg-white text-[#00ced1] rounded-2xl border shadow-sm hover:bg-teal-50 cursor-pointer transition-transform hover:scale-110"><Edit3 size={20}/></button>
// //                             <button onClick={async () => { if(window.confirm("Delete Node?")) { await axios.delete(`${API_BASE}/api/users/${user.id}`); fetchClients(); }}} className="p-4 bg-white text-red-500 rounded-2xl border shadow-sm hover:bg-red-50 cursor-pointer transition-transform hover:scale-110"><Trash2 size={20}/></button>
// //                         </div>
// //                       </div>
// //                   ))}
// //               </div>
// //             </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }


// // import React, { useState, useEffect } from 'react';
// // import { fetchLocations, getMandals } from '../services/locationService';
// // import Logo from '../components/Logo';
// // import { 
// //   UserPlus, LogOut, MapPin, Trash2, Edit3, Activity, Award, ChevronRight, Clock, XCircle 
// // } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';

// // export default function AgentDashboard() {
// //   const navigate = useNavigate();
// //   const session = JSON.parse(localStorage.getItem('session'));
// //   const API_BASE = import.meta.env.VITE_API_BASE_URL;

// //   const [locations, setLocations] = useState([]);
// //   const [mandals, setMandals] = useState([]);
// //   const [clientList, setClientList] = useState([]);
// //   const [editingId, setEditingId] = useState(null); 
// //   const [form, setForm] = useState({ 
// //     name: '', email: '', password: '', state: '', dist: '', mandal: '',
// //     claimStatus: 0, statusMessage: "PENDING" 
// //   });

// //   useEffect(() => { 
// //     fetchLocations().then(setLocations);
// //     fetchClients(); 
// //     const interval = setInterval(fetchClients, 3000); 
// //     return () => clearInterval(interval); 
// //   }, []);

// //   const fetchClients = async () => {
// //     try {
// //       const res = await axios.get(`${API_BASE}/api/users/all`);
// //       const myClients = res.data.filter(u => u.createdBy === session?.id);
// //       setClientList(myClients);
// //     } catch (error) { console.error("Sync Error"); }
// //   };

// //   const stats = {
// //     settled: clientList.filter(u => u.claimStatus === 3).length,
// //     rejected: clientList.filter(u => u.claimStatus === -1).length,
// //     pending: clientList.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length
// //   };

// //   const startEdit = (user) => {
// //     setEditingId(user.id);
// //     setForm({ name: user.name, email: user.email, password: user.password, state: user.state, dist: user.dist, mandal: user.mandal, claimStatus: user.claimStatus, statusMessage: user.statusMessage });
// //     setMandals(getMandals(user.dist));
// //   };

// //   const cancelEdit = () => {
// //     setEditingId(null);
// //     setForm({ name: '', email: '', password: '', state: '', dist: '', mandal: '', claimStatus: 0, statusMessage: "PENDING" });
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#f8fafc] flex flex-col text-left font-sans selection:bg-[#00ced1]/20">
// //       <header className="p-10 bg-white shadow-sm flex justify-between items-center sticky top-0 z-30 border-b">
// //         <Logo />
// //         <div className="flex gap-10 items-center">
// //            <div className="flex gap-6 border-r pr-10">
// //               <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pending</p><p className="font-black text-xl text-[#00ced1]">{stats.pending}</p></div>
// //               <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Settled</p><p className="font-black text-xl text-green-600">{stats.settled}</p></div>
// //               <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Rejected</p><p className="font-black text-xl text-red-500">{stats.rejected}</p></div>
// //            </div>
// //            <div className="text-right"><p className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Agent Node</p><p className="font-black text-slate-900">{session?.name} <span className="opacity-30">({session?.id})</span></p></div>
// //            <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="text-red-500 p-4 rounded-2xl border hover:bg-red-50 cursor-pointer shadow-sm"><LogOut size={20}/></button>
// //         </div>
// //       </header>

// //       <main className="p-16 max-w-[1600px] mx-auto w-full">
// //         <div className="grid lg:grid-cols-12 gap-12">
// //             <div className="lg:col-span-4 bg-white p-12 rounded-[3.5rem] shadow-xl border h-fit sticky top-32">
// //               <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-slate-800">{editingId ? <Edit3 className="text-[#00ced1]"/> : <UserPlus className="text-[#00ced1]"/>} {editingId ? "Update Node" : "Registration Node"}</h2>
// //               <form onSubmit={async (e) => {
// //                   e.preventDefault();
// //                   await axios.post(`${API_BASE}/api/users/register`, { ...form, id: editingId || "", role:'user', createdBy: session.id });
// //                   cancelEdit(); fetchClients();
// //               }} className="space-y-4">
// //                   <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
// //                   <input type="email" placeholder="Gmail Identity" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
// //                     <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
// //                   </div>
// //                   <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
// //                   <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
// //                   <button className={`w-full py-6 rounded-3xl font-black shadow-2xl transition-all cursor-pointer ${editingId ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`}>{editingId ? "Save Changes" : "Generate Client Node"}</button>
// //               </form>
// //             </div>

// //             <div className="lg:col-span-8 bg-white p-12 rounded-[3.5rem] shadow-xl border overflow-hidden">
// //               <h3 className="font-black text-3xl mb-10 text-slate-800">Customer Registry</h3>
// //               <div className="space-y-4 max-h-[700px] overflow-auto pr-4 custom-scrollbar">
// //                   {clientList.map(user => (
// //                       <div key={user.id} className="flex justify-between items-center p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-[#00ced1] transition-all">
// //                         <div className="text-left"><p className="font-black text-2xl text-slate-900">{user.name}</p><div className="flex items-center gap-3 mt-2"><p className="font-mono text-[#00ced1] font-bold text-sm">#{user.id}</p><span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${user.claimStatus === 3 ? 'bg-green-100 text-green-600' : user.claimStatus === -1 ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-600'}`}>{user.claimStatus === -1 ? 'REJECTED' : user.claimStatus === 3 ? 'SETTLED' : user.statusMessage}</span></div><p className="text-[10px] font-black text-slate-400 mt-2 uppercase flex items-center gap-1"><MapPin size={12}/> {user.mandal}, {user.dist}, {user.state}</p></div>
// //                         <div className="flex gap-4"><button onClick={() => startEdit(user)} className="p-4 bg-white text-[#00ced1] rounded-2xl border shadow-sm hover:bg-teal-50 transition-transform hover:scale-110"><Edit3 size={20}/></button><button onClick={async () => { if(window.confirm("Delete Node?")) { await axios.delete(`${API_BASE}/api/users/${user.id}`); fetchClients(); }}} className="p-4 bg-white text-red-500 rounded-2xl border shadow-sm hover:bg-red-50 transition-transform hover:scale-110"><Trash2 size={20}/></button></div>
// //                       </div>
// //                   ))}
// //               </div>
// //             </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect } from 'react';
// import { fetchLocations, getMandals } from '../services/locationService';
// import Logo from '../components/Logo';
// import { 
//   UserPlus, LogOut, MapPin, Trash2, Edit3, Activity, Award, ChevronRight, Clock, XCircle 
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// export default function AgentDashboard() {
//   const navigate = useNavigate();
//   const session = JSON.parse(localStorage.getItem('session'));
//   const API_BASE = import.meta.env.VITE_API_BASE_URL;

//   const [locations, setLocations] = useState([]);
//   const [mandals, setMandals] = useState([]);
//   const [clientList, setClientList] = useState([]);
//   const [editingId, setEditingId] = useState(null); 
//   const [form, setForm] = useState({ 
//     name: '', email: '', password: '', state: '', dist: '', mandal: '',
//     claimStatus: 0, statusMessage: "PENDING" 
//   });

//   useEffect(() => { 
//     fetchLocations().then(setLocations);
//     fetchClients(); 
//     const interval = setInterval(fetchClients, 3000); 
//     return () => clearInterval(interval); 
//   }, []);

//   const fetchClients = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/users/all`);
//       const myClients = res.data.filter(u => u.createdBy === session?.id);
//       setClientList(myClients);
//     } catch (error) { console.error("Sync Error"); }
//   };

//   const stats = {
//     settled: clientList.filter(u => u.claimStatus === 3).length,
//     rejected: clientList.filter(u => u.claimStatus === -1).length,
//     pending: clientList.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length
//   };

//   const startEdit = (user) => {
//     setEditingId(user.id);
//     setForm({
//       name: user.name, email: user.email, password: user.password,
//       state: user.state, dist: user.dist, mandal: user.mandal,
//       claimStatus: user.claimStatus, statusMessage: user.statusMessage 
//     });
//     setMandals(getMandals(user.dist));
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setForm({ name: '', email: '', password: '', state: '', dist: '', mandal: '', claimStatus: 0, statusMessage: "PENDING" });
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex flex-col text-left font-sans selection:bg-[#00ced1]/20">
//       <header className="p-10 bg-white shadow-sm flex justify-between items-center sticky top-0 z-30 border-b">
//         <Logo />
//         <div className="flex gap-10 items-center">
//            <div className="flex gap-6 border-r pr-10">
//               <div className="text-center">
//                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pending</p>
//                 <p className="font-black text-xl text-[#00ced1]">{stats.pending}</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Settled</p>
//                 <p className="font-black text-xl text-green-600">{stats.settled}</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Rejected</p>
//                 <p className="font-black text-xl text-red-500">{stats.rejected}</p>
//               </div>
//            </div>
//            <div className="text-right">
//               <p className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Agent Node</p>
//               <p className="font-black text-slate-900">{session?.name} <span className="opacity-30">({session?.id})</span></p>
//            </div>
//            <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="text-red-500 p-4 rounded-2xl border hover:bg-red-50 transition-all cursor-pointer shadow-sm">
//               <LogOut size={20}/>
//            </button>
//         </div>
//       </header>

//       <main className="p-16 max-w-[1600px] mx-auto w-full">
//         <div className="grid lg:grid-cols-12 gap-12">
//             <div className="lg:col-span-4 bg-white p-12 rounded-[3.5rem] shadow-xl border h-fit sticky top-32">
//               <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-slate-800">
//                   {editingId ? <Edit3 className="text-[#00ced1]"/> : <UserPlus className="text-[#00ced1]"/>} 
//                   {editingId ? "Update Node" : "Registration Node"}
//               </h2>
//               <form onSubmit={async (e) => {
//                   e.preventDefault();
//                   const payload = { ...form, id: editingId || "", role:'user', createdBy: session.id };
//                   await axios.post(`${API_BASE}/api/users/register`, payload);
//                   cancelEdit(); fetchClients();
//               }} className="space-y-4">
//                   <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
//                   <input type="email" placeholder="Gmail Identity" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
//                   <div className="grid grid-cols-2 gap-4">
//                     <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
//                     <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
//                   </div>
//                   <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
//                   <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
//                   <button className={`w-full py-6 rounded-3xl font-black shadow-2xl transition-all cursor-pointer ${editingId ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`}>{editingId ? "Save Changes" : "Generate Client Node"}</button>
//               </form>
//             </div>

//             <div className="lg:col-span-8 bg-white p-12 rounded-[3.5rem] shadow-xl border overflow-hidden">
//               <h3 className="font-black text-3xl mb-10 text-slate-800">Customer Registry</h3>
//               <div className="space-y-4 max-h-[700px] overflow-auto pr-4 custom-scrollbar">
//                   {clientList.map(user => (
//                       <div key={user.id} className="flex justify-between items-center p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-[#00ced1] transition-all">
//                         <div className="text-left">
//                             <p className="font-black text-2xl text-slate-900">{user.name}</p>
//                             <div className="flex items-center gap-3 mt-2"><p className="font-mono text-[#00ced1] font-bold text-sm">#{user.id}</p><span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${user.claimStatus === 3 ? 'bg-green-100 text-green-600' : user.claimStatus === -1 ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-600'}`}>
//                                {user.claimStatus === -1 ? 'REJECTED' : user.claimStatus === 3 ? 'SETTLED' : user.statusMessage}
//                             </span></div>
//                             <p className="text-[10px] font-black text-slate-400 mt-2 uppercase flex items-center gap-1"><MapPin size={12}/> {user.mandal}, {user.dist}, {user.state}</p>
//                         </div>
//                         <div className="flex gap-4">
//                             <button onClick={() => startEdit(user)} className="p-4 bg-white text-[#00ced1] rounded-2xl border shadow-sm hover:bg-teal-50 cursor-pointer transition-transform hover:scale-110"><Edit3 size={20}/></button>
//                             <button onClick={async () => { if(window.confirm("Delete Node?")) { await axios.delete(`${API_BASE}/api/users/${user.id}`); fetchData(); }}} className="p-4 bg-white text-red-500 rounded-2xl border shadow-sm hover:bg-red-50 cursor-pointer transition-transform hover:scale-110"><Trash2 size={20}/></button>
//                         </div>
//                       </div>
//                   ))}
//               </div>
//             </div>
//         </div>

//         <section className="mt-24 mb-32">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
//              <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 bg-[#00ced1]/10 rounded-3xl flex items-center justify-center text-[#00ced1]"><Activity size={28}/></div>
//                 <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Customer <span className="text-[#00ced1]">Lifecycle</span></h2>
//              </div>
//              <div className="flex gap-6 bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-2xl">
//                 <div><p className="text-[8px] font-black uppercase text-[#00ced1]">Fulfillment</p><p className="text-2xl font-black">{clientList.length > 0 ? ((stats.settled / clientList.length) * 100).toFixed(0) : 0}%</p></div>
//                 <div className="w-px h-8 bg-white/10 mt-1"></div>
//                 <div><p className="text-[8px] font-black uppercase text-slate-400">Total Activity</p><p className="text-2xl font-black">{clientList.length}</p></div>
//              </div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {clientList.map((user) => (
//               <motion.div key={user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-white flex flex-col justify-between hover:shadow-2xl transition-all relative overflow-hidden group">
//                 {user.claimStatus === 3 && <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-50 rounded-full flex items-center justify-center pt-4 pr-4 text-green-500"><Award size={32} /></div>}
//                 {user.claimStatus === -1 && <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-50 rounded-full flex items-center justify-center pt-4 pr-4 text-red-500"><XCircle size={32} /></div>}
//                 <div>
//                   <div className="flex justify-between items-center mb-8">
//                      <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${user.claimStatus === 3 ? 'bg-green-100 text-green-600' : user.claimStatus === -1 ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-[#00ced1]'}`}>{user.claimStatus === -1 ? 'REJECTED' : user.claimStatus === 3 ? 'SETTLED' : user.statusMessage}</div>
//                      <span className="text-slate-300 font-bold text-[10px] uppercase font-mono tracking-tighter">NODE_#{user.id.slice(-4)}</span>
//                   </div>
//                   <h4 className="text-2xl font-black text-slate-900 mb-4">{user.name}</h4>
//                   <p className="text-slate-500 text-sm font-medium italic">
//                     {user.claimStatus === 3 ? "Policy SETTLED." : user.claimStatus === -1 ? "Policy REJECTED." : `Ongoing Stage ${user.claimStatus} verification.`}
//                   </p>
//                 </div>
//                 <div className="mt-10 pt-10 border-t border-slate-50 flex items-center justify-between">
//                    <div className="flex items-center gap-2 text-slate-400 font-black text-[9px] uppercase tracking-widest"><MapPin size={12}/> {user.dist}, {user.state}</div>
//                    <button onClick={() => startEdit(user)} className="text-[#00ced1] font-black text-[10px] uppercase flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">Edit Node <ChevronRight size={14}/></button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { fetchLocations, getMandals } from '../services/locationService';
import Logo from '../components/Logo';
import { UserPlus, LogOut, MapPin, Trash2, Edit3, Activity, Award, ChevronRight, Clock, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function AgentDashboard() {
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem('session'));
  const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";
  const [locations, setLocations] = useState([]);
  const [mandals, setMandals] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [form, setForm] = useState({ name: '', email: '', password: '', state: '', dist: '', mandal: '', claimStatus: 0, statusMessage: "PENDING" });

  useEffect(() => { fetchLocations().then(setLocations); fetchClients(); const interval = setInterval(fetchClients, 3000); return () => clearInterval(interval); }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/all`);
      const myClients = res.data.filter(u => u.createdBy === session?.id);
      setClientList(myClients);
    } catch (error) { console.error("Sync Error"); }
  };

  const stats = { settled: clientList.filter(u => u.claimStatus === 3).length, rejected: clientList.filter(u => u.claimStatus === -1).length, pending: clientList.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length };

  const startEdit = (user) => {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, password: user.password, state: user.state, dist: user.dist, mandal: user.mandal, claimStatus: user.claimStatus, statusMessage: user.statusMessage });
    setMandals(getMandals(user.dist));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col text-left font-sans">
      <header className="p-10 bg-white shadow-sm flex justify-between items-center sticky top-0 z-30 border-b">
        <Logo />
        <div className="flex gap-10 items-center">
           <div className="flex gap-6 border-r pr-10">
              <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pending</p><p className="font-black text-xl text-[#00ced1]">{stats.pending}</p></div>
              <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Settled</p><p className="font-black text-xl text-green-600">{stats.settled}</p></div>
              <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Rejected</p><p className="font-black text-xl text-red-500">{stats.rejected}</p></div>
           </div>
           <div className="text-right"><p className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Agent Node</p><p className="font-black text-slate-900">{session?.name} <span className="opacity-30">({session?.id})</span></p></div>
           <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="text-red-500 p-4 rounded-2xl border hover:bg-red-50 shadow-sm"><LogOut size={20}/></button>
        </div>
      </header>

      <main className="p-16 max-w-[1600px] mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 bg-white p-12 rounded-[3.5rem] shadow-xl border h-fit sticky top-32">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-slate-800">{editingId ? <Edit3 className="text-[#00ced1]"/> : <UserPlus className="text-[#00ced1]"/>} {editingId ? "Update Node" : "Registration Node"}</h2>
              <form onSubmit={async (e) => { e.preventDefault(); await axios.post(`${API_BASE}/api/users/register`, { ...form, id: editingId || "", role:'user', createdBy: session.id }); setEditingId(null); setForm({ name: '', email: '', password: '', state: '', dist: '', mandal: '', claimStatus: 0, statusMessage: "PENDING" }); fetchClients(); }} className="space-y-4">
                  <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <input type="email" placeholder="Gmail Identity" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
                    <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value, mandal: ''}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
                  </div>
                  <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
                  <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                  <button className="w-full py-6 rounded-3xl font-black shadow-2xl bg-slate-900 text-white cursor-pointer">{editingId ? "Save Changes" : "Generate Client Node"}</button>
              </form>
            </div>

            <div className="lg:col-span-8 bg-white p-12 rounded-[3.5rem] shadow-xl border overflow-hidden">
              <h3 className="font-black text-3xl mb-10 text-slate-800">Customer Registry</h3>
              <div className="space-y-4 max-h-[700px] overflow-auto pr-4 custom-scrollbar">
                  {clientList.map(user => (
                      <div key={user.id} className="flex justify-between items-center p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-[#00ced1] transition-all">
                        <div className="text-left"><p className="font-black text-2xl text-slate-900">{user.name}</p><div className="flex items-center gap-3 mt-2"><p className="font-mono text-[#00ced1] font-bold text-sm">#{user.id}</p><span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${user.claimStatus === 3 ? 'bg-green-100 text-green-600' : user.claimStatus === -1 ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-600'}`}>{user.claimStatus === -1 ? 'REJECTED' : (user.claimStatus === 3 ? 'SETTLED' : 'PENDING')}</span></div><p className="text-[10px] font-black text-slate-400 mt-2 uppercase flex items-center gap-1"><MapPin size={12}/> {user.mandal}, {user.dist}, {user.state}</p></div>
                        <div className="flex gap-4"><button onClick={() => startEdit(user)} className="p-4 bg-white text-[#00ced1] rounded-2xl border shadow-sm"><Edit3 size={20}/></button><button onClick={async () => { if(window.confirm("Delete?")) { await axios.delete(`${API_BASE}/api/users/${user.id}`); fetchClients(); }}} className="p-4 bg-white text-red-500 rounded-2xl border shadow-sm"><Trash2 size={20}/></button></div>
                      </div>
                  ))}
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}