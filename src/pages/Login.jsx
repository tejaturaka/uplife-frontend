// // // // // // // // import React, { useState } from 'react';
// // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // import axios from 'axios';
// // // // // // // // import { ShieldCheck, ArrowRight, Lock, Fingerprint } from 'lucide-react';
// // // // // // // // import Logo from '../components/Logo';

// // // // // // // // export default function Login() {
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const [form, setForm] = useState({ id: '', password: '' });
// // // // // // // //   const [loading, setLoading] = useState(false);
  
// // // // // // // //   // Ensure this URL matches your live backend
// // // // // // // //   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";

// // // // // // // //   const handleLogin = async (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     setLoading(true);

// // // // // // // //     try {
// // // // // // // //       // FIX: Trim whitespace from inputs before sending
// // // // // // // //       const payload = {
// // // // // // // //         id: form.id.trim(),
// // // // // // // //         password: form.password.trim()
// // // // // // // //       };

// // // // // // // //       const res = await axios.post(`${API_BASE}/api/users/login`, payload);

// // // // // // // //       if (res.status === 200) {
// // // // // // // //         const user = res.data;
        
// // // // // // // //         // Save Session
// // // // // // // //         localStorage.setItem('session', JSON.stringify(user));
        
// // // // // // // //         // Redirect based on Role
// // // // // // // //         if (user.role === 'admin') navigate('/admin');
// // // // // // // //         else if (user.role === 'agent') navigate('/agent');
// // // // // // // //         else navigate('/customer'); // Customer Dashboard
// // // // // // // //       }
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error(err);
// // // // // // // //       // Detailed Error Handling
// // // // // // // //       if (err.response && err.response.status === 404) {
// // // // // // // //         alert("Access Denied: User ID does not exist.");
// // // // // // // //       } else if (err.response && err.response.status === 401) {
// // // // // // // //         alert("Access Denied: Incorrect Password.");
// // // // // // // //       } else {
// // // // // // // //         alert("Access Denied: Invalid ID or Password.");
// // // // // // // //       }
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="flex h-screen w-full bg-[#f8fafc]">
// // // // // // // //       {/* Left Side - Image/Branding */}
// // // // // // // //       <div className="hidden lg:flex w-[55%] bg-[#020617] relative overflow-hidden flex-col justify-between p-16 text-white">
// // // // // // // //         <div className="z-10"><Logo dark={true} /></div>
// // // // // // // //         <div className="z-10 max-w-2xl">
// // // // // // // //           <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
// // // // // // // //             Protecting<br />
// // // // // // // //             <span className="text-slate-500">What Matters</span><br />
// // // // // // // //             <span className="text-[#00ced1]">Most.</span>
// // // // // // // //           </h1>
// // // // // // // //           <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
// // // // // // // //             Experience India's most transparent and secure insurance claim node. Empowering families with digital precision.
// // // // // // // //           </p>
          
// // // // // // // //           <div className="flex gap-4 mt-12">
// // // // // // // //             <div className="px-5 py-3 rounded-full bg-slate-900/50 border border-slate-800 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
// // // // // // // //               <ShieldCheck size={16} className="text-[#00ced1]"/> ISO 27001 Secure
// // // // // // // //             </div>
// // // // // // // //             <div className="px-5 py-3 rounded-full bg-slate-900/50 border border-slate-800 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
// // // // // // // //               <ShieldCheck size={16} className="text-[#00ced1]"/> 99.8% Success
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //         {/* Background Overlay */}
// // // // // // // //         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 z-0"></div>
// // // // // // // //         <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 object-cover opacity-20 mix-blend-luminosity -z-10" alt="office" />
// // // // // // // //       </div>

// // // // // // // //       {/* Right Side - Login Form */}
// // // // // // // //       <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white">
// // // // // // // //         <div className="w-full max-w-md">
// // // // // // // //            <h2 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">Sign In</h2>
// // // // // // // //            <div className="flex items-center gap-2 mb-12">
// // // // // // // //              <ShieldCheck size={16} className="text-[#00ced1]"/>
// // // // // // // //              <span className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Encrypted SQL Node</span>
// // // // // // // //            </div>

// // // // // // // //            <form onSubmit={handleLogin} className="space-y-6">
// // // // // // // //               <div className="group">
// // // // // // // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Identification ID</label>
// // // // // // // //                 <div className="relative">
// // // // // // // //                   <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // // // // // // //                   <input 
// // // // // // // //                     type="text" 
// // // // // // // //                     placeholder="0000000001" 
// // // // // // // //                     className="w-full pl-14 pr-6 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200 font-mono"
// // // // // // // //                     value={form.id}
// // // // // // // //                     onChange={(e) => setForm({...form, id: e.target.value})}
// // // // // // // //                     required
// // // // // // // //                   />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               <div className="group">
// // // // // // // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Secure Password</label>
// // // // // // // //                 <div className="relative">
// // // // // // // //                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // // // // // // //                   <input 
// // // // // // // //                     type="password" 
// // // // // // // //                     placeholder="••••••" 
// // // // // // // //                     className="w-full pl-14 pr-6 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200"
// // // // // // // //                     value={form.password}
// // // // // // // //                     onChange={(e) => setForm({...form, password: e.target.value})}
// // // // // // // //                     required
// // // // // // // //                   />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               <button 
// // // // // // // //                 type="submit" 
// // // // // // // //                 disabled={loading}
// // // // // // // //                 className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-slate-900 active:scale-95 transition-all flex items-center justify-center gap-4 mt-8 shadow-2xl shadow-slate-200"
// // // // // // // //               >
// // // // // // // //                 {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight size={24} className={loading ? 'hidden' : 'block'}/>
// // // // // // // //               </button>
// // // // // // // //            </form>

