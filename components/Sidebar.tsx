import React from 'react';
import { X, ExternalLink, ShieldAlert, ShoppingCart, MessageSquare, Terminal, LayoutDashboard } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop with Fade */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Panel with Slide In */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 shadow-2xl z-50 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-default">
            <LayoutDashboard className="text-brand-500 group-hover:rotate-12 transition-transform duration-300" size={24} />
            <h2 className="text-lg font-semibold text-white tracking-wide group-hover:text-brand-300 transition-colors">
              HM MODZ
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:rotate-90 active:scale-75"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100vh-80px)] scrollbar-hide">
          <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider animate-fade-in-up [animation-delay:100ms]">Navigation</p>
          <ul className="space-y-1">
            {NAV_LINKS.map((link, index) => (
              <li key={index} className="transform transition-transform duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative flex items-center p-3 rounded-lg text-slate-400 hover:text-white transition-all group overflow-hidden"
                >
                  {/* Background Swipe Effect */}
                  <span className="absolute inset-0 w-0 bg-slate-800 transition-all duration-300 group-hover:w-full ease-out"></span>
                  
                  <span className="relative z-10 mr-3 text-slate-500 group-hover:text-brand-400 group-hover:scale-110 transition-all duration-300">
                     {index % 4 === 0 ? <Terminal size={18} /> : 
                      index % 4 === 1 ? <ShieldAlert size={18} /> : 
                      index % 4 === 2 ? <ShoppingCart size={18} /> : 
                      <MessageSquare size={18} />}
                  </span>
                  <span className="relative z-10 text-sm font-medium">{link.label}</span>
                  <ExternalLink size={14} className="relative z-10 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 mx-3 p-4 border border-slate-800 rounded-lg bg-slate-800/50 hover:border-brand-500/30 transition-colors group">
            <div className="flex items-center gap-2 mb-2">
              <div className="relative">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow"></div>
                 <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75"></div>
              </div>
              <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Systems Operational</span>
            </div>
            <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
              Version 2.0.4-Stable<br/>
              Connected to secure server
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;