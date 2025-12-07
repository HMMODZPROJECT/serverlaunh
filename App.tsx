import React, { useState, useMemo } from 'react';
import { Menu, Search, Download, Terminal, Cpu, Shield, Globe, ArrowRight, Zap, CheckCircle2, ChevronRight, Play, Lock, Users, ExternalLink } from 'lucide-react';
import MatrixBackground from './components/MatrixBackground';
import Sidebar from './components/Sidebar';
import AIChat from './components/AIChat';
import { Reveal, HoverCard, ShimmerButton, TypewriterText } from './components/AnimatedUI';
import { CHANNEL_INFO, FILES } from './constants';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return FILES.filter(f => 
      f.name.toLowerCase().includes(q) || 
      f.desc.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const openInBrowser = (url: string) => {
    window.open(url, '_blank');
  };

  const handleEnterApp = () => {
    setShowLanding(false);
    window.scrollTo(0, 0);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showLanding) {
    return (
      <div className="relative min-h-screen text-slate-200 selection:bg-brand-500 selection:text-white flex flex-col font-sans overflow-x-hidden">
        <MatrixBackground />
        
        {/* Navbar */}
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl transition-all duration-500">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <Reveal direction="down" delay={0.1}>
              <div 
                className="flex items-center gap-2 group cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="w-8 h-8 rounded bg-gradient-to-tr from-brand-600 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:rotate-12 transition-transform duration-500">
                  <Terminal size={18} className="text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-brand-300 transition-colors">HM<span className="text-brand-400">MODZ</span></span>
              </div>
            </Reveal>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              {['Features', 'Safety', 'Community'].map((item, i) => (
                <Reveal key={item} direction="down" delay={0.2 + (i * 0.1)}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    onClick={(e) => scrollToSection(e, item.toLowerCase())}
                    className="relative hover:text-white transition-colors group"
                  >
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </Reveal>
              ))}
            </div>
            
            <Reveal direction="down" delay={0.5}>
              <ShimmerButton 
                onClick={handleEnterApp}
                className="px-5 py-2.5 bg-white text-slate-900 rounded-full font-semibold text-sm hover:bg-brand-50 transition-colors shadow-lg shadow-white/10 group"
              >
                Launch App
              </ShimmerButton>
            </Reveal>
          </div>
        </nav>

        {/* Hero */}
        <main className="flex-grow flex flex-col justify-center relative z-10 pt-20 pb-10">
          <div className="container mx-auto px-6 text-center">
            <Reveal direction="zoom" delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-8 hover:bg-brand-500/20 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                v2.0 System Online
              </div>
            </Reveal>

            <div className="mb-6 h-[80px] md:h-[160px] flex items-center justify-center">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                <Reveal direction="up" delay={0.4}>
                   Next Generation <br/>
                </Reveal>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400 animate-pulse-slow">
                   <TypewriterText text="Mod Repository" className="typing-cursor pr-1" />
                </div>
              </h1>
            </div>

            <Reveal direction="blur" delay={1.5} duration={1}>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Access a premium library of verified mods, loaders, and tools. 
                Secure, fast, and professionally maintained for the ultimate experience.
              </p>
            </Reveal>

            <Reveal direction="up" delay={1.8}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ShimmerButton 
                  onClick={handleEnterApp}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-lg shadow-xl shadow-brand-600/20 group"
                >
                  Access Repository
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </ShimmerButton>
                
                <a 
                  href={CHANNEL_INFO.handleUrl}
                  target="_blank"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-lg transition-all border border-slate-700 hover:border-slate-500 active:scale-95"
                >
                  Join Community
                </a>
              </div>
            </Reveal>
          </div>
        </main>

        {/* Features Section */}
        <section id="features" className="bg-slate-900 border-t border-slate-800 py-24 relative z-10 scroll-mt-20">
          <div className="container mx-auto px-6">
            <Reveal direction="up" className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Why Choose HM MODZ?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">We redefine the standard for modification repositories with cutting-edge infrastructure.</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: <Shield className="text-brand-400" size={32} />, title: "Secure & Verified", desc: "Every file is rigorously tested for safety and performance before being listed." },
                { icon: <Zap className="text-purple-400" size={32} />, title: "High Velocity", desc: "Optimized download mirrors ensuring you get your files at maximum speed." },
                { icon: <CheckCircle2 className="text-green-400" size={32} />, title: "Always Updated", desc: "Real-time updates ensure you're always running the latest stable versions." },
              ].map((f, i) => (
                <Reveal key={i} direction="up" delay={i * 0.2} className="h-full">
                  <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-brand-500/30 transition-all duration-300 hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-2 h-full group">
                    <div className="mb-6 p-4 rounded-xl bg-slate-900 inline-block border border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-300 group-hover:border-brand-500/20">
                      {f.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">{f.title}</h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section id="safety" className="py-24 relative z-10 bg-slate-950 scroll-mt-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 order-2 lg:order-1">
                 <Reveal direction="right">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-red-500/30 transition-colors group">
                        <Lock className="text-red-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="font-bold text-white mb-1">Malware Free</h4>
                        <p className="text-sm text-slate-500">Triple scanned verified</p>
                      </div>
                      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl translate-y-8 hover:border-blue-500/30 transition-colors group">
                        <Shield className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="font-bold text-white mb-1">Encrypted</h4>
                        <p className="text-sm text-slate-500">End-to-end security</p>
                      </div>
                      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-purple-500/30 transition-colors group">
                        <Cpu className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="font-bold text-white mb-1">Optimized</h4>
                        <p className="text-sm text-slate-500">No performance loss</p>
                      </div>
                      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl translate-y-8 hover:border-green-500/30 transition-colors group">
                        <Terminal className="text-green-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="font-bold text-white mb-1">Clean Code</h4>
                        <p className="text-sm text-slate-500">Verified integrity</p>
                      </div>
                    </div>
                 </Reveal>
              </div>
              <div className="flex-1 order-1 lg:order-2">
                <Reveal direction="left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-6">
                    <Shield size={14} /> Security Protocols
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Rigorous standards for <span className="text-brand-400">your protection</span>.
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                    We understand the risks of the modding community. That's why HM MODZ VIP implements a strict verification process. 
                    Unlike other repositories, we manually test every file to ensure it's free from malicious code, loggers, or backdoors.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {['Zero-Log Policy', 'Manual Code Audits', 'Secure HTTPS Delivery'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center">
                          <CheckCircle2 size={14} className="text-brand-400" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-24 relative z-10 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 scroll-mt-20">
           <div className="container mx-auto px-6 text-center">
              <Reveal direction="up">
                <div className="w-20 h-20 bg-brand-600 rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-brand-500/30 rotate-3 hover:rotate-6 transition-transform">
                  <Users size={40} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Join the Elite Community</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                  Connect with over 24,000 members. Get direct support, request new mods, and stay updated with the latest releases in real-time.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <ShimmerButton 
                    onClick={() => window.open(CHANNEL_INFO.handleUrl, '_blank')}
                    className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 group"
                  >
                    <ExternalLink size={20} />
                    Join Telegram
                  </ShimmerButton>
                  <button 
                    onClick={() => window.open("https://abouthmmodzteam.netlify.app/", '_blank')}
                    className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold border border-slate-700 transition-colors"
                  >
                    About Developers
                  </button>
                </div>
              </Reveal>
           </div>
        </section>

        <footer className="bg-slate-950 py-12 border-t border-slate-800 text-center text-slate-500 text-sm">
           <Reveal direction="up">
            <p>© 2024 HM MODZ TEAM. All rights reserved.</p>
          </Reveal>
        </footer>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 font-sans text-slate-200">
      <MatrixBackground /> 
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Dashboard Header */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all active:scale-90 hover:rotate-180 duration-500"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2 group cursor-default">
              <div className="w-8 h-8 rounded bg-brand-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <span className="font-bold text-white">H</span>
              </div>
              <span className="font-bold text-lg text-white hidden sm:block group-hover:text-brand-400 transition-colors">HM MODZ <span className="text-slate-500 font-normal">Dashboard</span></span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={() => setShowLanding(true)} className="hidden sm:flex text-sm font-medium text-slate-400 hover:text-white transition-colors relative group">
              Log Out
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 border border-slate-700 shadow-inner animate-pulse-slow"></div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10 max-w-7xl">
        
        {/* Welcome Banner with Parallax-ish feel */}
        <Reveal direction="zoom" className="mb-10">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-brand-900/50 to-slate-900 border border-brand-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700 group-hover:scale-110 transform">
              <Terminal size={120} />
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in-up">Welcome back, User</h1>
              <p className="text-slate-400 max-w-2xl animate-fade-in-up [animation-delay:200ms]">
                Browse the latest verified modifications. System status is stable.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Files", value: FILES.length.toString() },
            { label: "Server Status", value: "Online", color: "text-green-400", pulse: true },
            { label: "Community", value: "24k+", color: "text-brand-400" },
            { label: "Last Update", value: "Today" },
          ].map((stat, i) => (
            <Reveal key={i} direction="up" delay={i * 0.1}>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl backdrop-blur-sm hover:border-brand-500/30 transition-colors group cursor-default">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 group-hover:text-slate-300 transition-colors">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <p className={`text-xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</p>
                  {stat.pulse && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Search Bar */}
        <Reveal direction="down" className="relative mb-8 z-20">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-slate-500" size={20} />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search repository..."
            className="w-full bg-slate-900/80 border border-slate-800 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-sm placeholder-slate-500 hover:shadow-lg hover:shadow-brand-500/5"
          />
        </Reveal>

        {/* Files Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file, index) => (
            <Reveal key={index} direction="up" delay={(index % 6) * 0.1}> {/* Stagger effect based on index */}
              <HoverCard>
                <div className="group h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col relative">
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 to-purple-500/0 group-hover:from-brand-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
                  
                  <div className="p-6 flex-grow relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-14 h-14 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden group-hover:shadow-lg transition-shadow">
                        <img src={file.logo} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110" />
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-slate-400 group-hover:border-brand-500/30 group-hover:text-brand-300 transition-colors">
                        {file.size}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-brand-400 transition-colors line-clamp-1">
                      {file.name}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4 group-hover:text-slate-300 transition-colors">
                      {file.desc}
                    </p>
                  </div>

                  <div className="px-6 pb-6 pt-0 mt-auto relative z-10">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openInBrowser(file.link); }}
                      className="w-full py-2.5 bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                    >
                      <Download size={16} className="group-hover/btn:animate-bounce" />
                      Download File
                      <ChevronRight size={16} className="opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                    </button>
                  </div>
                </div>
              </HoverCard>
            </Reveal>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <Reveal direction="zoom" className="text-center py-20">
            <div className="inline-flex p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-600 mb-4 animate-pulse-slow">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-medium text-white">No files found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search terms</p>
          </Reveal>
        )}
      </main>

      <footer className="bg-slate-950 py-8 border-t border-slate-800 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <Reveal direction="up">
             <p className="text-slate-600 text-sm hover:text-brand-400 transition-colors cursor-default">
              © 2024 HM MODZ VIP. Professional Grade Tools.
            </p>
          </Reveal>
        </div>
      </footer>

      <AIChat />
    </div>
  );
};

export default App;