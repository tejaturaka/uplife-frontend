// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // import { 
// // // // //   Fingerprint, KeyRound, ArrowRight, ShieldCheck, Eye, EyeOff, 
// // // // //   Globe, Mail, ChevronLeft, Shield, Award, Heart, CheckCircle2 
// // // // // } from 'lucide-react';
// // // // // import Logo from '../components/Logo';
// // // // // import axios from 'axios';
// // // // // import { fetchLocations, getMandals } from '../services/locationService';

// // // // // export default function Login() {
// // // // //   const navigate = useNavigate();
// // // // //   const [isSignup, setIsSignup] = useState(false);
// // // // //   const [creds, setCreds] = useState({ id: "", password: "" });
// // // // //   const [showPass, setShowPass] = useState(false);

// // // // //   // Signup States
// // // // //   const [locations, setLocations] = useState([]);
// // // // //   const [mandals, setMandals] = useState([]);
// // // // //   const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', state: '', dist: '', mandal: '' });

// // // // //   useEffect(() => { fetchLocations().then(setLocations); }, []);

// // // // //   const handleLogin = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (creds.id === "123" && creds.password === "admin123") {
// // // // //       localStorage.setItem('session', JSON.stringify({ name: "Administrator", role: "admin", id: "123" }));
// // // // //       return navigate('/admin');
// // // // //     }
// // // // //     try {
// // // // //       const response = await axios.post('http://localhost:8080/api/users/login', creds);
// // // // //       if (response.data) {
// // // // //         localStorage.setItem('session', JSON.stringify(response.data));
// // // // //         navigate(`/${response.data.role}`);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       alert("Access Denied: Invalid ID or Password.");
// // // // //     }
// // // // //   };

// // // // //   const handleSignup = async (e) => {
// // // // //     e.preventDefault();
// // // // //     try {
// // // // //       const payload = { ...signupForm, id: "", role: 'user', claimStatus: 0, statusMessage: "IN_PROGRESS", createdBy: "SELF_REGISTERED" };
// // // // //       const res = await axios.post('http://localhost:8080/api/users/register', payload);
// // // // //       alert(`Registered Successfully! Your 10-Digit ID is: ${res.data.id}`);
// // // // //       setIsSignup(false);
// // // // //       setCreds({ id: res.data.id, password: "" });
// // // // //     } catch (error) { alert("Registration failed."); }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen flex bg-white font-sans selection:bg-[#00ced1]/30 overflow-hidden">
      
// // // // //       {/* --- LEFT SIDE: THE BEAUTIFUL VISUAL HERO --- */}
// // // // //       <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
// // // // //         {/* High-Res Background Image (Family Security/Trust Theme) */}
// // // // //         <img 
// // // // //           src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074" 
// // // // //           className="absolute inset-0 w-full h-full object-cover grayscale-[20%] brightness-[0.4]" 
// // // // //           alt="Insurance and Protection" 
// // // // //         />
        
// // // // //         {/* Animated Gradient Overlay */}
// // // // //         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-[#00ced1]/20"></div>

// // // // //         {/* Floating Decorative Elements (Glassmorphism) */}
// // // // //         <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#00ced1]/10 rounded-full blur-[100px] animate-pulse"></div>
// // // // //         <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>

// // // // //         <div className="relative z-10 p-24 flex flex-col justify-between h-full w-full text-left">
// // // // //           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
// // // // //              <Logo light={true} />
// // // // //           </motion.div>

// // // // //           <div className="space-y-10">
// // // // //             <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
// // // // //               <h1 className="text-7xl font-black text-white leading-[1.05] tracking-tighter">
// // // // //                 Protecting <br />What Matters <br /><span className="text-[#00ced1]">Most.</span>
// // // // //               </h1>
// // // // //               <p className="text-slate-300 text-xl font-medium mt-8 max-w-lg leading-relaxed">
// // // // //                 Experience India's most transparent and secure insurance claim node. Empowering families with digital precision.
// // // // //               </p>
// // // // //             </motion.div>

// // // // //             {/* Feature Badges */}
// // // // //             <motion.div 
// // // // //               initial={{ opacity: 0, y: 30 }} 
// // // // //               animate={{ opacity: 1, y: 0 }} 
// // // // //               transition={{ delay: 0.4 }} 
// // // // //               className="flex gap-4"
// // // // //             >
// // // // //               {[
// // // // //                 { icon: <Shield size={18}/>, text: "ISO 27001 SECURE" },
// // // // //                 { icon: <Award size={18}/>, text: "99.8% SUCCESS" },
// // // // //                 { icon: <CheckCircle2 size={18}/>, text: "GOVT. VERIFIED" }
// // // // //               ].map((badge, i) => (
// // // // //                 <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
// // // // //                   <div className="text-[#00ced1]">{badge.icon}</div>
// // // // //                   <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{badge.text}</span>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </motion.div>
// // // // //           </div>

// // // // //           <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">
// // // // //             <div className="w-12 h-px bg-slate-800"></div>
// // // // //             UPLIFE NATIONAL INFRASTRUCTURE
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* --- RIGHT SIDE: THE LOGIN FORM --- */}
// // // // //       <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white relative">
// // // // //         {/* Subtle Background Globe (Remains from original but cleaner) */}
// // // // //         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
// // // // //           <Globe size={600} strokeWidth={0.5}/>
// // // // //         </div>

// // // // //         <motion.div 
// // // // //           key={isSignup ? "signup" : "login"} 
// // // // //           initial={{ opacity: 0, x: 50 }} 
// // // // //           animate={{ opacity: 1, x: 0 }} 
// // // // //           className="w-full max-w-md relative z-10 py-10"
// // // // //         >
// // // // //           <div className="mb-12 text-left">
// // // // //             {/* Mobile Logo Only */}
// // // // //             <div className="lg:hidden mb-12"><Logo /></div>
            
// // // // //             <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-3">
// // // // //               {isSignup ? "Register" : "Sign In"}
// // // // //             </h2>
// // // // //             <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full text-[#00ced1] font-black uppercase text-[10px] tracking-widest">
// // // // //               <ShieldCheck size={14} /> Encrypted SQL Node
// // // // //             </div>
// // // // //           </div>

