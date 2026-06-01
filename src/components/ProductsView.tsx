import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Plus, ShoppingBag, Eye, Heart, X, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ProductsViewProps {
  onAddToCart: (product: Product) => void;
  cartCount: number;
}

export default function ProductsView({ onAddToCart, cartCount }: ProductsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playbackRate = 0.45; // Slow down the playback rate (45% of original speed)
      videoRef.current.play().catch(err => {
        console.warn("Autoplay muted video was delayed or prevented:", err);
      });
    }
  }, []);

  const handleOpenDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsFlipped(false);
  };

  const categories = [
    { id: 'all', name: '全系甜点', count: INITIAL_PRODUCTS.length },
    { id: 'matcha', name: '宇治特浓抹茶', count: INITIAL_PRODUCTS.filter(p => p.category === 'matcha').length },
    { id: 'classic', name: '经典茶香焙烤', count: INITIAL_PRODUCTS.filter(p => p.category === 'classic').length },
    { id: 'seasonal', name: '西湖时令限定', count: INITIAL_PRODUCTS.filter(p => p.category === 'seasonal').length },
    { id: 'drink', name: '石磨手作流茶', count: INITIAL_PRODUCTS.filter(p => p.category === 'drink').length },
  ];

  // Filter and Sort Logic
  const processedProducts = useMemo(() => {
    let result = [...INITIAL_PRODUCTS];

    // 1. Filter Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Filter Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.englishName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // 3. Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    
    // Quick pop animation
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-transparent" id="products-view-wrapper">
      {/* Background Video Layer with Atmospheric Wash */}
      <div 
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.85]"
        id="products-video-background-layer"
      >
        <video
          ref={videoRef}
          src="https://ik.imagekit.io/quuete4si/%E5%BE%AE%E4%BF%A1%E8%A7%86%E9%A2%912026-06-01_082721_764.mp4"
          className="w-full h-full object-cover filter contrast-[1.03] brightness-[0.99] saturate-[1.01]"
          muted={true}
          playsInline={true}
          autoPlay={true}
          loop={true}
        />
        {/* Complex organic creamy paper gradient wash to integrate foreground and video */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#FCFAF7]/5 via-[#FAF6F0]/25 to-[#FCFAF7]/70" 
          id="products-video-gradient-overlay"
        />
        
        {/* Soft floating luminous tea-zen light orbs to unify the layout elements */}
        <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-[#2F5233]/5 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#C5A880]/6 blur-[160px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 text-left space-y-12 shrink-0" id="products-view">
      
      {/* 1. HEADER SECTION */}
      <div className="text-center md:text-left space-y-3 mb-8">
        <p className="text-xs text-[#C5A880] tracking-widest uppercase font-semibold font-mono">OUR SELECTION</p>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1E3821]">甜品时令系列</h1>
        <p className="text-sm text-[#2C312E]/60 max-w-xl font-light leading-relaxed">
          精选日本宇治顶级石磨原茶，坚持少糖健康配方与多重熟化工序，为您缔造富有自然深韵的甜点佳作。
        </p>
      </div>

      {/* 2. FILTER & SORT TOOLBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-20">
        
        {/* Left Side: Desktop Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-6 hidden lg:block" id="products-sidebar">
          <div className="p-6 bg-[#FAF5EF]/40 backdrop-blur-lg rounded-2xl border border-[#2F5233]/5 space-y-6">
            <h3 className="font-serif text-base font-bold text-[#1E3821] tracking-widest border-b border-[#2F5233]/15 pb-2">
              甜系分类 <span className="text-xs text-[#C5A880] uppercase font-mono tracking-wider ml-1">/ Menu</span>
            </h3>
            
            <nav className="flex flex-col space-y-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#2F5233] text-white font-semibold shadow-md' 
                        : 'text-[#2C312E]/70 hover:bg-[#2F5233]/5 hover:text-[#2F5233]'
                    }`}
                  >
                    <span className="tracking-widest">{cat.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-[#2F5233]/5 text-[#2F5233]/60'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6 bg-[#2F5233]/3 border border-[#2F5233]/10 backdrop-blur-md rounded-2xl space-y-4">
            <h4 className="font-serif font-bold text-sm text-[#1E3821] tracking-wider">🛎️ 堂食定制提示</h4>
            <p className="text-xs text-[#2C312E]/60 leading-relaxed font-light">
              部分千层蛋糕和特浓手打茶需要现做，堂食需要等待约5-10分钟。为了极佳的冰凉风理，茶席甜点建议15分钟内享用完毕。
            </p>
          </div>
        </div>

        {/* Right Side: Main Search, Toolbar and Grid */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Main Search, Filter and Sort controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#FAF5EF]/30 backdrop-blur-lg p-4 rounded-xl border border-[#2F5233]/5" id="products-toolbar">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs flex items-center bg-white border border-[#2F5233]/10 rounded-lg overflow-hidden focus-within:border-[#2F5233] transition-colors">
              <Search className="w-4 h-4 text-[#2C312E]/40 absolute left-3" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索千层、松露、马卡龙..."
                className="pl-9 pr-4 py-2 border-none w-full text-sm font-sans focus:outline-none placeholder-[#2C312E]/30 text-[#2C312E]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-[#2F5233]/15 text-[#2C312E]/50 rounded-full mr-2"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Category Horizontal Scrolling Selection */}
            <div className="flex lg:hidden overflow-x-auto w-full max-w-md py-1 no-scrollbar space-x-2 border-t border-[#2F5233]/5 sm:border-t-0 pt-3 sm:pt-0">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 whitespace-nowrap transition-colors ${
                      isActive 
                        ? 'bg-[#2F5233] text-white font-semibold' 
                        : 'bg-[#2F5233]/5 text-[#2C312E]/70'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <span className="text-xs text-[#2C312E]/50 font-medium whitespace-nowrap flex items-center">
                <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
                排序：
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-white text-[#2C312E] py-2 px-3 border border-[#2F5233]/10 rounded-lg outline-none cursor-pointer focus:border-[#2F5233]"
              >
                <option value="default">默认推荐顺序</option>
                <option value="price-low">价格：由低到高 ￥</option>
                <option value="price-high">价格：由高到低 ￥</option>
                <option value="rating">好评率推荐 ★</option>
              </select>
            </div>
          </div>

          {/* 3. PRODUCT GRID */}
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            id="product-grid"
          >
            <AnimatePresence mode="popLayout">
              {processedProducts.length > 0 ? (
                processedProducts.map((product) => {
                  const isLiked = !!likedItems[product.id];
                  const animateAdded = addedAnimationId === product.id;
                  
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ 
                        y: -8,
                        rotateX: 4,
                        rotateY: -4,
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                      transition={{ duration: 0.4 }}
                      key={product.id}
                      onClick={() => handleOpenDetail(product)}
                      className="group bg-white/45 backdrop-blur-md rounded-2xl border border-[#2F5233]/5 shadow-sm hover:shadow-lg hover:border-[#2F5233]/10 hover:bg-white/70 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                      id={`product-card-${product.id}`}
                    >
                      {/* Product Image Frame */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2D4530]/5">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700 select-none animate-fade-in"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="absolute top-3 left-3 flex flex-col space-y-1.5">
                          {product.isNew && (
                            <span className="bg-[#C5A880] text-[#1E3821] text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded">
                              NEW / 新品
                            </span>
                          )}
                          {product.isPopular && (
                            <span className="bg-[#2F5233] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded">
                              HOT / 爆款
                            </span>
                          )}
                        </div>

                        {/* Favorite Like Button */}
                        <button
                          onClick={(e) => toggleLike(product.id, e)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                            isLiked 
                              ? 'bg-[#FCFAF7] text-[#D99B82]' 
                              : 'bg-black/20 hover:bg-black/40 text-white'
                          }`}
                          title={isLiked ? "取消收藏" : "加入收藏"}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        </button>

                        {/* Quick View Button on hover wrapper */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-[#FCFAF7] text-[#1E3821] text-xs font-semibold tracking-widest py-2 px-4 rounded-lg shadow-md flex items-center space-x-2 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <Eye className="w-4 h-4" />
                            <span>详询茶事</span>
                          </span>
                        </div>
                      </div>

                      {/* Content Description */}
                      <div className="p-5 flex-grow flex flex-col justify-between space-y-3.5 text-left">
                        <div className="space-y-1.5">
                          <p className="text-[10px] uppercase text-[#C5A880] font-bold tracking-wider font-mono">
                            {product.englishName}
                          </p>
                          <h3 className="font-serif font-bold text-lg text-[#1E3821]">
                            {product.name}
                          </h3>
                          <p className="text-xs text-[#2C312E]/60 leading-relaxed line-clamp-2 min-h-[2rem]">
                            {product.description}
                          </p>
                        </div>

                        {/* Footer details */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-[#2F5233]/5">
                          <div>
                            <span className="text-[#2F5233] font-serif font-semibold text-xl">￥{product.price}</span>
                            <span className="text-[10px] text-[#2C312E]/40 ml-2 font-light">堂食含配茶</span>
                          </div>

                          {/* Quick Purchase button */}
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            className={`p-2 transition-all duration-300 ${
                              animateAdded 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-[#2F5233] hover:bg-[#1E3821] text-white shadow-md hover:shadow-lg'
                            }`}
                            id={`add-to-cart-${product.id}`}
                            title="立即加入购物车"
                          >
                            {animateAdded ? (
                              <Check className="w-4 h-4 animate-scale-up" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center space-y-4" id="products-empty-state">
                  <p className="text-4xl">🍵</p>
                  <p className="text-[#2C312E]/60 text-sm font-light">
                    “春竹未笋，秋菊未实”，没有找到符合搜索或分类的甜点。
                  </p>
                  <button 
                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                    className="text-xs font-bold text-[#2F5233] underline hover:text-[#1E3821]"
                  >
                    重置筛选
                  </button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>

      {/* 4. PRODUCT DETAIL MODAL with Interactive 3D Card Zoom & Flip */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="product-detail-modal">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-[#1E3821]/50 backdrop-blur-md"
            />

            {/* Close Button (Outside the flipping card, fixed for easy clicking) */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-[#FCFAF7]/20 hover:bg-[#2F5233]/20 hover:text-[#1E3821] text-[#FCFAF7] transition-all duration-300 shadow-lg border border-white/10 hover:scale-105 active:scale-95"
              id="close-modal-btn"
              title="关闭详情"
            >
              <X className="w-5.5 h-5.5" />
            </button>

            {/* Modal 3D Card Container Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.3, rotateY: 360, rotateX: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotateY: 360, rotateX: 15 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.75 }}
              className="relative z-10 w-full max-w-[92vw] sm:max-w-md md:max-w-[480px] h-[650px] max-h-[85vh] flex items-center justify-center pointer-events-auto [perspective:1500px]"
            >
              {/* Inner flippable container */}
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-full duration-500"
              >
                {/* 1. FRONT SIDE OF THE CARD */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl bg-[#FCFAF7]/80 backdrop-blur-lg border-2 border-[#2F5233]/15 shadow-2xl flex flex-col justify-between p-5"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  {/* Photo Frame */}
                  <div className="relative h-[68%] rounded-xl overflow-hidden bg-[#2D4530]/5 border border-[#2F5233]/10 shadow-inner group/art">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                    />
                    {/* Holo shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover/art:translate-x-[100%] transition-transform duration-1000 ease-out" />
                    
                    {/* Category Overlay Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-1">
                      <span className="bg-[#1E3821]/90 backdrop-blur-md text-[#C5A880] text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                        {selectedProduct.category === 'matcha' ? '宇治特浓' : selectedProduct.category === 'classic' ? '焙香盛作' : selectedProduct.category === 'seasonal' ? '西湖限定' : '手作石磨'}
                      </span>
                      {selectedProduct.isNew && (
                        <span className="bg-[#C5A880] text-[#1E3821] text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                          NEW / 新品
                        </span>
                      )}
                    </div>

                    {/* Star Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-white flex items-center space-x-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{selectedProduct.rating}</span>
                    </div>
                  </div>

                  {/* Front card info */}
                  <div className="flex-1 flex flex-col justify-between pt-4 pb-1 text-left">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-serif font-black text-xl text-[#1E3821] tracking-wide truncate max-w-[70%]">
                          {selectedProduct.name}
                        </h4>
                        <span className="font-serif font-bold text-xl text-[#2F5233]">￥{selectedProduct.price}</span>
                      </div>
                      <p className="text-[10px] uppercase font-mono text-[#C5A880] tracking-widest leading-none mt-1">
                        {selectedProduct.englishName}
                      </p>
                      <p className="text-xs text-[#2C312E]/60 line-clamp-2 leading-relaxed font-light mt-2.5 font-sans">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Quick Flip Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(true);
                      }}
                      className="w-full mt-3.5 py-3.5 bg-[#2F5233]/5 hover:bg-[#2F5233] hover:text-[#FCFAF7] text-[#2F5233] text-xs font-serif font-bold tracking-widest uppercase rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 border border-[#2F5233]/15 active:scale-[0.98]"
                      title="翻转卡片，详阅主厨风味说帖"
                    >
                      <span>风味鉴赏讲义 (3D 翻转) ➔</span>
                    </button>
                  </div>
                </div>

                {/* 2. BACK SIDE OF THE CARD */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl bg-[#FAF5EF]/80 backdrop-blur-lg border-2 border-[#2F5233]/15 shadow-2xl flex flex-col justify-between p-6 z-20"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    WebkitTransform: 'rotateY(180deg)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="space-y-4 flex-1 flex flex-col min-h-0 text-left">
                    <div className="flex items-center justify-between border-b border-[#2F5233]/10 pb-3 flex-shrink-0">
                      <div>
                        <span className="text-[9px] uppercase font-mono text-[#C5A880] tracking-widest font-black">THE ARTISAN CREDO / 极致手作</span>
                        <h4 className="font-serif font-black text-base text-[#1E3821] mt-0.5">风味鉴赏说帖</h4>
                      </div>
                      <div className="px-2.5 py-0.5 bg-[#2F5233]/5 border border-[#2F5233]/20 text-[#2F5233] text-[9px] font-mono tracking-widest rounded-md">
                        丸久小山园特供
                      </div>
                    </div>

                    {/* Profile & Narrative story */}
                    <div className="space-y-3.5 overflow-y-auto pr-1 text-left flex-1 min-h-0 scrollbar-thin scrollbar-thumb-[#2F5233]/20">
                      <div className="space-y-1">
                        <p className="text-sm font-serif font-black text-[#1E3821]">{selectedProduct.name}</p>
                        <p className="text-[9px] font-mono uppercase text-[#C5A880] tracking-wider">{selectedProduct.englishName}</p>
                      </div>
                      
                      <p className="text-xs text-[#2C312E]/80 leading-relaxed font-sans font-light">
                        {selectedProduct.detailDescription || selectedProduct.description}
                      </p>

                      {/* Pairing recommendation box */}
                      <div className="p-3 bg-white border border-[#2F5233]/5 rounded-xl space-y-1">
                        <p className="text-[9px] font-mono text-[#C5A880] font-black tracking-widest flex items-center">🍵 主厨茶席搭配建议 / PAIRING</p>
                        <p className="text-[11px] text-[#2F5233] font-light leading-relaxed">
                          建议搭配本号「古德金标玄米茶」或手击「宇治精工手作浓茶」，在一呼一吸、苦热与冰爽间达成完美平衡。
                        </p>
                      </div>
                    </div>

                    {/* Ingredients detail */}
                    {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 && (
                      <div className="space-y-1.5 flex-shrink-0 text-left">
                        <h5 className="text-[9px] font-mono text-[#C5A880] tracking-widest font-black uppercase">手选工坊配方 / INGREDIENTS</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProduct.ingredients.map((ing, k) => (
                            <span key={k} className="text-[10px] bg-[#2F5233]/5 text-[#2F5233] py-1 px-2.5 rounded-md border border-[#2F5233]/5 font-light">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-4 border-t border-[#2F5233]/15 space-y-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-[#2C312E]/40 font-mono block">堂食尊享茶宴价</span>
                        <span className="text-xl font-serif font-bold text-[#2F5233]">￥{selectedProduct.price}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          handleAddToCart(selectedProduct, e);
                        }}
                        className={`px-5 py-3 rounded-xl font-sans font-semibold text-xs text-white shadow-md flex items-center space-x-1.5 transition-all duration-300 active:scale-95 ${
                          addedAnimationId === selectedProduct.id 
                            ? 'bg-emerald-600' 
                            : 'bg-[#2F5233] hover:bg-[#1E3821]'
                        }`}
                      >
                        {addedAnimationId === selectedProduct.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 animate-scale-up" />
                            <span>已加购</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>立即加入茶宴</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Flip Back tab */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
                      }}
                      className="w-full py-2 bg-transparent hover:bg-[#2F5233]/5 text-[#2F5233]/60 hover:text-[#2F5233] text-[9px] font-mono tracking-widest uppercase rounded-lg flex items-center justify-center space-x-1.5 transition-all duration-300 border border-[#2F5233]/10"
                      title="返回查看茶点写真"
                    >
                      <span>🔄 返回查看茶品写真</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
    </div>
  );
}
