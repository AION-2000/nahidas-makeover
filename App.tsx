import React, { useState, useEffect } from 'react';
import { ViewState, Product, Review } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AIConsultant from './components/AIConsultant';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntroAnimation from './components/IntroAnimation';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_REVIEWS: Review[] = [
  { id: 'r1', userName: 'Elena V.', rating: 5, comment: 'Absolutely divine! The texture is like nothing I have ever used before. Truly worth the luxury price tag.', date: '2023-10-15' },
  { id: 'r2', userName: 'Sophia M.', rating: 4, comment: 'Beautiful packaging and even better performance. The shade range is impressive.', date: '2023-11-02' }
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Goddess Silk Foundation',
    category: 'Face',
    price: 52,
    description: 'Experience a second-skin finish with our signature Goddess Silk. Designed for a 24-hour weightless glow.',
    image: 'https://images.unsplash.com/photo-1631730359585-38a4935ccbb2?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    reviews: [...MOCK_REVIEWS]
  },
  {
    id: '2',
    name: 'Nahida Bloom Lipstick',
    category: 'Lips',
    price: 38,
    description: 'A creamy, petal-soft matte that hydrates while delivering intense, high-fashion pigment.',
    image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: [
      { id: 'r3', userName: 'Isabella R.', rating: 5, comment: 'The most comfortable matte lipstick. It stays all day without drying my lips!', date: '2023-12-05' }
    ]
  },
  {
    id: '3',
    name: 'Ethereal Rose Palette',
    category: 'Eyes',
    price: 65,
    description: '14 dreamy shades of rose gold, mauve, and champagne. The ultimate palette for every romantic look.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    reviews: [...MOCK_REVIEWS]
  },
  {
    id: '4',
    name: 'Aura Radiance Serum',
    category: 'Skincare',
    price: 78,
    description: 'Infused with 24k gold flakes and rosehip oil to prep your skin for the perfect makeover.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: []
  },
  {
    id: '5',
    name: 'Dream Lash Mascara',
    category: 'Eyes',
    price: 34,
    description: 'Achieve fluttery, doll-like lashes without clumping. Sweat-proof for long studio days.',
    image: 'https://images.unsplash.com/photo-1631214503951-3751033d2544?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: []
  },
  {
    id: '6',
    name: 'Angelic Glow Blush',
    category: 'Face',
    price: 42,
    description: 'A soft-focus, radiant blush that mimics a natural, youthful flush.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfac44221d?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: []
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showIntro, setShowIntro] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('nahida_intro_seen');
    if (!hasSeenIntro) {
      setShowIntro(true);
    } else {
      setAppReady(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setAppReady(true);
    setShowIntro(false);
    sessionStorage.setItem('nahida_intro_seen', 'true');
  };

  const navigateTo = (newView: ViewState, productOrSearch?: Product | string) => {
    if (typeof productOrSearch === 'string') {
      setSearchTerm(productOrSearch);
    } else if (productOrSearch) {
      setSelectedProduct(productOrSearch);
    } else {
      setSearchTerm('');
    }
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.find(p => p.id === product.id)) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
    } else {
      setWishlist(prev => [...prev, product]);
    }
  };

  const cartTotal = cart.reduce((acc, p) => acc + p.price, 0);

  const handleCheckout = () => {
    const cartItems = cart.map(p => `- ${p.name} ($${p.price})`).join('\n');
    const message = `✨ New Order Inquiry for Nahida's Makeover ✨\n\n🛍️ MY BAG:\n${cartItems}\n\nTotal: $${cartTotal}.00\n\nPlease confirm availability and payment details!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/message/KUQBNJZDF62CP1?text=${encodedMessage}`, '_blank');
  };

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isContentVisible = appReady && !showIntro;

  const pageVariants = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    enter: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  const signatureRevealVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const signatureItemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfd] overflow-x-hidden w-full relative">
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div key="intro" exit={{ opacity: 0 }}>
            <IntroAnimation onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className={`flex flex-col min-h-screen transition-opacity duration-1000 ${isContentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Header 
          currentView={view} 
          onNavigate={navigateTo} 
          cartCount={cart.length}
          wishlistCount={wishlist.length}
        />
        
        <main className="flex-grow pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={view + (searchTerm || '') + (selectedProduct?.id || '')}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="w-full h-full"
            >
              {view === ViewState.HOME && (
                <div>
                  <Hero 
                    onStartConsultation={() => navigateTo(ViewState.CONSULTANT)} 
                    onVisitShop={() => navigateTo(ViewState.SHOP)}
                  />
                  
                  {/* SEAMLESS PORTAL TRANSITION */}
                  <section className="relative bg-[#fffdfd] overflow-hidden -mt-24 z-10">
                    {/* Bottom half of the Portal Ring (Mirrors Hero) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[140vw] pointer-events-none z-0 opacity-10">
                      <div className="w-full h-full rounded-full border-[1px] border-rose-300"></div>
                    </div>
                    
                    <div className="container mx-auto px-6 py-48 md:py-64 relative z-20">
                      <motion.div 
                        variants={signatureRevealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-150px" }}
                        className="text-center mb-16 md:mb-24 flex flex-col items-center"
                      >
                        <motion.span 
                          variants={signatureItemVariants}
                          className="text-rose-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block"
                        >
                          Hand-Picked Selection
                        </motion.span>
                        
                        <motion.h2 
                          variants={signatureItemVariants}
                          className="text-4xl md:text-7xl font-bold text-slate-900 mb-8 serif italic"
                        >
                          Signature Collection
                        </motion.h2>

                        <motion.div 
                          initial={{ width: 0, opacity: 0 }}
                          whileInView={{ width: '150px', opacity: 1 }}
                          transition={{ delay: 0.8, duration: 2.5, ease: "circOut" }}
                          className="h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent mb-10"
                        />

                        <motion.p 
                          variants={signatureItemVariants}
                          className="text-slate-500 max-w-2xl mx-auto text-lg md:text-2xl italic px-4 font-light leading-relaxed"
                        >
                          "Beauty begins the moment you decide to be yourself."
                        </motion.p>
                      </motion.div>
                      
                      <ProductGrid 
                        products={MOCK_PRODUCTS.slice(0, 3)} 
                        onProductClick={(p) => navigateTo(ViewState.PRODUCT_DETAIL, p)} 
                        wishlist={wishlist}
                        onToggleWishlist={toggleWishlist}
                      />
                      
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-center mt-16 md:mt-24"
                      >
                        <button 
                          onClick={() => navigateTo(ViewState.SHOP)}
                          className="group relative px-10 md:px-16 py-4 md:py-5 text-slate-900 font-bold transition-all duration-700 uppercase tracking-widest text-[11px] overflow-hidden rounded-xl"
                        >
                          <div className="absolute inset-0 border-2 border-slate-900 rounded-xl group-hover:bg-slate-900 transition-colors duration-500"></div>
                          <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center gap-3">
                            Explore Boutique
                            <i className="fa-solid fa-arrow-right-long transition-transform group-hover:translate-x-2"></i>
                          </span>
                        </button>
                      </motion.div>
                    </div>
                  </section>
                </div>
              )}

              {view === ViewState.SHOP && (
                <div className="container mx-auto px-6 py-24 md:py-32">
                  <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 serif italic">{searchTerm ? `Results for "${searchTerm}"` : 'The Boutique'}</h1>
                    <div className="w-16 md:w-24 h-px bg-rose-200 mx-auto mb-4"></div>
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-pink-400 transition-colors"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                  {filteredProducts.length > 0 ? (
                    <ProductGrid 
                      products={filteredProducts} 
                      onProductClick={(p) => navigateTo(ViewState.PRODUCT_DETAIL, p)} 
                      wishlist={wishlist}
                      onToggleWishlist={toggleWishlist}
                    />
                  ) : (
                    <div className="text-center py-24 space-y-6">
                      <i className="fa-solid fa-magnifying-glass text-slate-100 text-6xl"></i>
                      <p className="text-slate-400 font-light italic">We couldn't find any products matching your search.</p>
                      <button onClick={() => setSearchTerm('')} className="px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-110 transition-transform">View All Products</button>
                    </div>
                  )}
                </div>
              )}

              {view === ViewState.CONSULTANT && (
                <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
                  <AIConsultant />
                </div>
              )}

              {view === ViewState.PRODUCT_DETAIL && selectedProduct && (
                <ProductDetail 
                  product={selectedProduct} 
                  onBack={() => navigateTo(ViewState.SHOP)} 
                  onAddToCart={addToCart}
                  onAddToWishlist={toggleWishlist}
                />
              )}

              {view === ViewState.CONTACT && (
                <Contact />
              )}

              {view === ViewState.CART && (
                <div className="container mx-auto px-6 py-24 md:py-32">
                  {cart.length > 0 ? (
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 serif italic mb-12 text-center">My Bag</h2>
                      <div className="bg-white border border-rose-50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-rose-100/20">
                        <div className="space-y-8 mb-12">
                          {cart.map((product, idx) => (
                            <div key={`${product.id}-${idx}`} className="flex items-center gap-6 group">
                              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-rose-50 flex-shrink-0 shadow-inner group-hover:shadow-lg transition-all duration-700">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                              </div>
                              <div className="flex-grow">
                                <p className="text-[10px] font-bold text-pink-300 uppercase tracking-widest mb-1">{product.category}</p>
                                <h4 className="text-lg font-bold text-slate-800">{product.name}</h4>
                                <p className="text-slate-400 font-light italic text-sm">${product.price}.00</p>
                              </div>
                              <button 
                                onClick={() => removeFromCart(idx)}
                                className="text-slate-200 hover:text-red-400 transition-all p-2 hover:rotate-12"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-rose-50 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
                          <div>
                            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Subtotal</p>
                            <p className="text-4xl font-light text-slate-900 serif italic">${cartTotal}.00</p>
                          </div>
                          <button 
                            onClick={handleCheckout}
                            className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-rose-400 transition-all shadow-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 duration-500"
                          >
                            <i className="fa-brands fa-whatsapp text-xl"></i>
                            Checkout on WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto space-y-8 text-center py-12">
                      <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto">
                        <i className="fa-solid fa-bag-shopping text-rose-300 text-4xl"></i>
                      </div>
                      <h2 className="text-4xl font-bold text-slate-900 serif italic">Your Bag is Empty</h2>
                      <p className="text-slate-500 font-light italic">"A queen always needs her essentials." Start your collection today.</p>
                      <button 
                        onClick={() => navigateTo(ViewState.SHOP)}
                        className="px-12 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-rose-400 transition-all uppercase tracking-widest text-xs"
                      >
                        Shop the Boutique
                      </button>
                    </div>
                  )}
                </div>
              )}

              {view === ViewState.WISHLIST && (
                <div className="container mx-auto px-6 py-24 md:py-32">
                  {wishlist.length > 0 ? (
                    <div className="max-w-5xl mx-auto">
                      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 serif italic mb-12 text-center">My Wishlist</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishlist.map((product) => (
                          <div key={product.id} className="relative group bg-white border border-rose-50 rounded-[2rem] p-6 shadow-xl shadow-rose-100/10 hover:shadow-rose-100/30 transition-all duration-700">
                            <button 
                              onClick={() => toggleWishlist(product)}
                              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full text-red-400 flex items-center justify-center shadow-md hover:bg-red-400 hover:text-white transition-all duration-500 hover:scale-125"
                            >
                              <i className="fa-solid fa-xmark text-xs"></i>
                            </button>
                            <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-rose-50 shadow-inner">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-1 serif italic">{product.name}</h4>
                            <p className="text-pink-400 text-[10px] font-bold uppercase tracking-widest mb-4">{product.category}</p>
                            <div className="flex justify-between items-center">
                              <p className="text-xl font-light text-slate-900 serif italic">${product.price}.00</p>
                              <button 
                                onClick={() => navigateTo(ViewState.PRODUCT_DETAIL, product)}
                                className="p-3 bg-slate-900 text-white rounded-xl hover:bg-pink-400 transition-all duration-500 hover:scale-110"
                              >
                                <i className="fa-solid fa-arrow-right text-xs"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto space-y-8 text-center py-12">
                      <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto">
                        <i className="fa-regular fa-heart text-rose-300 text-4xl"></i>
                      </div>
                      <h2 className="text-4xl font-bold text-slate-900 serif italic">Your Wishlist</h2>
                      <p className="text-slate-500 font-light italic">Save your favorite glows for later.</p>
                      <button 
                        onClick={() => navigateTo(ViewState.SHOP)}
                        className="px-12 py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all uppercase tracking-widest text-xs"
                      >
                        Discover Products
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;