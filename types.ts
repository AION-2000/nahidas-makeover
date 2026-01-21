
export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Lips' | 'Eyes' | 'Face' | 'Skincare' | 'Hair';
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews?: Review[];
}

export interface AIRecommendation {
  productName: string;
  reason: string;
  shadeSuggestion: string;
}

export interface AnalysisResult {
  faceShape: string;
  skinTone: string;
  eyeColor: string;
  recommendations: AIRecommendation[];
  styleAdvice: string;
}

export enum ViewState {
  HOME = 'home',
  SHOP = 'shop',
  CONSULTANT = 'consultant',
  PRODUCT_DETAIL = 'product_detail',
  CONTACT = 'contact',
  SERVICES = 'services',
  CART = 'cart',
  WISHLIST = 'wishlist'
}