// // // // // // // //            <div className="mt-12 text-center">
// // // // // // // //               <p className="text-sm font-bold text-slate-400">Don't have an ID? <button className="text-[#00ced1] hover:underline">Request Access</button></p>
// // // // // // // //            </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // import React, { useState } from 'react';
// // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // import axios from 'axios';
// // // // // // // import { ShieldCheck, ArrowRight, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';
// // // // // // // import Logo from '../components/Logo';

// // // // // // // export default function Login() {
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const [form, setForm] = useState({ id: '', password: '' });
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [showPassword, setShowPassword] = useState(false); // Toggle State
  
// // // // // // //   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";

// // // // // // //   const handleLogin = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     setLoading(true);

// // // // // // //     try {
// // // // // // //       const payload = {
// // // // // // //         id: form.id.trim(),
// // // // // // //         password: form.password.trim()
// // // // // // //       };

// // // // // // //       const res = await axios.post(`${API_BASE}/api/users/login`, payload);

// // // // // // //       if (res.status === 200) {
// // // // // // //         const user = res.data;
// // // // // // //         localStorage.setItem('session', JSON.stringify(user));
        
// // // // // // //         if (user.role === 'admin') navigate('/admin');
// // // // // // //         else if (user.role === 'agent') navigate('/agent');
// // // // // // //         else navigate('/user'); 
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.error(err);
// // // // // // //       if (err.response && err.response.status === 404) alert("Access Denied: User ID does not exist.");
// // // // // // //       else if (err.response && err.response.status === 401) alert("Access Denied: Incorrect Password.");
// // // // // // //       else alert("Access Denied: Invalid ID or Password.");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="flex h-screen w-full bg-[#f8fafc]">
      
// // // // // // //       {/* --- LEFT SIDE: LOGIN FORM --- */}
// // // // // // //       <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative z-10">
// // // // // // //         <div className="w-full max-w-md">
// // // // // // //            <div className="mb-12"><Logo /></div>
           
// // // // // // //            <h2 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">Sign In</h2>
// // // // // // //            <div className="flex items-center gap-2 mb-12">
// // // // // // //              <ShieldCheck size={16} className="text-[#00ced1]"/>
// // // // // // //              <span className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Encrypted SQL Node</span>
// // // // // // //            </div>

// // // // // // //            <form onSubmit={handleLogin} className="space-y-6">
// // // // // // //               <div className="group">
// // // // // // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Identification ID</label>
// // // // // // //                 <div className="relative">
// // // // // // //                   <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // // // // // //                   <input 
// // // // // // //                     type="text" 
// // // // // // //                     placeholder="0000000001" 
// // // // // // //                     className="w-full pl-14 pr-6 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200 font-mono"
// // // // // // //                     value={form.id}
// // // // // // //                     onChange={(e) => setForm({...form, id: e.target.value})}
// // // // // // //                     required
// // // // // // //                   />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <div className="group">
// // // // // // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Secure Password</label>
// // // // // // //                 <div className="relative">
// // // // // // //                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // // // // // //                   <input 
// // // // // // //                     type={showPassword ? "text" : "password"} 
// // // // // // //                     placeholder="••••••" 
// // // // // // //                     className="w-full pl-14 pr-14 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200"
// // // // // // //                     value={form.password}
// // // // // // //                     onChange={(e) => setForm({...form, password: e.target.value})}
// // // // // // //                     required
// // // // // // //                   />
// // // // // // //                   {/* TOGGLE PASSWORD ICON */}
// // // // // // //                   <button 
// // // // // // //                     type="button"
// // // // // // //                     onClick={() => setShowPassword(!showPassword)}
// // // // // // //                     className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00ced1] transition-colors cursor-pointer"
// // // // // // //                   >
// // // // // // //                     {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <button 
// // // // // // //                 type="submit" 
// // // // // // //                 disabled={loading}
// // // // // // //                 className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-slate-900 active:scale-95 transition-all flex items-center justify-center gap-4 mt-8 shadow-2xl shadow-slate-200"
// // // // // // //               >
// // // // // // //                 {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight size={24} className={loading ? 'hidden' : 'block'}/>
// // // // // // //               </button>
// // // // // // //            </form>

// // // // // // //            <div className="mt-12 text-center">
// // // // // // //               <p className="text-sm font-bold text-slate-400">Don't have an ID? <button className="text-[#00ced1] hover:underline">Request Access</button></p>
// // // // // // //            </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* --- RIGHT SIDE: BEAUTIFUL IMAGE --- */}
// // // // // // //       <div className="hidden lg:flex w-[55%] bg-[#020617] relative overflow-hidden flex-col justify-end p-16 text-white text-right">
// // // // // // //         {/* Background Image */}
// // // // // // //         <div className="absolute inset-0 z-0">
// // // // // // //           <img 
// // // // // // //             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
// // // // // // //             className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
// // // // // // //             alt="Office" 
// // // // // // //           />
// // // // // // //           <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/40 to-transparent"></div>
// // // // // // //         </div>

