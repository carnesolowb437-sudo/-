import React, { useState } from 'react';
import { Menu, X, ShoppingBag, User, Heart } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartCount: number;
  openCart: () => void;
  userName: string;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  cartCount,
  openCart,
  userName,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', name: '首 页', english: 'Home' },
    { id: 'products', name: '甜品系列', english: 'Products' },
    { id: 'story', name: '品牌故事', english: 'Story' },
    { id: 'booking', name: '工坊预约', english: 'Booking' },
    { id: 'testimonials', name: '评价心得', english: 'Reviews' },
    { id: 'member', name: '会员尊享', english: 'Club' },
    { id: 'contact', name: '联系我们', english: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FCFAF7]/60 backdrop-blur-lg border-b border-[#2F5233]/10 px-4 md:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo / Brand Name */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center space-x-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-full bg-[#2F5233] flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <span className="text-white font-serif font-semibold text-lg">U</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#2F5233] font-serif font-bold text-lg tracking-widest leading-tight">Urban Sanctuary</span>
            <span className="text-xs uppercase text-[#C5A880] tracking-widest font-sans font-medium">Cuixin Patisserie</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8" id="nav-desktop">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex flex-col items-center group py-1 text-sm font-medium transition-colors duration-300`}
                id={`nav-item-${item.id}`}
              >
                <span className={`tracking-widest ${isActive ? 'text-[#2F5233] font-semibold' : 'text-[#2C312E]/70 group-hover:text-[#2F5233]'}`}>
                  {item.name}
                </span>
                <span className={`text-[10px] uppercase font-mono tracking-wider scale-90 ${isActive ? 'text-[#C5A880]' : 'text-[#2C312E]/40 group-hover:text-[#C5A880]'}`}>
                  {item.english}
                </span>
                
                {/* Visual Accent Underline */}
                {isActive ? (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2F5233] rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#2F5233]/70 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Utility Actions */}
        <div className="flex items-center space-x-4" id="nav-actions">
          {/* Shopping Cart Trigger */}
          <button 
            onClick={openCart} 
            className="p-2.5 rounded-full hover:bg-[#2F5233]/5 text-[#2C312E] hover:text-[#2F5233] relative transition-colors duration-300 group"
            title="查看购物车"
            id="cart-btn"
          >
            <ShoppingBag className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C5A880] text-[#FCFAF7] font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#FCFAF7] shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Member Center Profile Link */}
          <button 
            onClick={() => handleNavClick('member')}
            className={`hidden md:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 group ${
              currentPage === 'member' 
                ? 'bg-[#2F5233] text-[#FCFAF7] border-[#2F5233]' 
                : 'border-[#2F5233]/20 hover:border-[#2F5233] text-[#2C312E] hover:bg-[#2F5233]/5'
            }`}
            id="user-profile-btn"
          >
            <User className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wider font-sans group-hover:underline">
              {userName}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 rounded-full lg:hidden hover:bg-[#2F5233]/5 text-[#2C312E]"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#FCFAF7] border-b border-[#2F5233]/15 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300" id="nav-mobile-menu">
          <div className="px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive ? 'bg-[#2F5233]/10 text-[#2F5233] font-bold' : 'hover:bg-[#2F5233]/5 text-[#2C312E]'
                  }`}
                  id={`nav-mobile-item-${item.id}`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm tracking-widest">{item.name}</span>
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-widest font-mono scale-95 origin-left">
                      {item.english}
                    </span>
                  </div>
                  <span className={`text-xs ${isActive ? 'text-[#2F5233] font-bold' : 'text-[#2C312E]/40'}`}>
                    •
                  </span>
                </button>
              );
            })}
            
            <div className="pt-4 border-t border-[#2F5233]/10 flex flex-col space-y-4">
              <button 
                onClick={() => handleNavClick('member')}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#2F5233]/5 text-left"
              >
                <div className="w-8 h-8 rounded-full bg-[#C5A880] flex items-center justify-center text-white">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-[#2C312E]/50">会员账户</span>
                  <span className="text-sm font-semibold text-[#2C312E]">{userName}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
