import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  onStartConsultation: () => void;
  onVisitShop: () => void;
}

const WORDS = ['Studio', 'Shop', 'Connect', 'Makeover', 'Beauty Consultant'];

const Hero: React.FC<HeroProps> = ({ onStartConsultation, onVisitShop }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);
  const ringRotate = useTransform(scrollY, [0, 1000], [0, 60]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);
  const bloomScale = useTransform(scrollY, [0, 500], [1, 1.2]);

  useEffect(() => {
    const handleType = () => {
      const fullWord = WORDS[currentWordIndex];

      if (!isDeleting) {
        setDisplayText(fullWord.substring(0, displayText.length + 1));
        setTypingSpeed(100);

        if (displayText === fullWord) {
          setIsDeleting(true);
          setTypingSpeed(1500);
        }
      } else {
        setDisplayText(fullWord.substring(0, displayText.length - 1));
        setTypingSpeed(50);

        if (displayText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
          setTypingSpeed(300);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, typingSpeed]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(10px)' },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative h-[95vh] flex items-center overflow-hidden bg-[#fffdfd]">
      {/* BACKGROUND & DYNAMIC MASKING */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 z-0"
      >
        <motion.img
          initial={{ scale: 1.1, filter: 'brightness(1.2)' }}
          animate={{ scale: 1, filter: 'brightness(1)' }}
          transition={{ duration: 3, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury Makeup"
          className="w-full h-full object-cover brightness-[0.85] md:brightness-[0.9]"
          style={{
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 90%)'
          }}
        />

        {/* Layered Lighting for Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffdfd] via-[#fffdfd]/20 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-[#fffdfd] via-[#fffdfd]/80 to-transparent"></div>
      </motion.div>

      {/* PORTAL RING TRANSITION (The "Intro" Motion) */}
      <motion.div
        style={{ rotate: ringRotate, scale: bloomScale }}
        className="absolute bottom-[-25%] left-1/2 -translate-x-1/2 w-[140vw] h-[140vw] pointer-events-none z-10 opacity-20"
      >
        <div className="w-full h-full rounded-full border-[1px] border-rose-300/40"></div>
        <div className="absolute inset-12 rounded-full border-[0.5px] border-dashed border-rose-200/30"></div>
      </motion.div>

      {/* FLOATING LIGHT PARTICLES */}
      <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-20 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: [-20, -150],
              opacity: [0, 0.5, 0],
              x: Math.random() * 60 - 30
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-rose-300 rounded-full blur-[0.5px]"
            style={{ left: `${10 + Math.random() * 80}%` }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-20"
      >
        <div className="max-w-4xl">
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="h-px w-8 md:w-10 bg-pink-400"></span>
            <span className="text-pink-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em]">
              Est. 2019
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6 md:mb-8 h-40 md:h-64 flex flex-col justify-start overflow-hidden">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.1] md:leading-[1] text-slate-900 tracking-tight flex flex-col items-start">
              <span>Nahida's</span>
              <div className="w-full overflow-hidden h-24 md:h-32">
                <span className="serif italic font-light text-pink-400 mt-1 md:mt-2 inline-block min-w-[2px] break-words">
                  {displayText}
                </span>
              </div>
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="text-base md:text-xl text-slate-600 mb-8 md:mb-12 leading-relaxed max-w-lg font-light italic opacity-90">
            "Unveil the masterpiece within." Experience the fusion of luxury artistry and precision AI beauty engineering.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartConsultation}
              className="px-8 md:px-12 py-4 md:py-5 bg-pink-400 text-white font-bold rounded-full flex items-center justify-center gap-4 group text-sm md:text-base shadow-xl hover:bg-pink-500 transition-all"
            >
              <i className="fa-solid fa-wand-sparkles text-lg"></i>
              Connect
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onVisitShop}
              className="px-8 md:px-12 py-4 md:py-5 border-2 border-pink-400 text-pink-500 font-bold rounded-full hover:bg-pink-400 hover:text-white transition-all text-sm md:text-base shadow-lg shadow-pink-100/30"
            >
              Visit Shop
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: opacityFade }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
      >

        <div className="relative w-[1px] h-16 overflow-hidden bg-slate-100">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-rose-300 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;