// // // // //           {!isSignup ? (
// // // // //             <form onSubmit={handleLogin} className="space-y-6">
// // // // //               <div className="space-y-2 text-left">
// // // // //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Identification ID</label>
// // // // //                 <div className="relative group">
// // // // //                   <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors">
// // // // //                     <Fingerprint size={24}/>
// // // // //                   </div>
// // // // //                   <input 
// // // // //                     type="text" 
// // // // //                     required 
// // // // //                     placeholder="Enter 10-Digit ID" 
// // // // //                     className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-transparent focus:border-[#00ced1] focus:bg-white rounded-[2.5rem] outline-none text-xl font-bold transition-all shadow-sm" 
// // // // //                     value={creds.id} 
// // // // //                     onChange={(e) => setCreds({...creds, id: e.target.value})} 
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="space-y-2 text-left">
// // // // //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Secure Password</label>
// // // // //                 <div className="relative group">
// // // // //                   <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors">
// // // // //                     <KeyRound size={24}/>
// // // // //                   </div>
// // // // //                   <input 
// // // // //                     type={showPass ? "text" : "password"} 
// // // // //                     required 
// // // // //                     placeholder="••••••••" 
// // // // //                     className="w-full pl-16 pr-16 py-6 bg-slate-50 border-2 border-transparent focus:border-[#00ced1] focus:bg-white rounded-[2.5rem] outline-none text-xl font-bold transition-all shadow-sm" 
// // // // //                     value={creds.password} 
// // // // //                     onChange={(e) => setCreds({...creds, password: e.target.value})} 
// // // // //                   />
// // // // //                   <button 
// // // // //                     type="button" 
// // // // //                     onClick={() => setShowPass(!showPass)} 
// // // // //                     className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#00ced1] transition-colors"
// // // // //                   >
// // // // //                     {showPass ? <EyeOff size={22}/> : <Eye size={22}/>}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <button className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 cursor-pointer">
// // // // //                 Access Dashboard <ArrowRight size={26} />
// // // // //               </button>

// // // // //               <div className="pt-8 text-center">
// // // // //                  <p className="text-slate-400 font-bold text-sm">
// // // // //                    Don't have an ID? <button type="button" onClick={() => setIsSignup(true)} className="text-[#00ced1] font-black hover:underline underline-offset-8 decoration-2">Request Access</button>
// // // // //                  </p>
// // // // //               </div>
// // // // //             </form>
// // // // //           ) : (
// // // // //             <form onSubmit={handleSignup} className="space-y-5 max-h-[75vh] overflow-y-auto pr-4 custom-scrollbar text-left pb-10">
// // // // //               <button type="button" onClick={() => setIsSignup(false)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 hover:text-slate-900 transition-colors">
// // // // //                 <ChevronLeft size={16}/> Return to login
// // // // //               </button>
              
// // // // //               <div className="space-y-1">
// // // // //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Legal Name</label>
// // // // //                 <input required placeholder="Full Name" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.name} onChange={e => setSignupForm({...signupForm, name: e.target.value})} />
// // // // //               </div>

// // // // //               <div className="space-y-1">
// // // // //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Gmail Identity</label>
// // // // //                 <div className="relative">
// // // // //                   <input type="email" required placeholder="example@gmail.com" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.email} onChange={e => setSignupForm({...signupForm, email: e.target.value})} />
// // // // //                   <Mail size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300"/>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="grid grid-cols-2 gap-4">
// // // // //                 <div className="space-y-1">
// // // // //                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5">State</label>
// // // // //                    <select required className="w-full px-6 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1]" value={signupForm.state} onChange={e => setSignupForm({...signupForm, state: e.target.value, dist: ''})}>
// // // // //                       <option value="">Select</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
// // // // //                    </select>
// // // // //                 </div>
// // // // //                 <div className="space-y-1">
// // // // //                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5">District</label>
// // // // //                    <select required disabled={!signupForm.state} className="w-full px-6 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] disabled:opacity-30" value={signupForm.dist} onChange={e => { setSignupForm({...signupForm, dist: e.target.value}); setMandals(getMandals(e.target.value)); }}>
// // // // //                       <option value="">Select</option>{signupForm.state && locations.find(l => l.state === signupForm.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}
// // // // //                    </select>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="space-y-1">
// // // // //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Choose Password</label>
// // // // //                 <input type="password" required placeholder="••••••••" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.password} onChange={e => setSignupForm({...signupForm, password: e.target.value})} />
// // // // //               </div>

// // // // //               <button className="w-full bg-[#00ced1] text-white py-7 rounded-[2rem] font-black text-xl shadow-2xl mt-4 cursor-pointer hover:bg-teal-500 hover:scale-[1.02] active:scale-95 transition-all">
// // // // //                 Generate Digital ID <ArrowRight size={24} className="inline ml-2"/>
// // // // //               </button>
// // // // //             </form>
// // // // //           )}
// // // // //         </motion.div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }



// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { 
// //   Fingerprint, KeyRound, ArrowRight, ShieldCheck, Eye, EyeOff, 
// //   Globe, Mail, ChevronLeft, Shield, Award, Heart, CheckCircle2 
// // } from 'lucide-react';
// // import Logo from '../components/Logo';
// // import axios from 'axios';
// // import { fetchLocations, getMandals } from '../services/locationService';

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const API_BASE = import.meta.env.VITE_API_BASE_URL; // Using the Cloud URL Variable

// //   const [isSignup, setIsSignup] = useState(false);
// //   const [creds, setCreds] = useState({ id: "", password: "" });
// //   const [showPass, setShowPass] = useState(false);

// //   // Signup States
// //   const [locations, setLocations] = useState([]);
// //   const [mandals, setMandals] = useState([]);
// //   const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', state: '', dist: '', mandal: '' });

// //   useEffect(() => { 
// //     fetchLocations().then(setLocations); 
// //   }, []);

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
    
