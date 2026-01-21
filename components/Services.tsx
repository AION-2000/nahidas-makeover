import React from 'react';
import { motion } from 'framer-motion';

const services = [
    {
        title: 'Bridal Artistry',
        description: 'Bespoke bridal makeup designed to make you radiantly timeless on your special day. Includes trial consultation.',
        price: 'from $350',
        icon: 'fa-solid fa-ring'
    },
    {
        title: 'Red Carpet Glam',
        description: 'High-impact, long-wear styling for events, photoshoots, and galas. Camera-ready perfection.',
        price: '$150',
        icon: 'fa-solid fa-camera'
    },
    {
        title: 'Editorial & Creative',
        description: 'Avant-garde makeup artistry for fashion editorials, brand campaigns, and creative projects.',
        price: 'Custom Quote',
        icon: 'fa-solid fa-palette'
    },
    {
        title: 'Masterclass Workshop',
        description: 'Learn professional techniques in a private 1-on-1 session or small group setting. Tools provided.',
        price: '$200 / session',
        icon: 'fa-solid fa-wand-magic-sparkles'
    }
];

const Services: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#fffdfd] pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-rose-50/50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-pink-50/30 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

            <div className="container mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-pink-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block"
                    >
                        Our Expertise
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 serif italic"
                    >
                        Service Menu
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg md:text-xl font-light italic leading-relaxed"
                    >
                        "Elevate your beauty experience with our curated selection of professional services, tailored to your unique essence."
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -5 }}
                            className="group bg-white border border-rose-50 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-rose-100/10 hover:shadow-rose-100/40 transition-all duration-500"
                        >
                            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <i className={`${service.icon} text-2xl text-rose-400`}></i>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 serif italic mb-4">{service.title}</h3>
                            <p className="text-slate-500 font-light leading-relaxed mb-8">{service.description}</p>
                            <div className="flex items-center justify-between border-t border-rose-50 pt-8">
                                <span className="text-lg font-bold text-slate-900">{service.price}</span>
                                <button className="text-[10px] font-bold uppercase tracking-widest text-pink-400 group-hover:text-pink-500 flex items-center gap-2">
                                    Book Now <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-24 text-center"
                >
                    <p className="text-slate-400 text-sm italic mb-4">Looking for something specific?</p>
                    <a href="#" className="inline-block border-b border-slate-300 pb-1 text-slate-900 hover:text-pink-400 hover:border-pink-400 transition-all text-sm font-bold uppercase tracking-widest">
                        Contact us for custom packages
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default Services;