// // // // // // //         <div className="z-10 relative">
// // // // // // //           <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
// // // // // // //             Secure <span className="text-[#00ced1]">Access</span><br />
// // // // // // //             To Your Future.
// // // // // // //           </h1>
// // // // // // //           <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-lg ml-auto">
// // // // // // //             Manage your claims, documents, and policies in one secure, encrypted dashboard.
// // // // // // //           </p>
          
// // // // // // //           <div className="flex gap-4 mt-12 justify-end">
// // // // // // //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// // // // // // //               <ShieldCheck size={16} className="text-[#00ced1]"/> 256-bit SSL
// // // // // // //             </div>
// // // // // // //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// // // // // // //               <Fingerprint size={16} className="text-[#00ced1]"/> Biometric Ready
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // import React, { useState } from 'react';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import axios from 'axios';
// // // // // // import { ShieldCheck, ArrowRight, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';
// // // // // // import Logo from '../components/Logo';

// // // // // // export default function Login() {
// // // // // //   const navigate = useNavigate();
// // // // // //   const [form, setForm] = useState({ id: '', password: '' });
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [showPassword, setShowPassword] = useState(false); // Toggle State
  
// // // // // //   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";

// // // // // //   const handleLogin = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     setLoading(true);

// // // // // //     try {
// // // // // //       const payload = {
// // // // // //         id: form.id.trim(),
// // // // // //         password: form.password.trim()
// // // // // //       };

// // // // // //       const res = await axios.post(`${API_BASE}/api/users/login`, payload);

// // // // // //       if (res.status === 200) {
// // // // // //         const user = res.data;
// // // // // //         localStorage.setItem('session', JSON.stringify(user));
        
// // // // // //         if (user.role === 'admin') navigate('/admin');
// // // // // //         else if (user.role === 'agent') navigate('/agent');
// // // // // //         else navigate('/user'); 
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error(err);
// // // // // //       if (err.response && err.response.status === 404) alert("Access Denied: User ID does not exist.");
// // // // // //       else if (err.response && err.response.status === 401) alert("Access Denied: Incorrect Password.");
// // // // // //       else alert("Access Denied: Invalid ID or Password.");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="flex h-screen w-full bg-[#f8fafc]">
      
// // // // // //       {/* --- LEFT SIDE: LOGIN FORM --- */}
// // // // // //       <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative z-10">
// // // // // //         <div className="w-full max-w-md">
// // // // // //            <div className="mb-12"><Logo /></div>
           
// // // // // //            <h2 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">Sign In</h2>
// // // // // //            <div className="flex items-center gap-2 mb-12">
// // // // // //              <ShieldCheck size={16} className="text-[#00ced1]"/>
// // // // // //              <span className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Encrypted SQL Node</span>
// // // // // //            </div>

// // // // // //            <form onSubmit={handleLogin} className="space-y-6">
// // // // // //               <div className="group">
// // // // // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Identification ID</label>
// // // // // //                 <div className="relative">
// // // // // //                   <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // // // // //                   <input 
// // // // // //                     type="text" 
// // // // // //                     placeholder="0000000001" 
// // // // // //                     className="w-full pl-14 pr-6 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200 font-mono"
// // // // // //                     value={form.id}
// // // // // //                     onChange={(e) => setForm({...form, id: e.target.value})}
// // // // // //                     required
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div className="group">
// // // // // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Secure Password</label>
// // // // // //                 <div className="relative">
// // // // // //                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // // // // //                   <input 
// // // // // //                     type={showPassword ? "text" : "password"} 
// // // // // //                     placeholder="••••••" 
// // // // // //                     className="w-full pl-14 pr-14 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200"
// // // // // //                     value={form.password}
// // // // // //                     onChange={(e) => setForm({...form, password: e.target.value})}
// // // // // //                     required
// // // // // //                   />
// // // // // //                   {/* TOGGLE PASSWORD ICON */}
// // // // // //                   <button 
// // // // // //                     type="button"
// // // // // //                     onClick={() => setShowPassword(!showPassword)}
// // // // // //                     className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00ced1] transition-colors cursor-pointer"
// // // // // //                   >
// // // // // //                     {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <button 
// // // // // //                 type="submit" 
// // // // // //                 disabled={loading}
// // // // // //                 className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-slate-900 active:scale-95 transition-all flex items-center justify-center gap-4 mt-8 shadow-2xl shadow-slate-200"
// // // // // //               >
// // // // // //                 {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight size={24} className={loading ? 'hidden' : 'block'}/>
// // // // // //               </button>
// // // // // //            </form>

// // // // // //            <div className="mt-12 text-center">
// // // // // //               <p className="text-sm font-bold text-slate-400">Don't have an ID? <button className="text-[#00ced1] hover:underline">Request Access</button></p>
// // // // // //            </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* --- RIGHT SIDE: BEAUTIFUL IMAGE --- */}
// // // // // //       <div className="hidden lg:flex w-[55%] bg-[#020617] relative overflow-hidden flex-col justify-end p-16 text-white text-right">
// // // // // //         {/* Background Image */}
// // // // // //         <div className="absolute inset-0 z-0">
// // // // // //           <img 
// // // // // //             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
// // // // // //             className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
// // // // // //             alt="Office" 
// // // // // //           />
// // // // // //           <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/40 to-transparent"></div>
// // // // // //         </div>