// //     // Hardcoded Admin Access
// //     if (creds.id === "123" && creds.password === "admin123") {
// //       localStorage.setItem('session', JSON.stringify({ name: "Administrator", role: "admin", id: "123" }));
// //       return navigate('/admin');
// //     }

// //     try {
// //       const response = await axios.post(`${API_BASE}/api/users/login`, creds);
// //       if (response.data) {
// //         localStorage.setItem('session', JSON.stringify(response.data));
// //         navigate(`/${response.data.role}`);
// //       }
// //     } catch (error) {
// //       alert("Access Denied: Invalid ID or Password.");
// //     }
// //   };

// //   const handleSignup = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // REQUIREMENT: Role is 'user', status is 'PENDING'
// //       const payload = { 
// //         ...signupForm, 
// //         id: "", 
// //         role: 'user', 
// //         claimStatus: 0, 
// //         statusMessage: "PENDING", 
// //         createdBy: "SELF_REGISTERED" 
// //       };

// //       const res = await axios.post(`${API_BASE}/api/users/register`, payload);
// //       alert(`Registered Successfully! Your Digital Customer ID is: ${res.data.id}`);
// //       setIsSignup(false);
// //       setCreds({ id: res.data.id, password: "" });
// //     } catch (error) { 
// //       alert("Registration failed. Please check your connection to the node."); 
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex bg-white font-sans selection:bg-[#00ced1]/30 overflow-hidden">
      
// //       {/* --- LEFT SIDE: VISUAL HERO --- */}
// //       <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
// //         <img 
// //           src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074" 
// //           className="absolute inset-0 w-full h-full object-cover grayscale-[20%] brightness-[0.4]" 
// //           alt="Insurance and Protection" 
// //         />
// //         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-[#00ced1]/20"></div>

// //         <div className="relative z-10 p-24 flex flex-col justify-between h-full w-full text-left">
// //           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
// //              <Logo light={true} />
// //           </motion.div>

// //           <div className="space-y-10">
// //             <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
// //               <h1 className="text-7xl font-black text-white leading-[1.05] tracking-tighter">
// //                 Protecting <br />What Matters <br /><span className="text-[#00ced1]">Most.</span>
// //               </h1>
// //               <p className="text-slate-300 text-xl font-medium mt-8 max-w-lg leading-relaxed">
// //                 Experience India's most transparent and secure insurance claim node. Empowering families with digital precision.
// //               </p>
// //             </motion.div>

// //             <motion.div 
// //               initial={{ opacity: 0, y: 30 }} 
// //               animate={{ opacity: 1, y: 0 }} 
// //               transition={{ delay: 0.4 }} 
// //               className="flex gap-4"
// //             >
// //               {[
// //                 { icon: <Shield size={18}/>, text: "ISO 27001 SECURE" },
// //                 { icon: <Award size={18}/>, text: "99.8% SUCCESS" },
// //                 { icon: <CheckCircle2 size={18}/>, text: "GOVT. VERIFIED" }
// //               ].map((badge, i) => (
// //                 <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
// //                   <div className="text-[#00ced1]">{badge.icon}</div>
// //                   <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{badge.text}</span>
// //                 </div>
// //               ))}
// //             </motion.div>
// //           </div>

// //           <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">
// //             <div className="w-12 h-px bg-slate-800"></div>
// //             UPLIFE NATIONAL INFRASTRUCTURE
// //           </div>
// //         </div>
// //       </div>

// //       {/* --- RIGHT SIDE: LOGIN/SIGNUP FORM --- */}
// //       <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white relative">
// //         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
// //           <Globe size={600} strokeWidth={0.5}/>
// //         </div>

// //         <motion.div 
// //           key={isSignup ? "signup" : "login"} 
// //           initial={{ opacity: 0, x: 50 }} 
// //           animate={{ opacity: 1, x: 0 }} 
// //           className="w-full max-w-md relative z-10 py-10"
// //         >
// //           <div className="mb-12 text-left">
// //             <div className="lg:hidden mb-12"><Logo /></div>
// //             <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-3">
// //               {isSignup ? "Register" : "Sign In"}
// //             </h2>
// //             <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full text-[#00ced1] font-black uppercase text-[10px] tracking-widest">
// //               <ShieldCheck size={14} /> Encrypted SQL Node
// //             </div>
// //           </div>

// //           {!isSignup ? (
// //             <form onSubmit={handleLogin} className="space-y-6">
// //               <div className="space-y-2 text-left">
// //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Identification ID</label>
// //                 <div className="relative group">
// //                   <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors">
// //                     <Fingerprint size={24}/>
// //                   </div>
// //                   <input 
// //                     type="text" 
// //                     required 
// //                     placeholder="Enter 10-Digit ID" 
// //                     className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-transparent focus:border-[#00ced1] focus:bg-white rounded-[2.5rem] outline-none text-xl font-bold transition-all shadow-sm" 
// //                     value={creds.id} 
// //                     onChange={(e) => setCreds({...creds, id: e.target.value})} 
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-2 text-left">
// //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Secure Password</label>
// //                 <div className="relative group">
// //                   <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors">
// //                     <KeyRound size={24}/>
// //                   </div>
// //                   <input 
// //                     type={showPass ? "text" : "password"} 
// //                     required 
// //                     placeholder="••••••••" 
// //                     className="w-full pl-16 pr-16 py-6 bg-slate-50 border-2 border-transparent focus:border-[#00ced1] focus:bg-white rounded-[2.5rem] outline-none text-xl font-bold transition-all shadow-sm" 
// //                     value={creds.password} 
// //                     onChange={(e) => setCreds({...creds, password: e.target.value})} 
// //                   />
// //                   <button 
// //                     type="button" 
// //                     onClick={() => setShowPass(!showPass)} 
// //                     className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#00ced1] transition-colors"
// //                   >
// //                     {showPass ? <EyeOff size={22}/> : <Eye size={22}/>}
// //                   </button>
// //                 </div>
// //               </div>

// //               <button className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 cursor-pointer">
// //                 Access Dashboard <ArrowRight size={26} />
// //               </button>

// //               <div className="pt-8 text-center">
// //                  <p className="text-slate-400 font-bold text-sm">
// //                    Don't have an ID? <button type="button" onClick={() => setIsSignup(true)} className="text-[#00ced1] font-black hover:underline underline-offset-8 decoration-2">Request Access</button>
// //                  </p>
// //               </div>
// //             </form>
// //           ) : (
// //             <form onSubmit={handleSignup} className="space-y-5 max-h-[75vh] overflow-y-auto pr-4 custom-scrollbar text-left pb-10">
// //               <button type="button" onClick={() => setIsSignup(false)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 hover:text-slate-900 transition-colors">
// //                 <ChevronLeft size={16}/> Return to login
// //               </button>
              
// //               <div className="space-y-1">
// //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Legal Name</label>
// //                 <input required placeholder="Full Name" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.name} onChange={e => setSignupForm({...signupForm, name: e.target.value})} />
// //               </div>

// //               <div className="space-y-1">
// //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Gmail Identity</label>
// //                 <div className="relative">
// //                   <input type="email" required placeholder="example@gmail.com" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.email} onChange={e => setSignupForm({...signupForm, email: e.target.value})} />
// //                   <Mail size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300"/>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-2 gap-4">
// //                 <div className="space-y-1">
// //                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5">State</label>
// //                    <select required className="w-full px-6 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1]" value={signupForm.state} onChange={e => setSignupForm({...signupForm, state: e.target.value, dist: ''})}>
// //                       <option value="">Select</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
// //                    </select>
// //                 </div>
// //                 <div className="space-y-1">
// //                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5">District</label>
// //                    <select required disabled={!signupForm.state} className="w-full px-6 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] disabled:opacity-30" value={signupForm.dist} onChange={e => { setSignupForm({...signupForm, dist: e.target.value}); setMandals(getMandals(e.target.value)); }}>
// //                       <option value="">Select</option>{signupForm.state && locations.find(l => l.state === signupForm.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}
// //                    </select>
// //                 </div>
// //               </div>

// //               <div className="space-y-1">
// //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Choose Password</label>
// //                 <input type="password" required placeholder="••••••••" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.password} onChange={e => setSignupForm({...signupForm, password: e.target.value})} />
// //               </div>

// //               <button className="w-full bg-[#00ced1] text-white py-7 rounded-[2rem] font-black text-xl shadow-2xl mt-4 cursor-pointer hover:bg-teal-500 hover:scale-[1.02] active:scale-95 transition-all">
// //                 Generate Digital ID <ArrowRight size={24} className="inline ml-2"/>
// //               </button>
// //             </form>
// //           )}
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }

// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { motion } from 'framer-motion';
// // // import { 
// // //   Fingerprint, KeyRound, ArrowRight, ShieldCheck, Eye, EyeOff, 
// // //   Globe, Mail, ChevronLeft, Shield, Award, Heart, CheckCircle2 
// // // } from 'lucide-react';
// // // import Logo from '../components/Logo';
// // // import axios from 'axios';
// // // import { fetchLocations, getMandals } from '../services/locationService';

// // // export default function Login() {
// // //   const navigate = useNavigate();
// // //   const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // //   const [isSignup, setIsSignup] = useState(false);
// // //   const [creds, setCreds] = useState({ id: "", password: "" });
// // //   const [showPass, setShowPass] = useState(false);

// // //   const [locations, setLocations] = useState([]);
// // //   const [mandals, setMandals] = useState([]);
// // //   const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', state: '', dist: '', mandal: '' });

// // //   useEffect(() => { fetchLocations().then(setLocations); }, []);

// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();
// // //     if (creds.id === "123" && creds.password === "admin123") {
// // //       localStorage.setItem('session', JSON.stringify({ name: "Administrator", role: "admin", id: "123" }));
// // //       return navigate('/admin');
// // //     }
// // //     try {
// // //       const response = await axios.post(`${API_BASE}/api/users/login`, creds);
// // //       if (response.data) {
// // //         localStorage.setItem('session', JSON.stringify(response.data));
// // //         navigate(`/${response.data.role}`);
// // //       }
// // //     } catch (error) {
// // //       alert("Access Denied: Invalid ID or Password.");
// // //     }
// // //   };

// // //   const handleSignup = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const payload = { ...signupForm, id: "", role: 'user', claimStatus: 0, statusMessage: "PENDING", createdBy: "SELF_REGISTERED" };
// // //       const res = await axios.post(`${API_BASE}/api/users/register`, payload);
// // //       alert(`Registered Successfully! Your Digital Customer ID is: ${res.data.id}`);
// // //       setIsSignup(false);
// // //       setCreds({ id: res.data.id, password: "" });
// // //     } catch (error) { alert("Registration failed. Please check node connection."); }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex bg-white font-sans selection:bg-[#00ced1]/30 overflow-hidden">
// // //       <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
// // //         <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074" className="absolute inset-0 w-full h-full object-cover grayscale-[20%] brightness-[0.4]" alt="Support" />
// // //         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-[#00ced1]/20"></div>
// // //         <div className="relative z-10 p-24 flex flex-col justify-between h-full w-full text-left">
// // //           <Logo light={true} />
// // //           <div className="space-y-10">
// // //             <h1 className="text-7xl font-black text-white leading-[1.05] tracking-tighter">Protecting <br />What Matters <br /><span className="text-[#00ced1]">Most.</span></h1>
// // //             <div className="flex gap-4">
// // //               <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
// // //                 <Shield className="text-[#00ced1]" size={18}/><span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">ISO 27001 SECURE</span>
// // //               </div>
// // //               <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
// // //                 <Award className="text-[#00ced1]" size={18}/><span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">99.8% SUCCESS</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //           <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]"><div className="w-12 h-px bg-slate-800"></div>UPLIFE NATIONAL INFRASTRUCTURE</div>
// // //         </div>
// // //       </div>

