import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product, Review, Booking, CartItem } from './types';
import { INITIAL_REVIEWS, MOCK_USER } from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ProductsView from './components/ProductsView';
import StoryView from './components/StoryView';
import BookingView from './components/BookingView';
import TestimonialsView from './components/TestimonialsView';
import MemberView from './components/MemberView';
import ContactView from './components/ContactView';
import CartDrawer from './components/CartDrawer';
import { motion, AnimatePresence } from 'motion/react';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_USER.bookings);
  const [userCoupons, setUserCoupons] = useState(MOCK_USER.coupons);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Activity Ledger append
  const handleAddActivityInPoints = (amount: number, desc: string) => {
    MOCK_USER.points += amount;
    MOCK_USER.exp += amount;

    const newActivity = {
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      desc,
      points: `+${amount}`,
      amount: String(amount),
    };

    MOCK_USER.activities = [newActivity, ...MOCK_USER.activities];
  };

  // Booking action
  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    // Also award points for reserving a seat! (Tranquility sign-up)
    handleAddActivityInPoints(150, `在线预约学席确认：${newBooking.courseType}`);
  };

  // Review actions
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    // Award sign up points for writing high grade review!
    handleAddActivityInPoints(50, `递交时令甜点鉴定帖：${newReview.productName}`);
  };

  const handleLikeReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const toggled = !r.isLiked;
          return {
            ...r,
            isLiked: toggled,
            likes: toggled ? r.likes + 1 : r.likes - 1,
          };
        }
        return r;
      })
    );
  };

  // Coupon actions
  const handleUseCoupon = (couponId: string) => {
    setUserCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, used: true } : c))
    );
  };

  const handleClaimCoupon = (newCoupon: any) => {
    setUserCoupons((prev) => [newCoupon, ...prev]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // App active view renderer switcher
  const renderActiveView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView setCurrentPage={setCurrentPage} />;
      case 'products':
        return <ProductsView onAddToCart={handleAddToCart} cartCount={cartCount} />;
      case 'story':
        return <StoryView />;
      case 'booking':
        return (
          <BookingView
            onAddBooking={handleAddBooking}
            userPhone="138****8812"
            userName={MOCK_USER.name}
          />
        );
      case 'testimonials':
        return (
          <TestimonialsView
            reviews={reviews}
            onAddReview={handleAddReview}
            onLikeReview={handleLikeReview}
            userName={MOCK_USER.name}
          />
        );
      case 'member':
        return (
          <MemberView
            bookings={bookings}
            coupons={userCoupons}
            onUseCoupon={handleUseCoupon}
            onClaimCoupon={handleClaimCoupon}
          />
        );
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] font-sans flex flex-col justify-between" id="app-root">
      {/* 0. Custom Green Leaf Cursor */}
      <CustomCursor />
      
      {/* 1. Header Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
        userName={MOCK_USER.name}
      />

      {/* 2. Main Container with seamless animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* 4. Sliding Cart Drawer Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onAddActivityInPoints={handleAddActivityInPoints}
        coupons={userCoupons}
      />

      {/* 5. FLOATING QUICK BAG BUTTON (Accessible only when cart has items and drawer is closed) */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-[#2F5233] hover:bg-[#1E3821] text-[#FCFAF7] p-4.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            title="快捷查看购物车"
            id="floating-cart-fab"
          >
            <ShoppingBag className="w-6.5 h-6.5" />
            <span className="absolute -top-1 -right-1 bg-[#C5A880] text-[#FCFAF7] font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#FCFAF7] shadow-md">
              {cartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
