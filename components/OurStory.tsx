import React from 'react';
import { motion } from 'framer-motion';

const OurStory: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#fffdfd] pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-rose-50/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-40 left-0 w-[40vw] h-[40vw] bg-pink-50/30 rounded-full blur-[100px] pointer-events-none -translate-x-1/4"></div>

            <div className="container mx-auto max-w-6xl relative z-10">

                {/* Hero Section */}
                <div className="text-center mb-24 md:mb-32 animate-reveal">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-pink-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block"
                    >
                        Since 2019
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-bold text-slate-900 mb-10 serif italic"
                    >
                        The Art of <br /> <span className="text-pink-400">Radiance</span>
                    </motion.h1>
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: '80px' }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="w-px bg-gradient-to-b from-rose-400 to-transparent mx-auto"
                    />
                </div>

                {/* The Vision - Split Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-rose-100/30 border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1200&auto=format&fit=crop"
                                alt="Makeup Artistry"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl animate-float hidden md:block border border-rose-50">
                            <p className="font-bold text-slate-900 text-2xl serif italic">100%</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Cruelty Free</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 serif italic">A Vision of <br />Untamed Beauty</h2>
                        <div className="w-20 h-1 bg-pink-400"></div>
                        <p className="text-slate-600 text-lg leading-relaxed font-light">
                            Nahida's Makeover began with a simple yet profound belief: that makeup isn't just about concealing, but about <span className="text-slate-900 font-medium italic">revealing</span> the masterpiece within.
                        </p>
                        <p className="text-slate-600 text-lg leading-relaxed font-light">
                            Born from the vibrant intersection of traditional artistry and modern innovation, we've dedicated ourselves to crafting products that don't just sit on the skin but harmonize with it. Every shade is curated to celebrate diversity, and every formula is engineered for ethereal performance.
                        </p>
                        <div className="pt-4">
                            <span className="text-pink-400 font-bold uppercase tracking-widest text-xs border-b border-pink-400 pb-1">Read Manifesto</span>
                        </div>
                    </motion.div>
                </div>

                {/* Full Width Quote */}
                <div className="relative py-24 my-24 bg-slate-900 rounded-[3rem] overflow-hidden text-center px-6">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <i className="fa-solid fa-quote-left text-4xl text-rose-400 mb-8 opacity-50"></i>
                        <h3 className="text-3xl md:text-5xl text-white font-light serif italic leading-tight mb-10">
                            "We believe that confidence is the most captivating color you can wear. Our mission is simply to hand you the brush."
                        </h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">— Nahida, Founder</p>
                    </div>
                </div>

                {/* The Essence - 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Ethical Luxury",
                            desc: "Beauty shouldn't cost the earth. We are committed to sustainable sourcing and eco-conscious packaging.",
                            icon: "fa-leaf"
                        },
                        {
                            title: "Inclusive Shades",
                            desc: "Our spectrum is infinite. We formulate with every skin tone in mind, ensuring no one is left in the shadows.",
                            icon: "fa-users"
                        },
                        {
                            title: "Artisan Quality",
                            desc: "Small-batch production ensures that every pigment and texture meets our rigorous standards of perfection.",
                            icon: "fa-gem"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-10 rounded-[2rem] shadow-lg shadow-rose-100/10 border border-rose-50 hover:shadow-rose-200/20 transition-all text-center group"
                        >
                            <div className="w-16 h-16 bg-rose-50 rounded-2xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <i className={`fa-solid ${item.icon} text-2xl text-rose-400`}></i>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
                            <p className="text-slate-500 font-light text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default OurStory;
