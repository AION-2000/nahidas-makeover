import React, { useState, useRef } from 'react';
import { analyzeBeauty } from '../services/geminiService';
import { AnalysisResult } from '../types';

const AIConsultant: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError("Please provide a beautiful image of yourself.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setImage(reader.result as string);
      startAnalysis(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const startAnalysis = async (base64: string) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeBeauty(base64);
      setResult(data);
    } catch (err) {
      setError("Analysis failed. Our artists need a clearer view of your radiance.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 md:py-24 px-4 md:px-0">
      <div className="text-center mb-16 md:mb-24 animate-reveal">
        <span className="text-rose-400 font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Beauty Redefined</span>
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 serif italic">Digital Artistry</h2>
        <p className="text-slate-500 italic max-w-xl mx-auto text-base md:text-lg px-4 font-light">
          "Uncover your unique harmonic palette." Let our AI decode your features to curate the perfect makeover ritual.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_40px_80px_-20px_rgba(183,110,121,0.15)] border border-rose-50 overflow-hidden">
        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-[2rem] p-12 md:p-24 flex flex-col items-center justify-center cursor-pointer transition-all duration-500
              ${isDragging ? 'bg-rose-50 border-rose-400' : 'bg-rose-50/20 border-rose-100 hover:bg-rose-50/50 hover:border-rose-200'}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files?.[0]; if (file) processFile(file); }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl">
              <i className="fa-solid fa-camera-retro text-rose-300 text-3xl md:text-4xl"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Upload Portrait</h3>
            <p className="text-slate-400 text-xs md:text-sm">Drag and drop or click to browse</p>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start animate-fade-in">
            <div className="space-y-8">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-square bg-rose-50 border-8 border-white">
                <img src={image} alt="Original" className="w-full h-full object-cover" />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-rose-400 rounded-full animate-spin mb-6"></div>
                    <p className="text-white font-bold tracking-widest uppercase text-xs">Consulting Artistry...</p>
                  </div>
                )}
              </div>
              <button onClick={reset} className="w-full py-4 border border-rose-100 text-rose-400 rounded-2xl font-bold hover:bg-rose-50 transition-all text-xs uppercase tracking-widest" disabled={isAnalyzing}>
                Analyze New Portrait
              </button>
            </div>

            <div className="space-y-10">
              {result ? (
                <div className="animate-fade-up space-y-10">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-rose-50/50 p-4 rounded-2xl text-center border border-rose-100/50 shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-rose-300 tracking-widest mb-1">Face</p>
                      <p className="text-sm font-bold text-slate-800">{result.faceShape}</p>
                    </div>
                    <div className="bg-rose-50/50 p-4 rounded-2xl text-center border border-rose-100/50 shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-rose-300 tracking-widest mb-1">Tone</p>
                      <p className="text-sm font-bold text-slate-800">{result.skinTone}</p>
                    </div>
                    <div className="bg-rose-50/50 p-4 rounded-2xl text-center border border-rose-100/50 shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-rose-300 tracking-widest mb-1">Eyes</p>
                      <p className="text-sm font-bold text-slate-800">{result.eyeColor}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[2rem] shadow-xl relative">
                    <i className="fa-solid fa-quote-left absolute top-6 right-8 text-4xl text-rose-400/20"></i>
                    <p className="text-lg md:text-xl leading-relaxed serif italic font-light opacity-90">
                      {result.styleAdvice}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-rose-50 pb-4">Our Curated Recommendations</h3>
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="p-6 bg-white border border-rose-50 rounded-2xl hover:border-rose-200 transition-all shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-1">{rec.productName}</h4>
                        <p className="text-rose-400 text-[10px] font-bold mb-3 tracking-widest uppercase">Shade: {rec.shadeSuggestion}</p>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">{rec.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                !isAnalyzing && (
                  <div className="h-full flex flex-col items-center justify-center text-rose-100 space-y-8 py-20">
                    <i className="fa-solid fa-wand-magic-sparkles text-8xl md:text-9xl"></i>
                    <p className="text-center italic font-light text-slate-400 text-lg">Awaiting your portrait for analysis...</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-8 p-6 bg-red-50 text-red-600 rounded-2xl text-center font-bold shadow-sm border border-red-100">
          <i className="fa-solid fa-circle-exclamation mr-3"></i> {error}
        </div>
      )}
    </div>
  );
};

export default AIConsultant;