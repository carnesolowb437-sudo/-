import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Leaf, 
  Star, 
  Award, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle,
  Coffee,
  Database
} from 'lucide-react';
import { INITIAL_PRODUCTS, COURSES } from '../data';
import genmaichaLatteFoamImg from '../assets/images/genmaicha_latte_foam_1779240951334.png';

interface HomeViewProps {
  setCurrentPage: (page: string) => void;
}

interface MatchaGrade {
  name: string;
  english: string;
  charity: string;
  umami: number; // 1-5
  bitter: number; // 1-5
  sweet: number; // 1-5
  color: string; // Tailwind hex or class name
  desc: string;
  bestPairing: string;
}

export default function HomeView({ setCurrentPage }: HomeViewProps) {
  // Active Matcha Grade selection state
  const [selectedGrade, setSelectedGrade] = useState<number>(1); // Index of grade
  // Active Featured Product accordion selection state
  const [expandedId, setExpandedId] = useState<string>('p1');

  // Ref and scroll state for local scroll parallax
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Position of the container center relative to the viewport center
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = viewportHeight / 2;
        setScrollOffset(elementCenter - screenCenter);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    // Tiny delay to ensure layout rendering has settled down
    const t = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(t);
    };
  }, []);

  // Selected products to feature (Mille Crêpe, Truffles, Hojicha)
  const featuredProducts = INITIAL_PRODUCTS.filter(p => 
    p.id === 'p1' || p.id === 'p2' || p.id === 'p3'
  );

  const matchaGrades: MatchaGrade[] = [
    {
      name: '青岚',
      english: 'Aorashi',
      charity: '石磨初熟 · 翠色鲜爽',
      umami: 3.5,
      bitter: 3,
      sweet: 4,
      color: 'bg-[#5E8B65]',
      desc: '风味清朗而带有鲜甜草木芬芳，拥有极佳的抗温烤制稳定性，其色泽温婉，是烤制传统大可丽露及斑斓戚风的灵魂伴侣。',
      bestPairing: '茶香脆皮可丽露、二重奏马卡龙'
    },
    {
      name: '若竹',
      english: 'Wakatake',
      charity: '甘甜醇厚 · 苔韵不息',
      umami: 4.5,
      bitter: 2.5,
      sweet: 3.5,
      color: 'bg-[#2F5233]',
      desc: '丸久小山园最富盛名的千层皇牌。茶香中弥漫着饱满深沉的海苔鲜咸（Umami），厚重扎实却毫无生青苦涩，与高质感淡乳脂极其完美地相融。',
      bestPairing: '宇治精工千层蛋糕、玄米芝士蛋糕'
    },
    {
      name: '五十铃',
      english: 'Isuzu',
      charity: '皇家级点茶 · 凝滞凝露',
      umami: 5,
      bitter: 2,
      sweet: 3,
      color: 'bg-[#1E3821]',
      desc: '殿堂级仪式感浓茶。无任何粗糙颗粒与草青杂质，入口极其细腻丝滑，茶多酚和叶绿素含量极高，茶汤呈现天鹅绒般的厚重玉色。',
      bestPairing: '极浓手工松露、御宇治手打浓茶'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative bg-transparent min-h-screen text-left"
      id="home-view"
    >
      {/* Background Video Layer with Atmospheric Wash */}
      <div 
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.55]"
        id="video-background-layer"
      >
        <video
          src="https://ik.imagekit.io/quuete4si/nnn.mp4"
          className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02]"
          muted
          playsInline
          autoPlay
          loop
        />
        {/* Complex organic creamy paper gradient wash to integrate foreground and video */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#FCFAF7]/10 via-[#FAF6F0]/55 to-[#FCFAF7]/80" 
          id="video-gradient-overlay"
        />
        
        {/* Soft floating luminous tea-zen light orbs */}
        <div className="absolute top-1/4 left-5 w-72 h-72 rounded-full bg-[#2F5233]/4 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-[#C5A880]/5 blur-[150px] pointer-events-none" />
        <div className="absolute top-2/3 left-[40%] w-80 h-80 rounded-full bg-[#5E8B65]/4 blur-[130px] pointer-events-none" />
      </div>

      {/* Main Content Wrapper with relative stacking */}
      <div className="relative z-10 space-y-24">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8" id="home-hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-left relative z-10">
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2F5233]/8 text-[#2F5233] text-xs font-bold tracking-widest uppercase border border-[#2F5233]/15 backdrop-blur-md"
              id="hero-badge"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
              <span>杭州西湖畔 · 抹茶美学空间</span>
            </motion.div>
 
            <motion.h1 
              variants={itemVariants} 
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3821] tracking-wider leading-snug drop-shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-l-4 border-[#2F5233]/70 pl-4.5 py-1"
              id="hero-main-title"
            >
              <span className="block shrink-0">一抹翠意，</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-semibold text-[#9E7E52] relative">
                心手相传的静谧修持
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#9E7E52]/30 rounded-full" />
              </span>
            </motion.h1>
 
            <motion.p 
              variants={itemVariants} 
              className="text-sm md:text-base text-[#2C312E]/80 leading-relaxed font-sans font-light max-w-lg"
              id="hero-subtitle"
            >
              「Urban Sanctuary」隐居于满觉陇古翠林间。我们精研日本宇治百年石磨古法，坚持纯手工二十一层慢煎与茶筅手击。在一抹茶色余香中，为您构筑一处无尘的流心港湾。
            </motion.p>
 
            {/* CTA action buttons */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap gap-4 pt-4"
              id="hero-actions"
            >
              <button
                onClick={() => {
                  setCurrentPage('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-[#2F5233] hover:bg-[#1E3821] text-white font-serif font-bold tracking-widest text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                id="cta-browse-products"
              >
                浏览甜点系列
              </button>
              <button
                onClick={() => {
                  setCurrentPage('booking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 border border-[#2F5233]/40 hover:border-[#2F5233] hover:bg-[#2F5233]/8 text-[#2F5233] font-serif font-bold tracking-widest text-sm rounded-full transition-all duration-300 backdrop-blur-sm"
                id="cta-reserve-workshop"
              >
                预约手作工坊
              </button>
            </motion.div>
          </div>
 
          {/* Hero Right Graphic with layered images & crafted cinnabar seal */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0" id="hero-graphic-panel">
            <div className="absolute inset-0 border border-[#C5A880]/30 rounded-3xl transform translate-x-4 translate-y-4 z-0"></div>
            
            <motion.div 
              variants={itemVariants} 
              className="relative z-10 aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-white border border-[#2F5233]/10 flex items-center justify-center p-2.5"
              id="hero-main-image-wrapper"
            >
              <img 
                src={genmaichaLatteFoamImg} 
                alt="Artisan Creamy Matcha Latte Pour" 
                className="w-full h-full object-cover rounded-2xl contrast-[1.03]"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating aesthetic labels */}
              <div className="absolute bottom-6 left-6 bg-[#1E3821]/85 backdrop-blur-md text-[#FCFAF7] p-4.5 rounded-xl text-left border border-white/15 shadow-xl">
                <span className="text-[10px] text-[#C5A880] tracking-widest uppercase font-mono font-bold">ICE-WHISKED FUSION</span>
                <p className="font-serif font-bold text-sm mt-0.5">手打筅击 极细茶乳融</p>
              </div>
 
              <div className="absolute -top-4 -right-4 bg-[#C5A880] text-white py-2 px-4 rounded-xl shadow-lg flex items-center space-x-1.5 text-xs font-serif border border-[#FCFAF7]/20">
                <Leaf className="w-3.5 h-3.5 animate-spin-slow" />
                <span>100%丸久小山园直供</span>
              </div>

              {/* Handcrafted Red Cinnabar Seal - Signifying heritage, master recipe, and authenticity */}
              <div 
                className="absolute right-6 bottom-6 bg-[#C12C1E] text-white p-2 w-[44px] rounded-sm shadow-xl flex flex-col items-center justify-center font-serif text-[11px] leading-tight tracking-[0.15em] select-none scale-105 transform translate-x-1.5 translate-y-1.5 rotate-[-3deg] z-20 font-bold border border-white/20 select-none cursor-default hover:scale-110 active:scale-95 transition-transform"
                title="翠心守作印"
              >
                <div className="border border-white/30 px-1 py-1 flex flex-col items-center justify-center font-serif">
                  <span className="leading-none text-center">翠</span>
                  <span className="leading-none text-center mt-0.5">心</span>
                  <span className="leading-none text-center mt-0.5">手</span>
                  <span className="leading-none text-center mt-0.5">作</span>
                </div>
              </div>
            </motion.div>
          </div>
 
        </div>
      </section>
 
      {/* 2. THREE CORE VALUES */}
      <section className="bg-[#FAF5EF]/20 border-y border-[#FAF5EF]/30 backdrop-blur-[8px] py-20 rounded-3xl" id="home-philosophies">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs text-[#C5A880] uppercase tracking-widest font-mono font-extrabold">THE ARTISAN CREDO</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E3821] tracking-wide">古法慢工的执手信仰</h2>
            <p className="text-xs md:text-sm text-[#2C312E]/70 max-w-md mx-auto font-light leading-relaxed">
              在这个机械堆砌的时代，我们选择用昂贵的时间和固执的心，去沉淀每一分原真素雅。
            </p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left font-sans">
            
            <div className="p-8 bg-white/20 backdrop-blur-lg border border-[#2F5233]/5 rounded-2xl hover:bg-white/55 hover:border-[#C5A880]/30 hover:shadow-xl transition-all duration-500 space-y-4 shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-[#2F5233]/15 flex items-center justify-center text-[#2F5233] group-hover:bg-[#2F5233] group-hover:text-white transition-all duration-300">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1E3821] group-hover:text-[#2F5233] transition-colors">极细石磨 · 原融茶色</h4>
              <p className="text-xs text-[#2C312E]/80 leading-relaxed font-light">
                拒绝任何茶粉精、香精与食用色素。坚持只选用丸久小山园原产若竹与青岚，由低温石磨慢磨，原翠留春，带来微微回苦、浓烈悠长的纯茶极简韵味。
              </p>
            </div>
 
            <div className="p-8 bg-white/20 backdrop-blur-lg border border-[#2F5233]/5 rounded-2xl hover:bg-white/55 hover:border-[#C5A880]/30 hover:shadow-xl transition-all duration-500 space-y-4 shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-white transition-all duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1E3821] group-hover:text-[#C5A880] transition-colors">手工多层 · 极寒乳融</h4>
              <p className="text-xs text-[#2C312E]/80 leading-relaxed font-light">
                招牌千层坚持手工煎制极薄至透光的21层黄金温度饼皮。夹心辅以法国顶级爱乐薇淡乳脂与日本海藻糖，确保轻盈如薄羽、入口即化、绵密解腻。
              </p>
            </div>
 
            <div className="p-8 bg-white/20 backdrop-blur-lg border border-[#2F5233]/5 rounded-2xl hover:bg-white/55 hover:border-[#C5A880]/30 hover:shadow-xl transition-all duration-500 space-y-4 shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-[#5E8B65]/15 flex items-center justify-center text-[#5E8B65] group-hover:bg-[#5E8B65] group-hover:text-white transition-all duration-300">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1E3821] group-hover:text-[#5E8B65] transition-colors">杭州之灵 · 侘寂盛装</h4>
              <p className="text-xs text-[#2C312E]/80 leading-relaxed font-light">
                我们向龙井茶师与西泠印社美学致敬。所有甜品承装均以精心定制的青白瓷、柴烧粗陶及天目盏为主，呈现“不繁、素雅、幽玄”的东方静谧美学体验。
              </p>
            </div>
 
          </div>
 
        </div>
      </section>
 
      {/* 3. CURATED MASTERPIECES */}
      <section className="max-w-7xl mx-auto px-4 md:px-8" id="home-featured-products" ref={containerRef}>
        <div className="flex flex-col items-center justify-center text-center mb-12 space-y-3">
          <div className="space-y-1">
            <span className="text-xs text-[#C5A880] uppercase tracking-widest font-mono font-bold block">CURATED SWEETS</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E3821]">主厨力作 · 口碑时令品鉴</h2>
          </div>
          <button
            onClick={() => {
              setCurrentPage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-2 font-serif font-bold text-[#2F5233] hover:text-[#C5A880] flex items-center space-x-1.5 transition-colors text-sm py-1.5 px-4 bg-[#2F5233]/5 rounded-full hover:bg-[#2F5233]/10"
            id="view-all-products"
          >
            <span>前往甜品铺浏览海量新点</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* 3 Featured Products in Accordion */}
        <div className="flex flex-col md:flex-row gap-6 md:min-h-[500px]" id="featured-products-accordion">
          {featuredProducts.map((p) => {
            const isExpanded = p.id === expandedId;
            
            // Calculate distinct speeds for depth layered parallax effect based on scrollOffset
            const imageY = Math.max(-30, Math.min(30, scrollOffset * -0.065));
            const fontY = Math.max(-12, Math.min(12, scrollOffset * 0.025));
            const bgY = Math.max(-45, Math.min(45, scrollOffset * 0.08));

            return (
              <div
                key={p.id}
                onClick={() => setExpandedId(p.id)}
                className={`rounded-2xl overflow-hidden border text-left flex flex-col justify-between cursor-pointer group relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isExpanded 
                    ? 'border-[#2F5233] shadow-lg md:shadow-xl bg-[#FCFAF7]/20 backdrop-blur-lg' 
                    : 'border-[#2F5233]/15 shadow-sm hover:shadow-md bg-white/5 backdrop-blur-md hover:bg-[#FAF8F5]/20'
                }`}
                style={{
                  flexGrow: isExpanded ? 2.5 : 0.8,
                  flexBasis: '0%',
                  minWidth: '240px'
                }}
                id={`featured-card-${p.id}`}
              >
                {/* Layer 1 (Back): Parallax background ambient gradient orb */}
                <div 
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none blur-3xl opacity-35 z-0"
                  style={{
                    background: p.id === 'p1' ? 'radial-gradient(circle, #2F5233 0%, transparent 70%)' :
                                p.id === 'p2' ? 'radial-gradient(circle, #C5A880 0%, transparent 70%)' :
                                'radial-gradient(circle, #5E8B65 0%, transparent 70%)',
                    transform: `translateY(${bgY}px)`
                  }}
                />

                <div className="flex flex-col h-full w-full justify-between relative z-10">
                  {/* Layer 2 (Middle): Dynamic Parallax Image Frame */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#FAF5EF] flex items-center justify-center shrink-0">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className={`w-full h-[120%] object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isExpanded ? 'scale-[1.12]' : 'scale-[1.18] group-hover:scale-[1.24]'
                      }`}
                      style={{
                        transform: `translateY(${imageY}px)`
                      }}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Level Rating badge */}
                    <div 
                      className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-mono font-bold text-[#1E3821] flex items-center space-x-1 shadow-sm z-10 transition-transform duration-300"
                      style={{
                        transform: `translateY(${fontY * 0.5}px)`
                      }}
                    >
                      <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                      <span>{p.rating}</span>
                    </div>

                    {p.isPopular && (
                      <span 
                        className="absolute top-4 right-4 bg-[#C5A880] text-white text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-md shadow-sm uppercase font-serif z-10 transition-transform duration-300"
                        style={{
                          transform: `translateY(${fontY * 0.5}px)`
                        }}
                      >
                        主厨力荐
                      </span>
                    )}

                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Layer 3 (Foreground): Content area with independent shifting rate */}
                  <div 
                    className="p-6 flex-grow flex flex-col justify-between space-y-4 transition-transform duration-200 ease-out"
                    style={{
                      transform: `translateY(${fontY}px)`
                    }}
                  >
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="font-serif font-bold text-[#1E3821] text-lg md:text-xl transition-colors duration-300">
                            {p.name}
                          </h4>
                          <span className="font-serif font-black text-[#2F5233] text-lg md:text-xl shrink-0 transition-colors duration-300">
                            ¥{p.price}
                          </span>
                        </div>
                        <p className="text-[10px] uppercase font-mono text-[#C5A880] tracking-wider leading-none mt-1">
                          {p.englishName}
                        </p>
                      </div>

                      {/* Always visible base description */}
                      <p className={`text-xs text-[#2C312E]/70 leading-relaxed font-light transition-opacity duration-500 ${
                        isExpanded ? 'opacity-40' : 'opacity-100'
                      }`}>
                        {p.description}
                      </p>

                      {/* Expanding section leveraging CSS Grid rows for 100% smooth height animation */}
                      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 h-0 overflow-hidden'
                      }`}>
                        <div className="overflow-hidden space-y-3">
                          <p className="text-xs text-[#2C312E]/80 leading-relaxed font-light">
                            {p.detailDescription || p.description}
                          </p>

                          {/* Extra ingredients tag lists */}
                          {p.ingredients && p.ingredients.length > 0 && (
                            <div className="pt-3 border-t border-[#2F5233]/10 space-y-1.5">
                              <span className="text-[9px] uppercase font-mono text-[#C5A880] tracking-wider font-bold block">
                                精研用料 / Ingredients
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {p.ingredients.map((ing, idx) => (
                                  <span key={idx} className="bg-[#2F5233]/5 text-[#2F5233] text-[9px] px-2 py-0.5 rounded-full font-serif font-medium">
                                    {ing}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Category and static tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {p.tags.slice(0, isExpanded ? 4 : 2).map((t, idx) => (
                          <span 
                            key={idx} 
                            className={`text-[9px] px-1.5 py-0.5 rounded-md font-medium transition-colors duration-300 ${
                              isExpanded 
                                ? 'bg-[#2F5233]/15 text-[#2F5233]' 
                                : 'bg-[#2F5233]/5 text-[#2F5233]'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Status & Actions */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      {!isExpanded ? (
                        <>
                          <span className="text-[10px] text-[#2C312E]/40 font-mono">
                            点击展开品鉴 ➔
                          </span>
                          <span className="text-[10px] md:text-xs font-semibold text-[#2F5233] group-hover:text-[#C5A880] transition-colors font-serif">
                            查看微苦风味
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] text-[#C5A880] font-mono tracking-wider font-semibold animate-pulse">
                            ✨ 首发特供 · 纯手工石磨
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Avoid folding the card back
                              setCurrentPage('products');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="bg-[#2F5233] text-white hover:bg-[#1E3821] text-[10px] md:text-xs font-serif font-bold tracking-widest px-3.5 py-1.5 rounded-full shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                          >
                            挑选并预约 ➔
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE MATCHA GRADE SENSORY EXPLORER */}
      <section className="bg-[#FAF5EF]/10 backdrop-blur-[9px] py-16 rounded-3xl" id="home-grade-explorer">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Explorer Info & Dial */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="space-y-2">
                <span className="text-xs text-[#C5A880] uppercase tracking-widest font-mono font-bold">EDUCATIONAL TEA HUB</span>
                <h3 className="font-serif text-3xl font-bold text-[#1E3821]">探寻极净古御茶之阶</h3>
                <p className="text-xs text-[#2C312E]/60 font-light leading-relaxed">
                  并非所有抹茶皆出一门。根据石磨等级与叶绿素饱满度，我们在烘烤不同甜品时精选了三款丸久小山园高阶品，邀您感悟微苦后的点滴鲜甜：
                </p>
              </div>

              {/* Selector Tabs */}
              <div className="flex flex-col space-y-3" id="grade-selector-list">
                {matchaGrades.map((grade, index) => {
                  const isSelected = selectedGrade === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedGrade(index)}
                      className={`w-full p-4 rounded-xl flex items-center justify-between transition-all duration-300 border text-left ${
                        isSelected 
                          ? 'bg-white/40 border-[#2F5233] shadow-md backdrop-blur-lg' 
                          : 'border-[#2F5233]/10 bg-white/10 hover:bg-white/30 backdrop-blur-md'
                      }`}
                      id={`grade-tab-${index}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`w-3 h-3 rounded-full ${grade.color}`}></span>
                        <div>
                          <p className="font-serif font-bold text-sm text-[#1E3821]">{grade.name}</p>
                          <p className="text-[10px] uppercase font-mono text-[#C5A880] leading-none mt-0.5">{grade.english}</p>
                        </div>
                      </div>
                      <span className="text-xs text-[#2C312E]/40 font-mono italic">
                        {grade.charity}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Info Display Panel with Sensory Bars */}
            <div className="lg:col-span-7" id="grade-sensory-panel">
              <motion.div 
                key={selectedGrade}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 border border-[#2F5233]/5 shadow-xl space-y-6 text-left"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#C5A880] tracking-widest font-bold">CURATED MATCHA DETAILS</span>
                    <h4 className="font-serif font-black text-2xl text-[#1E3821] mt-0.5">
                      丸久小山园 · {matchaGrades[selectedGrade].name}
                    </h4>
                  </div>
                  <div className={`px-3 py-1 text-white text-xs font-serif rounded ${matchaGrades[selectedGrade].color}`}>
                    京都府宇治市直达
                  </div>
                </div>

                <p className="text-xs text-[#2C312E]/80 leading-relaxed font-sans font-light">
                  {matchaGrades[selectedGrade].desc}
                </p>

                {/* Sensory Bars (Umami, Bitter, Sweet) */}
                <div className="space-y-4 pt-2">
                  <h5 className="text-[10.5px] font-mono text-[#C5A880] tracking-widest font-bold">三向度风味感官测绘 / PROFILE</h5>
                  
                  {/* Umami */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono font-medium text-[#2C312E] uppercase">
                      <span>茶筅鲜味 / Umami Savouriness</span>
                      <span className="text-[#2F5233]">{matchaGrades[selectedGrade].umami} / 5</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(matchaGrades[selectedGrade].umami / 5) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-[#1E3821] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Bitter */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono font-medium text-[#2C312E] uppercase">
                      <span>清苦茶涩 / Bitterness</span>
                      <span className="text-[#2F5233]">{matchaGrades[selectedGrade].bitter} / 5</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(matchaGrades[selectedGrade].bitter / 5) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-[#C5A880] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Sweet */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono font-medium text-[#2C312E] uppercase">
                      <span>回韵余鲜 / Sweet Undertone</span>
                      <span className="text-[#2F5233]">{matchaGrades[selectedGrade].sweet} / 5</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(matchaGrades[selectedGrade].sweet / 5) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-[#5E8B65] rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Best Pairing */}
                <div className="bg-[#FAF5EF]/20 backdrop-blur-md p-4 rounded-xl flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center space-x-2 text-[#1E3821]">
                    <Coffee className="w-4 h-4 text-[#C5A880]" />
                    <span className="font-semibold">本店最适配甜品：</span>
                  </div>
                  <span className="text-[#2F5233] font-medium">{matchaGrades[selectedGrade].bestPairing}</span>
                </div>

              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. ARTISAN WORKSHOP PROMO (CRAFT CLASSES) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12" id="home-workshop-join">
        <div className="bg-[#1E3821] rounded-3xl p-8 md:p-16 text-[#FCFAF7] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 text-left">
          
          {/* Decorative design vector elements */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#FCFAF7]/5 filter blur-3xl -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#C5A880]/10 filter blur-3xl -ml-36 -mb-36"></div>

          {/* Left Text */}
          <div className="space-y-6 relative z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-xs font-bold tracking-widest uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>杭州精品手作课程 · 与大师面对面</span>
            </div>
            
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-wider leading-snug">
              「自击春雪，慢煎时光」<br />
              首发抹茶点茶文化手作体验班
            </h3>
            
            <p className="text-xs md:text-sm text-[#FCFAF7]/70 font-light leading-relaxed font-sans">
              由曾在京都二十载的主厨陈默亲自教授，从黄金十五本立的竹筅握法、击拂古法，到极薄千层饼皮的熟化。在杭州茶山松涛声里，静赏一碗专属于你的翠绿点茶。
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono font-light text-[#FCFAF7]/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#C5A880]" />
                <span>全套顶级原装道具免租</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#C5A880]" />
                <span>赠独家配方伴礼包一份</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#C5A880]" />
                <span>茶歇间饮顶级点配和菓子</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#C5A880]" />
                <span>黄金小班制（限4人）</span>
              </div>
            </div>
          </div>

          {/* Right quick cta booking slot selector */}
          <div className="relative z-10 bg-white text-[#2C312E] p-8 rounded-2xl shadow-2xl border border-white/20 w-full lg:w-96 shrink-0 text-left space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-[#C5A880] tracking-widest font-bold">NEXT OPEN SESSION</span>
              <h5 className="font-serif font-black text-lg text-[#1E3821]">「茶道与菓子」：抹茶点茶文化体验</h5>
            </div>

            <div className="space-y-3.5 text-xs font-sans text-[#2C312E]/80">
              <div className="flex items-center justify-between border-b pb-2.5 border-gray-100">
                <div className="flex items-center space-x-2 font-medium">
                  <Clock className="w-4 h-4 text-[#2F5233]" />
                  <span>授课时间 / Time：</span>
                </div>
                <span>每周六下午 14:00</span>
              </div>

              <div className="flex items-center justify-between border-b pb-2.5 border-gray-100">
                <div className="flex items-center space-x-2 font-medium">
                  <Users className="w-4 h-4 text-[#2F5233]" />
                  <span>剩余席位 / Spots：</span>
                </div>
                <span className="font-bold text-rose-600 font-mono">仅剩 4 席</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 font-medium">
                  <Award className="w-4 h-4 text-[#2F5233]" />
                  <span>特邀专享价 / Price：</span>
                </div>
                <span className="font-bold text-lg text-[#1E3821] font-mono">¥320 / 位</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentPage('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 bg-[#C5A880] hover:bg-[#2F5233] hover:text-white text-[#1E3821] font-serif font-black tracking-widest text-sm rounded-xl transition-all duration-300 shadow-md text-center"
            >
              立刻抢占预约席 ➔
            </button>
          </div>

        </div>
      </section>

      </div>
    </motion.div>
  );
}