// // // // // //         <div className="z-10 relative">
// // // // // //           <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
// // // // // //             Secure <span className="text-[#00ced1]">Access</span><br />
// // // // // //             To Your Future.
// // // // // //           </h1>
// // // // // //           <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-lg ml-auto">
// // // // // //             Manage your claims, documents, and policies in one secure, encrypted dashboard.
// // // // // //           </p>
          
// // // // // //           <div className="flex gap-4 mt-12 justify-end">
// // // // // //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// // // // // //               <ShieldCheck size={16} className="text-[#00ced1]"/> 256-bit SSL
// // // // // //             </div>
// // // // // //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// // // // // //               <Fingerprint size={16} className="text-[#00ced1]"/> Biometric Ready
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // import React, { useState } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import axios from 'axios';
// // // // // import { ShieldCheck, ArrowRight, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';
// // // // // import Logo from '../components/Logo';

// // // // // export default function Login() {
// // // // //   const navigate = useNavigate();
// // // // //   const [form, setForm] = useState({ id: '', password: '' });
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [showPassword, setShowPassword] = useState(false); // Toggle State
  
// // // // //   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";

// // // // //   const handleLogin = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setLoading(true);

// // // // //     try {
// // // // //       const payload = {
// // // // //         id: form.id.trim(),
// // // // //         password: form.password.trim()
// // // // //       };

// // // // //       const res = await axios.post(`${API_BASE}/api/users/login`, payload);

// // // // //       if (res.status === 200) {
// // // // //         const user = res.data;
// // // // //         localStorage.setItem('session', JSON.stringify(user));
        
// // // // //         if (user.role === 'admin') navigate('/admin');
// // // // //         else if (user.role === 'agent') navigate('/agent');
// // // // //         else navigate('/user'); 
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       if (err.response && err.response.status === 404) alert("Access Denied: User ID does not exist.");
// // // // //       else if (err.response && err.response.status === 401) alert("Access Denied: Incorrect Password.");
// // // // //       else alert("Access Denied: Invalid ID or Password.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="flex h-screen w-full bg-[#f8fafc]">
      
// // // // //       {/* --- LEFT SIDE: LOGIN FORM --- */}
// // // // //       <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative z-10">
// // // // //         <div className="w-full max-w-md">
// // // // //            <div className="mb-12"><Logo /></div>
           
// // // // //            <h2 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">Sign In</h2>
// // // // //            <div className="flex items-center gap-2 mb-12">
// // // // //              <ShieldCheck size={16} className="text-[#00ced1]"/>
// // // // //              <span className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Encrypted SQL Node</span>
// // // // //            </div>

// // // // //            <form onSubmit={handleLogin} className="space-y-6">
// // // // //               <div className="group">
// // // // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Identification ID</label>
// // // // //                 <div className="relative">
// // // // //                   <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // // // //                   <input 
// // // // //                     type="text" 
// // // // //                     placeholder="0000000001" 
// // // // //                     className="w-full pl-14 pr-6 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200 font-mono"
// // // // //                     value={form.id}
// // // // //                     onChange={(e) => setForm({...form, id: e.target.value})}
// // // // //                     required
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="group">
// // // // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Secure Password</label>
// // // // //                 <div className="relative">
// // // // //                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // // // //                   <input 
// // // // //                     type={showPassword ? "text" : "password"} 
// // // // //                     placeholder="••••••" 
// // // // //                     className="w-full pl-14 pr-14 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200"
// // // // //                     value={form.password}
// // // // //                     onChange={(e) => setForm({...form, password: e.target.value})}
// // // // //                     required
// // // // //                   />
// // // // //                   {/* TOGGLE PASSWORD ICON */}
// // // // //                   <button 
// // // // //                     type="button"
// // // // //                     onClick={() => setShowPassword(!showPassword)}
// // // // //                     className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00ced1] transition-colors cursor-pointer"
// // // // //                   >
// // // // //                     {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <button 
// // // // //                 type="submit" 
// // // // //                 disabled={loading}
// // // // //                 className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-slate-900 active:scale-95 transition-all flex items-center justify-center gap-4 mt-8 shadow-2xl shadow-slate-200"
// // // // //               >
// // // // //                 {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight size={24} className={loading ? 'hidden' : 'block'}/>
// // // // //               </button>
// // // // //            </form>

// // // // //            <div className="mt-12 text-center">
// // // // //               <p className="text-sm font-bold text-slate-400">Don't have an ID? <button className="text-[#00ced1] hover:underline">Request Access</button></p>
// // // // //            </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* --- RIGHT SIDE: BEAUTIFUL IMAGE --- */}
// // // // //       <div className="hidden lg:flex w-[55%] bg-[#020617] relative overflow-hidden flex-col justify-end p-16 text-white text-right">
// // // // //         {/* Background Image */}
// // // // //         <div className="absolute inset-0 z-0">
// // // // //           <img 
// // // // //             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
// // // // //             className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
// // // // //             alt="Office" 
// // // // //           />
// // // // //           <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/40 to-transparent"></div>
// // // // //         </div>

