import React, { useState, useEffect } from 'react';
import { fetchLocations, getMandals } from '../services/locationService';
import Logo from '../components/Logo';
import { UserPlus, LogOut, MapPin, Trash2, Edit3, X, ShieldCheck, ArrowUpCircle, XCircle, Users, Briefcase, Clock, Activity, Award } from 'lucide-react';
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
  const [form, setForm] = useState({ type: 'agent', name: '', email: '', state: '', dist: '', mandal: '', password: '' });

  useEffect(() => { fetchLocations().then(setLocations); fetchData(); }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/users/all`);
      setDb({ agents: response.data.filter(u => u.role === 'agent'), users: response.data.filter(u => u.role === 'user') });
    } catch (e) { console.error("Sync Error"); }
  };

  const handleOpenModal = (type) => {
    setForm({ type, name: '', email: '', state: '', dist: '', mandal: '', password: '' });
    setShowModal(true);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ type: item.role, name: item.name, email: item.email, state: item.state, dist: item.dist, mandal: item.mandal, password: item.password });
    setMandals(getMandals(item.dist)); setShowModal(true);
  };

  const cancelEdit = () => { setEditingId(null); setShowModal(false); };

  const stats = {
    agents: db.agents.length, customers: db.users.length,
    pending: db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3).length,
    settled: db.users.filter(u => u.claimStatus === 3).length, 
    rejected: db.users.filter(u => u.claimStatus === -1).length
  };

  const filteredItems = filterType === 'all' ? [...db.agents, ...db.users] : filterType === 'agent' ? db.agents : filterType === 'user' ? db.users : filterType === 'pending' ? db.users.filter(u => u.claimStatus >= 0 && u.claimStatus < 3) : filterType === 'settled' ? db.users.filter(u => u.claimStatus === 3) : db.users.filter(u => u.claimStatus === -1);

  const updateStatus = async (user, next, msg) => {
    if(!window.confirm(`Update to: ${msg}?`)) return;
    await axios.post(`${API_BASE}/api/users/register`, { ...user, claimStatus: next, statusMessage: msg });
    fetchData();
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
                {filteredItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-8 bg-[#fcfdfe] rounded-[2.5rem] border border-slate-50 hover:border-[#00ced1] transition-all">
                        
                        {/* LEFT SECTION: Avatar, Name and ID */}
                        <div className="flex items-center gap-6 w-1/2">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${item.role === 'agent' ? 'bg-teal-50 text-[#00ced1]' : 'bg-indigo-50 text-indigo-600'}`}>
                                {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="text-left">
                                {/* NAME and ID on same line */}
                                <div className="flex items-center gap-3">
                                  <h2 className="font-black text-2xl text-slate-900">{item.name}</h2>
                                  <span className="bg-slate-200 text-slate-700 font-mono text-xs font-bold px-2 py-1 rounded border border-slate-300">
                                    ID: {item.id}
                                  </span>
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1 mt-1">
                                    <MapPin size={12}/> {item.mandal}, {item.dist}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT SECTION: Status and Buttons */}
                        <div className="flex items-center gap-6 justify-end w-1/2">
                            {item.role === 'user' && item.claimStatus !== -1 && (
                                <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-50">
                                    <button onClick={() => updateStatus(item, item.claimStatus + 1, item.claimStatus + 1 === 3 ? "SETTLED" : "STAGE_DONE")} className="p-3 bg-[#00ced1] text-white rounded-xl hover:scale-110 transition-transform"><ArrowUpCircle size={22}/></button>
                                    <button onClick={() => updateStatus(item, -1, "REJECTED")} className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform"><XCircle size={22}/></button>
                                </div>
                            )}
                            
                            {/* STATUS BADGE */}
                            <div className="text-right">
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Status</p>
                                <span className={`text-sm font-black uppercase tracking-widest ${item.claimStatus === -1 ? 'text-red-500' : item.claimStatus === 3 ? 'text-green-600' : 'text-[#00ced1]'}`}>
                                    {item.claimStatus === -1 ? 'REJECTED' : (item.claimStatus === 3 ? 'SETTLED' : 'PENDING')}
                                </span>
                            </div>

                            <div className="flex gap-3 pl-6 border-l">
                                <button onClick={() => startEdit(item)} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-[#00ced1] hover:border-[#00ced1] transition-all"><Edit3 size={18}/></button>
                                <button onClick={async () => { if(window.confirm("Delete?")) { await axios.delete(`${API_BASE}/api/users/${item.id}`); fetchData(); }}} className="p-3 bg-white text-slate-400 rounded-xl border hover:text-red-500 hover:border-red-500 transition-all"><Trash2 size={18}/></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-3xl border border-white text-left relative overflow-hidden">
                <button onClick={cancelEdit} className="absolute top-10 right-10 p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer text-slate-400"><X size={24}/></button>
                <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{editingId ? 'Update' : 'Register'} <span className={form.type === 'agent' ? 'text-[#00ced1]' : 'text-indigo-600'}>{form.type === 'agent' ? 'Agent' : 'Customer'}</span></h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">Generates 10-Char Location Based ID</p>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await axios.post(`${API_BASE}/api/users/register`, { ...form, id: editingId || "", role: form.type, claimStatus: editingId ? undefined : 0, statusMessage: editingId ? undefined : "PENDING", createdBy: "ADMIN_MASTER" });
                    alert(`Registry Sync Successful.\nGenerated ID: ${res.data.id}`); 
                    cancelEdit(); 
                    fetchData();
                  } catch(err) { alert("Registration Failed"); }
                }} className="space-y-4">
                  <input placeholder="Name" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <input type="email" placeholder="Gmail" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <select className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.state} onChange={e => setForm({...form, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
                    <select disabled={!form.state} className="p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.dist} onChange={e => { setForm({...form, dist: e.target.value, mandal: ''}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{form.state && locations.find(l => l.state === form.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
                  </div>
                  <select disabled={!form.dist} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" value={form.mandal} onChange={e => setForm({...form, mandal: e.target.value})} required><option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}</select>
                  <input type="password" placeholder="Password" required className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-[#00ced1] outline-none" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                  <button className={`w-full py-7 rounded-[2.5rem] font-black text-lg shadow-2xl transition-all mt-6 ${form.type === 'agent' ? 'bg-[#00ced1] text-white' : 'bg-indigo-600 text-white'}`}>{editingId ? "Update Record" : "Generate & Save"}</button>
                </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}