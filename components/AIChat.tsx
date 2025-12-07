import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, X, Bot, Loader2, Sparkles, MessageCircle, Minimize2 } from 'lucide-react';
import { FILES, CHANNEL_INFO } from '../constants';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: `Hello! I'm the ${CHANNEL_INFO.name} support assistant. How can I help you find a mod today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY || ''; 
      if (!apiKey) {
         setMessages(prev => [...prev, { role: 'model', text: "Configuration Error: API Key is missing." }]);
         setIsLoading(false);
         return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const fileContext = FILES.map(f => `${f.name}: ${f.desc} (Size: ${f.size})`).join('\n');
      const systemInstruction = `You are a professional support agent for "HM MODZ VIP". 
      Your tone should be helpful, polite, and professional. 
      Use the following list of files to answer user requests:
      ${fileContext}
      
      If a user asks for something not in the list, politely inform them it is unavailable.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const text = response.text || "I apologize, but I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the server. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button with Pulse and Hover Bounce */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-brand-600 text-white rounded-full shadow-2xl hover:bg-brand-500 hover:shadow-brand-500/50 transition-all z-40 group ${isOpen ? 'hidden' : 'flex'} animate-bounce`}
        style={{ animationDuration: '3s' }}
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>
        <MessageCircle size={28} className="group-hover:scale-110 group-active:scale-90 transition-transform" />
      </button>

      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden font-sans sm:max-w-[calc(100vw-48px)] origin-bottom-right transition-all duration-300 animate-zoom-in ${isMinimized ? 'h-16' : 'h-[550px]'}`}>
          
          {/* Header */}
          <div 
            className="bg-gradient-to-r from-brand-700 to-brand-600 p-4 flex justify-between items-center text-white cursor-pointer"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg animate-pulse-slow">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm">HM Assistant</h3>
                <p className="text-xs text-brand-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Minimize2 size={16} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); setIsMinimized(false); }} 
                className="hover:bg-white/20 p-2 rounded-full transition-colors hover:rotate-90 duration-300"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900 scroll-smooth">
                <div className="text-center py-4">
                  <p className="text-xs text-slate-500 animate-fade-in-up">Today</p>
                </div>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                    {msg.role === 'model' && (
                      <div className="w-8 h-8 rounded-full bg-brand-900 border border-brand-700 flex items-center justify-center mr-2 flex-shrink-0 animate-blob">
                        <Bot size={14} className="text-brand-400" />
                      </div>
                    )}
                    <div className={`max-w-[80%] p-3 text-sm rounded-2xl shadow-lg transform transition-all hover:scale-[1.01] ${
                      msg.role === 'user' 
                        ? 'bg-brand-600 text-white rounded-br-none' 
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-fade-in-up">
                     <div className="w-8 h-8 rounded-full bg-brand-900 border border-brand-700 flex items-center justify-center mr-2 flex-shrink-0">
                        <Bot size={14} className="text-brand-400" />
                      </div>
                    <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 bg-slate-800 border-t border-slate-700">
                <div className="flex gap-2 items-center bg-slate-900 border border-slate-700 rounded-full px-4 py-2 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all duration-300 focus-within:shadow-lg focus-within:shadow-brand-500/20">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-slate-500"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className={`p-2 rounded-full transition-all duration-300 transform active:scale-90 ${input.trim() ? 'text-brand-500 hover:bg-brand-500/10 rotate-0' : 'text-slate-600 rotate-45'}`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AIChat;