// // // // //         <div className="z-10 relative">
// // // // //           <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
// // // // //             Secure <span className="text-[#00ced1]">Access</span><br />
// // // // //             To Your Future.
// // // // //           </h1>
// // // // //           <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-lg ml-auto">
// // // // //             Manage your claims, documents, and policies in one secure, encrypted dashboard.
// // // // //           </p>
          
// // // // //           <div className="flex gap-4 mt-12 justify-end">
// // // // //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// // // // //               <ShieldCheck size={16} className="text-[#00ced1]"/> 256-bit SSL
// // // // //             </div>
// // // // //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// // // // //               <Fingerprint size={16} className="text-[#00ced1]"/> Biometric Ready
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import React, { useState } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import axios from 'axios';
// // // // import { ShieldCheck, ArrowRight, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';
// // // // import Logo from '../components/Logo';

// // // // export default function Login() {
// // // //   const navigate = useNavigate();
// // // //   const [form, setForm] = useState({ id: '', password: '' });
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [showPassword, setShowPassword] = useState(false); // Toggle State
  
// // // //   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";

// // // //   const handleLogin = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);

// // // //     try {
// // // //       const payload = {
// // // //         id: form.id.trim(),
// // // //         password: form.password.trim()
// // // //       };

// // // //       const res = await axios.post(`${API_BASE}/api/users/login`, payload);

// // // //       if (res.status === 200) {
// // // //         const user = res.data;
// // // //         localStorage.setItem('session', JSON.stringify(user));
        
// // // //         if (user.role === 'admin') navigate('/admin');
// // // //         else if (user.role === 'agent') navigate('/agent');
// // // //         else navigate('/user'); 
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       if (err.response && err.response.status === 404) alert("Access Denied: User ID does not exist.");
// // // //       else if (err.response && err.response.status === 401) alert("Access Denied: Incorrect Password.");
// // // //       else alert("Access Denied: Invalid ID or Password.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="flex h-screen w-full bg-[#f8fafc]">
      
// // // //       {/* --- LEFT SIDE: LOGIN FORM --- */}
// // // //       <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative z-10">
// // // //         <div className="w-full max-w-md">
// // // //            <div className="mb-12"><Logo /></div>
           
// // // //            <h2 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">Sign In</h2>
// // // //            <div className="flex items-center gap-2 mb-12">
// // // //              <ShieldCheck size={16} className="text-[#00ced1]"/>
// // // //              <span className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Encrypted SQL Node</span>
// // // //            </div>

// // // //            <form onSubmit={handleLogin} className="space-y-6">
// // // //               <div className="group">
// // // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Identification ID</label>
// // // //                 <div className="relative">
// // // //                   <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // // //                   <input 
// // // //                     type="text" 
// // // //                     placeholder="0000000001" 
// // // //                     className="w-full pl-14 pr-6 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200 font-mono"
// // // //                     value={form.id}
// // // //                     onChange={(e) => setForm({...form, id: e.target.value})}
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <div className="group">
// // // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Secure Password</label>
// // // //                 <div className="relative">
// // // //                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // // //                   <input 
// // // //                     type={showPassword ? "text" : "password"} 
// // // //                     placeholder="••••••" 
// // // //                     className="w-full pl-14 pr-14 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200"
// // // //                     value={form.password}
// // // //                     onChange={(e) => setForm({...form, password: e.target.value})}
// // // //                     required
// // // //                   />
// // // //                   {/* TOGGLE PASSWORD ICON */}
// // // //                   <button 
// // // //                     type="button"
// // // //                     onClick={() => setShowPassword(!showPassword)}
// // // //                     className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00ced1] transition-colors cursor-pointer"
// // // //                   >
// // // //                     {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
// // // //                   </button>
// // // //                 </div>
// // // //               </div>

// // // //               <button 
// // // //                 type="submit" 
// // // //                 disabled={loading}
// // // //                 className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-slate-900 active:scale-95 transition-all flex items-center justify-center gap-4 mt-8 shadow-2xl shadow-slate-200"
// // // //               >
// // // //                 {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight size={24} className={loading ? 'hidden' : 'block'}/>
// // // //               </button>
// // // //            </form>

// // // //            <div className="mt-12 text-center">
// // // //               <p className="text-sm font-bold text-slate-400">Don't have an ID? <button className="text-[#00ced1] hover:underline">Request Access</button></p>
// // // //            </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* --- RIGHT SIDE: BEAUTIFUL IMAGE --- */}
// // // //       <div className="hidden lg:flex w-[55%] bg-[#020617] relative overflow-hidden flex-col justify-end p-16 text-white text-right">
// // // //         {/* Background Image */}
// // // //         <div className="absolute inset-0 z-0">
// // // //           <img 
// // // //             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
// // // //             className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
// // // //             alt="Office" 
// // // //           />
// // // //           <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/40 to-transparent"></div>
// // // //         </div>

// // // //         <div className="z-10 relative">
// // // //           <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
// // // //             Secure <span className="text-[#00ced1]">Access</span><br />
// // // //             To Your Future.
// // // //           </h1>
// // // //           <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-lg ml-auto">
// // // //             Manage your claims, documents, and policies in one secure, encrypted dashboard.
// // // //           </p>
          