// // //       <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white relative">
// // //         <div className="w-full max-w-md relative z-10 py-10">
// // //           <div className="mb-12 text-left">
// // //             <div className="lg:hidden mb-12"><Logo /></div>
// // //             <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-3">{isSignup ? "Register" : "Sign In"}</h2>
// // //             <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full text-[#00ced1] font-black uppercase text-[10px] tracking-widest"><ShieldCheck size={14} /> Encrypted SQL Node</div>
// // //           </div>

// // //           {!isSignup ? (
// // //             <form onSubmit={handleLogin} className="space-y-6">
// // //               <div className="space-y-2 text-left">
// // //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Identification ID</label>
// // //                 <div className="relative group">
// // //                   <Fingerprint className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1]" size={24}/>
// // //                   <input type="text" required placeholder="Enter 10-Digit ID" className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-transparent focus:border-[#00ced1] focus:bg-white rounded-[2.5rem] outline-none text-xl font-bold transition-all shadow-sm" value={creds.id} onChange={(e) => setCreds({...creds, id: e.target.value})} />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-2 text-left">
// // //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Secure Password</label>
// // //                 <div className="relative group">
// // //                   <KeyRound className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1]" size={24}/>
// // //                   <input type={showPass ? "text" : "password"} required placeholder="••••••••" className="w-full pl-16 pr-16 py-6 bg-slate-50 border-2 border-transparent focus:border-[#00ced1] focus:bg-white rounded-[2.5rem] outline-none text-xl font-bold transition-all shadow-sm" value={creds.password} onChange={(e) => setCreds({...creds, password: e.target.value})} />
// // //                   <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#00ced1]">{showPass ? <EyeOff size={22}/> : <Eye size={22}/>}</button>
// // //                 </div>
// // //               </div>
// // //               <button className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 cursor-pointer">Access Dashboard <ArrowRight size={26} /></button>
// // //               <div className="pt-8 text-center"><p className="text-slate-400 font-bold text-sm">Don't have an ID? <button type="button" onClick={() => setIsSignup(true)} className="text-[#00ced1] font-black hover:underline underline-offset-8 decoration-2">Request Access</button></p></div>
// // //             </form>
// // //           ) : (
// // //             <form onSubmit={handleSignup} className="space-y-5 text-left pb-10">
// // //               <button type="button" onClick={() => setIsSignup(false)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 hover:text-slate-900 transition-colors"><ChevronLeft size={16}/> Return to login</button>
// // //               <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-400 ml-5">Legal Name</label><input required placeholder="Full Name" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.name} onChange={e => setSignupForm({...signupForm, name: e.target.value})} /></div>
// // //               <div className="space-y-1"><label className="text-[10px] font-black uppercase text-slate-400 ml-5">Gmail Identity</label><input type="email" required placeholder="example@gmail.com" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.email} onChange={e => setSignupForm({...signupForm, email: e.target.value})} /></div>
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <select className="px-6 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1]" value={signupForm.state} onChange={e => setSignupForm({...signupForm, state: e.target.value, dist: ''})} required><option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}</select>
// // //                 <select disabled={!signupForm.state} className="px-6 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1]" value={signupForm.dist} onChange={e => { setSignupForm({...signupForm, dist: e.target.value}); setMandals(getMandals(e.target.value)); }} required><option value="">District</option>{signupForm.state && locations.find(l => l.state === signupForm.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
// // //               </div>
// // //               <input type="password" required placeholder="Choose Password" title="Password" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.password} onChange={e => setSignupForm({...signupForm, password: e.target.value})} />
// // //               <button className="w-full bg-[#00ced1] text-white py-7 rounded-[2rem] font-black text-xl shadow-2xl mt-4 cursor-pointer hover:bg-teal-500 transition-all">Generate Digital ID <ArrowRight size={24} className="inline ml-2"/></button>
// // //             </form>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { 
// //   Fingerprint, KeyRound, ArrowRight, ShieldCheck, Eye, EyeOff, 
// //   Globe, Mail, ChevronLeft, Shield, Award, Heart, CheckCircle2 
// // } from 'lucide-react';
// // import Logo from '../components/Logo';
// // import axios from 'axios';
// // import { fetchLocations, getMandals } from '../services/locationService';

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const API_BASE = import.meta.env.VITE_API_BASE_URL;

// //   const [isSignup, setIsSignup] = useState(false);
// //   const [creds, setCreds] = useState({ id: "", password: "" });
// //   const [showPass, setShowPass] = useState(false);

// //   // Signup States
// //   const [locations, setLocations] = useState([]);
// //   const [mandals, setMandals] = useState([]);
// //   const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', state: '', dist: '', mandal: '' });

