import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState, search?: string) => void;
  cartCount: number;
  wishlistCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, cartCount, wishlistCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [menuScrollY, setMenuScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
      setScrollAmount(offset);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle internal menu scroll tracking
  const handleMenuScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setMenuScrollY(e.currentTarget.scrollTop);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
      // Reset menu scroll state when opening
      setMenuScrollY(0);
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen, isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    onNavigate(ViewState.SHOP, searchQuery);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setIsSearchOpen(false);
    onNavigate(ViewState.SHOP, tag);
  };

  // Calculate visibility for top elements based on menu scroll
  // They vanish almost immediately as the user scrolls down into the menu
  const menuNavOpacity = Math.max(1 - menuScrollY / 60, 0);
  const menuNavBlur = Math.min(menuScrollY / 5, 10);
  const menuNavY = -Math.min(menuScrollY / 2, 20);

  // Main page header logo calculations
  const logoBlur = Math.min((scrollAmount - 100) / 10, 8);
  const logoOpacity = Math.max(1 - (scrollAmount - 200) / 300, 0);
  const logoScale = Math.max(1 - (scrollAmount) / 2000, 0.85);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/80 backdrop-blur-xl py-3 md:py-4 shadow-sm' : 'bg-transparent py-6 md:py-8'}`}>
        <nav className="container mx-auto px-6 md:px-16 flex items-center justify-between">
          <div
            className="cursor-pointer group z-50"
            onClick={() => onNavigate(ViewState.HOME)}
            style={{
              filter: scrolled ? `blur(${Math.max(0, logoBlur)}px)` : 'none',
              opacity: scrolled ? logoOpacity : (isMenuOpen ? menuNavOpacity : 1),
              transform: `scale(${logoScale}) translateY(${isMenuOpen ? menuNavY : 0}px)`,
              transition: 'filter 0.3s ease, opacity 0.3s ease, transform 0.5s ease'
            }}
          >
            <div className="flex flex-col items-center">
              <span className="serif italic text-2xl md:text-3xl leading-tight text-slate-900 group-hover:text-pink-400 transition-colors">Nahida's</span>
              <span className="text-[10px] tracking-[0.5em] -mt-1 uppercase font-medium text-slate-400">Makeover</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 items-center text-xs font-bold uppercase tracking-[0.3em]">
            {[
              { id: ViewState.HOME, label: 'Studio' },
              { id: ViewState.SHOP, label: 'Shop' },
              { id: ViewState.SERVICES, label: 'Services' },
              { id: ViewState.CONTACT, label: 'Contact' },
              { id: ViewState.CONSULTANT, label: 'Our Story' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative py-2 group overflow-hidden ${currentView === item.id ? 'text-black' : 'text-slate-400 hover:text-black'} transition-colors`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-pink-400 transition-transform duration-500 origin-right ${currentView === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-left'}`}></span>
              </button>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-6 md:space-x-8 text-slate-900 z-50" style={{ opacity: isMenuOpen ? menuNavOpacity : 1, filter: isMenuOpen ? `blur(${menuNavBlur}px)` : 'none', transform: `translateY(${isMenuOpen ? menuNavY : 0}px)`, transition: 'all 0.4s ease' }}>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-pink-400 transition-colors relative hidden sm:block"
              aria-label="Search"
            >
              <i className="fa-solid fa-magnifying-glass text-base"></i>
            </button>

            <button
              onClick={() => onNavigate(ViewState.WISHLIST)}
              className={`hover:text-pink-400 transition-colors relative ${currentView === ViewState.WISHLIST ? 'text-pink-400' : ''}`}
              aria-label="Wishlist"
            >
              <i className={`${wishlistCount > 0 ? 'fa-solid' : 'fa-regular'} fa-heart text-base`}></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold border border-white animate-fade-in">{wishlistCount}</span>
              )}
            </button>

            <button
              onClick={() => onNavigate(ViewState.CART)}
              className={`hover:text-pink-400 transition-colors relative ${currentView === ViewState.CART ? 'text-pink-400' : ''}`}
              aria-label="Cart"
            >
              <i className="fa-solid fa-bag-shopping text-base"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white animate-fade-in">{cartCount}</span>
              )}
            </button>

            <button
              className="md:hidden text-slate-900 hover:text-pink-400 transition-all active:scale-90"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-xl`}></i>
            </button>
          </div>
        </nav>

        {/* Improved Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-3xl z-[60] animate-fade-in flex flex-col overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-rose-100/40 rounded-full blur-[80px] animate-pulse"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-50/50 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Sticky Top Mask for "Vanishing" effect */}
            <div className={`fixed top-0 left-0 w-full h-48 bg-gradient-to-b from-white via-white/80 to-transparent z-20 pointer-events-none backdrop-blur-[2px] transition-opacity duration-500 ${menuScrollY > 10 ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Menu Header with Back Button - Vanishing Logic Added */}
            <div
              className="fixed top-0 left-0 w-full z-30 px-6 py-6 md:py-8 flex items-center"
              style={{
                opacity: menuNavOpacity,
                filter: `blur(${menuNavBlur}px)`,
                transform: `translateY(${menuNavY}px)`,
                transition: 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease',
                pointerEvents: menuScrollY > 40 ? 'none' : 'auto'
              }}
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-slate-800 hover:text-pink-400 transition-all group active:scale-95"
              >
                <div className="w-8 h-8 rounded-full border border-rose-100 flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-sm group-hover:border-rose-300">
                  <i className="fa-solid fa-chevron-left text-[10px]"></i>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100">Back</span>
              </button>
            </div>

            {/* Main Menu Scrollable Container */}
            <div
              ref={menuRef}
              onScroll={handleMenuScroll}
              className="relative flex-grow overflow-y-auto px-8 py-32 z-10 custom-scrollbar scroll-smooth"
            >
              <div className="flex flex-col items-center space-y-12 pb-32">
                {[
                  { id: ViewState.HOME, label: 'Studio', sub: 'The Experience' },
                  { id: ViewState.SHOP, label: 'Shop', sub: 'Our Collection' },
                  { id: ViewState.SERVICES, label: 'Services', sub: 'Expert Care' },
                  { id: ViewState.CONTACT, label: 'Contact', sub: 'Reach Out' },
                  { id: ViewState.CONSULTANT, label: 'Our Story', sub: 'Neural Artistry' },
                  { id: ViewState.CART, label: 'My Bag', sub: `${cartCount} items` }
                ].map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setIsMenuOpen(false); }}
                    className="group relative flex flex-col items-center animate-fade-up w-full"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span className="text-[9px] font-black tracking-[0.6em] text-rose-300 uppercase mb-3 group-hover:text-pink-400 transition-colors opacity-60">
                      {item.sub}
                    </span>
                    <span className="text-5xl font-light text-slate-800 serif italic tracking-tight transition-all group-hover:scale-105 group-hover:text-pink-400">
                      {item.label}
                    </span>
                    <div className="w-0 h-[1px] bg-rose-200 mt-5 transition-all duration-500 group-hover:w-32"></div>
                  </button>
                ))}

                <div className="pt-24 flex flex-col items-center gap-10 animate-fade-up" style={{ animationDelay: '500ms' }}>
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-px bg-rose-50"></div>
                    <span className="text-[8px] font-black tracking-[0.6em] text-slate-300 uppercase">Follow the Glow</span>
                    <div className="w-16 h-px bg-rose-50"></div>
                  </div>
                  <div className="flex gap-12 text-slate-300">
                    <a href="#" className="hover:text-pink-400 transition-all scale-150"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#" className="hover:text-pink-400 transition-all scale-150"><i className="fa-brands fa-tiktok"></i></a>
                    <a href="#" className="hover:text-pink-400 transition-all scale-150"><i className="fa-brands fa-whatsapp"></i></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Mask */}
            <div className="fixed bottom-0 w-full h-32 bg-gradient-to-t from-white via-white/40 to-transparent z-20 pointer-events-none"></div>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-2xl flex flex-col items-center justify-center px-6 animate-fade-in">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-10 md:top-12 right-10 md:right-12 text-black hover:text-pink-400 transition-all text-2xl"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="w-full max-w-2xl text-center">
            <span className="text-pink-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Find your radiance</span>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                autoFocus
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-black py-4 md:py-6 text-2xl md:text-5xl font-bold text-black outline-none placeholder:text-slate-500 focus:border-pink-400 transition-all serif italic"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-black hover:text-pink-400 transition-colors">
                <i className="fa-solid fa-arrow-right text-2xl md:text-3xl"></i>
              </button>
            </form>
            <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
              {['Lipstick', 'Foundation', 'Eyes', 'Serum', 'Face'].map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="px-4 md:px-6 py-2 rounded-full border border-black text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-black hover:border-pink-400 hover:text-pink-400 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;