// // // //           <div className="flex gap-4 mt-12 justify-end">
// // // //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// // // //               <ShieldCheck size={16} className="text-[#00ced1]"/> 256-bit SSL
// // // //             </div>
// // // //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// // // //               <Fingerprint size={16} className="text-[#00ced1]"/> Biometric Ready
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //     </div>
// // // //   );
// // // // }



// // // import React, { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import axios from 'axios';
// // // import { ShieldCheck, ArrowRight, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';
// // // import Logo from '../components/Logo';

// // // export default function Login() {
// // //   const navigate = useNavigate();
// // //   const [form, setForm] = useState({ id: '', password: '' });
// // //   const [loading, setLoading] = useState(false);
// // //   const [showPassword, setShowPassword] = useState(false); // Toggle State
  
// // //   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";

// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     try {
// // //       const payload = {
// // //         id: form.id.trim(),
// // //         password: form.password.trim()
// // //       };

// // //       const res = await axios.post(`${API_BASE}/api/users/login`, payload);

// // //       if (res.status === 200) {
// // //         const user = res.data;
// // //         localStorage.setItem('session', JSON.stringify(user));
        
// // //         if (user.role === 'admin') navigate('/admin');
// // //         else if (user.role === 'agent') navigate('/agent');
// // //         else navigate('/user'); 
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       if (err.response && err.response.status === 404) alert("Access Denied: User ID does not exist.");
// // //       else if (err.response && err.response.status === 401) alert("Access Denied: Incorrect Password.");
// // //       else alert("Access Denied: Invalid ID or Password.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex h-screen w-full bg-[#f8fafc]">
      
// // //       {/* --- LEFT SIDE: LOGIN FORM --- */}
// // //       <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative z-10">
// // //         <div className="w-full max-w-md">
// // //            <div className="mb-12"><Logo /></div>
           
// // //            <h2 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">Sign In</h2>
// // //            <div className="flex items-center gap-2 mb-12">
// // //              <ShieldCheck size={16} className="text-[#00ced1]"/>
// // //              <span className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Encrypted SQL Node</span>
// // //            </div>

// // //            <form onSubmit={handleLogin} className="space-y-6">
// // //               <div className="group">
// // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Identification ID</label>
// // //                 <div className="relative">
// // //                   <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // //                   <input 
// // //                     type="text" 
// // //                     placeholder="0000000001" 
// // //                     className="w-full pl-14 pr-6 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200 font-mono"
// // //                     value={form.id}
// // //                     onChange={(e) => setForm({...form, id: e.target.value})}
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <div className="group">
// // //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Secure Password</label>
// // //                 <div className="relative">
// // //                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// // //                   <input 
// // //                     type={showPassword ? "text" : "password"} 
// // //                     placeholder="••••••" 
// // //                     className="w-full pl-14 pr-14 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200"
// // //                     value={form.password}
// // //                     onChange={(e) => setForm({...form, password: e.target.value})}
// // //                     required
// // //                   />
// // //                   {/* TOGGLE PASSWORD ICON */}
// // //                   <button 
// // //                     type="button"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                     className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00ced1] transition-colors cursor-pointer"
// // //                   >
// // //                     {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               <button 
// // //                 type="submit" 
// // //                 disabled={loading}
// // //                 className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-slate-900 active:scale-95 transition-all flex items-center justify-center gap-4 mt-8 shadow-2xl shadow-slate-200"
// // //               >
// // //                 {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight size={24} className={loading ? 'hidden' : 'block'}/>
// // //               </button>
// // //            </form>

// // //            <div className="mt-12 text-center">
// // //               <p className="text-sm font-bold text-slate-400">Don't have an ID? <button className="text-[#00ced1] hover:underline">Request Access</button></p>
// // //            </div>
// // //         </div>
// // //       </div>

// // //       {/* --- RIGHT SIDE: BEAUTIFUL IMAGE --- */}
// // //       <div className="hidden lg:flex w-[55%] bg-[#020617] relative overflow-hidden flex-col justify-end p-16 text-white text-right">
// // //         {/* Background Image */}
// // //         <div className="absolute inset-0 z-0">
// // //           <img 
// // //             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
// // //             className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
// // //             alt="Office" 
// // //           />
// // //           <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/40 to-transparent"></div>
// // //         </div>

// // //         <div className="z-10 relative">
// // //           <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
// // //             Secure <span className="text-[#00ced1]">Access</span><br />
// // //             To Your Future.
// // //           </h1>
// // //           <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-lg ml-auto">
// // //             Manage your claims, documents, and policies in one secure, encrypted dashboard.
// // //           </p>
          
// // //           <div className="flex gap-4 mt-12 justify-end">
// // //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// // //               <ShieldCheck size={16} className="text-[#00ced1]"/> 256-bit SSL
// // //             </div>
// // //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// // //               <Fingerprint size={16} className="text-[#00ced1]"/> Biometric Ready
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //     </div>
// // //   );
// // // }




// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { ShieldCheck, ArrowRight, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';
// // import Logo from '../components/Logo';

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({ id: '', password: '' });
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false); // Toggle State
  
// //   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const payload = {
// //         id: form.id.trim(),
// //         password: form.password.trim()
// //       };

// //       const res = await axios.post(`${API_BASE}/api/users/login`, payload);

// //       if (res.status === 200) {
// //         const user = res.data;
// //         localStorage.setItem('session', JSON.stringify(user));
        
