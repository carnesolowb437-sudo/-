import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '合作与定制',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('请填写必填项（姓名、电邮地址和咨询内容简述）。');
      return;
    }

    setSubmitted(true);
    setErrorMsg('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-left space-y-12 shrink-0 animate-fade-in" id="contact-view">
      
      {/* 1. HEADER HERO SECTION */}
      <div className="text-center md:text-left space-y-3 mb-8">
        <p className="text-xs text-[#C5A880] tracking-widest uppercase font-semibold font-mono">CONTACT US</p>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1E3821]">咨询、合作与联系</h1>
        <p className="text-sm text-[#2C312E]/60 max-w-xl font-light leading-relaxed">
          不管是大宗时令礼盒企业团购、茶席包场，还是茶席手打研习课咨询，我们恭候您的来信。
        </p>
      </div>

      {/* 2. CONTACT LAYOUT WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-workspace">
        
        {/* Left Side: Contact Info & Address */}
        <div className="lg:col-span-4 space-y-6" id="contact-info">
          
          <div className="p-8 bg-[#FAF5EF] rounded-3xl border border-[#2F5233]/5 space-y-8">
            <h4 className="font-serif font-bold text-lg text-[#1E3821] tracking-widest border-b border-[#2F5233]/15 pb-2">
              工坊总部地址
            </h4>

            <ul className="space-y-6 text-xs md:text-sm font-sans">
              <li className="flex items-start space-x-3.5 text-[#2C312E]/80">
                <MapPin className="w-5.5 h-5.5 text-[#C5A880] shrink-0 mt-0.5" />
                <div className="space-y-1 text-left">
                  <p className="font-bold">满觉陇精舍 (一号及二号店)</p>
                  <p className="leading-relaxed font-light text-[#2C312E]/60">
                    浙江省杭州市西湖区满觉陇路翠竹精舍 8 号地下1楼 (龙井山庄南侧200米)
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5 text-[#2C312E]/80">
                <Phone className="w-4.5 h-4.5 text-[#C5A880] shrink-0 mt-0.5" />
                <div className="space-y-1 text-left">
                  <p className="font-bold">联系热线</p>
                  <p className="font-mono text-[#2C312E]/70 font-medium">+86 (571) 8802-9912</p>
                  <p className="text-[10px] text-[#2C312E]/40 font-light">
                    接听时间：周一至周日 09:30 - 21:30
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5 text-[#2C312E]/80">
                <Mail className="w-4.5 h-4.5 text-[#C5A880] shrink-0 mt-0.5" />
                <div className="space-y-1 text-left">
                  <p className="font-bold">大宗采购及合作服务</p>
                  <p className="font-mono text-xs text-[#2F5233] font-medium hover:underline">cooperation@cuixin.com</p>
                  <p className="text-[10px] text-[#2C312E]/40 font-light">
                    (礼盒定制与活动合作邮件通常在24小时内答复)
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Side: Cozy Form Side */}
        <div className="lg:col-span-8 bg-white border border-[#2F5233]/5 p-6 md:p-10 rounded-3xl shadow-sm space-y-6">
          <h3 className="font-serif text-xl font-bold text-[#1E3821] tracking-wide border-b border-[#2F5233]/10 pb-3">
            咨询定制协作帖 <span className="text-xs uppercase font-mono text-[#C5A880] tracking-wider ml-1">/ Custom Request Sheet</span>
          </h3>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleFormSubmit} 
                className="space-y-6 font-sans text-left"
                id="contact-form"
              >
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C312E]/75">您的姓名 / Name (必填)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="您的姓名或公司主体"
                      className="w-full py-2.5 px-3.5 bg-white border border-[#2F5233]/15 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
                    />
                  </div>

                  {/* Cell phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2C312E]/75">您的联系电话 / Cell-phone</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="方便我们回拨电话详谈"
                      className="w-full py-2.5 px-3.5 bg-white border border-[#2F5233]/15 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-[#2C312E]/75">您的电子邮箱 / Email Address (必填)</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="回复大宗合作方案的指定电邮"
                      className="w-full py-2.5 px-3.5 bg-white border border-[#2F5233]/15 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
                    />
                  </div>

                  {/* Subject */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-[#2C312E]/75">咨询与合作类别 / Purpose Of Contact</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                      className="w-full py-2.5 px-3.5 bg-white border border-[#2F5233]/15 rounded-lg text-sm focus:outline-none focus:border-[#2F5233] text-[#2C312E]"
                    >
                      <option value="合作与定制">大宗节日茶食礼盒定制 (中秋、端午、年会)</option>
                      <option value="场地租用">满觉陇精舍茶室私人/企业包场 (下午茶/沙龙/茶会)</option>
                      <option value="媒体采访">媒体采访或商业品牌联名联动合作</option>
                      <option value="加盟或代理">异地加盟茶席合作咨询</option>
                      <option value="其它说明">其它咨询需求</option>
                    </select>
                  </div>

                  {/* Message body */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-[#2C312E]/75">咨询描述 / Detailed Requirement (必填)</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="请尽量详述您的礼盒预算、包场时间人数及特定抹茶等级偏度需求，方便我们的专职经理做出报价单..."
                      className="w-full py-2.5 px-3.5 bg-white border border-[#2F5233]/15 rounded-lg text-sm text-[#2C312E] focus:outline-none focus:border-[#2F5233] resize-none"
                    ></textarea>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit buttons actions */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#2F5233] hover:bg-[#1E3821] text-white font-semibold text-sm tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                  id="submit-contact-btn"
                >
                  <Send className="w-4.5 h-4.5" />
                  <span>提交咨询资料帖 (专人24h内联络)</span>
                </button>

              </motion.form>
            ) : (
              /* Success callout graphics */
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-[#FAF5EF] border-2 border-dashed border-[#C5A880] rounded-2xl p-6 md:p-12 text-center space-y-6 font-serif"
                id="contact-success-slip"
              >
                <CheckCircle2 className="w-12 h-12 text-[#2F5233] mx-auto" />
                <h4 className="text-xl font-bold text-[#2F5233] tracking-widest">递交成功 · 茶事恭候</h4>
                <p className="text-xs text-[#2C312E]/50 font-sans font-light leading-relaxed max-w-md mx-auto">
                  尊敬的 {formData.name}，大宗商务咨询密函已传送至我们的【满陇精舍】协作部主机。
                  我们将分配专任茶礼理商在 24 小时内致电或发送方案邮件至您填写的邮箱：<span className="font-mono font-medium text-[#2F5233]">{formData.email}</span>。
                </p>
                <div className="w-12 h-0.5 bg-[#C5A880] mx-auto"></div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: '合作与定制',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 bg-[#2F5233] text-[#FCFAF7] font-sans font-semibold text-xs tracking-widest rounded-lg hover:shadow-md transition-all"
                  id="reset-contact-btn"
                >
                  写下一封商务洽询信
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
