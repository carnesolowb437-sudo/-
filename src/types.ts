export interface Product {
  id: string;
  name: string;
  englishName: string;
  description: string;
  price: number;
  category: 'matcha' | 'classic' | 'seasonal' | 'drink';
  image: string;
  tags: string[];
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isPopular?: boolean;
  isMatchaExclusive?: boolean;
  detailDescription?: string;
  ingredients?: string[];
}

export interface Review {
  id: string;
  author: string;
  role?: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  productName?: string;
  tags?: string[];
  likes: number;
  isLiked?: boolean;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  courseType: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingTime: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