// //         if (user.role === 'admin') navigate('/admin');
// //         else if (user.role === 'agent') navigate('/agent');
// //         else navigate('/user'); 
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       if (err.response && err.response.status === 404) alert("Access Denied: User ID does not exist.");
// //       else if (err.response && err.response.status === 401) alert("Access Denied: Incorrect Password.");
// //       else alert("Access Denied: Invalid ID or Password.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen w-full bg-[#f8fafc]">
      
// //       {/* --- LEFT SIDE: LOGIN FORM --- */}
// //       <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative z-10">
// //         <div className="w-full max-w-md">
// //            <div className="mb-12"><Logo /></div>
           
// //            <h2 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">Sign In</h2>
// //            <div className="flex items-center gap-2 mb-12">
// //              <ShieldCheck size={16} className="text-[#00ced1]"/>
// //              <span className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Encrypted SQL Node</span>
// //            </div>

// //            <form onSubmit={handleLogin} className="space-y-6">
// //               <div className="group">
// //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Identification ID</label>
// //                 <div className="relative">
// //                   <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// //                   <input 
// //                     type="text" 
// //                     placeholder="0000000001" 
// //                     className="w-full pl-14 pr-6 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200 font-mono"
// //                     value={form.id}
// //                     onChange={(e) => setForm({...form, id: e.target.value})}
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div className="group">
// //                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Secure Password</label>
// //                 <div className="relative">
// //                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
// //                   <input 
// //                     type={showPassword ? "text" : "password"} 
// //                     placeholder="••••••" 
// //                     className="w-full pl-14 pr-14 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200"
// //                     value={form.password}
// //                     onChange={(e) => setForm({...form, password: e.target.value})}
// //                     required
// //                   />
// //                   {/* TOGGLE PASSWORD ICON */}
// //                   <button 
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00ced1] transition-colors cursor-pointer"
// //                   >
// //                     {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
// //                   </button>
// //                 </div>
// //               </div>

// //               <button 
// //                 type="submit" 
// //                 disabled={loading}
// //                 className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-slate-900 active:scale-95 transition-all flex items-center justify-center gap-4 mt-8 shadow-2xl shadow-slate-200"
// //               >
// //                 {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight size={24} className={loading ? 'hidden' : 'block'}/>
// //               </button>
// //            </form>

// //            <div className="mt-12 text-center">
// //               <p className="text-sm font-bold text-slate-400">Don't have an ID? <button className="text-[#00ced1] hover:underline">Request Access</button></p>
// //            </div>
// //         </div>
// //       </div>

// //       {/* --- RIGHT SIDE: BEAUTIFUL IMAGE --- */}
// //       <div className="hidden lg:flex w-[55%] bg-[#020617] relative overflow-hidden flex-col justify-end p-16 text-white text-right">
// //         {/* Background Image */}
// //         <div className="absolute inset-0 z-0">
// //           <img 
// //             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
// //             className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
// //             alt="Office" 
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/40 to-transparent"></div>
// //         </div>

// //         <div className="z-10 relative">
// //           <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
// //             Secure <span className="text-[#00ced1]">Access</span><br />
// //             To Your Future.
// //           </h1>
// //           <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-lg ml-auto">
// //             Manage your claims, documents, and policies in one secure, encrypted dashboard.
// //           </p>
          
// //           <div className="flex gap-4 mt-12 justify-end">
// //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// //               <ShieldCheck size={16} className="text-[#00ced1]"/> 256-bit SSL
// //             </div>
// //             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
// //               <Fingerprint size={16} className="text-[#00ced1]"/> Biometric Ready
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //     </div>
// //   );
// // }


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ShieldCheck, ArrowRight, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';
// import Logo from '../components/Logo';

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ id: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // Toggle State
  
//   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload = {
//         id: form.id.trim(),
//         password: form.password.trim()
//       };

//       const res = await axios.post(`${API_BASE}/api/users/login`, payload);

//       if (res.status === 200) {
//         const user = res.data;
//         localStorage.setItem('session', JSON.stringify(user));
        
//         if (user.role === 'admin') navigate('/admin');
//         else if (user.role === 'agent') navigate('/agent');
//         else navigate('/user'); 
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.response && err.response.status === 404) alert("Access Denied: User ID does not exist.");
//       else if (err.response && err.response.status === 401) alert("Access Denied: Incorrect Password.");
//       else alert("Access Denied: Connection Error. Please ensure Backend is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full bg-[#f8fafc]">
      
//       {/* --- LEFT SIDE: LOGIN FORM --- */}
//       <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative z-10">
//         <div className="w-full max-w-md">
//            <div className="mb-12"><Logo /></div>
           
//            <h2 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">Sign In</h2>
//            <div className="flex items-center gap-2 mb-12">
//              <ShieldCheck size={16} className="text-[#00ced1]"/>
//              <span className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Encrypted SQL Node</span>
//            </div>

//            <form onSubmit={handleLogin} className="space-y-6">
//               <div className="group">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Identification ID</label>
//                 <div className="relative">
//                   <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
//                   <input 
//                     type="text" 
//                     placeholder="0000000001" 
//                     className="w-full pl-14 pr-6 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200 font-mono"
//                     value={form.id}
//                     onChange={(e) => setForm({...form, id: e.target.value})}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="group">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Secure Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
//                   <input 
//                     type={showPassword ? "text" : "password"} 
//                     placeholder="••••••" 
//                     className="w-full pl-14 pr-14 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200"
//                     value={form.password}
//                     onChange={(e) => setForm({...form, password: e.target.value})}
//                     required
//                   />
//                   {/* TOGGLE PASSWORD ICON */}
//                   <button 
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00ced1] transition-colors cursor-pointer"
//                   >
//                     {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
//                   </button>
//                 </div>
//               </div>

