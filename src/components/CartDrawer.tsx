import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingCart, ShoppingBag, BadgePercent, ShieldCheck, Ticket } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddActivityInPoints: (amount: number, desc: string) => void;
  coupons: any[];
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddActivityInPoints,
  coupons,
}: CartDrawerProps) {
  const [selectedCouponId, setSelectedCouponId] = useState<string>('');
  const [checkoutSuccessSlip, setCheckoutSuccessSlip] = useState<{ id: string; pickupTime: string; totalPaid: number } | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Apply Coupon Logic
  const appliedCoupon = coupons.find(c => c.id === selectedCouponId && !c.used);
  
  const discountAmount = (() => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.code === 'SPRING85') {
      return Math.round(subtotal * 0.15); // 15% off
    }
    if (appliedCoupon.code === 'CANELFREE') {
      // Free 2 Caneles. Check if Canele exists in cart
      const caneleItem = cart.find(item => item.product.id === 'p4');
      if (caneleItem) {
        const canelePrice = caneleItem.product.price;
        // Max discount 2 caneles
        return canelePrice * Math.min(2, caneleItem.quantity);
      }
      return 0;
    }
    if (appliedCoupon.title.includes('10元')) {
      return Math.min(subtotal, 10);
    }
    if (appliedCoupon.code === 'VIPGIFT') {
      return subtotal; // 100% off
    }
    return 0;
  })();

  const grandTotal = Math.max(0, subtotal - discountAmount);
  
  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Simulate place order
    const trackingId = `CX-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const futureMinutes = 15;
    const date = new Date();
    date.setMinutes(date.getMinutes() + futureMinutes);
    const pickupTimeFormatted = date.toTimeString().substring(0, 5);

    // Apply points
    const pointsAwarded = Math.round(grandTotal);
    const desc = `堂食消费品尝：${cart.map(item => `${item.product.name}x${item.quantity}`).join(', ')}`;
    onAddActivityInPoints(pointsAwarded, desc);

    setCheckoutSuccessSlip({
      id: trackingId,
      pickupTime: pickupTimeFormatted,
      totalPaid: grandTotal,
    });
  };

  const handleCloseAndReset = () => {
    setCheckoutSuccessSlip(null);
    setSelectedCouponId('');
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 flex max-w-full" id="shopping-cart-drawer">
          
          {/* Backdrop glass */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Box */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-screen max-w-md bg-[#FCFAF7] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#2F5233]/15 text-left"
          >
            {/* Header Column */}
            <div className="p-6 border-b border-[#2F5233]/15 flex items-center justify-between bg-[#1E3821] text-[#FCFAF7]">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
                <h3 className="font-serif font-bold text-base tracking-widest">
                  {checkoutSuccessSlip ? '订单支付详单' : '品鉴购物车'}
                </h3>
              </div>
              <button 
                onClick={checkoutSuccessSlip ? handleCloseAndReset : onClose}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                id="close-cart-btn"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              
              <AnimatePresence mode="wait">
                
                {/* STATE A: ORDER COMPLETED SUCCESS SLIP */}
                {checkoutSuccessSlip ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-6 font-serif text-center py-6"
                    id="checkout-success-container"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-600 mx-auto">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-emerald-700 text-lg font-bold tracking-widest">茶膳下单成功！</h4>
                      <p className="text-xs text-[#2C312E]/40 font-mono">ORDER PLACED & VERIFIED</p>
                    </div>

                    <div className="w-full h-px border-t border-dashed border-[#C5A880]/40 my-4"></div>

                    <div className="space-y-4 font-sans text-xs md:text-sm text-[#2C312E]/80 text-left bg-[#FAF5EF] p-5 rounded-2xl border border-[#C5A880]/20">
                      <div className="flex justify-between">
                        <span className="text-[#2C312E]/50 font-light">核销码订单ID：</span>
                        <span className="font-mono font-bold text-[#1E3821]">{checkoutSuccessSlip.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2C312E]/50 font-light">预计上席时间：</span>
                        <span className="font-bold text-[#2F5233] animate-pulse">⏰ 约 {checkoutSuccessSlip.pickupTime} (堂食就餐)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2C312E]/50 font-light">实付共减金额：</span>
                        <span className="font-bold text-[#1E3821]">￥{checkoutSuccessSlip.totalPaid}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2C312E]/50 font-light">经验积分红利：</span>
                        <span className="font-bold text-emerald-700 font-mono">+{Math.round(checkoutSuccessSlip.totalPaid)} Pts 🔒 已锁定</span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#2F5233]/5 rounded-xl text-left text-xs text-[#2C312E]/60 space-y-1.5 font-sans leading-relaxed">
                      <p className="font-bold text-[#1E3821]">📢 堂食餐次尊享事宜：</p>
                      <p className="font-light">点茶及手裁千层正在调制中。您尊享的积分在结账后已极速同步至您的金卡账户中，可前往“会员尊享”查看明细。</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCloseAndReset}
                      className="w-full py-3.5 bg-[#2F5233] hover:bg-[#1E3821] text-white text-xs font-sans font-bold tracking-widest rounded-xl transition-all shadow-md"
                      id="finish-order-btn"
                    >
                      回到菜单 🍵
                    </button>
                  </motion.div>
                ) : (
                  
                  /* STATE B: SHOPPING ITEMS LIST */
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6 text-left"
                    id="cart-items-list"
                  >
                    {cart.length > 0 ? (
                      <div className="space-y-4 divide-y divide-[#2F5233]/5">
                        {cart.map((item) => (
                          <div key={item.product.id} className="pt-4 first:pt-0 flex space-x-4 items-center justify-between text-xs md:text-sm">
                            
                            {/* Product thumbnail */}
                            <div className="flex items-center space-x-3 text-left">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-14 h-14 rounded-lg object-cover border border-[#2F5233]/10"
                                referrerPolicy="no-referrer"
                              />
                              <div className="space-y-0.5">
                                <h4 className="font-serif font-bold text-[#1E3821]">{item.product.name}</h4>
                                <p className="text-[#2F5233] font-mono text-xs">￥{item.product.price}</p>
                              </div>
                            </div>

                            {/* Qty count input */}
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center border border-[#2F5233]/15 rounded-md overflow-hidden bg-white">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="px-2 py-1 text-[#2C312E] hover:bg-[#2F5233]/5 font-serif font-bold disabled:opacity-30"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-2.5 font-mono font-bold text-xs text-[#1E3821]">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2 py-1 text-[#2C312E] hover:bg-[#2F5233]/5 font-serif font-bold"
                                >
                                  +
                                </button>
                              </div>

                              {/* Delete button */}
                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-stone-300 hover:text-rose-600 p-1.5 transition-colors"
                                title="从购物车剔除"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center text-stone-400 space-y-3" id="cart-drawer-empty">
                        <ShoppingCart className="w-12 h-12 text-stone-200 mx-auto" />
                        <p className="text-xs font-light">
                          您这盏茶席还没添置任何糕点或茶水。
                        </p>
                      </div>
                    )}

                    {/* ONLY SHOW CHECKOUT SUMMARIES IF CART IS NOT EMPTY */}
                    {cart.length > 0 && (
                      <div className="space-y-4 pt-6 mt-6 border-t border-[#2F5233]/10">
                        
                        {/* 1. Coupon selector */}
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-[#2C312E]/75 flex items-center space-x-1.5">
                            <Ticket className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>折回抵通用代卷 / Vouchers</span>
                          </label>
                          
                          <select
                            value={selectedCouponId}
                            onChange={(e) => setSelectedCouponId(e.target.value)}
                            className="w-full text-xs bg-white text-[#2C312E] p-2.5 border border-[#2F5233]/15 rounded-lg focus:outline-none focus:border-[#2F5233] cursor-pointer"
                          >
                            <option value="">-- 选择可抵折卡券 (不使用优惠券) --</option>
                            {coupons.filter(c => !c.used).map((c) => (
                              <option key={c.id} value={c.id}>
                                【{c.code}】{c.title} (限时有效)
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* 2. Billing ledger details */}
                        <div className="bg-[#FAF5EF]/60 rounded-2xl p-4 border border-[#2F5233]/5 text-xs font-sans space-y-2.5">
                          <div className="flex justify-between text-[#2C312E]/60 font-light">
                            <span>商品原定小计 Subtotal：</span>
                            <span className="font-mono text-stone-700">￥{subtotal}</span>
                          </div>
                          {discountAmount > 0 && (
                            <div className="flex justify-between text-emerald-700 font-bold antialiased">
                              <span>已享受卡券减免 Deductions：</span>
                              <span className="font-mono">-￥{discountAmount}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-[#2C312E]/60 font-light">
                            <span>用餐桌膳服务 Service：</span>
                            <span className="text-[#2F5233] font-bold">￥0 (免收)</span>
                          </div>
                          
                          <div className="w-full h-px border-t border-[#2F5233]/5 my-1.5" />

                          <div className="flex justify-between text-[#1E3821] font-bold text-sm">
                            <span className="font-serif">实付总金额 Total：</span>
                            <span className="font-mono text-base text-[#2F5233]">￥{grandTotal}</span>
                          </div>
                        </div>

                      </div>
                    )}

                  </motion.div>
                )}

              </AnimatePresence>

            </div>

            {/* Bottom Actions button */}
            {cart.length > 0 && !checkoutSuccessSlip && (
              <div className="p-6 border-t border-[#2F5233]/15 bg-[#FCFAF7] space-y-4">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#2F5233] hover:bg-[#1E3821] text-white font-semibold text-sm tracking-widest rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                  id="checkout-btn"
                >
                  <span>立即下单</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex justify-center items-center space-x-1.5 text-[10px] text-[#2C312E]/40 font-sans">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>翠心自营。100%新鲜手作，少糖低脂保证。</span>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