// //   useEffect(() => { 
// //     fetchLocations().then(setLocations); 
// //   }, []);

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     if (creds.id === "123" && creds.password === "admin123") {
// //       localStorage.setItem('session', JSON.stringify({ name: "Administrator", role: "admin", id: "123" }));
// //       return navigate('/admin');
// //     }
// //     try {
// //       const response = await axios.post(`${API_BASE}/api/users/login`, creds);
// //       if (response.data) {
// //         localStorage.setItem('session', JSON.stringify(response.data));
// //         navigate(`/${response.data.role}`);
// //       }
// //     } catch (error) {
// //       alert("Access Denied: Invalid ID or Password.");
// //     }
// //   };

// //   const handleSignup = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Ensure role is 'user' and status is 'PENDING'
// //       const payload = { 
// //         ...signupForm, 
// //         id: "", 
// //         role: 'user', 
// //         claimStatus: 0, 
// //         statusMessage: "PENDING", 
// //         createdBy: "SELF_REGISTERED" 
// //       };

// //       const res = await axios.post(`${API_BASE}/api/users/register`, payload);
// //       alert(`Registered Successfully! Your Digital Customer ID is: ${res.data.id}`);
// //       setIsSignup(false);
// //       setCreds({ id: res.data.id, password: "" });
// //     } catch (error) { 
// //         console.error(error);
// //         alert("Registration failed. Please check your internet or wait for the node to wake up."); 
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex bg-white font-sans selection:bg-[#00ced1]/30 overflow-hidden">
      
// //       {/* LEFT SIDE: HERO */}
// //       <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
// //         <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074" className="absolute inset-0 w-full h-full object-cover grayscale-[20%] brightness-[0.4]" alt="Insurance and Protection" />
// //         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-[#00ced1]/20"></div>
// //         <div className="relative z-10 p-24 flex flex-col justify-between h-full w-full text-left">
// //           <Logo light={true} />
// //           <div className="space-y-10">
// //             <h1 className="text-7xl font-black text-white leading-[1.05] tracking-tighter">Protecting <br />What Matters <br /><span className="text-[#00ced1]">Most.</span></h1>
// //             <div className="flex gap-4">
// //               <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
// //                 <Shield className="text-[#00ced1]" size={18}/><span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">ISO 27001 SECURE</span>
// //               </div>
// //               <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
// //                 <Award className="text-[#00ced1]" size={18}/><span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">99.8% SUCCESS</span>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]"><div className="w-12 h-px bg-slate-800"></div>UPLIFE NATIONAL INFRASTRUCTURE</div>
// //         </div>
// //       </div>

// //       {/* RIGHT SIDE: FORMS */}
// //       <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white relative">
// //         <div className="w-full max-w-md relative z-10 py-10">
// //           <div className="mb-12 text-left">
// //             <div className="lg:hidden mb-12"><Logo /></div>
// //             <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-3">{isSignup ? "Register" : "Sign In"}</h2>
// //             <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full text-[#00ced1] font-black uppercase text-[10px] tracking-widest"><ShieldCheck size={14} /> Encrypted SQL Node</div>
// //           </div>

// //           {!isSignup ? (
// //             <form onSubmit={handleLogin} className="space-y-6">
// //               {/* LOGIN FORM */}
// //               <div className="space-y-2 text-left">
// //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Identification ID</label>
// //                 <div className="relative group">
// //                   <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1]"><Fingerprint size={24}/></div>
// //                   <input type="text" required placeholder="Enter 10-Digit ID" className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-transparent focus:border-[#00ced1] focus:bg-white rounded-[2.5rem] outline-none text-xl font-bold transition-all shadow-sm" value={creds.id} onChange={(e) => setCreds({...creds, id: e.target.value})} />
// //                 </div>
// //               </div>
// //               <div className="space-y-2 text-left">
// //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Secure Password</label>
// //                 <div className="relative group">
// //                   <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1]"><KeyRound size={24}/></div>
// //                   <input type={showPass ? "text" : "password"} required placeholder="••••••••" className="w-full pl-16 pr-16 py-6 bg-slate-50 border-2 border-transparent focus:border-[#00ced1] focus:bg-white rounded-[2.5rem] outline-none text-xl font-bold transition-all shadow-sm" value={creds.password} onChange={(e) => setCreds({...creds, password: e.target.value})} />
// //                   <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#00ced1]">{showPass ? <EyeOff size={22}/> : <Eye size={22}/>}</button>
// //                 </div>
// //               </div>
// //               <button className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 cursor-pointer">Access Dashboard <ArrowRight size={26} /></button>
// //               <div className="pt-8 text-center"><p className="text-slate-400 font-bold text-sm">Don't have an ID? <button type="button" onClick={() => setIsSignup(true)} className="text-[#00ced1] font-black hover:underline underline-offset-8 decoration-2">Request Access</button></p></div>
// //             </form>
// //           ) : (
// //             <form onSubmit={handleSignup} className="space-y-4 text-left pb-10">
// //               {/* SIGNUP FORM */}
// //               <button type="button" onClick={() => setIsSignup(false)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 hover:text-slate-900 transition-colors"><ChevronLeft size={16}/> Return to login</button>
              
// //               <div className="space-y-1">
// //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Legal Name</label>
// //                 <input required placeholder="Full Name" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.name} onChange={e => setSignupForm({...signupForm, name: e.target.value})} />
// //               </div>

// //               <div className="space-y-1">
// //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Gmail Identity</label>
// //                 <input type="email" required placeholder="example@gmail.com" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.email} onChange={e => setSignupForm({...signupForm, email: e.target.value})} />
// //               </div>

// //               <div className="grid grid-cols-2 gap-4">
// //                 <select required className="px-6 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1]" value={signupForm.state} onChange={e => setSignupForm({...signupForm, state: e.target.value, dist: '', mandal: ''})}>
// //                   <option value="">State</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
// //                 </select>
// //                 <select required disabled={!signupForm.state} className="px-6 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1]" value={signupForm.dist} onChange={e => { setSignupForm({...signupForm, dist: e.target.value, mandal: ''}); setMandals(getMandals(e.target.value)); }}>
// //                   <option value="">District</option>{signupForm.state && locations.find(l => l.state === signupForm.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}
// //                 </select>
// //               </div>

// //               {/* ADDED MANDAL DROPDOWN (Matches Database) */}
// //               <select required disabled={!signupForm.dist} className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1]" value={signupForm.mandal} onChange={e => setSignupForm({...signupForm, mandal: e.target.value})}>
// //                 <option value="">Select Mandal (Tehsil)</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}
// //               </select>

// //               <div className="space-y-1">
// //                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Choose Password</label>
// //                 <input type="password" required placeholder="••••••••" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.password} onChange={e => setSignupForm({...signupForm, password: e.target.value})} />
// //               </div>

// //               <button className="w-full bg-[#00ced1] text-white py-7 rounded-[2rem] font-black text-xl shadow-2xl mt-4 cursor-pointer hover:bg-teal-500 transition-all">Generate Digital ID <ArrowRight size={24} className="inline ml-2"/></button>
// //             </form>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Fingerprint, KeyRound, ArrowRight, ShieldCheck, Eye, EyeOff, 
//   Globe, Mail, ChevronLeft, Shield, Award, Heart, CheckCircle2 
// } from 'lucide-react';
// import Logo from '../components/Logo';
// import axios from 'axios';
// import { fetchLocations, getMandals } from '../services/locationService';

// export default function Login() {
//   const navigate = useNavigate();
  
//   // REQUIREMENT: Hardcoded Cloud URL to fix connection issues
//   const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app"; 

//   const [isSignup, setIsSignup] = useState(false);
//   const [creds, setCreds] = useState({ id: "", password: "" });
//   const [showPass, setShowPass] = useState(false);

//   // Signup States
//   const [locations, setLocations] = useState([]);
//   const [mandals, setMandals] = useState([]);
//   const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', state: '', dist: '', mandal: '' });

//   useEffect(() => { 
//     fetchLocations().then(setLocations); 
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     // Hardcoded Admin Access
//     if (creds.id === "123" && creds.password === "admin123") {
//       localStorage.setItem('session', JSON.stringify({ name: "Administrator", role: "admin", id: "123" }));
//       return navigate('/admin');
//     }

//     try {
//       const response = await axios.post(`${API_BASE}/api/users/login`, creds);
//       if (response.data) {
//         localStorage.setItem('session', JSON.stringify(response.data));
//         navigate(`/${response.data.role}`);
//       }
//     } catch (error) {
//       alert("Access Denied: Invalid ID or Password.");
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       // REQUIREMENT: Terminology - Customer Registry and PENDING status
//       const payload = { 
//         ...signupForm, 
//         id: "", 
//         role: 'user', 
//         claimStatus: 0, 
//         statusMessage: "PENDING", 
//         createdBy: "SELF_REGISTERED" 
//       };

//       const res = await axios.post(`${API_BASE}/api/users/register`, payload);
//       alert(`Registered Successfully! Your Digital Customer ID is: ${res.data.id}`);
//       setIsSignup(false);
//       setCreds({ id: res.data.id, password: "" });
//     } catch (error) { 
//       alert("Registration failed. Node is currently waking up, please wait 10 seconds and try again."); 
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-white font-sans selection:bg-[#00ced1]/30 overflow-hidden">
      
//       {/* --- LEFT SIDE: THE BEAUTIFUL VISUAL HERO --- */}
//       <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
//         <img 
//           src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074" 
//           className="absolute inset-0 w-full h-full object-cover grayscale-[20%] brightness-[0.4]" 
//           alt="Insurance and Protection" 
//         />
        
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-[#00ced1]/20"></div>

//         <div className="relative z-10 p-24 flex flex-col justify-between h-full w-full text-left">
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//              <Logo light={true} />
//           </motion.div>

//           <div className="space-y-10">
//             <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
//               <h1 className="text-7xl font-black text-white leading-[1.05] tracking-tighter">
//                 Protecting <br />What Matters <br /><span className="text-[#00ced1]">Most.</span>
//               </h1>
//               <p className="text-slate-300 text-xl font-medium mt-8 max-w-lg leading-relaxed">
//                 Experience India's most transparent and secure insurance claim node. Empowering families with digital precision.
//               </p>
//             </motion.div>

//             <motion.div 
//               initial={{ opacity: 0, y: 30 }} 
//               animate={{ opacity: 1, y: 0 }} 
//               transition={{ delay: 0.4 }} 
//               className="flex gap-4"
//             >
//               {[
//                 { icon: <Shield size={18}/>, text: "ISO 27001 SECURE" },
//                 { icon: <Award size={18}/>, text: "99.8% SUCCESS" },
//                 { icon: <CheckCircle2 size={18}/>, text: "GOVT. VERIFIED" }
//               ].map((badge, i) => (
//                 <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
//                   <div className="text-[#00ced1]">{badge.icon}</div>
//                   <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{badge.text}</span>
//                 </div>
//               ))}
//             </motion.div>
//           </div>

//           <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">
//             <div className="w-12 h-px bg-slate-800"></div>
//             UPLIFE NATIONAL INFRASTRUCTURE
//           </div>
//         </div>
//       </div>

//       {/* --- RIGHT SIDE: THE LOGIN FORM --- */}
//       <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white relative">
//         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
//           <Globe size={600} strokeWidth={0.5}/>
//         </div>

//         <motion.div 
//           key={isSignup ? "signup" : "login"} 
//           initial={{ opacity: 0, x: 50 }} 
//           animate={{ opacity: 1, x: 0 }} 
//           className="w-full max-w-md relative z-10 py-10"
//         >
//           <div className="mb-12 text-left">
//             <div className="lg:hidden mb-12"><Logo /></div>
//             <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-3">
//               {isSignup ? "Register" : "Sign In"}
//             </h2>
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full text-[#00ced1] font-black uppercase text-[10px] tracking-widest">
//               <ShieldCheck size={14} /> Encrypted SQL Node
//             </div>
//           </div>

//           {!isSignup ? (
//             <form onSubmit={handleLogin} className="space-y-6">
//               <div className="space-y-2 text-left">
//                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Identification ID</label>
//                 <div className="relative group">
//                   <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors">
//                     <Fingerprint size={24}/>
//                   </div>
//                   <input 
//                     type="text" 
//                     required 
//                     placeholder="Enter 10-Digit ID" 
//                     className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-transparent focus:border-[#00ced1] focus:bg-white rounded-[2.5rem] outline-none text-xl font-bold transition-all shadow-sm" 
//                     value={creds.id} 
//                     onChange={(e) => setCreds({...creds, id: e.target.value})} 
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2 text-left">
//                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Secure Password</label>
//                 <div className="relative group">
//                   <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00ced1] transition-colors">
//                     <KeyRound size={24}/>
//                   </div>
//                   <input 
//                     type={showPass ? "text" : "password"} 
//                     required 
//                     placeholder="••••••••" 
//                     className="w-full pl-16 pr-16 py-6 bg-slate-50 border-2 border-transparent focus:border-[#00ced1] focus:bg-white rounded-[2.5rem] outline-none text-xl font-bold transition-all shadow-sm" 
//                     value={creds.password} 
//                     onChange={(e) => setCreds({...creds, password: e.target.value})} 
//                   />
//                   <button 
//                     type="button" 
//                     onClick={() => setShowPass(!showPass)} 
//                     className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#00ced1] transition-colors"
//                   >
//                     {showPass ? <EyeOff size={22}/> : <Eye size={22}/>}
//                   </button>
//                 </div>
//               </div>

//               <button className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 cursor-pointer">
//                 Access Dashboard <ArrowRight size={26} />
//               </button>

//               <div className="pt-8 text-center">
//                  <p className="text-slate-400 font-bold text-sm">
//                    Don't have an ID? <button type="button" onClick={() => setIsSignup(true)} className="text-[#00ced1] font-black hover:underline underline-offset-8 decoration-2">Request Access</button>
//                  </p>
//               </div>
//             </form>
//           ) : (
//             <form onSubmit={handleSignup} className="space-y-5 max-h-[75vh] overflow-y-auto pr-4 custom-scrollbar text-left pb-10">
//               <button type="button" onClick={() => setIsSignup(false)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 hover:text-slate-900 transition-colors">
//                 <ChevronLeft size={16}/> Return to login
//               </button>
              
//               <div className="space-y-1">
//                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Legal Name</label>
//                 <input required placeholder="Full Name" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.name} onChange={e => setSignupForm({...signupForm, name: e.target.value})} />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Gmail Identity</label>
//                 <div className="relative">
//                   <input type="email" required placeholder="example@gmail.com" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.email} onChange={e => setSignupForm({...signupForm, email: e.target.value})} />
//                   <Mail size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300"/>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5">State</label>
//                    <select required className="w-full px-6 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1]" value={signupForm.state} onChange={e => setSignupForm({...signupForm, state: e.target.value, dist: ''})}>
//                       <option value="">Select</option>{locations.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
//                    </select>
//                 </div>
//                 <div className="space-y-1">
//                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5">District</label>
//                    <select required disabled={!signupForm.state} className="w-full px-6 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] disabled:opacity-30" value={signupForm.dist} onChange={e => { setSignupForm({...signupForm, dist: e.target.value}); setMandals(getMandals(e.target.value)); }}>
//                       <option value="">Select</option>{signupForm.state && locations.find(l => l.state === signupForm.state)?.districts.map(d => <option key={d} value={d}>{d}</option>)}
//                    </select>
//                 </div>
//               </div>

//               {/* REQUIREMENT: ADDED MANDAL DROPDOWN TO MATCH DATABASE STRUCTURE */}
//               <div className="space-y-1">
//                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Mandal / Tehsil</label>
//                 <select required disabled={!signupForm.dist} className="w-full px-6 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] disabled:opacity-30" value={signupForm.mandal} onChange={e => setSignupForm({...signupForm, mandal: e.target.value})}>
//                   <option value="">Select Mandal</option>{mandals.map(m => <option key={m} value={m}>{m}</option>)}
//                 </select>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Choose Password</label>
//                 <input type="password" required placeholder="••••••••" className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] font-bold outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white" value={signupForm.password} onChange={e => setSignupForm({...signupForm, password: e.target.value})} />
//               </div>

//               <button className="w-full bg-[#00ced1] text-white py-7 rounded-[2rem] font-black text-xl shadow-2xl mt-4 cursor-pointer hover:bg-teal-500 hover:scale-[1.02] active:scale-95 transition-all">
//                 Generate Digital ID <ArrowRight size={24} className="inline ml-2"/>
//               </button>
//             </form>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, ArrowRight, Lock, Fingerprint } from 'lucide-react';
import Logo from '../components/Logo';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: '', password: '' });
  const [loading, setLoading] = useState(false);
  
  // Ensure this URL matches your live backend
  const API_BASE = "https://hurt-ethel-tejaturaka1-0edfe8c7.koyeb.app";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // FIX: Trim whitespace from inputs before sending
      const payload = {
        id: form.id.trim(),
        password: form.password.trim()
      };

      const res = await axios.post(`${API_BASE}/api/users/login`, payload);

      if (res.status === 200) {
        const user = res.data;
        
        // Save Session
        localStorage.setItem('session', JSON.stringify(user));
        
        // Redirect based on Role
        if (user.role === 'admin') navigate('/admin');
        else if (user.role === 'agent') navigate('/agent');
        else navigate('/customer'); // Customer Dashboard
      }
    } catch (err) {
      console.error(err);
      // Detailed Error Handling
      if (err.response && err.response.status === 404) {
        alert("Access Denied: User ID does not exist.");
      } else if (err.response && err.response.status === 401) {
        alert("Access Denied: Incorrect Password.");
      } else {
        alert("Access Denied: Invalid ID or Password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc]">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex w-[55%] bg-[#020617] relative overflow-hidden flex-col justify-between p-16 text-white">
        <div className="z-10"><Logo dark={true} /></div>
        <div className="z-10 max-w-2xl">
          <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
            Protecting<br />
            <span className="text-slate-500">What Matters</span><br />
            <span className="text-[#00ced1]">Most.</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
            Experience India's most transparent and secure insurance claim node. Empowering families with digital precision.
          </p>
          
          <div className="flex gap-4 mt-12">
            <div className="px-5 py-3 rounded-full bg-slate-900/50 border border-slate-800 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              <ShieldCheck size={16} className="text-[#00ced1]"/> ISO 27001 Secure
            </div>
            <div className="px-5 py-3 rounded-full bg-slate-900/50 border border-slate-800 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              <ShieldCheck size={16} className="text-[#00ced1]"/> 99.8% Success
            </div>
          </div>
        </div>
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 z-0"></div>
        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 object-cover opacity-20 mix-blend-luminosity -z-10" alt="office" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-md">
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
                    placeholder="0000000001" 
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
                    type="password" 
                    placeholder="••••••" 
                    className="w-full pl-14 pr-6 py-6 bg-slate-50 rounded-[2rem] font-black text-xl text-slate-700 outline-none border-2 border-transparent focus:border-[#00ced1] focus:bg-white transition-all placeholder:text-slate-200"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    required
                  />
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
              <p className="text-sm font-bold text-slate-400">Don't have an ID? <button className="text-[#00ced1] hover:underline">Request Access</button></p>
           </div>
        </div>
      </div>
    </div>
  );
}