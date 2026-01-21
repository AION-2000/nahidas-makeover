import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Modality } from "@google/genai";

const FOOTER_DATA = {
  collections: [
    { title: "Complexion Perfectors", description: "Flawless finishes and second-skin textures for your unique tone." },
    { title: "Eye Enchantments", description: "High-pigment palettes and precision tools for a captivating gaze." },
    { title: "Lip Artistry", description: "Creamy mattes and high-shine finishes that redefine luxury lip care." },
    { title: "Skincare Rituals", description: "Transformative serums and preps for the ultimate makeup canvas." }
  ],
  studio: [
    { title: "Our Story", description: "Bridging high-fashion artistry and digital precision since 2019." },
    { title: "Client Reviews", description: "A collection of love notes from our global community of goddesses." },
    { title: "Beauty Concierge", description: "Personalized assistance for your events and beauty transformations." },
    { title: "Privacy Policy", description: "Your data is treated with the same care as your skin." }
  ]
};

// Audio decoding helper
async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

const FooterItem: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) return;
    
    setIsSpeaking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say elegantly: ${description}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Puck' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), audioCtx, 24000, 1);
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        source.onended = () => setIsSpeaking(false);
        source.start();
      }
    } catch (err) {
      console.error("Audio narration failed", err);
      setIsSpeaking(false);
    }
  };

  return (
    <div className="flex flex-col">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 text-slate-400 hover:text-rose-400 transition-colors text-sm font-light text-left group"
      >
        <motion.div 
          animate={{ scale: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
          className="w-1 h-1 bg-rose-400 rounded-full"
        />
        <span className={`${isOpen ? 'text-rose-400 font-medium' : ''}`}>{title}</span>
        <i className={`fa-solid fa-chevron-down text-[8px] opacity-20 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="relative pt-2 pb-4 border-l border-rose-400/20 pl-4 mt-2">
              <p className="text-xs text-slate-500 leading-relaxed italic pr-8">
                {description}
              </p>
              <button 
                onClick={handleSpeak}
                className={`absolute top-2 right-0 transition-all ${isSpeaking ? 'text-rose-400 animate-pulse' : 'text-slate-600 hover:text-rose-400'}`}
                title="Listen to description"
              >
                <i className={`fa-solid ${isSpeaking ? 'fa-volume-high' : 'fa-volume-low'} text-[10px]`}></i>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide your email address.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex flex-col">
              <span className="serif italic text-3xl leading-none text-rose-400">Nahida's</span>
              <span className="text-[11px] tracking-[0.6em] uppercase font-light text-slate-400">Makeover</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">
              Founded in 2019, we believe in beauty that empowers and celebrates individuality. Luxury formulas for every goddess.
            </p>
            <div className="flex space-x-8 text-xl">
              <a href="#" className="text-slate-500 hover:text-rose-400 transition-all"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="text-slate-500 hover:text-rose-400 transition-all"><i className="fa-brands fa-tiktok"></i></a>
              <a href="#" className="text-slate-500 hover:text-rose-400 transition-all"><i className="fa-brands fa-pinterest-p"></i></a>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-8 text-slate-200">Collections</h3>
            <div className="space-y-4">
              {FOOTER_DATA.collections.map((item, idx) => (
                <FooterItem key={idx} title={item.title} description={item.description} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-8 text-slate-200">The Studio</h3>
            <div className="space-y-4">
              {FOOTER_DATA.studio.map((item, idx) => (
                <FooterItem key={idx} title={item.title} description={item.description} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-8 text-slate-200">Newsletter</h3>
            <p className="text-slate-400 mb-6 font-light text-sm">Join the inner circle for beauty secrets and exclusive rewards.</p>
            
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubscribe} 
                  className="space-y-4"
                >
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address" 
                      className={`w-full bg-slate-800/50 border ${error ? 'border-red-400/50' : 'border-slate-700/50'} px-5 py-4 text-white focus:ring-1 focus:ring-rose-400 outline-none transition-all rounded-xl text-sm`}
                    />
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 mt-1 text-[9px] text-red-400 font-bold uppercase tracking-widest"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-rose-400 text-white py-4 font-bold hover:bg-rose-500 disabled:bg-slate-700 transition-all uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-rose-900/20 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                    ) : (
                      'Join Now'
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-rose-400/10 border border-rose-400/20 rounded-2xl p-6 text-center"
                >
                  <i className="fa-solid fa-check-circle text-rose-400 text-2xl mb-3"></i>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-1">Welcome, Goddess</h4>
                  <p className="text-[10px] text-rose-200 uppercase tracking-widest">You're in the Inner Circle</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="border-t border-slate-800/50 pt-10 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] uppercase tracking-widest font-medium">
          <p>&copy; 2019 Nahida's Makeover Studio. Handcrafted for you.</p>
          <div className="flex flex-col items-center md:items-end gap-3 mt-8 md:mt-0">
            <div className="flex flex-wrap justify-center items-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              <i className="fa-brands fa-cc-visa text-xl" title="Visa"></i>
              <i className="fa-brands fa-cc-mastercard text-xl" title="Mastercard"></i>
              <i className="fa-brands fa-cc-apple-pay text-xl" title="Apple Pay"></i>
              <i className="fa-brands fa-cc-paypal text-xl" title="PayPal"></i>
            </div>
            <a 
              href="https://wa.me/8801959040057" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 hover:text-rose-400 transition-all duration-500 font-bold"
            >
              Developed by Shihab Shahriar Aion
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;