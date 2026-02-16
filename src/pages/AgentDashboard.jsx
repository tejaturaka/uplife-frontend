
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




// import React, { useState, useEffect } from 'react';
// import { fetchLocations, getMandals } from '../services/locationService';
// import Logo from '../components/Logo';
// import { UserPlus, LogOut, MapPin, Trash2, Edit3, Activity, Award, ChevronRight } from 'lucide-react';
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
//     <div className="min-h-screen bg-[#f8fafc] flex flex-col text-left font-sans">
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
//            <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="text-red-500 p-4 rounded-2xl border hover:bg-red-50 cursor-pointer transition-all shadow-sm">
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
//                             <button onClick={async () => { if(window.confirm("Delete Node?")) { await axios.delete(`${API_BASE}/api/users/${user.id}`); fetchClients(); }}} className="p-4 bg-white text-red-500 rounded-2xl border shadow-sm hover:bg-red-50 cursor-pointer transition-transform hover:scale-110"><Trash2 size={20}/></button>
//                         </div>
//                       </div>
//                   ))}
//               </div>
//             </div>
//         </div>
//       </main>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { fetchLocations, getMandals } from '../services/locationService';
import Logo from '../components/Logo';
import { 
  UserPlus, LogOut, MapPin, Trash2, Edit3, Activity, Award, ChevronRight, Clock, XCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function AgentDashboard() {
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem('session'));
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [locations, setLocations] = useState([]);
  const [mandals, setMandals] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [form, setForm] = useState({ 
    name: '', email: '', password: '', state: '', dist: '', mandal: '',
    claimStatus: 0, statusMessage: "PENDING" 
  });

  useEffect(() => { 
    fetchLocations().then(setLocations);
    fetchClients(); 
    const interval = setInterval(fetchClients, 3000); 
    return () => clearInterval(interval); 
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/all`);
      const myClients = res.data.filter(u => u.createdBy === session?.id);
      setClientList(myClients);
    } catch (error) { console.error("Sync Error"); }
  };

  const stats = {
    settled: clientList.filter(u => u.claimStatus === 3).length,
    rejected: clientList.filter(u => u.claimStatus === -1).length,
    pending: clientList.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, password: user.password, state: user.state, dist: user.dist, mandal: user.mandal, claimStatus: user.claimStatus, statusMessage: user.statusMessage });
    setMandals(getMandals(user.dist));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', email: '', password: '', state: '', dist: '', mandal: '', claimStatus: 0, statusMessage: "PENDING" });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col text-left font-sans selection:bg-[#00ced1]/20">
      <header className="p-10 bg-white shadow-sm flex justify-between items-center sticky top-0 z-30 border-b">
        <Logo />
        <div className="flex gap-10 items-center">
           <div className="flex gap-6 border-r pr-10">
              <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pending</p><p className="font-black text-xl text-[#00ced1]">{stats.pending}</p></div>
              <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Settled</p><p className="font-black text-xl text-green-600">{stats.settled}</p></div>
              <div className="text-center"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Rejected</p><p className="font-black text-xl text-red-500">{stats.rejected}</p></div>
           </div>
           <div className="text-right"><p className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Agent Node</p><p className="font-black text-slate-900">{session?.name} <span className="opacity-30">({session?.id})</span></p></div>
           <button onClick={() => { localStorage.removeItem('session'); navigate('/'); }} className="text-red-500 p-4 rounded-2xl border hover:bg-red-50 cursor-pointer shadow-sm"><LogOut size={20}/></button>
        </div>
      </header>

      <main className="p-16 max-w-[1600px] mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 bg-white p-12 rounded-[3.5rem] shadow-xl border h-fit sticky top-32">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-slate-800">{editingId ? <Edit3 className="text-[#00ced1]"/> : <UserPlus className="text-[#00ced1]"/>} {editingId ? "Update Node" : "Registration Node"}</h2>
              <form onSubmit={async (e) => {
                  e.preventDefault();
                  await axios.post(`${API_BASE}/api/users/register`, { ...form, id: editingId || "", role:'user', createdBy: session.id });
                  cancelEdit(); fetchClients();
              }} className="space-y-4">
                  <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <input type="email" placeholder="Gmail Identity" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
                    <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
                  </div>
                  <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
                  <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                  <button className={`w-full py-6 rounded-3xl font-black shadow-2xl transition-all cursor-pointer ${editingId ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`}>{editingId ? "Save Changes" : "Generate Client Node"}</button>
              </form>
            </div>

            <div className="lg:col-span-8 bg-white p-12 rounded-[3.5rem] shadow-xl border overflow-hidden">
              <h3 className="font-black text-3xl mb-10 text-slate-800">Customer Registry</h3>
              <div className="space-y-4 max-h-[700px] overflow-auto pr-4 custom-scrollbar">
                  {clientList.map(user => (
                      <div key={user.id} className="flex justify-between items-center p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-[#00ced1] transition-all">
                        <div className="text-left"><p className="font-black text-2xl text-slate-900">{user.name}</p><div className="flex items-center gap-3 mt-2"><p className="font-mono text-[#00ced1] font-bold text-sm">#{user.id}</p><span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${user.claimStatus === 3 ? 'bg-green-100 text-green-600' : user.claimStatus === -1 ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-600'}`}>{user.claimStatus === -1 ? 'REJECTED' : user.claimStatus === 3 ? 'SETTLED' : user.statusMessage}</span></div><p className="text-[10px] font-black text-slate-400 mt-2 uppercase flex items-center gap-1"><MapPin size={12}/> {user.mandal}, {user.dist}, {user.state}</p></div>
                        <div className="flex gap-4"><button onClick={() => startEdit(user)} className="p-4 bg-white text-[#00ced1] rounded-2xl border shadow-sm hover:bg-teal-50 transition-transform hover:scale-110"><Edit3 size={20}/></button><button onClick={async () => { if(window.confirm("Delete Node?")) { await axios.delete(`${API_BASE}/api/users/${user.id}`); fetchClients(); }}} className="p-4 bg-white text-red-500 rounded-2xl border shadow-sm hover:bg-red-50 transition-transform hover:scale-110"><Trash2 size={20}/></button></div>
                      </div>
                  ))}
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}