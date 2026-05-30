import React, { useState } from 'react';
import { Calendar, Users, Phone, MapPin, Clock, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Booking } from '../types';
import { COURSES } from '../data';
import { motion, AnimatePresence } from 'motion/react';

const COURSE_SLATS_INFO: Record<string, string[]> = {
  'c-tea': [
    "🍵 上等石磨 · 经典手作击拂",
    "⏳ 暖茶雅席 · 约150分钟体验",
    "🌸 甜品风味 · 特选主厨佐茶菓子",
    "🎁 伴手好礼 · 专属礼包带回"
  ],
  'c-baking': [
    "🍰 匠心打制 · 21层极薄千层法",
    "⏳ 修艺时段 · 约180分钟慢作",
    "🧑‍🍳 奶油抹匀 · 慕斯抹刀艺术",
    "🎁 手工赠礼 · 专属高级匠人围裙"
  ],
  'c-canele': [
    "🍯 熟化法宝 · 24h低温慢熟面糊",
    "⏳ 烘焙修行 · 约140分钟技巧",
    "🔥 极速出炉 · 亲炙6枚装经典茶礼",
    "☕ 尊享歇息 · 西湖桂雨下午茶会"
  ]
};

interface BookingViewProps {
  onAddBooking: (booking: Booking) => void;
  userPhone: string;
  userName: string;
}

