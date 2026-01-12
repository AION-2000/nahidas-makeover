import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate a brief delay for a premium feel
    setTimeout(() => {
      const waMessage = `✨ New Inquiry from Nahida's Makeover ✨\n\n👤 Name: ${formData.firstName}\n📧 Email: ${formData.email}\n\n📝 Message:\n${formData.message}\n\nPlease get back to me soon!`;
      const encodedMessage = encodeURIComponent(waMessage);
      const waLink = `https://wa.me/message/KUQBNJZDF62CP1?text=${encodedMessage}`;
      
      window.open(waLink, '_blank');
      
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ firstName: '', email: '', message: '' });

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="container mx-auto px-6 py-24 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="animate-fade-up">
            <span className="text-rose-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Direct Inquiry</span>
            <h1 className="text-7xl font-bold text-slate-900 mb-10 leading-[0.9]">Let's chat <br /><span className="serif italic font-light text-rose-400">gorgeous.</span></h1>
            <p className="text-slate-500 text-xl leading-relaxed mb-16 font-light italic">
              "We're here to help you achieve your most stunning transformation. Reach out for consultations, events, or boutique support."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Studio</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Fashion District Boutique<br />7th Heaven Ave, Paris</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Email</h3>
                <p className="text-slate-400 text-sm">hello@nahidasmakeover.com</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Social</h3>
                <p className="text-slate-400 text-sm">@NahidasMakeover</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">WhatsApp</h3>
                <p className="text-slate-400 text-sm font-bold">+880 1700-000000</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-12 shadow-[0_40px_80px_-20px_rgba(183,110,121,0.15)] border border-rose-50 animate-fade-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold mb-10 text-slate-900 serif italic">Send us a love note</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">First Name</label>
                <input 
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  type="text" 
                  placeholder="Lovely" 
                  className="w-full px-6 py-5 bg-rose-50/20 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-rose-200 transition-all placeholder:text-slate-300" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                <input 
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email" 
                  placeholder="angel@glow.com" 
                  className="w-full px-6 py-5 bg-rose-50/20 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-rose-200 transition-all placeholder:text-slate-300" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">How can we help?</label>
                <textarea 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4} 
                  placeholder="Your thoughts here..." 
                  className="w-full px-6 py-5 bg-rose-50/20 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-rose-200 resize-none transition-all placeholder:text-slate-300"
                ></textarea>
              </div>

              <div className="relative">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-6 rounded-2xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3
                    ${isSubmitting ? 'bg-slate-700 text-slate-300' : 'bg-slate-900 text-white hover:bg-rose-400'}`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                      Sending to Studio...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane text-sm"></i>
                      Send Message
                    </>
                  )}
                </button>
                
                {showSuccess && (
                  <div className="absolute -bottom-16 left-0 w-full animate-blur-in text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500">
                      <i className="fa-solid fa-check-circle mr-2"></i>
                      Love note received! Check WhatsApp.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;