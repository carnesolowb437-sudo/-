import React from 'react';
import { Mail, ArrowRight, Instagram, Phone, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E3821] text-[#FCFAF7]/80 pt-20 pb-8 px-4 md:px-8 relative overflow-hidden" id="main-footer">
      {/* Absolute Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#5E8B65]/10 filter blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#C5A880]/5 filter blur-3xl -ml-40 -mb-40"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-[#FCFAF7]/10">
        
        {/* Brand Core Column */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A880] flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">U</span>
            </div>
            <div>
              <h4 className="text-white font-serif font-bold text-lg tracking-widest">Urban Sanctuary</h4>
              <p className="text-[10px] uppercase text-[#C5A880] tracking-widest font-mono">Cuixin Patisserie</p>
            </div>
          </div>
          <p className="text-sm text-[#FCFAF7]/60 leading-relaxed font-sans font-light">
            继承宇治悠长石磨古法，以虔诚的心境追求极致的茶之美。在西子湖畔为您奉上手工执著、真纯本味的极致甜点艺术。
          </p>
          <div className="flex space-x-4">
            <button className="w-9 h-9 rounded-full bg-[#FCFAF7]/10 flex items-center justify-center hover:bg-[#C5A880] hover:text-[#1E3821] transition-all duration-300 transform hover:-translate-y-1" title="Instagram">
              <Instagram className="w-4.5 h-4.5" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#FCFAF7]/10 flex items-center justify-center hover:bg-[#C5A880] hover:text-[#1E3821] transition-all duration-300 transform hover:-translate-y-1" title="WeChat">
              <span className="text-xs font-serif font-bold">信</span>
            </button>
            <button className="w-9 h-9 rounded-full bg-[#FCFAF7]/10 flex items-center justify-center hover:bg-[#C5A880] hover:text-[#1E3821] transition-all duration-300 transform hover:-translate-y-1" title="Xiaohongshu">
              <span className="text-xs font-serif font-bold">红</span>
            </button>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-6 lg:pl-8">
          <h5 className="text-white font-serif font-semibold text-sm tracking-widest relative pb-2 uppercase border-b border-[#FCFAF7]/10 w-fit">
            快速导航 <span className="text-[#C5A880] font-mono text-xs ml-1 font-normal">/ Nav</span>
          </h5>
          <ul className="space-y-3.5 text-sm font-light">
            <li>
              <button onClick={() => handleNavClick('products')} className="hover:text-[#C5A880] hover:underline transition-colors flex items-center">
                <span className="text-[10px] text-[#C5A880] mr-2">•</span> 甜品系列
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('story')} className="hover:text-[#C5A880] hover:underline transition-colors flex items-center">
                <span className="text-[10px] text-[#C5A880] mr-2">•</span> 品牌故事
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('booking')} className="hover:text-[#C5A880] hover:underline transition-colors flex items-center">
                <span className="text-[10px] text-[#C5A880] mr-2">•</span> 工坊手作预约
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('testimonials')} className="hover:text-[#C5A880] hover:underline transition-colors flex items-center">
                <span className="text-[10px] text-[#C5A880] mr-2">•</span> 评价心得
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('member')} className="hover:text-[#C5A880] hover:underline transition-colors flex items-center">
                <span className="text-[10px] text-[#C5A880] mr-2">•</span> 会员尊享中心
              </button>
            </li>
          </ul>
        </div>

        {/* Store Info Column */}
        <div className="space-y-6">
          <h5 className="text-white font-serif font-semibold text-sm tracking-widest relative pb-2 uppercase border-b border-[#FCFAF7]/10 w-fit">
            工坊资讯 <span className="text-[#C5A880] font-mono text-xs ml-1 font-normal">/ Info</span>
          </h5>
          <ul className="space-y-4 text-sm font-light">
            <li className="flex items-start space-x-3.5">
              <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              <span className="text-white/70 leading-relaxed font-sans">
                浙江省杭州市西湖区满觉陇路翠竹精舍 8 号地下1楼 (龙井茶园旁)
              </span>
            </li>
            <li className="flex items-center space-x-3.5">
              <Phone className="w-4.5 h-4.5 text-[#C5A880] shrink-0" />
              <span className="text-white/70">+86 (571) 8802-9912</span>
            </li>
            <li className="flex items-start space-x-3.5">
              <Clock className="w-4.5 h-4.5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="text-white/70">周一至周日 10:00 - 21:30</p>
                <p className="text-xs text-[#FCFAF7]/40 leading-normal">
                  (茶室下午茶配茶需提前2小时电话报备)
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription Column */}
        <div className="space-y-6">
          <h5 className="text-white font-serif font-semibold text-sm tracking-widest relative pb-2 uppercase border-b border-[#FCFAF7]/10 w-fit">
            品鉴资讯邮件 <span className="text-[#C5A880] font-mono text-xs ml-1 font-normal">/ Letter</span>
          </h5>
          <p className="text-sm text-[#FCFAF7]/60 leading-relaxed font-sans">
            订阅我们的时令甜品简报，第一时间获取限量版新品发售通知及特邀手作预约。
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('感谢您的订阅！我们将定期为您发送季节新口味与专属福利邮件。');
              (e.target as HTMLFormElement).reset();
            }} 
            className="flex items-center border border-[#FCFAF7]/20 rounded-lg overflow-hidden focus-within:border-[#C5A880] transition-colors bg-[#FCFAF7]/5"
          >
            <input 
              type="email" 
              required 
              placeholder="请输入您的电子邮箱" 
              className="py-3 px-4 bg-transparent text-sm w-full focus:outline-none text-white placeholder-white/30"
            />
            <button 
              type="submit" 
              className="px-4 py-3 bg-[#C5A880] text-[#1E3821] hover:bg-[#D4B483] font-semibold transition-colors flex items-center shrink-0"
              title="订阅"
            >
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#FCFAF7]/40 font-mono tracking-widest" id="bottom-footer">
        <p>© 2026 Urban Sanctuary. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#privacy" className="hover:text-white transition-colors">隐私政策</a>
          <span>/</span>
          <a href="#terms" className="hover:text-white transition-colors">服务条款</a>
          <span>/</span>
          <a href="#icp" className="text-white/20 hover:text-white transition-colors">浙ICP备12345678号-1</a>
        </div>
      </div>
    </footer>
  );
}