//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-slate-900 active:scale-95 transition-all flex items-center justify-center gap-4 mt-8 shadow-2xl shadow-slate-200"
//               >
//                 {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight size={24} className={loading ? 'hidden' : 'block'}/>
//               </button>
//            </form>

//            <div className="mt-12 text-center">
//               {/* FIXED: Request Access now redirects to Contact Page */}
//               <p className="text-sm font-bold text-slate-400">
//                 Don't have an ID? 
//                 <button onClick={() => navigate('/contact')} className="text-[#00ced1] hover:underline ml-1">
//                     Request Access
//                 </button>
//               </p>
//            </div>
//         </div>
//       </div>

//       {/* --- RIGHT SIDE: BEAUTIFUL IMAGE --- */}
//       <div className="hidden lg:flex w-[55%] bg-[#020617] relative overflow-hidden flex-col justify-end p-16 text-white text-right">
//         {/* Background Image */}
//         <div className="absolute inset-0 z-0">
//           <img 
//             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
//             className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
//             alt="Office" 
//           />
//           <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/40 to-transparent"></div>
//         </div>

//         <div className="z-10 relative">
//           <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
//             Secure <span className="text-[#00ced1]">Access</span><br />
//             To Your Future.
//           </h1>
//           <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-lg ml-auto">
//             Manage your claims, documents, and policies in one secure, encrypted dashboard.
//           </p>
          
//           <div className="flex gap-4 mt-12 justify-end">
//             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
//               <ShieldCheck size={16} className="text-[#00ced1]"/> 256-bit SSL
//             </div>
//             <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
//               <Fingerprint size={16} className="text-[#00ced1]"/> Biometric Ready
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, ArrowRight, Lock, Fingerprint, Eye, EyeOff } from 'lucide-react';
import Logo from '../components/Logo';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle State
  
  const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        id: form.id.trim(),
        password: form.password.trim()
      };

      const res = await axios.post(`${API_BASE}/api/users/login`, payload);

      if (res.status === 200) {
        const user = res.data;
        localStorage.setItem('session', JSON.stringify(user));
        
        if (user.role === 'admin') navigate('/admin');
        else if (user.role === 'agent') navigate('/agent');
        else navigate('/user'); 
      }
    } catch (err) {
      console.error("Login Error:", err);
      
      if (err.code === "ERR_NETWORK") {
          alert("Network Error: Backend is unreachable or blocking connection (CORS).");
      } else if (err.response) {
          if (err.response.status === 404) alert("Access Denied: User ID does not exist.");
          else if (err.response.status === 401) alert("Access Denied: Incorrect Password.");
          else alert(`Server Error: ${err.response.status}`);
      } else {
          alert("Unknown Error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc]">
      
      {/* --- LEFT SIDE: LOGIN FORM --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative z-10">
        <div className="w-full max-w-md">
           <div className="mb-12"><Logo /></div>
           
           <h2 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">Sign In</h2>
           <div className="flex items-center gap-2 mb-12">
             <ShieldCheck size={16} className="text-[#00ced1]"/>
             <span className="text-[10px] font-black text-[#00ced1] uppercase tracking-widest">Encrypted SQL Node</span>
           </div>

           <form onSubmit={handleLogin} className="space-y-6">
              <div className="group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Identification ID</label>
                <div className="relative">
                  <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
                  <input 
                    type="text" 
                    placeholder="admin" 
                    className="w-full pl-14 pr-6 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200 font-mono"
                    value={form.id}
                    onChange={(e) => setForm({...form, id: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Secure Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors" size={24} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="admin123" 
                    className="w-full pl-14 pr-14 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00ced1] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-slate-900 active:scale-95 transition-all flex items-center justify-center gap-4 mt-8 shadow-2xl shadow-slate-200"
              >
                {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight size={24} className={loading ? 'hidden' : 'block'}/>
              </button>
           </form>

           <div className="mt-12 text-center">
              <p className="text-sm font-bold text-slate-400">
                Don't have an ID? 
                <button onClick={() => navigate('/contact')} className="text-[#00ced1] hover:underline ml-1">
                    Request Access
                </button>
              </p>
           </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: BEAUTIFUL IMAGE --- */}
      <div className="hidden lg:flex w-[55%] bg-[#020617] relative overflow-hidden flex-col justify-end p-16 text-white text-right">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
            alt="Office" 
          />
          <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="z-10 relative">
          <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
            Secure <span className="text-[#00ced1]">Access</span><br />
            To Your Future.
          </h1>
          <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-lg ml-auto">
            Manage your claims, documents, and policies in one secure, encrypted dashboard.
          </p>
          
          <div className="flex gap-4 mt-12 justify-end">
            <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
              <ShieldCheck size={16} className="text-[#00ced1]"/> 256-bit SSL
            </div>
            <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
              <Fingerprint size={16} className="text-[#00ced1]"/> Biometric Ready
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}