import React from 'react';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  wishlist?: Product[];
  onToggleWishlist?: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, wishlist = [], onToggleWishlist }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(8px)', scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: 'blur(0px)', 
      scale: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
    >
      {products.map((product) => {
        const isWishlisted = wishlist.some(p => p.id === product.id);
        
        return (
          <motion.div 
            key={product.id} 
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="product-card group cursor-pointer relative"
          >
            <motion.button 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist?.(product);
              }}
              className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-500
                ${isWishlisted ? 'bg-pink-400 text-white scale-110' : 'bg-white/80 backdrop-blur-md text-slate-400 hover:text-pink-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'}`}
            >
              <i className={`${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart text-sm`}></i>
            </motion.button>

            <div 
              className="relative overflow-hidden mb-6 bg-rose-50/30 aspect-[4/5] rounded-[2rem] shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-rose-100/50"
              onClick={() => onProductClick?.(product)}
            >
              <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1 }}
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/95 backdrop-blur-md text-slate-900 py-4 font-bold text-center shadow-2xl opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 hover:bg-slate-900 hover:text-white rounded-2xl uppercase tracking-[0.2em] text-xs">
                View Radiance
              </div>

              {product.rating >= 4.9 && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-pink-400 shadow-lg border border-pink-50">
                  Best Seller
                </div>
              )}
            </div>
            
            <div className="px-2" onClick={() => onProductClick?.(product)}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-pink-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-1 group-hover:tracking-[0.4em] transition-all">{product.category}</p>
                  <h3 className="text-2xl font-bold text-slate-800 leading-tight serif italic group-hover:text-pink-400 transition-colors duration-500">{product.name}</h3>
                </div>
                <p className="text-2xl font-light text-slate-900 serif italic opacity-70 group-hover:opacity-100 transition-opacity">${product.price}</p>
              </div>
              
              <div className="flex items-center text-pink-300 text-xs">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fa-solid fa-star transition-all duration-500 ${i < Math.floor(product.rating) ? 'group-hover:scale-110' : 'text-slate-100'}`}></i>
                ))}
                <span className="text-slate-400 ml-3 font-medium tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-700">({product.rating})</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ProductGrid;