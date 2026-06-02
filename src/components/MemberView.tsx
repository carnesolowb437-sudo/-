import React, { useState } from 'react';
import { Award, Zap, Gift, ShieldAlert, BadgePercent, QrCode, ClipboardList, CheckCircle2, Ticket, ChevronRight, Check } from 'lucide-react';
import { Booking } from '../types';
import { MOCK_USER } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface MemberViewProps {
  bookings: Booking[];
  coupons: typeof MOCK_USER.coupons;
  onUseCoupon: (id: string) => void;
  onClaimCoupon: (coupon: any) => void;
}

export default function MemberView({
  bookings,
  coupons,
  onUseCoupon,
  onClaimCoupon,
}: MemberViewProps) {
  const [activeTab, setActiveTab] = useState<'benefits' | 'coupons' | 'history' | 'bookings'>('benefits');
  const [promoCode, setPromoCode] = useState('');
  const [promoResult, setPromoResult] = useState<string | null>(null);
  const [selectedScanCoupon, setSelectedScanCoupon] = useState<any | null>(null);

  const levelProgressPercentage = Math.min(100, Math.floor((MOCK_USER.exp / MOCK_USER.nextLevelExp) * 100));

  const claimVoucherFromCode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    
    if (code === 'MATCHA10' || code === 'MATCHA2026') {
      const isExist = coupons.some(c => c.code === code);
      if (isExist) {
        setPromoResult('您已经兑换过此特邀尝鲜券了，每位会员限领一张。');
        return;
      }
      const newCoupon = {
        id: `c-${Date.now()}`,
        title: '尝鲜大礼包·10元无门槛立减券',
        desc: '兑换码专属，全场甜品或茶室通享',
        expire: '2026-08-31',
        used: false,
        code: code
      };
      onClaimCoupon(newCoupon);
      setPromoResult('兑换成功！已为您派发「10元无门槛通用立减券」，请查看“折抵优惠券”标签页。');
      setPromoCode('');
    } else if (code === 'VIPGIFT') {
      const isExist = coupons.some(c => c.code === code);
      if (isExist) {
        setPromoResult('您已领取尊享下午茶升级券，限到店核销。');
        return;
      }
      const newCoupon = {
        id: `c-vipgift`,
        title: '茶香漫步·双人下午茶全额免单券',
        desc: '金尊黄金会员奢享VIP试吃典礼专套',
        expire: '2026-12-31',
        used: false,
        code: code
      };
      onClaimCoupon(newCoupon);
      setPromoResult('黄金尊享兑换成功！全额双人下午茶体验券已收入您的卡包。');
      setPromoCode('');
    } else {
      setPromoResult('抱歉，此尊贵代币券兑换码未在茶典或画册中，请检查您的密字。');
    }

    setTimeout(() => {
      setPromoResult(null);
    }, 7000);
  };

  const handleUseCouponAction = (id: string) => {
    onUseCoupon(id);
    setSelectedScanCoupon(null);
  };

  return (
    <div className="w-full bg-[#F3F7F4]/30 backdrop-blur-md min-h-screen relative overflow-hidden" id="member-outer-wrapper">
      {/* Subtle light-green dot grid pattern decoration */}
      <style>{`
        @keyframes dynamicDotsMember {
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
        .anim-dynamic-dots-member {
          animation: dynamicDotsMember 10s ease-in-out infinite;
        }
      `}</style>
      <div 
        className="absolute inset-0 pointer-events-none z-0 anim-dynamic-dots-member" 
        style={{
          backgroundImage: 'radial-gradient(#2F5233 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px'
        }}
        id="member-bg-dots"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-left space-y-12 shrink-0 relative z-10" id="member-view">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 text-left">
          <p className="text-xs text-[#C5A880] tracking-widest uppercase font-semibold font-mono">MEMBERSHIP CLUB</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1E3821]">
            午安，{MOCK_USER.name}女士
          </h1>
          <p className="text-xs text-[#2C312E]/50 font-sans tracking-tight">
            卡号：<span className="font-mono font-medium">{MOCK_USER.cardId}</span> | 上次登录：今日 11:22
          </p>
        </div>

        {/* Dynamic points quick badge */}
        <div className="flex items-center space-x-4 bg-[#2F5233]/5 py-2.5 px-5 rounded-2xl border border-[#2F5233]/10">
          <Zap className="w-5 h-5 text-[#C5A880] shrink-0" />
          <div className="text-left">
            <p className="text-[10px] text-[#2C312E]/40 font-semibold uppercase tracking-wider font-mono">CLUB POINTS</p>
            <p className="text-xl font-bold text-[#2F5233] font-mono leading-none">{MOCK_USER.points} Pts</p>
          </div>
        </div>
      </div>

      {/* 2. MEMBERSHIP GRAPHIC CARD BOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="member-dashboard-grid">
        
        {/* VIP Digital Gold Card (High Fidelity) */}
        <div className="lg:col-span-4 relative rounded-3xl p-8 overflow-hidden text-[#FCFAF7] flex flex-col justify-between min-h-[220px] shadow-xl bg-[#1E3821] border border-[#C5A880]/30" id="vip-card-visual">
          
          {/* Hologram textures */}
          <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-[#C5A880]/15 filter blur-2xl -mr-16 -mt-16"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-emerald-600/20 filter blur-xl"></div>
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="font-serif font-black text-xl tracking-wider text-white">Urban Sanctuary</p>
              <p className="text-[9px] uppercase font-mono tracking-widest text-[#C5A880] font-bold mt-0.5">Cuixin Club Passport</p>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-[#C5A880]/25 flex items-center justify-center border border-[#C5A880]/50">
              <span className="font-serif font-semibold text-white">U</span>
            </div>
          </div>

          <div className="space-y-2 relative z-10 pt-8 text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880] font-bold bg-[#FAF5EF]/15 py-1 px-3 rounded-full">
              {MOCK_USER.level}
            </span>
            <p className="font-mono text-lg font-bold tracking-widest pt-2">
              •••• •••• •••• {MOCK_USER.cardId.split('-')[1]}
            </p>
          </div>

          <div className="flex justify-between items-end relative z-10 text-[10px] font-mono mt-4 pt-4 border-t border-white/10 text-white/60 text-left">
            <div>
              <p className="uppercase tracking-wider">MEMBER SINCE</p>
              <p className="font-bold text-[#FCFAF7]">2024 / 04</p>
            </div>
            <div>
              <p className="uppercase tracking-wider">PASSPORT LEVEL</p>
              <p className="font-bold text-[#FCFAF7] uppercase">GOLD LEVEL {MOCK_USER.levelNumber}</p>
            </div>
          </div>
        </div>

        {/* Level EXP & Tier Progress Box */}
        <div className="lg:col-span-8 p-6 md:p-8 bg-white border border-[#2F5233]/5 rounded-3xl shadow-sm flex flex-col justify-between" id="member-exp-detail">
          
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center pb-2 border-b border-[#2F5233]/5">
              <h4 className="font-serif font-bold text-base text-[#1E3821] flex items-center space-x-2">
                <Award className="w-5 h-5 text-[#C5A880]" />
                <span>经验等级进度条</span>
              </h4>
              <span className="text-xs font-mono text-[#2C312E]/55">
                升级至 <span className="font-bold text-[#2F5233]">金特邀·珀金卡</span> 还需 180 点
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-bold text-[#1E3821]">
                <span>{MOCK_USER.exp} EXP</span>
                <span>{MOCK_USER.nextLevelExp} EXP</span>
              </div>
              <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#2F5233] to-[#C5A880] rounded-full transition-all duration-1000"
                  style={{ width: `${levelProgressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick claim form code */}
          <form onSubmit={claimVoucherFromCode} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-t border-[#2F5233]/5 pt-6 mt-6 md:mt-2">
            <div className="md:col-span-8 space-y-1 text-left">
              <label className="text-xs font-semibold text-[#2C312E]/70">输入修艺帖/画册兑换码领优惠券 / Redeem Code</label>
              <input 
                type="text"
                required
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoResult(null);
                }}
                placeholder="请输入画卷/册侧里的兑换神字 (例如MATCHA10, VIPGIFT)"
                className="w-full py-2.5 px-3.5 bg-white border border-[#2F5233]/15 rounded-lg text-xs font-sans focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
              />
            </div>
            <button 
              type="submit"
              className="md:col-span-4 py-2.5 bg-[#2F5233] hover:bg-[#1E3821] text-white text-xs font-bold tracking-widest rounded-lg transition-all"
            >
              兑换专属秘券
            </button>

            {promoResult && (
              <p className="col-span-full text-xs font-medium text-[#2F5233] mt-2 animate-fade-in">{promoResult}</p>
            )}
          </form>
        </div>

      </div>

      {/* 3. CENTER SYSTEM ACTION TABS */}
      <div className="space-y-6" id="member-tabs-container">
        
        {/* Navigation Selector Tabs */}
        <div className="flex border-b border-[#2F5233]/15 overflow-x-auto no-scrollbar" id="member-tab-triggers">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`py-3 px-6 text-sm font-medium tracking-widest shrink-0 transition-colors border-b-2 relative ${
              activeTab === 'benefits' 
                ? 'border-[#2F5233] text-[#2F5233] font-bold' 
                : 'border-transparent text-[#2C312E]/50 hover:text-[#2F5233]'
            }`}
          >
            会员专属福利 / Benefits
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`py-3 px-6 text-sm font-medium tracking-widest shrink-0 transition-colors border-b-2 relative flex items-center space-x-2 ${
              activeTab === 'coupons' 
                ? 'border-[#2F5233] text-[#2F5233] font-bold' 
                : 'border-transparent text-[#2C312E]/50 hover:text-[#2F5233]'
            }`}
          >
            <span>折抵优惠券 / Coupons</span>
            <span className="text-[10px] bg-[#C5A880] text-white px-1.5 py-0.5 rounded-full font-mono font-bold">
              {coupons.filter(c => !c.used).length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-6 text-sm font-medium tracking-widest shrink-0 transition-colors border-b-2 relative flex items-center space-x-2 ${
              activeTab === 'bookings' 
                ? 'border-[#2F5233] text-[#2F5233] font-bold' 
                : 'border-transparent text-[#2C312E]/50 hover:text-[#2F5233]'
            }`}
          >
            <span>预约修会记录 / Sessions</span>
            <span className="text-[10px] bg-[#2F5233] text-white px-1.5 py-0.5 rounded-full font-mono font-bold">
              {bookings.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-6 text-sm font-medium tracking-widest shrink-0 transition-colors border-b-2 relative ${
              activeTab === 'history' 
                ? 'border-[#2F5233] text-[#2F5233] font-bold' 
                : 'border-transparent text-[#2C312E]/50 hover:text-[#2F5233]'
            }`}
          >
            消费历史账目 / Activity
          </button>
        </div>

        {/* Tab contents block */}
        <div className="bg-white rounded-3xl p-6 border border-[#2F5233]/5 shadow-sm min-h-[300px]" id="member-tab-content">
          <AnimatePresence mode="wait">
            
            {/* Tab 1: Benefits */}
            {activeTab === 'benefits' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
                id="tab-benefits-grid"
              >
                <div className="p-5 rounded-2xl bg-[#FCFAF7] border border-[#2F5233]/5 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2F5233]/10 flex items-center justify-center text-[#2F5233]">
                    <Zap className="w-5.5 h-5.5" />
                  </div>
                  <h5 className="font-serif font-bold text-sm text-[#1E3821]">积分极速双倍</h5>
                  <p className="text-xs text-[#2C312E]/60 leading-relaxed font-light">
                    黄金会员及以上级，堂食消费任何抹茶系列下午茶套餐，均尊享 1.5 倍积分红利。消费满10元累积15点。
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FCFAF7] border border-[#2F5233]/5 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                    <Gift className="w-5.5 h-5.5" />
                  </div>
                  <h5 className="font-serif font-bold text-sm text-[#1E3821]">生日时令糕点免单</h5>
                  <p className="text-xs text-[#2C312E]/60 leading-relaxed font-light">
                    生日周可免门槛，任意选取店中任何一款招牌千层蛋糕（含21层若竹）或焙茶奶冻，主厨亲签名礼卡。
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FCFAF7] border border-[#2F5233]/5 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#5E8B65]/10 flex items-center justify-center text-[#5E8B65]">
                    <Ticket className="w-5.5 h-5.5" />
                  </div>
                  <h5 className="font-serif font-bold text-sm text-[#1E3821]">新课抢先评测名额</h5>
                  <p className="text-xs text-[#2C312E]/60 leading-relaxed font-light">
                    每当主厨手作坊发布全新研学课题（如可丽露气孔探索），您将收到尊享内测邮件，可无门槛立享内测优惠。
                  </p>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Coupons */}
            {activeTab === 'coupons' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4 text-left"
                id="tab-coupons-list"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coupons.map((coupon) => (
                    <div 
                      key={coupon.id}
                      className={`relative rounded-2xl p-5 border overflow-hidden flex items-center justify-between ${
                        coupon.used 
                          ? 'bg-[#FAF5EF]/20 border-dotted border-stone-300 opacity-60' 
                          : 'bg-[#FAF5EF] border-[#C5A880]/30 shadow-sm hover:shadow-md'
                      }`}
                      id={`coupon-card-${coupon.id}`}
                    >
                      <div className="space-y-1">
                        <span className={`text-[8px] font-bold tracking-widest uppercase font-mono px-2 py-0.5 rounded ${
                          coupon.used ? 'bg-stone-200 text-stone-500' : 'bg-[#2F5233] text-white'
                        }`}>
                          {coupon.used ? 'CLOSED / 已核销' : 'ACTIVE / 有效'}
                        </span>
                        <h5 className="font-serif font-bold text-sm text-[#1E3821] mt-2 leading-tight">{coupon.title}</h5>
                        <p className="text-xs text-[#2C312E]/60 font-light">{coupon.desc}</p>
                        <p className="text-[10px] text-[#2C312E]/40 font-mono mt-1">有效期至：{coupon.expire}</p>
                      </div>

                      <div className="relative z-10">
                        {coupon.used ? (
                          <div className="w-16 h-16 border-2 border-dashed border-stone-400 text-stone-400 flex items-center justify-center rounded-full text-[10px] font-bold font-serif transform -rotate-12 select-none">
                            已折折抵
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedScanCoupon(coupon)}
                            className="bg-[#2F5233] hover:bg-[#1E3821] text-white p-2.5 rounded-full shadow-sm transition-colors"
                            title="出示核销二维码"
                          >
                            <QrCode className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 3: Bookings (REAL TIME SYNC) */}
            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4 text-left"
                id="tab-bookings-list"
              >
                {bookings.length > 0 ? (
                  <div className="divide-y divide-[#2F5233]/10">
                    {bookings.map((b) => (
                      <div key={b.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs md:text-sm">
                        <div className="space-y-1.5 text-left">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-bold bg-[#FAF5EF] text-[#2F5233] py-0.5 px-2 rounded border border-[#2F5233]/10">
                              密字帖号：{b.id}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              ● 审核确认 ・ 待签到
                            </span>
                          </div>
                          <h5 className="font-serif font-bold text-[#1E3821] text-base">{b.courseType}</h5>
                          <p className="text-[#2C312E]/60 font-light">
                            预订时间段：📅 <span className="font-bold">{b.date}</span> (周日席) | {b.timeSlot} (约{b.guestsCount}人席)
                          </p>
                        </div>

                        {/* QR Code trigger */}
                        <div className="shrink-0 flex items-center space-x-3.5">
                          <button
                            onClick={() => setSelectedScanCoupon({ title: b.courseType, id: b.id, isBooking: true, desc: `席位人姓名：${b.name} (${b.guestsCount}人席)` })}
                            className="px-4 py-2 bg-[#FAF5EF] hover:bg-[#2F5233]/5 border border-[#2F5233]/15 text-[#2F5233] rounded-lg font-bold text-xs flex items-center space-x-1.5"
                          >
                            <QrCode className="w-4 h-4" />
                            <span>扫码登记凭证</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-stone-400 space-y-2">
                    <ClipboardList className="w-10 h-10 text-stone-300 mx-auto" />
                    <p className="text-xs font-light">
                      暂时没有激活的手作坊预约会席。去“工坊预约”递交您的第一张帖？
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab 4: History activity */}
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="overflow-x-auto"
                id="tab-history-table"
              >
                <table className="w-full text-left text-xs md:text-sm font-sans divide-y divide-[#2F5233]/10">
                  <thead>
                    <tr className="text-[#2C312E]/50 uppercase tracking-wider text-[10px] font-mono">
                      <th className="pb-3 font-semibold">发生日期</th>
                      <th className="pb-3 font-semibold">到店核销/消费细目</th>
                      <th className="pb-3 font-semibold text-right">消费金额 (￥)</th>
                      <th className="pb-3 font-semibold text-right">变动积分 (Pts)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2F5233]/5">
                    {MOCK_USER.activities.map((act, i) => (
                      <tr key={i} className="hover:bg-[#FAF5EF]/10">
                        <td className="py-3.5 font-mono text-stone-500">{act.date}</td>
                        <td className="py-3.5 text-[#1E3821] font-medium">{act.desc}</td>
                        <td className="py-3.5 text-right font-mono font-bold text-stone-700">￥{act.amount}</td>
                        <td className="py-3.5 text-right font-mono font-bold text-emerald-700">{act.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* 4. MODAL DETAILED QR CODE SIMULATOR (HIGH FIDELITY) */}
      <AnimatePresence>
        {selectedScanCoupon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="coupon-scan-modal">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScanCoupon(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Box modal */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-[#FCFAF7] rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl z-10 border border-[#2F5233]/10 text-center space-y-6"
            >
              <div className="text-left border-b border-[#2F5233]/10 pb-3 relative">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#C5A880] font-bold">扫码凭证校验</span>
                <h4 className="font-serif font-bold text-base text-[#1E3821] mt-1 pr-6 leading-tight">{selectedScanCoupon.title}</h4>
                <p className="text-xs text-[#2C312E]/50 font-sans font-light mt-1">{selectedScanCoupon.desc}</p>
                <button 
                  onClick={() => setSelectedScanCoupon(null)}
                  className="absolute top-0 right-0 p-1 rounded-full text-[#2C312E]/40 hover:text-[#2C312E]"
                >
                  <ChevronRight className="w-5 h-5 rotate-90" />
                </button>
              </div>

              {/* QR Code Vector Simulation */}
              <div className="w-48 h-48 bg-white border border-[#2F5233]/10 rounded-2xl mx-auto p-4 flex flex-col justify-between items-center shadow-inner relative">
                {/* Visual corners of qr scanner finder */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#2F5233]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#2F5233]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#2F5233]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#2F5233]" />

                {/* Simulated QR block details */}
                <div className="grid grid-cols-4 gap-2 w-full h-full p-2 opacity-85 select-none">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const filled = [
                      0, 1, 2, 4, 7, 8, 10, 11, 13, 14, 15
                    ].includes(i);
                    return (
                      <div 
                        key={i} 
                        className={`rounded ${
                          filled ? i % 3 === 0 ? 'bg-[#C5A880]' : 'bg-[#1E3821]' : 'bg-stone-50'
                        }`} 
                      />
                    );
                  })}
                </div>
              </div>

              <div className="text-xs text-[#2C312E]/50 font-sans space-y-1">
                <p className="font-bold text-[#1E3821]">验证码：CX-{selectedScanCoupon.id.substring(0, 8).toUpperCase()}</p>
                <p className="font-light">到店后出示此屏给收银茶艺师即可。核销将获得相应P卡点数奖励，自动扣减该代金账目。</p>
              </div>

              {/* If it is a coupon, support interactive instant "Redeem Simulation" so that the user can play with it! */}
              {!selectedScanCoupon.isBooking && (
                <button
                  type="button"
                  onClick={() => handleUseCouponAction(selectedScanCoupon.id)}
                  className="w-full py-3 bg-[#2F5233] hover:bg-[#1E3821] text-white text-xs font-bold tracking-widest rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>模拟到店扫码核销</span>
                </button>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
}
