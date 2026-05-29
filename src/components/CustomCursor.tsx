import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: string;
  x: number;
  y: number;
  type: 'powder' | 'cloud' | 'gold_spark';
  rotation: number;
  scale: number;
  destX: number;
  destY: number;
  color: string;
  opacity: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const lastTrailPos = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });

  // 1. Detect if touch is being used (mobile devices) vs fine mouse pointer
  useEffect(() => {
    const handleTouchStart = () => {
      setIsTouchDevice(true);
      document.body.classList.remove('custom-cursor-active');
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, []);

  // 2. Control mouse events & trail particle generation
  useEffect(() => {
    if (isTouchDevice) return;

    const moveMouse = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });
      posRef.current = { x, y };

      // Micro-activation: Enable custom cursor once we receive actual mouse move events
      if (!isEnabled) {
        setIsEnabled(true);
        document.body.classList.add('custom-cursor-active');
      }

      // Generate a trail of fine matcha powder sifting downwards as the user moves the mouse
      const dist = Math.hypot(x - lastTrailPos.current.x, y - lastTrailPos.current.y);
      if (dist > 14) {
        spawnTrailParticle(x, y);
        lastTrailPos.current = { x, y };
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const btn = target.closest('button');
      const link = target.closest('a');
      const input = target.closest('input') || target.closest('select') || target.closest('textarea');
      const clickableClassName = target.classList.contains('cursor-pointer') || target.closest('.cursor-pointer');
      const interactiveCard = target.closest('.interactive-card') || target.closest('[id^="product-card"]') || target.closest('.product-grid-item');
      const chefTrigger = target.closest('.group\\/chef') || target.closest('[title*="主厨"]') || target.innerText?.includes('主厨');

      const isInteractive = btn || link || input || clickableClassName || interactiveCard || chefTrigger;

      if (isInteractive) {
        setIsHovered(true);
        
        // Match specialized context texts for micro-copy interaction
        if (chefTrigger) {
          setHoverText('✦ 主厨密案');
        } else if (btn?.innerText?.includes('预约') || btn?.id?.includes('booking') || target.closest('#booking')) {
          setHoverText('✦ 静雅入席');
        } else if (btn?.innerText?.includes('加入') || btn?.innerText?.includes('购买') || btn?.innerText?.includes('袋')) {
          setHoverText('✦ 收入茶包');
        } else if (interactiveCard) {
          setHoverText('✦ 时令品鉴');
        } else if (btn || link) {
          setHoverText('✦ 探索');
        } else {
          setHoverText('✦');
        }
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    const handleMouseDown = () => {
      setIsActive(true);
      if (isEnabled) {
        spawnClickParticles();
      }
    };

    const handleMouseUp = () => {
      setIsActive(false);
    };

    // Spawn tea powder sifting drift trail
    const spawnTrailParticle = (x: number, y: number) => {
      const rand = Math.random();
      let type: 'powder' | 'cloud' | 'gold_spark' = 'powder';
      let color = '#5D8B65'; // Fresh Matcha Green

      if (rand > 0.75) {
        type = 'gold_spark';
        color = '#C5A880'; // Warm golden tea reflection star
      } else if (rand > 0.45) {
        type = 'cloud';
        color = '#8EBA9B'; // Soft, blending milky matcha tea mist
      }

      const newParticle: Particle = {
        id: `matcha-trail-${Date.now()}-${Math.random()}`,
        x: x + (Math.random() * 8 - 4),
        y: y + (Math.random() * 8 - 4),
        type,
        rotation: Math.random() * 360,
        scale: type === 'cloud' ? 0.3 + Math.random() * 0.3 : 0.15 + Math.random() * 0.3,
        destX: (Math.random() * 20 - 10),
        destY: (Math.random() * 12 + 14), // Falling downwards gracefully as if sifted and pulled by gravity
        color,
        opacity: type === 'cloud' ? 0.25 : 0.7,
      };

      setParticles((prev) => [...prev, newParticle].slice(-40));
    };

    // Click interactive burst - a beautiful splash/cloud of premium sifted matcha powder
    const spawnClickParticles = () => {
      const { x, y } = posRef.current;
      const clickParticles: Particle[] = Array.from({ length: 14 }).map((_, i) => {
        const angle = (Math.random() * 360 * Math.PI) / 180;
        const speed = 30 + Math.random() * 60;
        
        let type: 'powder' | 'cloud' | 'gold_spark' = 'powder';
        let color = '#4E8A5E'; // Rich deep matcha powder grain
        
        if (i % 3 === 0) {
          type = 'cloud';
          color = '#A3E2B5'; // Milky jade steam
        } else if (i % 4 === 1) {
          type = 'gold_spark';
          color = '#C5A880'; // Sparkling bronze glaze star
        } else if (Math.random() > 0.5) {
          color = '#1E3C25'; // Extremely dense luxurious ceremonial matcha green
        } else {
          color = '#87C596'; // Light sprout tea green
        }

        return {
          id: `matcha-click-${Date.now()}-${i}-${Math.random()}`,
          x,
          y,
          type,
          rotation: Math.random() * 360,
          scale: type === 'cloud' ? 0.5 + Math.random() * 0.5 : 0.2 + Math.random() * 0.4,
          destX: Math.cos(angle) * speed,
          destY: Math.sin(angle) * speed + 14, // Dispersed outwards then dragged down by gravity
          color,
          opacity: type === 'cloud' ? 0.35 : 0.8,
        };
      });

      setParticles((prev) => [...prev, ...clickParticles].slice(-55));
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouchDevice, isEnabled]);

  // Constantly clean up decayed / faded matcha powder particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.filter(p => {
        const parts = p.id.split('-');
        const timestamp = parseInt(parts[2] || '0');
        return Date.now() - timestamp < 900; // retain only for 900ms
      }));
    }, 100);
    return () => clearTimeout(timer);
  }, [particles]);

  if (isTouchDevice || !isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" id="matcha-powder-cursor-wrapper">
      {/* 1. Interactive Particle Trails & Explosions (Falling & Sifting Matcha Powder) */}
      <AnimatePresence>
        {particles.map((p) => {
          if (p.type === 'cloud') {
            return (
              <motion.div
                key={p.id}
                initial={{ x: p.x, y: p.y, scale: p.scale, opacity: p.opacity }}
                animate={{ 
                  x: p.x + p.destX, 
                  y: p.y + p.destY, 
                  scale: p.scale * 1.5, 
                  opacity: 0 
                }}
                transition={{ duration: 0.85, ease: "easeOut" }}
                className="absolute -ml-3 -mt-3 filter blur-[1.2px]"
                style={{ backgroundColor: p.color, width: '12px', height: '12px', borderRadius: '50%' }}
              />
            );
          } else if (p.type === 'powder') {
            return (
              <motion.div
                key={p.id}
                initial={{ x: p.x, y: p.y, rotate: p.rotation, scale: p.scale, opacity: p.opacity }}
                animate={{ 
                  x: p.x + p.destX, 
                  y: p.y + p.destY, 
                  rotate: p.rotation + 240, 
                  scale: 0, 
                  opacity: 0 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute -ml-1 -mt-1"
                style={{ color: p.color }}
              >
                {/* Organic tiny powder grain shape */}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2 C18,8 22,12 18,18 C14,24 8,20 6,14 C4,8 8,4 12,2 Z" />
                </svg>
              </motion.div>
            );
          } else {
            return (
              <motion.div
                key={p.id}
                initial={{ x: p.x, y: p.y, scale: p.scale, rotate: 0, opacity: p.opacity }}
                animate={{ 
                  x: p.x + p.destX, 
                  y: p.y + p.destY, 
                  scale: 0, 
                  rotate: 180,
                  opacity: 0 
                }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="absolute -ml-1.5 -mt-1.5"
                style={{ color: p.color }}
              >
                {/* Sparkling gold flake of luxurious Zen tea design */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
                </svg>
              </motion.div>
            );
          }
        })}
      </AnimatePresence>

      {/* 2. Outer Zen Halo Ring (Lagging & expanding elegantly) */}
      <motion.div
        className="absolute left-0 top-0 pointer-events-none rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          x: position.x,
          y: position.y,
          width: isHovered ? 68 : 36,
          height: isHovered ? 68 : 36,
          backgroundColor: isHovered ? 'rgba(47, 82, 51, 0.05)' : 'rgba(197, 168, 128, 0.02)',
          border: isHovered ? '1px solid rgba(47, 82, 51, 0.25)' : '1px solid rgba(197, 168, 128, 0.25)',
          boxShadow: isHovered ? '0 0 16px rgba(47, 82, 51, 0.1), inset 0 0 8px rgba(197, 168, 128, 0.05)' : 'none',
        }}
        animate={{
          scale: isActive ? 0.85 : 1,
        }}
        transition={{
          width: { type: "spring", stiffness: 280, damping: 25 },
          height: { type: "spring", stiffness: 280, damping: 25 },
          scale: { type: "spring", stiffness: 400, damping: 15 }
        }}
      >
        {/* Soft rotating dash circle representing traditional tea whisking motion */}
        <div 
          className="absolute inset-[2px] rounded-full border border-dashed border-[#C5A880]/30 animate-[spin_12s_linear_infinite]" 
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
        />
      </motion.div>

      {/* 3. Main Cursor Object: A traditional Japanese Chashaku (Bamboo Tea Spoon) piled with beautiful Matcha Powder */}
      <motion.div
        className="absolute left-0 top-0 transition-transform duration-75 ease-out select-none z-20"
        style={{
          x: position.x,
          y: position.y,
        }}
        animate={{
          scale: isActive ? 0.75 : isHovered ? 1.25 : 1,
          rotate: isHovered ? [0, 8, -6, 8, 0] : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 450, damping: 20 },
          rotate: isHovered 
            ? { repeat: Infinity, repeatType: "mirror", duration: 2, ease: "easeInOut" } 
            : { type: "spring", stiffness: 280, damping: 22 }
        }}
      >
        {/* Hotspot adjustment: Aligning the spoon's scooping tip precisely on coordinate (0, 0) */}
        <div className="transform -translate-x-[4px] -translate-y-[4px]">
          <svg 
            width={isHovered ? "42" : "36"} 
            height={isHovered ? "42" : "36"} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_4px_8px_rgba(30,55,35,0.25)]"
          >
            {/* Gradients for bamboo wood scoop and rich organic matcha powder mound */}
            <defs>
              <linearGradient id="matchaMound" x1="10" y1="10" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A8E2B2" />   {/* Fresh matcha light reflection */}
                <stop offset="50%" stopColor="#4A8C5E" />  {/* Authentic ceremonial green tea color */}
                <stop offset="100%" stopColor="#1E4426" /> {/* Deep shadow of rich tea powder */}
              </linearGradient>
              <linearGradient id="bambooHandle" x1="10" y1="10" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ECD39A" />   {/* Natural golden bamboo skin */}
                <stop offset="60%" stopColor="#C4A05B" />  {/* Warm aged wood grain */}
                <stop offset="100%" stopColor="#8A6B34" /> {/* Deep shadow of bamboo joint */}
              </linearGradient>
            </defs>

            {/* 1. Traditional Curved Bamboo Spoon Handle (Chashaku) */}
            <path 
              d="M 5,5 
                 C 15,10 30,30 45,55 
                 C 50,65 65,85 95,95 
                 C 97,96 95,92 90,85 
                 C 68,72 52,52 35,30 
                 C 25,18 12,8 5,5 Z" 
              fill="url(#bambooHandle)" 
            />
            {/* Bamboo Growth Joints/Nodes for realistic craftsmanship structure */}
            <path d="M 33,28 Q 38,32 30,36" stroke="#AA823E" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
            <path d="M 58,61 Q 63,65 55,69" stroke="#8A6B34" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

            {/* Spoon container outline/rim */}
            <path 
              d="M 5,5 Q 18,18 28,32" 
              stroke="#AA823E" 
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* 2. Vibrant mound of sifted Matcha Powder sitting gently on the scoop */}
            <path 
              d="M 3,4 C 8,0 18,3 24,11 C 30,19 32,28 26,30 C 18,32 10,24 6,18 C 3,13 1,8 3,4 Z" 
              fill="url(#matchaMound)" 
            />

            {/* Dusted tiny organic highlights showing sifted quality */}
            <ellipse cx="12" cy="11" rx="4.5" ry="3.5" fill="#A8E2B2" opacity="0.8" transform="rotate(-30 12 11)" />
            <circle cx="21" cy="19" r="2.5" fill="#C3ECCB" opacity="0.6" />
            
            {/* Mini particles flying/spinning off the spoon tip representing volatile, fragrant matcha powder */}
            <circle cx="28" cy="10" r="1.5" fill="#4A8C5E" />
            <circle cx="16" cy="3" r="1" fill="#87C596" />
            <circle cx="3" cy="19" r="1.2" fill="#1E4426" />

            {/* Golden luxury glint element representing top ceremony quality */}
            <polygon points="10,6 12,8 10,10 8,8" fill="#F4D03F" opacity="0.9" />
          </svg>
        </div>
      </motion.div>

      {/* 4. Elegant interactive Zen helper subtitle tag next to pointer */}
      <AnimatePresence>
        {isHovered && hoverText && (
          <motion.div
            initial={{ opacity: 0, x: 24, y: 16 }}
            animate={{ opacity: 0.95, x: 30, y: 12 }}
            exit={{ opacity: 0, x: 24, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute left-0 top-0 select-none pointer-events-none px-2.5 py-1 bg-[#1E3821]/95 text-[#FCFAF7] border border-[#C5A880]/30 rounded-md shadow-lg z-30 flex items-center space-x-1"
            style={{
              x: position.x,
              y: position.y,
            }}
          >
            <span className="font-serif text-[10px] tracking-widest leading-none font-bold text-[#C5A880]">
              {hoverText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
