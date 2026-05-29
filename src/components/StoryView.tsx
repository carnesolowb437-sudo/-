import React, { useRef, useState, useEffect } from 'react';
import { Leaf, Award, Compass, Sparkles, Heart, X, Clock } from 'lucide-react';
import { motion } from 'motion/react';

// Import high-fidelity generated portrait of Chef Mo Chen
import chefMoChenImg from '../assets/images/chef_mo_chen_1779240227535.png';

interface TrailPoint {
  x: number;
  y: number;
  life: number;
}

function MouseTrailCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);
  const [, setIsHovered] = useState(false);

  const virtualCursor = useRef({ x: 0, y: 0 });
  const trailPoints = useRef<TrailPoint[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        width = rect.width;
        height = rect.height;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    resizeCanvas();
    
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const spacing = 12;      // Spacing between dots
    const easing = 0.12;     // Delay follow speed factor
    const decayRate = 0.024; // Speed of dot trail fading
    const dotRadius = 2.5;   // Dot radius size

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isHoveredRef.current) {
        const dx = mouseRef.current.x - virtualCursor.current.x;
        const dy = mouseRef.current.y - virtualCursor.current.y;
        
        virtualCursor.current.x += dx * easing;
        virtualCursor.current.y += dy * easing;

        let lastPt = trailPoints.current[trailPoints.current.length - 1];
        if (!lastPt) {
          trailPoints.current.push({
            x: virtualCursor.current.x,
            y: virtualCursor.current.y,
            life: 1.0
          });
        } else {
          const tdx = virtualCursor.current.x - lastPt.x;
          const tdy = virtualCursor.current.y - lastPt.y;
          const dist = Math.sqrt(tdx * tdx + tdy * tdy);

          if (dist >= spacing) {
            const numSteps = Math.floor(dist / spacing);
            for (let i = 1; i <= numSteps; i++) {
              const fraction = i / numSteps;
              trailPoints.current.push({
                x: lastPt.x + tdx * fraction,
                y: lastPt.y + tdy * fraction,
                life: 1.0
              });
            }
          }
        }
      }

      trailPoints.current = trailPoints.current.map(pt => ({
        ...pt,
        life: pt.life - decayRate
      })).filter(pt => pt.life > 0);

      trailPoints.current.forEach(pt => {
        ctx.beginPath();
        
        // Add subtle white glow around the dot
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.shadowBlur = 6;
        
        // Specular highlight radial gradient
        const gradient = ctx.createRadialGradient(
          pt.x - dotRadius * 0.2, pt.y - dotRadius * 0.2, 0.1,
          pt.x, pt.y, dotRadius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${pt.life * 0.95})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${pt.life * 0.85})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(pt.x, pt.y, dotRadius * 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Solid white core
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255, 254, 250, ${pt.life * 0.9})`;
        ctx.arc(pt.x, pt.y, dotRadius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isHoveredRef.current = true;
    setIsHovered(true);
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseRef.current = { x, y };
    virtualCursor.current = { x, y };
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="p-8 bg-white/20 backdrop-blur-md border border-[#2F5233]/10 rounded-2xl shadow-sm space-y-4 hover:shadow-2xl hover:bg-[#1E3821]/85 hover:backdrop-blur-lg hover:border-[#1E3821]/60 group transition-all duration-500 relative overflow-hidden cursor-crosshair text-left"
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      <div className="relative z-20 space-y-4 pointer-events-none">
        <div className="w-12 h-12 rounded-lg bg-[#2F5233]/10 flex items-center justify-center text-[#2F5233] group-hover:bg-white/10 group-hover:text-[#C5A880] transition-colors duration-500">
          {icon}
        </div>
        <h4 className="font-serif font-bold text-lg text-[#1E3821] group-hover:text-white transition-colors duration-500">
          {title}
        </h4>
        <p className="text-xs text-[#2C312E]/60 group-hover:text-white/80 leading-relaxed font-light transition-colors duration-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function StoryView() {
  const [showChefModal, setShowChefModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="w-full bg-[#F3F7F4]/30 backdrop-blur-md min-h-screen relative overflow-hidden" id="story-outer-wrapper">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-24 text-left"
        id="story-view"
      >
      {/* Subtle light-green dot grid pattern decoration */}
      <style>{`
        @keyframes dynamicDots {
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
        .anim-dynamic-dots {
          animation: dynamicDots 10s ease-in-out infinite;
        }
      `}</style>
      <div 
        className="absolute inset-0 pointer-events-none z-0 anim-dynamic-dots" 
        style={{
          backgroundImage: 'radial-gradient(#2F5233 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px'
        }}
        id="story-bg-dots"
      />

      {/* 1. HERO BRAND INTRO */}
      <section className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="story-hero">
        <div className="lg:col-span-6 space-y-6">
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#1E3821] text-xs font-bold tracking-widest uppercase">
            <Award className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>宇治茶道工艺传承 · 杭州西子客特展</span>
          </motion.div>
          <motion.h1 
            variants={itemVariants} 
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1E3821] tracking-wider leading-tight"
          >
            {/* Dynamic Chinese character-by-character reveal block 1 */}
            <span className="inline-block">
              {"一抹翠意，".split("").map((char, index) => (
                <motion.span
                  key={`char-1-${index}`}
                  className="inline-block origin-bottom select-none"
                  variants={{
                    hidden: { opacity: 0, y: "0.25em" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.45,
                        delay: index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }
                    }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <br />
            {/* Dynamic Chinese character-by-character reveal block 2 */}
            <span className="inline-block mt-1">
              {"起于工匠之心的温度".split("").map((char, index) => (
                <motion.span
                  key={`char-2-${index}`}
                  className="inline-block origin-bottom select-none"
                  variants={{
                    hidden: { opacity: 0, y: "0.25em" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.45,
                        // Stagger begins after the first line is mostly shown (5 chars * 0.08 = ~0.4s)
                        delay: 0.4 + index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }
                    }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          <motion.p 
            variants={itemVariants} 
            className="text-sm md:text-base text-[#2C312E]/75 leading-relaxed font-sans font-light"
          >
            「Urban Sanctuary」诞生在钱塘西子湖畔。翠者，天目翠竹与皇家宇治之青黛也；心者，不疾不徐、一击拂一煎烙的手作执念也。我们坚信，极致美味必然是由漫长的时间、虔诚的书画静气与执着的火候淬炼而成。
          </motion.p>
        </div>

        {/* Asymmetric Image Showcase Frame */}
        <div className="lg:col-span-6 relative" id="story-hero-graphic">
          <motion.div 
            variants={itemVariants} 
            className="relative aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FCFAF7]"
          >
            <img 
              src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80" 
              alt="Teahouse ceremony" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3821]/80 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 text-white text-left">
              <span className="text-[10px] text-[#C5A880] uppercase tracking-widest font-mono">ESTABLISHED IN HANGZHOU</span>
              <h4 className="font-serif font-bold text-lg mt-1">翠微竹海 · 满陇桂雨古茶坊</h4>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FOUNDER STORY SECTION */}
      <section className="relative z-10 bg-[#FAF5EF]/30 border border-[#FAF5EF]/40 backdrop-blur-lg rounded-3xl p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="story-founder">
        
        {/* Asymmetric layout: Image on the Left */}
        <div className="lg:col-span-5 relative order-last lg:order-first">
          <div className="absolute inset-0 border-2 border-[#C5A880]/30 rounded-2xl transform translate-x-3 translate-y-3 z-0"></div>
          <div 
            onClick={() => setShowChefModal(true)}
            className="relative z-10 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-[#2D4530]/15 cursor-pointer group/chef overflow-hidden"
            title="点击查看主厨档案"
          >
            <img 
              src={chefMoChenImg} 
              alt="Baker Chef Mo Chen" 
              className="w-full h-full object-cover object-top filter grayscale contrast-110 hover:grayscale-0 group-hover/chef:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Elegant hover seal prompt */}
            <div className="absolute inset-0 bg-[#1E3821]/40 opacity-0 group-hover/chef:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2 text-white p-4">
              <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm animate-pulse">
                <span className="text-xl font-serif text-[#C5A880]">✦</span>
              </div>
              <span className="text-xs tracking-widest font-serif font-medium">点击开启主厨秘辛故事</span>
              <span className="text-[9px] font-mono opacity-60">CLICK TO UNLOCK BIOGRAPHY</span>
            </div>
          </div>
          <div 
            onClick={() => setShowChefModal(true)}
            className="absolute -bottom-4 right-4 bg-[#1E3821] text-[#FCFAF7] font-serif py-3.5 px-6 rounded-xl shadow-lg leading-tight text-left cursor-pointer hover:bg-[#2F5233] transition-colors group z-20"
          >
            <p className="text-[#C5A880] text-xs uppercase font-mono tracking-wider font-bold">FOUNDER & MASTER PASTRY CHEF</p>
            <h4 className="text-lg font-bold mt-1 flex items-center gap-1.5 text-white">
              陈默 · Mo Chen
              <span className="text-xs font-sans text-[#C5A880] group-hover:translate-x-1 transition-transform inline-block">➔</span>
            </h4>
            <p className="text-[10px] text-[#FCFAF7]/50 mt-1">曾在日本京都宇治二十载研造春茶点食 · 点击查看详情</p>
          </div>
        </div>

        {/* Story Text Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <p className="text-xs text-[#C5A880] uppercase tracking-widest font-semibold font-mono">FOUNDER&apos;S JOURNEY</p>
          <h2 className="font-serif text-3xl font-bold text-[#1E3821]">从茶筅击拂，到手作千层的二十载风霜</h2>
          <div className="w-12 h-0.5 bg-[#C5A880]"></div>
          
          <div className="space-y-4 text-xs md:text-sm text-[#2C312E]/70 leading-relaxed font-sans font-light">
            <p>
              陈师傅在京都宇治百年老铺「茶之道」担任点茶助教开始，对茶筅在冷水与沸水之间打出泡沫那轻盈沙沙声感到着迷。回国后，他在杭州西子湖畔满觉陇创办了这间翠心手作坊。
            </p>
            <p>
              为了攻克在传统烤制甜点中保留原茶鲜青香气、克服高烤制温度带来的青绿叶绿素氧化变黄这一业界难题，陈师傅和他的核心研发团队历时五年，尝试了700多款配方。
            </p>
            <p>
              “甜点绝非糖分的机械堆砌，茶筅击拂而出的细水雾，手工薄得能透出光的21层黄金温度，一抹微苦，才是茶食与品茗的至高敬意。”陈默写道。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2F5233]/15">
            <div className="flex items-start space-x-3">
              <span className="text-2xl text-[#C5A880] font-bold">#21</span>
              <div>
                <h5 className="font-semibold text-[#1E3821] text-xs">手裁多层千层极限</h5>
                <p className="text-[10px] text-[#2C312E]/50 mt-0.5">厚不越0.3mm，饼皮透光</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl text-[#C5A880] font-bold">#100%</span>
              <div>
                <h5 className="font-semibold text-[#1E3821] text-xs">丸久小山园原产若竹</h5>
                <p className="text-[10px] text-[#2C312E]/50 mt-0.5">空运采购，石磨磨碎极细腻</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. CORE PHILOSOPHIES BENTO GRID */}
      <section className="relative z-10 space-y-12" id="story-philosophies">
        <div className="text-center md:text-left space-y-3">
          <p className="text-xs text-[#C5A880] tracking-widest uppercase font-semibold font-mono">BRAND PILLARS</p>
          <h2 className="font-serif text-3xl font-bold text-[#1E3821]">品牌核心法门</h2>
          <p className="text-sm text-[#2C312E]/50 max-w-lg font-light leading-relaxed">
            三个执守，筑起我们在西子客间的口碑。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left font-sans">
          
          <MouseTrailCard 
            icon={<Leaf className="w-6 h-6" />}
            title="源起宇治 · 顶级茶产地"
            description="坚持使用丸久小山园直供，原色石磨若竹、青岚与五十铃特浓。极细微的颗粒与天生温凉的气温，是廉价茶替代品永远无法企及的碧绿真纯。"
          />

          <MouseTrailCard 
            icon={<Compass className="w-6 h-6" />}
            title="西泠印社の寂 · 侘寂美学"
            description="从古老的印石篆刻与天然粗陶烧制里寻找器皿与装帧的设计灵感。不追求亮丽繁复，我们坚持朴素、略带微瑕的天然器皿，静雅素和。"
          />

          <MouseTrailCard 
            icon={<Sparkles className="w-6 h-6" />}
            title="满觉陇之风 · 纯原配比"
            description="坚持选用法国伊斯尼黄油、爱乐薇淡乳脂和纯有机海藻糖，以健康与素真解腻为宗旨。将茶的醇香和奶油的乳香打散交融，每一口都极其轻薄。"
          />

        </div>
      </section>

      {/* Chef Biography Detail Interactive Overlay Modal */}
      {showChefModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/60 transition-all duration-300"
          id="chef-bio-modal"
          onClick={() => setShowChefModal(false)}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-[#FCFAF7]/80 backdrop-blur-xl text-[#1E3821] max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[#2F5233]/10 flex flex-col md:flex-row relative max-h-[90vh] md:max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowChefModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#1E3821] shadow-md flex items-center justify-center z-30 transition-all hover:scale-110 active:scale-95 border border-[#2F5233]/10"
              aria-label="关闭"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image banner & quick descriptors */}
            <div className="w-full md:w-[42%] bg-[#1E3821] relative min-h-[300px] md:min-h-full flex flex-col justify-end p-8 text-white overflow-hidden shrink-0">
              {/* Background portrait */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={chefMoChenImg} 
                  alt="Chef Mo Chen Portrait" 
                  className="w-full h-full object-cover object-top filter contrast-110 brightness-90 transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C321E] via-[#1E3821]/50 to-transparent z-10" />
              </div>

              {/* Quick credentials on top of dark overlay */}
              <div className="relative z-20 space-y-3 mt-auto">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#C5A880] font-bold bg-[#C5A880]/20 border border-[#C5A880]/30 px-2.5 py-1 rounded-md inline-block">
                  二十载研茶功底
                </span>
                <h3 className="font-serif text-3xl font-black tracking-wide text-white">陈默 / Mo Chen</h3>
                <p className="text-xs text-[#FCFAF7]/85 font-sans font-light leading-relaxed">
                  “茶之广袤，藏于毫厘。21层的千层薄皮，不仅是温度的刻度，更是静雅心跳的结晶。”
                </p>
              </div>
            </div>

            {/* Right Column: Life History Timeline and philosophy */}
            <div className="w-full md:w-[58%] p-6 md:p-8 space-y-6 overflow-y-auto">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#C5A880] tracking-widest font-bold block">
                  CHEF PROFILE & BIOGRAPHY
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#1E3821]">主厨 · 匠心生平与名字简介</h4>
                <div className="w-16 h-0.5 bg-[#C5A880]" />
              </div>

              {/* Introduction Details */}
              <div className="space-y-2 text-xs md:text-sm text-[#2C312E]/85 leading-relaxed font-sans font-light">
                <p>
                  <strong>陈默（Mo Chen）</strong>师傅是杭州翠心手作「Urban Sanctuary」的创始人与现任主厨总监。自幼耳濡目染杭州钱塘茶礼，后负笈重洋深造。他毕生致力于探索中国原叶名茶的“微苦艺术”与西方高级烘焙和手工甜品温度学的破壁融合。
                </p>
              </div>

              {/* Historical Timeline */}
              <div className="space-y-4">
                <h5 className="text-xs uppercase font-mono tracking-wider font-extrabold text-[#C5A880] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" /> 
                  二十年茶道千层修行轨迹
                </h5>
                
                <div className="border-l border-[#2F5233]/20 pl-4 space-y-4 text-left">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#C5A880] border border-white" />
                    <span className="text-[10px] font-mono text-[#C5A880] tracking-wider block leading-none font-bold">2004 — 2008 / 起航京都</span>
                    <h6 className="font-serif text-xs font-bold text-[#1E3821] mt-1">负笈东瀛，专攻艺术美术与和果子重组</h6>
                    <p className="text-[11px] text-[#2C312E]/75 font-light mt-0.5">
                      赴京都工艺美术大学深造，研习传统和果子（Wagashi）质地学与西方西点分子融合工程，主张将茶味揉进西方烘焙。
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#2F5233] border border-white" />
                    <span className="text-[10px] font-mono text-[#2F5233] tracking-wider block leading-none font-bold">2008 — 2018 / 百年砥砺</span>
                    <h6 className="font-serif text-xs font-bold text-[#1E3821] mt-1">宇治百年老铺「茶之道」首位外籍茶点助教</h6>
                    <p className="text-[11px] text-[#2C312E]/75 font-light mt-0.5">
                      通过严苛的石磨若竹细度磨炼及十段茶筅操打水控温盲测，不仅掌握顶级春茶千层的恒温起酥饼法，更成店中外籍助教第一人。
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#C5A880] border border-white" />
                    <span className="text-[10px] font-mono text-[#C5A880] tracking-wider block leading-none font-bold">2018 — 至今 / 钱塘翠微</span>
                    <h6 className="font-serif text-xs font-bold text-[#1E3821] mt-1">重回钱塘满觉陇创设「翠心」，首创“微苦代金”流派</h6>
                    <p className="text-[11px] text-[#2C312E]/75 font-light mt-0.5">
                      经过700余次配比修正，独创非高温原叶抗固色秘方，用手工薄如透光的21层饼皮，将千层工序升华为艺术体验。
                    </p>
                  </div>
                </div>
              </div>

              {/* Master Quote */}
              <div className="bg-[#2F5233]/5 rounded-xl p-4 border-l-4 border-[#2F5233] space-y-1">
                <span className="text-xs text-[#2F5233] font-serif font-bold italic block">主厨誓言 / Mastery Philosophy</span>
                <p className="text-xs text-[#2C312E]/80 leading-relaxed font-sans font-light italic">
                  “机械高糖永远无法传达双手一瞬间的热忱与沉思。我们在这里慢下来执守这0.3mm薄饼温度，只为将茶筅拂过的沙沙风雨原原本本地呈献给期待安宁的你。”
                </p>
              </div>

              {/* Close Button UI below for convenience */}
              <div className="pt-2 flex justify-end">
                <button 
                  onClick={() => setShowChefModal(false)}
                  className="bg-[#1E3821] text-[#FCFAF7] hover:bg-[#C5A880] hover:text-white px-5 py-2 rounded-full font-serif text-xs tracking-wider transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  致敬匠心 · 关上此页
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      </motion.div>
    </div>
  );
}
