import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-6 sticky top-0 bg-white/90 backdrop-blur-xl z-50 border-b border-slate-50 shadow-sm">
      <div onClick={() => navigate('/')} className="cursor-pointer transition-opacity"><Logo /></div>
      
      {/* Desktop */}
      <div className="hidden lg:flex gap-10 font-bold text-[13px] uppercase tracking-[0.15em]">
        {navLinks.map((link) => (
          <button key={link.name} onClick={() => navigate(link.path)} className={`transition-all ${location.pathname === link.path ? 'text-[#00ced1] border-b-2 border-[#00ced1]' : 'text-slate-500 hover:text-[#00ced1]'}`}>{link.name}</button>
        ))}
      </div>

      <div className="hidden lg:block"><button onClick={() => navigate('/login')} className="bg-[#00ced1] text-white px-10 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">Sign In</button></div>

      {/* Mobile Toggle */}
      <div className="lg:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b shadow-2xl p-8 flex flex-col gap-6 lg:hidden">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => { navigate(link.path); setIsOpen(false); }} className="text-left font-black uppercase text-slate-600">{link.name}</button>
          ))}
          <button onClick={() => navigate('/login')} className="bg-[#00ced1] text-white py-4 rounded-xl font-black uppercase">Sign In</button>
        </div>
      )}
    </nav>
  );
}