export default function BookingView({ onAddBooking, userPhone, userName }: BookingViewProps) {
  const [formData, setFormData] = useState({
    name: userName,
    phone: userPhone,
    courseId: COURSES[0].id,
    date: '',
    timeSlot: '14:00 - 16:30',
    guestsCount: 2,
    notes: '',
  });

  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);

  const [bookingResult, setBookingResult] = useState<Booking | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedCourse = COURSES.find(c => c.id === formData.courseId) || COURSES[0];

  const timeSlots = [
    { label: '上午暖茶席 09:30 - 12:00', value: '09:30 - 12:00' },
    { label: '下午松林席 14:00 - 16:30', value: '14:00 - 16:30' },
    { label: '傍晚余韵席 17:30 - 20:00', value: '17:30 - 20:00' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.date) {
      setErrorMsg('请完整填写预约人姓名、联系电话和体验日期。');
      return;
    }

    const newBooking: Booking = {
      id: `b-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      phone: formData.phone,
      courseType: selectedCourse.title,
      date: formData.date,
      timeSlot: formData.timeSlot,
      guestsCount: formData.guestsCount,
      notes: formData.notes,
      status: 'pending',
      bookingTime: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    onAddBooking(newBooking);
    setBookingResult(newBooking);
    setErrorMsg('');
  };

  const resetFormAndBooking = () => {
    setBookingResult(null);
    setFormData({
      name: userName,
      phone: userPhone,
      courseId: COURSES[0].id,
      date: '',
      timeSlot: '14:00 - 16:30',
      guestsCount: 2,
      notes: '',
    });
  };

  return (
    <div className="w-full bg-[#F6F0EA] min-h-screen relative overflow-hidden" id="booking-outer-wrapper">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-left space-y-12 shrink-0 relative z-10" id="booking-view">
      
      {/* 1. HEADER SECTION */}
      <div className="text-center md:text-left space-y-3">
        <p className="text-xs text-[#C5A880] tracking-widest uppercase font-semibold font-mono">HANDICRAFT EXPERIENCE</p>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1E3821]">工坊手作课预约</h1>
        <p className="text-sm text-[#2C312E]/60 max-w-xl font-light leading-relaxed">
          不疾不徐，听风筅茶。我们在龙井茶山下为您准备了全套茶具、珍席及古法千层授课。
        </p>
      </div>

      {/* 2. CHOOSE COURSE TIMELINE SHOWCASE */}
      <section className="space-y-6" id="booking-courses">
        <h3 className="font-serif text-lg font-bold text-[#1E3821] tracking-widest flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-[#C5A880]" />
          <span>本期手作特色体验项目 / Projects</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.map((course) => {
            const isSelected = formData.courseId === course.id;
            const isFlipped = isSelected || hoveredCourseId === course.id;
            const slats = COURSE_SLATS_INFO[course.id] || [];

            return (
              <motion.div 
                key={course.id}
                onClick={() => setFormData(prev => ({ ...prev, courseId: course.id }))}
                onMouseEnter={() => setHoveredCourseId(course.id)}
                onMouseLeave={() => setHoveredCourseId(null)}
                initial={{ scale: 1, y: 0 }}
                animate={{ 
                  scale: isSelected ? 1.05 : 1, 
                  y: isSelected ? -6 : 0,
                  boxShadow: isSelected 
                    ? "0 20px 25px -5px rgba(47, 82, 51, 0.15), 0 8px 10px -6px rgba(47, 82, 51, 0.15)" 
                    : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  borderColor: isSelected ? "#2F5233" : "rgba(47, 82, 51, 0.05)"
                }}
                whileHover={{ 
                  scale: isSelected ? 1.07 : 1.03,
                  y: isSelected ? -8 : -4,
                  boxShadow: "0 20px 25px -5px rgba(47, 82, 51, 0.2), 0 8px 10px -6px rgba(47, 82, 51, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className={`group cursor-pointer rounded-2xl border p-5 flex flex-col justify-between relative transition-colors duration-300 ${
                  isSelected 
                    ? 'bg-[#FAF5EF]' 
                    : 'bg-white'
                }`}
                style={{ zIndex: isSelected ? 10 : 1 }}
                id={`course-card-${course.id}`}
              >
                {/* Course Image / 3D Shutter Blinds */}
                <div className="space-y-4">
                  <div className="aspect-video w-full rounded-lg overflow-hidden relative" style={{ perspective: '1200px' }}>
                    {/* Venetian Shutter/Blinds Slats Container */}
                    <div className="absolute inset-0 flex flex-col w-full h-full">
                      {Array.from({ length: 4 }).map((_, idx) => {
                        return (
                          <div 
                            key={idx}
                            className="relative w-full h-1/4"
                            style={{ 
                              perspective: '1000px', 
                              transformStyle: 'preserve-3d' 
                            }}
                          >
                            <div 
                              className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                              style={{
                                transformStyle: 'preserve-3d',
                                transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
                                transitionDelay: `${idx * 70}ms`
                              }}
                            >
                              {/* Slatted Front Face - Image slice */}
                              <div 
                                className="absolute inset-0 w-full h-full overflow-hidden"
                                style={{
                                  backfaceVisibility: 'hidden',
                                  WebkitBackfaceVisibility: 'hidden',
                                }}
                              >
                                <img 
                                  src={course.image} 
                                  alt={course.title}
                                  className="absolute w-full h-[400%] object-cover max-w-none"
                                  style={{
                                    top: `-${idx * 100}%`,
                                    left: 0,
                                  }}
                                  referrerPolicy="no-referrer"
                                />
                                {idx < 3 && (
                                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1E3821]/15 mix-blend-multiply z-10" />
                                )}
                              </div>

                              {/* Slatted Back Face - Detailed course item slide */}
                              <div 
                                className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1E3821] to-[#244228] flex items-center justify-center px-2 select-none border-y border-[#C5A880]/15"
                                style={{
                                  backfaceVisibility: 'hidden',
                                  WebkitBackfaceVisibility: 'hidden',
                                  transform: 'rotateX(180deg)',
                                }}
                              >
                                <div className="flex items-center space-x-1.5 md:space-x-2 text-[10px] md:text-sm text-[#FAF6F0]/90 tracking-wider font-serif">
                                  <span className="text-[#C5A880] text-[9px] font-mono font-bold opacity-80">0{idx + 1}</span>
                                  <span className="h-1 w-1 bg-[#C5A880] rounded-full opacity-60"></span>
                                  <span className="font-medium truncate max-w-[210px]">{slats[idx]}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Floating Duration fades out cleanly during flip */}
                    <AnimatePresence>
                      {!isFlipped && (
                        <motion.span 
                          initial={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute bottom-2 right-2 bg-black/60 text-white font-mono text-[9px] px-2 py-0.5 rounded tracking-widest z-20 pointer-events-none"
                        >
                          {course.duration}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <p className="text-[#C5A880] text-[10px] font-mono tracking-widest uppercase font-semibold">{course.difficulty}</p>
                    <h4 className="font-serif font-bold text-[#1E3821] text-base group-hover:text-[#2F5233] transition-colors line-clamp-1">{course.title}</h4>
                    <p className="text-xs text-[#2C312E]/60 leading-relaxed font-light line-clamp-2">{course.subtitle}</p>
                  </div>
                </div>

                {/* Course parameters */}
                <div className="mt-5 pt-3.5 border-t border-[#2F5233]/5 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#2F5233]">￥{course.price}</span>
                    <span className="text-[9px] text-[#2C312E]/40 ml-1">/人</span>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase transition-colors ${
                    isSelected 
                      ? 'bg-[#2F5233] text-white' 
                      : 'bg-[#2F5233]/5 text-[#2F5233] group-hover:bg-[#2F5233]/15'
                  }`}>
                    {isSelected ? '已选择此项目' : `剩 ${course.spotsLeft} 席位`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. COLUMNS WORKSPACE: FORM + STORE INFO CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="booking-workspace">
        
        {/* Reservation Form */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 border border-[#2F5233]/5 shadow-sm space-y-6">
          <h3 className="font-serif text-xl font-bold text-[#1E3821] tracking-wide border-b border-[#2F5233]/10 pb-3">
            修艺席预约申请表 <span className="text-xs uppercase font-mono text-[#C5A880] tracking-wider ml-1">/ Reservation Sheet</span>
          </h3>

          <AnimatePresence mode="wait">
            {!bookingResult ? (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6 font-sans text-left"
                id="booking-form"
              >
                {/* Form fields grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Class selection display (Locked/Sync) */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-[#2C2F2D]/70 tracking-widest">已选择体验课：</label>
                    <div className="p-3 bg-[#FAF5EF] rounded-lg border border-[#2F5233]/10 font-serif text-sm font-bold text-[#1E3821]">
                      {selectedCourse.title} (￥{selectedCourse.price}/人)
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C2F2D]/70 tracking-widest">预约席姓名 / Name：</label>
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="如何称呼您"
                      className="w-full py-2.5 px-3.5 bg-white border border-[#2F5233]/15 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
                    />
                  </div>

                  {/* Contact phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C2F2D]/70 tracking-widest">联系电话 / Cell-Phone：</label>
                    <input 
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="用于接收核销码短讯"
                      className="w-full py-2.5 px-3.5 bg-white border border-[#2F5233]/15 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
                    />
                  </div>

                  {/* Booking Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C2F2D]/70 tracking-widest">体验日期 / Date：</label>
                    <div className="relative">
                      <input 
                        type="date"
                        required
                        value={formData.date}
                        min={new Date().toISOString().substring(0, 10)}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full py-2.5 px-3.5 bg-white border border-[#2F5233]/15 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
                      />
                    </div>
                  </div>

                  {/* Time slot picker */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C2F2D]/70 tracking-widest">体验时间段 / Sessions：</label>
                    <select 
                      value={formData.timeSlot}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
                      className="w-full py-2.5 px-3.5 bg-white border border-[#2F5233]/15 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
                    >
                      {timeSlots.map((ts, i) => (
                        <option key={i} value={ts.value}>{ts.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sspots/Guests quantity */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C2F2D]/70 tracking-widest">预约人数 / Seats (最高6人)：</label>
                    <div className="flex items-center space-x-3">
                      <button 
                        type="button"
                        disabled={formData.guestsCount <= 1}
                        onClick={() => setFormData(prev => ({ ...prev, guestsCount: prev.guestsCount - 1 }))}
                        className="w-10 h-10 border border-[#2F5233]/15 rounded-lg flex items-center justify-center hover:bg-[#2F5233]/5 text-[#2C212E] disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-[#1E3821] font-mono text-base">{formData.guestsCount} 人</span>
                      <button 
                        type="button"
                        disabled={formData.guestsCount >= 6}
                        onClick={() => setFormData(prev => ({ ...prev, guestsCount: prev.guestsCount + 1 }))}
                        className="w-10 h-10 border border-[#2F5233]/15 rounded-lg flex items-center justify-center hover:bg-[#2F5233]/5 text-[#2C212E] disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total price calculation warning */}
                  <div className="bg-[#FAF5EF] p-4 rounded-xl border border-[#C5A880]/20 flex items-center space-x-3 text-left">
                    <Users className="w-8 h-8 text-[#C5A880] shrink-0" />
                    <div>
                      <p className="text-[#1E3821] text-xs font-semibold">预计实付金额</p>
                      <p className="text-lg font-bold text-[#2F5233]">￥{selectedCourse.price * formData.guestsCount} (含定制茶食套餐)</p>
                    </div>
                  </div>

                  {/* Special Remarks */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-[#2C2F2D]/70 tracking-widest">特别备注需求 / Notes：</label>
                    <textarea 
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="如有花粉过敏、饮食偏好或需要特定茶器请提前说明..."
                      rows={3}
                      className="w-full py-2.5 px-3.5 bg-white border border-[#2F5233]/15 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E] resize-none"
                    ></textarea>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#2F5233] hover:bg-[#1E3821] text-[#FCFAF7] font-semibold text-sm tracking-widest rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                  id="submit-booking-btn"
                >
                  <Calendar className="w-4.5 h-4.5" />
                  <span>立即递交席位申请 (全额优惠保证)</span>
                </button>
              </motion.form>
            ) : (
              /* Bamboo Confirmation Slide receipt and slip */
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-[#FAF5EF] border-2 border-dashed border-[#C5A880] rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden text-left font-serif"
                id="booking-success-slip"
              >
                {/* Visual Bamboo Seal */}
                <div className="absolute top-4 right-4 w-20 h-20 border-4 border-emerald-600/30 rounded-full flex items-center justify-center text-emerald-600/30 transform rotate-12 font-bold select-none text-xs tracking-widest">
                  翠心修艺帖
                </div>

                <div className="text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-[#2F5233] mx-auto" />
                  <h4 className="text-[#2F5233] text-xl font-bold tracking-widest">修艺席预约成功</h4>
                  <p className="text-xs text-[#2C312E]/40 font-mono">BOOKING RECEIPT CERTIFIED</p>
                </div>

                <div className="w-full h-px border-t border-dashed border-[#C5A880]/50 my-4"></div>

                <div className="space-y-4 font-sans text-xs md:text-sm text-[#2C312E]/80">
                  <div className="flex justify-between">
                    <span className="text-[#2C312E]/50 tracking-widest">修习帖编号：</span>
                    <span className="font-mono font-bold text-[#1E3821]">{bookingResult.id} (到店凭证)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2C312E]/50 tracking-widest">主修科目：</span>
                    <span className="font-serif font-bold text-[#1E3821]">{bookingResult.courseType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2C312E]/50 tracking-widest">预约名册：</span>
                    <span className="font-bold text-[#1E3821]">{bookingResult.name} ({bookingResult.guestsCount}人席)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2C312E]/50 tracking-widest">修习会日期：</span>
                    <span className="font-semibold text-[#1E3821]">{bookingResult.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2C312E]/50 tracking-widest">修习会时段：</span>
                    <span className="font-mono text-[#1E3821]">{bookingResult.timeSlot}</span>
                  </div>
                  {bookingResult.notes && (
                    <div className="p-3 bg-white/70 rounded-lg border border-[#2F5233]/5 text-xs">
                      <p className="text-[#2C312E]/40 font-semibold mb-1">特别附注：</p>
                      <p className="font-light">{bookingResult.notes}</p>
                    </div>
                  )}
                </div>

                <div className="w-full h-px border-t border-dashed border-[#C5A880]/50 my-4"></div>

                <div className="p-4 bg-[#2F5233]/5 rounded-xl text-xs space-y-1.5 leading-relaxed text-[#2C312E]/70 font-sans">
                  <p className="font-bold text-[#1E3821] flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 text-[#C5A880] mr-1.5" />
                    茶会须知：
                  </p>
                  <p className="font-light">1. 预约码短讯已同步发送至您的手机 {bookingResult.phone}，请截屏该修义帖至手机保存。</p>
                  <p className="font-light">2. 请提前10分钟到店，方便茶艺师为您提前烫洗茶碗，备齐材料。</p>
                  <p className="font-light">3. 茶会预约如需变更或退款，请提前至少24小时拨打电话。会员等级积分已在审核中锁定。</p>
                </div>

                <button
                  type="button"
                  onClick={resetFormAndBooking}
                  className="w-full py-3 bg-[#FAF5EF] border border-[#2F5233]/30 text-[#2F5233] hover:bg-[#2F5233]/5 font-sans font-semibold text-xs tracking-widest rounded-xl transition-all"
                  id="make-another-booking-btn"
                >
                  继续预订其它手作课程
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Store Detail Columns Side Info */}
        <div className="lg:col-span-4 space-y-6" id="booking-sidebar">
          
          {/* Store detailed addresses and phone */}
          <div className="p-6 bg-[#FAF5EF] rounded-2xl border border-[#2F5233]/5 space-y-6 text-left">
            <h4 className="font-serif font-bold text-base text-[#1E3821] tracking-widest border-b border-[#2F5233]/15 pb-2">
              「翠心」满陇精舍二馆
            </h4>
            
            <ul className="space-y-4 text-xs md:text-sm font-sans">
              <li className="flex items-start space-x-3 text-[#2C312E]/80">
                <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  浙江省杭州市西湖区满觉陇路翠竹精舍 8 号地下1楼 (龙井山庄南侧200米)
                </span>
              </li>
              <li className="flex items-center space-x-3 text-[#2C312E]/80">
                <Phone className="w-4.5 h-4.5 text-[#C5A880] shrink-0" />
                <span>+86 (571) 8802-9912</span>
              </li>
              <li className="flex items-start space-x-3 text-[#2C312E]/80">
                <Clock className="w-4.5 h-4.5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">日常研学时间：</p>
                  <p className="text-xs text-[#2C312E]/55 mt-0.5 font-light">
                    堂食接待：10:00 - 21:30<br />
                    手作研课：09:30 - 20:30 (分时段进行)
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Graphical Map Illustration (High Fidelity) */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#2F5233]/15 bg-white shadow-sm flex items-center justify-center p-4">
            
            {/* Styled Map Illustration */}
            <div className="absolute inset-0 bg-[#F7F4EB] p-6 flex flex-col justify-between text-left select-none pointer-events-none">
              <span className="text-[10px] text-[#2F5233]/40 font-mono tracking-widest uppercase">MAPPING SCHEMES</span>
              
              {/* Artistic representation of West Lake & mountains */}
              <div className="relative flex-grow flex items-center justify-center">
                
                {/* Hills lines */}
                <div className="absolute top-[20%] left-[10%] w-24 h-12 rounded-full border border-[#2F5233]/10 bg-[#2F5233]/5 flex items-center justify-center text-[10px] font-serif text-[#2F5233]/40">西湖・蘇堤 (3km)</div>
                <div className="absolute top-[50%] right-[10%] w-28 h-12 rounded-full border border-yellow-800/10 bg-yellow-800/5 flex items-center justify-center text-[10px] font-serif text-[#C5A880]">满觉陇桂雨茶山</div>
                
                {/* Connecting roads */}
                <svg className="absolute inset-0 w-full h-full stroke-[#C5A880]/30 stroke-2 fill-none stroke-dasharray-[4,4]">
                  <path d="M 20,40 Q 120,80 140,160 T 260,190" />
                  <path d="M 240,10 Q 150,110 140,160" />
                </svg>

                {/* Target Landmark pin indicator */}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="absolute -top-1 w-5 h-5 rounded-full bg-[#2F5233]/20 animate-ping"></span>
                  <div className="w-4 h-4 bg-[#2F5233] rounded-full border-2 border-white shadow-md flex items-center justify-center relative">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </div>
                  <span className="mt-1 bg-[#1E3821] text-[#FCFAF7] text-[10px] py-1 px-2.5 rounded-md font-serif font-bold shadow-md tracking-wider whitespace-nowrap">
                    Urban Sanctuary (滿覺隴精舍)
                  </span>
                </div>

              </div>

              <div className="flex items-center justify-between text-[11px] text-[#2C312E]/40 font-mono tracking-tighter">
                <span>LAT: 30.2014° N</span>
                <span>LNG: 120.1265° E</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
    </div>
  );
}
