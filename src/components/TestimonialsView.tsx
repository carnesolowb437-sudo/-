import React, { useState } from 'react';
import { Sparkles, MessageSquareHeart, Check, ThumbsUp, Star, X, PlusCircle, PenTool } from 'lucide-react';
import { Review, Product } from '../types';
import { INITIAL_REVIEWS, INITIAL_PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface TestimonialsViewProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
  onLikeReview: (reviewId: string) => void;
  userName: string;
}

export default function TestimonialsView({
  reviews,
  onAddReview,
  onLikeReview,
  userName,
}: TestimonialsViewProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    author: userName,
    role: '特约茶客',
    rating: 5,
    productName: INITIAL_PRODUCTS[0].name,
    content: '',
    tagsStr: '回甘明显, 口感极佳',
  });

  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [formError, setFormError] = useState('');

  // Ratings calculation stats
  const ratingsStats = {
    average: 4.9,
    total: reviews.length + 120, // offset for realism
    distribution: [
      { stars: 5, percentage: 88 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 },
    ],
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.content.trim() || formData.content.length < 10) {
      setFormError('分享的心得字数不能少于10个字，让我们一起感知点茶意蕴。');
      return;
    }

    const newTags = formData.tagsStr
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newReview: Review = {
      id: `r-${Math.floor(1000 + Math.random() * 9000)}`,
      author: formData.author,
      role: formData.role.trim() || '特约茶友',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80', // Lin avatar sync
      rating: formData.rating,
      date: new Date().toISOString().substring(0, 10),
      content: formData.content,
      productName: formData.productName,
      tags: newTags.length > 0 ? newTags : ['茶食一味'],
      likes: 0,
      isLiked: false,
    };

    onAddReview(newReview);
    setIsFormOpen(false);
    setFormData({
      author: userName,
      role: '特约茶客',
      rating: 5,
      productName: INITIAL_PRODUCTS[0].name,
      content: '',
      tagsStr: '回甘明显, 口感五星',
    });
    setFormError('');
  };

  return (
    <div className="w-full bg-[#F3F7F4]/30 backdrop-blur-md min-h-screen relative overflow-hidden" id="testimonials-outer-wrapper">
      {/* Subtle light-green dot grid pattern decoration */}
      <style>{`
        @keyframes dynamicDotsTestimonials {
          0% {
            background-size: 24px 24px;
            opacity: 0.12;
          }
          50% {
            background-size: 34px 34px;
            opacity: 0.22;
          }
          100% {
            background-size: 24px 24px;
            opacity: 0.12;
          }
        }
        .anim-dynamic-dots-testimonials {
          animation: dynamicDotsTestimonials 10s ease-in-out infinite;
        }
      `}</style>
      <div 
        className="absolute inset-0 pointer-events-none z-0 anim-dynamic-dots-testimonials" 
        style={{
          backgroundImage: 'radial-gradient(#2F5233 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px'
        }}
        id="testimonials-bg-dots"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-left space-y-12 shrink-0 relative z-10" id="testimonials-view">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div className="space-y-3">
          <p className="text-xs text-[#C5A880] tracking-widest uppercase font-semibold font-mono">CLIENT REVIEWS</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1E3821]">食客评书 & 心得</h1>
          <p className="text-sm text-[#2C312E]/60 max-w-xl font-light leading-relaxed">
            听听茶友们一茶一菓间的侘寂体悟。我们珍惜每一份最挑剔的批注与回甘。
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-3.5 bg-[#2F5233] hover:bg-[#1E3821] text-white font-semibold text-xs tracking-widest rounded-xl shadow-md transition-all flex items-center space-x-2"
          id="share-review-trigger"
        >
          <PenTool className="w-4 h-4" />
          <span>分享我的茶事心得</span>
        </button>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF5EF]/60 p-6 md:p-8 rounded-3xl border border-[#2F5233]/5" id="testimonials-stats">
        
        {/* Left Stats Circle */}
        <div className="lg:col-span-4 text-center space-y-2 border-r border-[#2F5233]/15 lg:py-6 pr-0 lg:pr-8">
          <p className="text-xs text-[#2C312E]/50 font-medium tracking-wider">综合好评率大赏</p>
          <p className="font-serif text-5xl md:text-6xl font-black text-[#2F5233]">4.9</p>
          
          <div className="flex justify-center text-amber-500 scale-110 py-1.5 font-bold">
            {'★★★★★'.split('').map((char, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          <p className="text-xs text-[#2C312E]/40 font-light">
            基于 {ratingsStats.total} 位特约茶客真实盲盒品鉴统计
          </p>
        </div>

        {/* Right Bars Distribution */}
        <div className="lg:col-span-8 space-y-3 text-left pl-0 lg:pl-8">
          {ratingsStats.distribution.map((d) => (
            <div key={d.stars} className="flex items-center space-x-4 text-xs">
              <span className="w-8 font-mono text-[#2C312E]/60 font-medium select-none">{d.stars} 星</span>
              <div className="flex-grow h-2 bg-stone-200/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#C5A880] rounded-full transition-all duration-1000" 
                  style={{ width: `${d.percentage}%` }}
                />
              </div>
              <span className="w-12 text-right font-mono text-[#2C312E]/55 font-bold">{d.percentage}%</span>
            </div>
          ))}
        </div>

      </section>

      {/* 3. MASONRY COLLUMNS GRID LIST */}
      <section className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6" id="testimonials-masonry">
        {reviews.map((review) => {
          return (
            <div
              key={review.id}
              className="break-inside-avoid bg-white p-6 rounded-2xl border border-[#2F5233]/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
              id={`review-card-${review.id}`}
            >
              {/* Header profile */}
              <div className="flex items-center space-x-3 text-left">
                <img 
                  src={review.avatar} 
                  alt={review.author} 
                  className="w-10 h-10 rounded-full object-cover border border-[#2F5233]/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif font-bold text-[#1E3821] text-sm leading-tight">{review.author}</h4>
                  <p className="text-[10px] text-[#C5A880] mt-0.5 font-light leading-none">{review.role || '特约茶客'}</p>
                </div>
              </div>

              {/* Review Ratings Stars */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${
                      i < review.rating 
                        ? 'text-amber-500 fill-current' 
                        : 'text-stone-200'
                    }`} 
                  />
                ))}
                <span className="text-[10px] text-[#2C312E]/40 font-mono ml-2">品鉴型号：{review.productName || '当日时令茶点'}</span>
              </div>

              {/* Content narrative */}
              <p className="text-xs md:text-sm text-[#2C312E]/75 leading-relaxed font-sans font-light select-none text-left">
                {review.content}
              </p>

              {/* Tag Badges */}
              {review.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {review.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] bg-[#2F5233]/5 text-[#2F5233]/70 font-semibold px-2 py-0.5 rounded">
                      # {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer actions / Likes button */}
              <div className="pt-3 border-t border-[#2F5233]/5 flex items-center justify-between text-[#2C312E]/40 text-xs">
                <span className="font-mono text-[10px]">{review.date}</span>
                
                <button
                  onClick={() => onLikeReview(review.id)}
                  className={`flex items-center space-x-1.5 transition-all py-1 px-2.5 rounded-full ${
                    review.isLiked 
                      ? 'bg-[#FAF5EF] text-[#2F5233] font-bold border border-[#2F5233]/15' 
                      : 'hover:bg-[#2F5233]/5 hover:text-[#2F5233]'
                  }`}
                  title="点赞同感"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${review.isLiked ? 'fill-current' : ''}`} />
                  <span className="font-mono">{review.likes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* 4. SUBMIT REVIEW DIALOG MODAL */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="review-modal">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative bg-[#FCFAF7] rounded-3xl max-w-xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh] z-10 shadow-2xl border border-[#2F5233]/10 text-left"
            >
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#2F5233]/10 text-[#2C312E]"
                id="close-review-modal"
              >
                <X className="w-5.5 h-5.5" />
              </button>

              <div className="space-y-4 mb-6">
                <MessageSquareHeart className="w-8 h-8 text-[#C5A880]" />
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1E3821]">
                  写下您的味蕾心得 / Share Experience
                </h3>
                <p className="text-xs text-[#2C312E]/50 font-sans font-light leading-normal">
                  您对本季点茶的水雾击拂、熟培茶韵可感满意？您的诚挚体温，是本工坊调和配方的极佳批语。
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4.5 font-sans" id="testimonials-form">
                
                {/* Name & Occupation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C312E]/70">品鉴官姓名</label>
                    <input 
                      type="text" 
                      required
                      value={formData.author}
                      onChange={(e) => setFormData(p => ({ ...p, author: e.target.value }))}
                      className="w-full py-2 px-3 bg-white border border-[#2F5233]/10 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C312E]/70">生活职业或称谓 (选填)</label>
                    <input 
                      type="text" 
                      placeholder="例如：视觉宿醉者 / 宇治控"
                      value={formData.role}
                      onChange={(e) => setFormData(p => ({ ...p, role: e.target.value }))}
                      className="w-full py-2 px-3 bg-white border border-[#2F5233]/10 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
                    />
                  </div>
                </div>

                {/* Rating selection and Product select */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-[#2C312E]/70 block">点茶打星 / Stars</label>
                    <div className="flex items-center space-x-1.5">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const starNum = i + 1;
                        const isGold = hoverRating !== null ? starNum <= hoverRating : starNum <= formData.rating;
                        return (
                          <button
                            type="button"
                            key={i}
                            onMouseEnter={() => setHoverRating(starNum)}
                            onMouseLeave={() => setHoverRating(null)}
                            onClick={() => setFormData(p => ({ ...p, rating: starNum }))}
                            className="p-1 focus:outline-none"
                          >
                            <Star className={`w-6 h-6 ${isGold ? 'text-amber-500 fill-current' : 'text-stone-200'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C312E]/70">点评甜点款</label>
                    <select
                      value={formData.productName}
                      onChange={(e) => setFormData(p => ({ ...p, productName: e.target.value }))}
                      className="w-full py-2 px-3 bg-white border border-[#2F5233]/10 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
                    >
                      {INITIAL_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags input help */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2C312E]/70">时令标签印记 (用英文逗号分隔)</label>
                  <input 
                    type="text" 
                    value={formData.tagsStr}
                    onChange={(e) => setFormData(p => ({ ...p, tagsStr: e.target.value }))}
                    className="w-full py-2 px-3 bg-white border border-[#2F5233]/10 rounded-lg text-[#2C312E] text-xs focus:outline-none focus:border-[#2F5233]"
                  />
                  <p className="text-[10px] text-[#2C312E]/40 leading-normal">例如：入口即融, 宇治茶香, 低糖不腻</p>
                </div>

                {/* Content description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2C312E]/70">心得叙文 (至少10个字)</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData(p => ({ ...p, content: e.target.value }))}
                    placeholder="在这里倾注您关于抹茶微苦、甜美融合的舌尖体悟..."
                    className="w-full py-2 px-3 bg-white border border-[#2F5233]/10 rounded-lg text-sm text-[#2C312E] focus:outline-none focus:border-[#2F5233] resize-none"
                  ></textarea>
                </div>

                {formError && (
                  <p className="text-xs text-rose-600 font-semibold">{formError}</p>
                )}

                {/* Actions submit */}
                <div className="pt-4 flex items-center justify-end space-x-3.5 border-t border-[#2F5233]/5">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-[#2C312E]/60 hover:text-[#2C312E] leading-loose text-left"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#2F5233] hover:bg-[#1E3821] text-white text-xs font-bold tracking-widest rounded-lg transition-all"
                    id="submit-review-btn"
                  >
                    提交鉴定并发布
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
}
