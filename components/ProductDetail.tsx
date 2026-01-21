import React, { useState } from 'react';
import { Product, Review } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onAddReview: (productId: string, review: Review) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart, onAddToWishlist, onAddReview }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    shade: ''
  });

  // Derived state from props
  const reviews = product.reviews || [];

  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please provide your delivery details, beautiful!");
      return;
    }

    const message = `✨ New Order for Nahida's Makeover ✨

💖 PRODUCT DETAILS:
Product: ${product.name}
Category: ${product.category}
Price: $${product.price}.00
Selected Variant: ${formData.shade || 'Standard Selection'}

🌸 CUSTOMER INFORMATION:
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}

Please confirm my order and let me know the payment details!`;

    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/message/KUQBNJZDF62CP1?text=${encodedMessage}`;

    window.open(waLink, '_blank');
  };

  const handleAddToCartClick = () => {
    setIsAddedToCart(true);
    onAddToCart(product);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleAddToWishlistClick = () => {
    setIsAddedToWishlist(true);
    onAddToWishlist(product);
    setTimeout(() => setIsAddedToWishlist(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;

    setIsSubmittingReview(true);

    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: Math.random().toString(36).substr(2, 9),
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };

      onAddReview(product.id, review);
      setNewReview({ userName: '', rating: 5, comment: '' });
      setIsSubmittingReview(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="container mx-auto px-6 py-16 animate-fade-in">
      <div className="flex justify-between items-center mb-12">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-slate-400 hover:text-rose-400 transition-all font-bold uppercase text-[10px] tracking-widest"
        >
          <i className="fa-solid fa-chevron-left group-hover:-translate-x-1 transition-transform"></i>
          Return to Shop
        </button>

        <button
          onClick={handleAddToWishlistClick}
          className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${isAddedToWishlist ? 'text-pink-400' : 'text-slate-400 hover:text-pink-400'}`}
        >
          <i className={`${isAddedToWishlist ? 'fa-solid' : 'fa-regular'} fa-heart text-sm`}></i>
          {isAddedToWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
        {/* Left: Product Image */}
        <div className="space-y-8 animate-fade-up">
          <div className="rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(183,110,121,0.25)] bg-white aspect-[4/5]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>

        {/* Right: Detailed Info & Form */}
        <div className="flex flex-col animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="mb-10">
            <span className="text-rose-300 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">{product.category}</span>
            <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex text-rose-300 text-xs">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? '' : 'text-slate-100'}`}></i>
                ))}
              </div>
              <span className="text-slate-400 text-sm font-medium tracking-wide italic">"Absolutely divine" — Recent Client Review</span>
            </div>
            <p className="text-4xl font-light text-slate-900 mb-8 serif italic">${product.price}.00</p>
            <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-lg font-light">
              {product.description} Nahida's Makeover products are ethically formulated, vegan-friendly, and designed to reveal your angelic glow.
            </p>
          </div>

          <div className="bg-white border border-rose-50 rounded-[2rem] p-10 shadow-2xl shadow-rose-100/30">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-800">
              <div className="w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-gift text-rose-400 text-sm"></i>
              </div>
              Your Shop Order
            </h3>

            <form onSubmit={handleBuy} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Your Name</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Goddess Name" className="w-full px-5 py-4 bg-rose-50/30 border border-transparent rounded-2xl focus:bg-white focus:border-rose-200 outline-none transition-all placeholder:text-slate-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Phone</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+880 1XXX-XXXXXX" className="w-full px-5 py-4 bg-rose-50/30 border border-transparent rounded-2xl focus:bg-white focus:border-rose-200 outline-none transition-all placeholder:text-slate-300" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Shipping Address</label>
                <input required name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="Where should we send your glow?" className="w-full px-5 py-4 bg-rose-50/30 border border-transparent rounded-2xl focus:bg-white focus:border-rose-200 outline-none transition-all placeholder:text-slate-300" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Preferred Shade</label>
                <select name="shade" value={formData.shade} onChange={handleInputChange} className="w-full px-5 py-4 bg-rose-50/30 border border-transparent rounded-2xl focus:bg-white focus:border-rose-200 outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Signature (Default)</option>
                  <option value="Fair Aura">Fair Aura</option>
                  <option value="Golden Glow">Golden Glow</option>
                  <option value="Rosy Bloom">Rosy Bloom</option>
                  <option value="Divine Deep">Divine Deep</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleAddToCartClick}
                  className={`py-5 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 border-2 ${isAddedToCart ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-slate-900 text-slate-900 hover:bg-slate-50'}`}
                >
                  <i className={`fa-solid ${isAddedToCart ? 'fa-check' : 'fa-shopping-bag'}`}></i>
                  {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 text-white py-5 rounded-2xl font-bold text-base hover:bg-rose-400 transition-all flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1 active:scale-[0.98]"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                  Buy Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t border-rose-50 pt-20 animate-fade-up">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Review Stats and Form */}
          <div className="lg:w-1/3 space-y-12">
            <div>
              <span className="text-pink-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Feedback</span>
              <h2 className="text-5xl font-bold text-slate-900 serif italic mb-6">Client Appreciations</h2>
              <div className="flex items-center gap-4 mb-2">
                <div className="text-4xl font-bold text-slate-800">{(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)}</div>
                <div className="flex text-rose-300 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-solid fa-star ${i < Math.floor(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)) ? '' : 'text-slate-100'}`}></i>
                  ))}
                </div>
              </div>
              <p className="text-slate-400 text-sm tracking-wide">Based on {reviews.length} reviews</p>
            </div>

            <div className="bg-white border border-rose-50 rounded-[2rem] p-8 shadow-xl shadow-rose-100/20">
              <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-3">
                <i className="fa-solid fa-pen-nib text-pink-400"></i>
                Share Your Glow
              </h3>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className={`text-2xl transition-all ${newReview.rating >= star ? 'text-rose-400 scale-110' : 'text-slate-100 hover:text-rose-200'}`}
                    >
                      <i className="fa-solid fa-star"></i>
                    </button>
                  ))}
                </div>

                <input
                  required
                  name="userName"
                  value={newReview.userName}
                  onChange={handleReviewChange}
                  placeholder="Your Name"
                  className="w-full px-5 py-4 bg-rose-50/30 border border-transparent rounded-xl focus:bg-white focus:border-rose-200 outline-none transition-all text-sm"
                />

                <textarea
                  required
                  name="comment"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  placeholder="How does it feel on your skin?"
                  rows={4}
                  className="w-full px-5 py-4 bg-rose-50/30 border border-transparent rounded-xl focus:bg-white focus:border-rose-200 outline-none transition-all text-sm resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="w-full bg-pink-400 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-pink-500 transition-all shadow-lg shadow-pink-100 flex items-center justify-center gap-2"
                >
                  {isSubmittingReview ? (
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                  ) : (
                    <>Publish Appraisal</>
                  )}
                </button>

                {showSuccess && (
                  <p className="text-center text-[10px] font-bold text-green-500 uppercase tracking-widest animate-reveal mt-2">
                    Thank you for your radiance!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Review List */}
          <div className="lg:w-2/3 space-y-8">
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white p-8 rounded-[2rem] border border-rose-50 shadow-sm hover:shadow-md transition-shadow animate-fade-up">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg mb-1">{review.userName}</h4>
                        <p className="text-[10px] text-slate-300 uppercase tracking-widest font-medium">{review.date}</p>
                      </div>
                      <div className="flex text-rose-300 text-[10px] gap-1">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`fa-solid fa-star ${i < review.rating ? '' : 'text-slate-100'}`}></i>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-500 font-light italic leading-relaxed text-sm">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[400px] border-2 border-dashed border-rose-100 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300 gap-4 opacity-50">
                <i className="fa-solid fa-feather-pointed text-5xl"></i>
                <p className="font-light italic tracking-widest uppercase text-xs">Be the first to share the glow</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;