import React, { useState, useEffect } from 'react';
import { ViewState, Product, Review } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Services from './components/Services';
import OurStory from './components/OurStory';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntroAnimation from './components/IntroAnimation';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_REVIEWS: Review[] = [];

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Maison Citron Exfoliating Scrub',
    category: 'Skincare',
    price: 45,
    description: 'A luxurious exfoliating scrub from France, infused with citron for a refreshing glow.',
    image: '/images/goddess-silk-foundation.jpg',
    rating: 5.0,
    reviews: []
  },
  {
    id: '2',
    name: 'Felps Açai Oil Nanoplastia Set',
    category: 'Hair',
    price: 85,
    description: 'Complete post-chemical treatment set with Shampoo and Conditioner for intense hydration.',
    image: '/images/nahida-bloom-lipstick.jpg',
    rating: 4.9,
    reviews: []
  },
  {
    id: '3',
    name: 'The Ordinary Multi-Peptide Hair Serum',
    category: 'Hair',
    price: 22,
    description: 'Concentrated serum for hair density. Designed to support thicker, fuller, and healthier-looking hair.',
    image: '/images/ethereal-rose-palette.jpg',
    rating: 5.0,
    reviews: []
  },
  {
    id: '4',
    name: 'CeraVe Skin Renewing Night Cream',
    category: 'Skincare',
    price: 28,
    description: 'Designed to work with your natural circadian rhythm to help restore your skin barrier overnight.',
    image: '/images/aura-radiance-serum.jpg',
    rating: 4.8,
    reviews: []
  },

  {
    id: '7',
    name: 'Felps SOS Web Effect Mask (1kg)',
    category: 'Hair',
    price: 95,
    description: 'Professional-grade hair reconstruction mask with web effect for restoring damaged and elastic hair.',
    image: '/images/felps-sos-mask-1kg.png',
    rating: 4.9,
    reviews: []
  },
  {
    id: '8',
    name: 'Felps SOS Web Effect Mask (300g)',
    category: 'Hair',
    price: 45,
    description: 'Compact version of our extreme treatment mask that repairs, reconstructs, and replaces mass.',
    image: '/images/felps-sos-mask-300g.jpg',
    rating: 4.8,
    reviews: []
  },
  {
    id: '9',
    name: 'Dr. Althea 345 Relief Cream',
    category: 'Skincare',
    price: 35,
    description: 'A fast-absorbing gel-cream that soothes redness and strengthens the skin barrier.',
    image: '/images/dr-althea-345-relief-cream.jpg',
    rating: 4.7,
    reviews: []
  },
  {
    id: '10',
    name: 'Felps RP Premium Antiporosity',
    category: 'Hair',
    price: 110,
    description: 'Two-step reconstruction treatment for chemically damaged hair. Restores health and shine.',
    image: '/images/felps-rp-premium.png',
    rating: 5.0,
    reviews: []
  },
  {
    id: '11',
    name: 'Celimax Retinal Shot Tightening Booster',
    category: 'Skincare',
    price: 42,
    description: 'Advanced retinal treatment for firming skin and reducing the appearance of pores.',
    image: '/images/celimax-retinal-shot.png',
    rating: 4.6,
    reviews: []
  },
  {
    id: '12',
    name: 'Medicube 15% Niacinamide Serum',
    category: 'Skincare',
    price: 36,
    description: 'A powerful 15% Niacinamide serum to minimize pores and improve skin texture.',
    image: '/images/medicube-niacinamide-serum.jpg',
    rating: 4.8,
    reviews: []
  },
  {
    id: '13',
    name: 'Beauty of Joseon Glow Deep Serum',
    category: 'Skincare',
    price: 24,
    description: 'Enriched with Rice Bran Water and Alpha-Arbutin for a brighter, glowing complexion.',
    image: '/images/boj-glow-deep-serum.png',
    rating: 4.9,
    reviews: []
  },
  {
    id: '14',
    name: 'COSRX Advanced Snail 92 All in one Cream',
    category: 'Skincare',
    price: 26,
    description: 'Lightweight gel-type cream made with 92% Snail Secretion Filtrate for long-lasting hydration.',
    image: '/images/cosrx-snail-cream.jpg',
    rating: 4.9,
    reviews: []
  },
  {
    id: '15',
    name: 'The Ordinary AHA 30% + BHA 2% Peeling Solution',
    category: 'Skincare',
    price: 18,
    description: '10-minute exfoliating facial for brighter and more even-looking skin.',
    image: '/images/the-ordinary-peeling-solution.jpg',
    rating: 4.7,
    reviews: []
  },
  {
    id: '16',
    name: 'Medicube Collagen Night Wrapping Mask',
    category: 'Skincare',
    price: 32,
    description: 'Overnight mask that creates a wrapping layer to lock in moisture and elasticity.',
    image: '/images/medicube-collagen-mask.jpg',
    rating: 4.8,
    reviews: []
  },
  {
    id: '17',
    name: 'Skin1004 Tone Brightening Capsule Ampoule',
    category: 'Skincare',
    price: 28,
    description: 'Brightening ampoule infused with Madagascan Centella Asiatica and Niacinamide.',
    image: '/images/skin1004-brightening-ampoule.jpg',
    rating: 4.8,
    reviews: []
  },
  {
    id: '18',
    name: 'Skin1004 Light Cleansing Oil',
    category: 'Skincare',
    price: 24,
    description: 'An all-in-one cleansing oil that melts away makeup and impurities without irritation.',
    image: '/images/skin1004-cleansing-oil.jpg',
    rating: 4.9,
    reviews: []
  },
  {
    id: '19',
    name: 'Skin1004 Madagascar Centella Travel Kit',
    category: 'Skincare',
    price: 32,
    description: 'The essence of nature in a convenient travel pouch. Includes Ampoule, Toner, and Cream.',
    image: '/images/skin1004-travel-kit.jpg',
    rating: 4.9,
    reviews: []
  },
  {
    id: '20',
    name: 'Anua Advanced Serum Collection',
    category: 'Skincare',
    price: 55,
    description: 'Targeted serum solutions including Niacinamide 10% and Azelaic Acid for clear skin.',
    image: '/images/anua-serum-collection.jpg',
    rating: 4.8,
    reviews: []
  },
  {
    id: '21',
    name: 'Dr. Althea 345 Relief Cream (Premium Box)',
    category: 'Skincare',
    price: 35,
    description: 'Intensive soothing cream with resveratrol to strengthen the moisture barrier.',
    image: '/images/dr-althea-345-cream-boxed.jpg',
    rating: 4.8,
    reviews: []
  },
  {
    id: '22',
    name: 'Skin1004 Poremizing Quick Clay Stick Mask',
    category: 'Skincare',
    price: 24,
    description: 'A convenient clay stick mask that quickly dissolves impurities and controls excess sebum.',
    image: '/images/skin1004-clay-stick-mask.jpg',
    rating: 4.7,
    reviews: []
  },
  {
    id: '23',
    name: 'Skin1004 Poremizing Fresh Ampoule',
    category: 'Skincare',
    price: 26,
    description: 'Himalayan Pink Salt enriched ampoule to minimize pores and soothe oily skin.',
    image: '/images/skin1004-poremizing-ampoule.jpg',
    rating: 4.8,
    reviews: []
  },
  {
    id: '24',
    name: 'Skin1004 Madagascar Centella Ampoule Foam',
    category: 'Skincare',
    price: 18,
    description: 'A rich, foaming cleanser with Centella Asiatica to gently cleanse and calm sensitivity.',
    image: '/images/skin1004-ampoule-foam.jpg',
    rating: 4.9,
    reviews: []
  },
  {
    id: '25',
    name: 'Felps Brazilian Nuts Keratin Nutritive Mask',
    category: 'Hair',
    price: 55,
    description: 'Enriched with Omega 3 and fatty acids for deep restructuring and hair alignment.',
    image: '/images/felps-brazilian-nuts-mask.jpg',
    rating: 5.0,
    reviews: []
  },
  {
    id: '26',
    name: 'Skin1004 Poremizing Deep Cleansing Foam',
    category: 'Skincare',
    price: 20,
    description: 'A creamy cleanser with Himalayan Pink Salt to unclog pores and remove impurities.',
    image: '/images/skin1004-poremizing-deep-cleansing-foam.jpg',
    rating: 4.8,
    reviews: []
  },
  {
    id: '27',
    name: 'Medicube Collagen Jelly Cream',
    category: 'Skincare',
    price: 38,
    description: 'A gel-textured cream packed with collagen to plump, hydrate, and give you that glass skin glow.',
    image: '/images/medicube-collagen-jelly-cream.jpg',
    rating: 4.9,
    reviews: []
  },
  {
    id: '28',
    name: 'Medicube TXA Niacinamide Capsule Cream',
    category: 'Skincare',
    price: 42,
    description: 'A dual-functioning cream with whitening capsules to fade spots and refine skin texture.',
    image: '/images/medicube-txa-capsule-cream.jpg',
    rating: 4.8,
    reviews: []
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  // Initialize products state by merging MOCK_PRODUCTS with reviews from localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedReviews = localStorage.getItem('nahida_reviews');
      if (savedReviews) {
        const parsedReviews: Record<string, Review[]> = JSON.parse(savedReviews);
        return MOCK_PRODUCTS.map(product => ({
          ...product,
          reviews: parsedReviews[product.id] || []
        }));
      }
    } catch (error) {
      console.error('Failed to load reviews from localStorage:', error);
    }
    return MOCK_PRODUCTS;
  });
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
      // Find the latest version of the product from state to ensure reviews are up to date
      const latestProduct = products.find(p => p.id === productOrSearch.id) || productOrSearch;
      setSelectedProduct(latestProduct);
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

  const handleAddReview = (productId: string, review: Review) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map(p => {
        if (p.id === productId) {
          return { ...p, reviews: [review, ...(p.reviews || [])] };
        }
        return p;
      });

      // Save to localStorage
      try {
        const allReviews: Record<string, Review[]> = {};
        updatedProducts.forEach(p => {
          if (p.reviews && p.reviews.length > 0) {
            allReviews[p.id] = p.reviews;
          }
        });
        localStorage.setItem('nahida_reviews', JSON.stringify(allReviews));
      } catch (error) {
        console.error('Failed to save reviews to localStorage:', error);
      }

      return updatedProducts;
    });

    // Also update selectedProduct if it's the one being reviewed
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => prev ? { ...prev, reviews: [review, ...(prev.reviews || [])] } : null);
    }
  };

  const cartTotal = cart.reduce((acc, p) => acc + p.price, 0);

  const handleCheckout = () => {
    const cartItems = cart.map(p => `- ${p.name} ($${p.price})`).join('\n');
    const message = `✨ New Order Inquiry for Nahida's Makeover ✨\n\n🛍️ MY BAG:\n${cartItems}\n\nTotal: $${cartTotal}.00\n\nPlease confirm availability and payment details!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/message/KUQBNJZDF62CP1?text=${encodedMessage}`, '_blank');
  };

  const filteredProducts = products.filter(p =>
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
                    onStartConsultation={() => navigateTo(ViewState.CONTACT)}
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
                        products={products.slice(0, 3)}
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
                            Explore Shop
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
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 serif italic">{searchTerm ? `Results for "${searchTerm}"` : 'The Shop'}</h1>
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

              {view === ViewState.SERVICES && (
                <Services />
              )}

              {view === ViewState.CONSULTANT && (
                <OurStory />
              )}

              {view === ViewState.PRODUCT_DETAIL && selectedProduct && (
                <ProductDetail
                  product={selectedProduct}
                  onBack={() => navigateTo(ViewState.SHOP)}
                  onAddToCart={addToCart}
                  onAddToWishlist={toggleWishlist}
                  onAddReview={handleAddReview}
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
                        Visit Shop
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
      </div >
    </div >
  );
};

export default App;