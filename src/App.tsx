/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Navigation, 
  MapPin, 
  Phone, 
  User, 
  ChevronRight, 
  Star, 
  Clock, 
  Shield, 
  Zap, 
  Car, 
  ArrowRight,
  Menu,
  X,
  MousePointer2,
  Instagram,
  MessageCircle
} from 'lucide-react';

// --- Components ---

const Speedometer = ({ speed }: { speed: number }) => {
  const rotation = (speed / 180) * 240 - 120; // -120 to 120 degrees
  
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-neon-yellow/50 rotate-[-45deg]"></div>
      
      {/* Ticks */}
      <div className="absolute inset-0">
        {[...Array(19)].map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 left-1/2 -translate-x-1/2 h-full py-2"
            style={{ transform: `rotate(${i * 13.33 - 120}deg)` }}
          >
            <div className={`w-0.5 h-3 ${i % 3 === 0 ? 'bg-neon-yellow h-5' : 'bg-white/20'}`}></div>
          </div>
        ))}
      </div>

      {/* Needle */}
      <motion.div 
        className="absolute w-1 h-32 md:h-40 bg-neon-yellow origin-bottom rounded-full z-10"
        style={{ bottom: '50%' }}
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-neon-yellow rounded-full blur-sm"></div>
      </motion.div>

      {/* Center Cap */}
      <div className="absolute w-8 h-8 bg-dark-bg border-4 border-neon-yellow rounded-full z-20 flex items-center justify-center">
        <div className="w-2 h-2 bg-neon-yellow rounded-full animate-pulse"></div>
      </div>

      {/* Speed Display */}
      <div className="absolute bottom-12 text-center">
        <div className="text-4xl md:text-5xl font-bold font-mono text-neon-yellow">
          {Math.round(speed)}
        </div>
        <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">KM/H</div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 flex gap-8 text-[10px] font-mono text-white/30">
        <div className="flex flex-col items-center">
          <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden mb-1">
            <motion.div 
              className="h-full bg-neon-green" 
              animate={{ width: `${Math.max(20, 100 - speed/2)}%` }}
            />
          </div>
          FUEL
        </div>
        <div className="flex flex-col items-center">
          <div className="text-neon-yellow font-bold text-lg leading-none mb-1">
            {speed > 120 ? '5' : speed > 80 ? '4' : speed > 40 ? '3' : speed > 10 ? '2' : '1'}
          </div>
          GEAR
        </div>
      </div>
    </div>
  );
};

const RoadSign = ({ title, description, index }: { title: string, description: string, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-24`}
    >
      <div className="w-1/2 text-right">
        {index % 2 === 0 && (
          <>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/60 text-sm max-w-xs ml-auto">{description}</p>
          </>
        )}
      </div>
      
      <div className="relative flex flex-col items-center">
        <div className="w-1 bg-white/10 h-32 absolute top-0 -z-10"></div>
        <div className="w-12 h-12 rounded-lg bg-neon-yellow flex items-center justify-center shadow-[0_0_20px_rgba(243,255,0,0.4)] z-10">
          <span className="font-bold text-dark-bg">0{index + 1}</span>
        </div>
      </div>

      <div className="w-1/2 text-left">
        {index % 2 !== 0 && (
          <>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/60 text-sm max-w-xs">{description}</p>
          </>
        )}
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ name, review, rating }: { name: string, review: string, rating: number }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-8 rounded-3xl border border-white/5"
    >
      <div className="flex gap-1 mb-4 text-neon-yellow">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} />
        ))}
      </div>
      <p className="text-white/70 italic mb-6 leading-relaxed">"{review}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-neon-yellow">
          {name.charAt(0)}
        </div>
        <div className="text-sm font-bold">{name}</div>
      </div>
    </motion.div>
  );
};

const PackageCard = ({ type, price, features, color, image }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-card p-8 rounded-3xl relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] -z-10 opacity-20`} style={{ backgroundColor: color }}></div>
      
      <div className="mb-10 relative z-10">
        <div className="text-xs uppercase tracking-widest text-white/40 mb-1 font-bold">{type}</div>
        <div className="text-4xl font-bold text-white">₹{price}</div>
      </div>

      <div className="relative h-56 my-8 flex items-center justify-center">
        <motion.img 
          src={image} 
          alt={type}
          className="max-h-full max-w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20"
          whileHover={{ scale: 1.05, rotate: -2 }}
        />
      </div>

      <ul className="space-y-4 mb-8 relative z-10">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-sm text-white/70">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></div>
            {f}
          </li>
        ))}
      </ul>

      <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white hover:text-dark-bg transition-all duration-300">
        SELECT RIDE
      </button>
    </motion.div>
  );
};

const SteeringWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !wheelRef.current) return;
    
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    setRotation(angle + 90);
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative w-64 h-32 bg-white/5 rounded-t-full border-t border-white/10 flex items-end justify-center overflow-hidden">
        <motion.div 
          className="w-12 h-20 bg-neon-yellow rounded-lg shadow-[0_0_30px_rgba(243,255,0,0.5)]"
          animate={{ x: rotation / 5, rotate: rotation / 10 }}
        >
          <div className="w-full h-1 bg-white/20 mt-2"></div>
          <div className="w-full h-1 bg-white/20 mt-2"></div>
        </motion.div>
      </div>

      <div 
        ref={wheelRef}
        className="relative w-64 h-64 md:w-80 md:h-80 cursor-grab active:cursor-grabbing"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleMouseMove}
      >
        <motion.div 
          className="w-full h-full rounded-full border-[16px] border-white/10 flex items-center justify-center relative"
          animate={{ rotate: rotation }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {/* Spokes */}
          <div className="absolute w-full h-4 bg-white/10"></div>
          <div className="absolute w-4 h-1/2 bg-white/10 top-1/2 -translate-y-1/2"></div>
          
          {/* Center */}
          <div className="w-24 h-24 rounded-full bg-card-bg border-4 border-white/10 flex items-center justify-center shadow-inner">
            <div className="text-white/20 font-bold tracking-widest text-[10px]">DRIVE</div>
          </div>

          {/* Grip Indicators */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-2 bg-neon-yellow rounded-full blur-[2px]"></div>
        </motion.div>
        
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/30 uppercase tracking-widest font-bold flex items-center gap-2">
          <MousePointer2 size={12} /> Drag to steer
        </div>
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div className={`relative transition-colors duration-300 ${isHovering ? 'text-neon-green' : 'text-neon-yellow'}`}>
        <Car size={32} fill="currentColor" fillOpacity={0.2} strokeWidth={1.5} />
        {/* Headlights effect */}
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 flex flex-col gap-2 opacity-50">
          <div className={`w-4 h-4 rounded-full blur-md transition-colors ${isHovering ? 'bg-neon-green' : 'bg-neon-yellow'}`}></div>
          <div className={`w-4 h-4 rounded-full blur-md transition-colors ${isHovering ? 'bg-neon-green' : 'bg-neon-yellow'}`}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [speed, setSpeed] = useState(0);
  const [isEngineStarted, setIsEngineStarted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isEngineStarted) {
      interval = setInterval(() => {
        setSpeed(prev => {
          if (prev < 160) return prev + Math.random() * 5;
          return prev - Math.random() * 2;
        });
      }, 100);
    } else {
      setSpeed(prev => Math.max(0, prev - 10));
    }
    return () => clearInterval(interval);
  }, [isEngineStarted]);

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-neon-yellow selection:text-dark-bg overflow-x-hidden">
      <CustomCursor />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center bg-gradient-to-b from-dark-bg to-transparent">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-neon-yellow flex items-center justify-center shadow-[0_0_15px_rgba(243,255,0,0.4)] transition-transform group-hover:rotate-12">
            <Car className="text-dark-bg" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tighter">INDIA<span className="text-neon-yellow"> MOTOR</span></span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-white/60">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-dark-bg transition-all" title="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-dark-bg transition-all" title="WhatsApp">
            <MessageCircle size={20} />
          </a>
          <a href="#booking" className="ml-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-dark-bg transition-all">BOOK NOW</a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-dark-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-2xl font-bold"
          >
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
              <Instagram size={24} /> INSTAGRAM
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
              <MessageCircle size={24} /> WHATSAPP
            </a>
            <a href="#booking" onClick={() => setIsMenuOpen(false)} className="text-neon-yellow">BOOK NOW</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 pt-24 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="w-full md:w-1/2 z-10 text-center md:text-left mb-12 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-yellow/10 border border-neon-yellow/20 text-neon-yellow text-[15px] font-bold tracking-widest uppercase mb-6">
              <Zap size={18} /> कार चलाना सीखिये
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              Learn Driving.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-yellow to-neon-green">Master Indian Roads.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-md mb-10 leading-relaxed">
              India Motor Training School provides expert guidance to help you navigate Indian roads with confidence and safety.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button 
                onClick={() => setIsEngineStarted(!isEngineStarted)}
                className={`group relative px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 overflow-hidden ${isEngineStarted ? 'bg-neon-green text-dark-bg' : 'bg-neon-yellow text-dark-bg shadow-[0_0_30px_rgba(243,255,0,0.3)]'}`}
              >
                <div className="relative z-10 flex items-center gap-3">
                  {isEngineStarted ? 'ENGINE RUNNING' : 'START ENGINE'}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <div className="flex items-center gap-4 text-white/40 text-sm font-semibold">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-dark-bg bg-white/10 overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <span>10k+ Students Certified</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-24 bg-neon-yellow/10 blur-[100px] rounded-full"></div>
            <Speedometer speed={speed} />
          </motion.div>
        </div>
      </section>

      {/* Road Journey Section */}
      <section id="journey" className="py-32 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center mb-24 relative">
          {/* Ribbon Title */}
          <div className="w-full md:w-1/2 bg-neon-yellow py-10 px-6 md:pl-24 relative z-10 shadow-[0_10px_40px_rgba(243,255,0,0.2)]">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-7xl font-black text-dark-bg uppercase tracking-tighter italic leading-none">
                Your Road<br />Journey
              </h2>
              <p className="text-dark-bg/60 mt-4 max-w-xs font-bold uppercase tracking-widest text-[10px]">
                A structured path from total beginner to a licensed, confident driver.
              </p>
            </motion.div>
            {/* Ribbon Slant/Tail */}
            <div className="absolute top-0 right-0 bottom-0 w-16 bg-neon-yellow translate-x-1/2 skew-x-[-15deg] origin-top hidden md:block"></div>
          </div>

          {/* Road Illusion Section */}
          <div className="w-full md:w-1/2 h-48 relative flex items-center justify-center overflow-hidden bg-white/5 border-y border-white/10 mt-8 md:mt-0">
            {/* Moving Road Lines (Two lanes) */}
            <div className="absolute inset-0 flex flex-col justify-center gap-16 overflow-hidden">
              <motion.div 
                animate={{ x: ["-50%", "0%"] }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="h-0.5 w-[200%] border-t-2 border-dashed border-white/10"
              ></motion.div>
              <motion.div 
                animate={{ x: ["-50%", "0%"] }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="h-0.5 w-[200%] border-t-2 border-dashed border-white/10"
              ></motion.div>
            </div>
            
            <div className="relative flex items-center gap-6 z-10">
              {/* Car with Vibration and Orientation Fix */}
              <motion.div
                animate={{ 
                  y: [0, -1, 0, -2, 0],
                  rotate: [0, 0.3, 0, -0.3, 0]
                }}
                transition={{ 
                  duration: 0.15, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="relative"
              >
                <div className="absolute -inset-8 bg-neon-yellow/10 blur-3xl rounded-full animate-pulse"></div>
                {/* Scale-x-[-1] to flip car to face left */}
                <Car size={100} className="text-neon-yellow drop-shadow-[0_0_20px_rgba(243,255,0,0.6)] scale-x-[-1]" strokeWidth={1.5} />
                {/* Headlights (pointing left) */}
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-20 bg-gradient-to-r from-neon-yellow/30 to-transparent blur-2xl rounded-full rotate-180"></div>
              </motion.div>

              <div className="flex flex-col">
                <motion.span 
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-neon-yellow font-black italic tracking-tighter text-4xl leading-none"
                >
                  IMTS
                </motion.span>
                <span className="text-white/20 font-bold text-[10px] tracking-[0.4em]">Rewari</span>
              </div>
            </div>

            {/* Speed Blur Particles (more of them) */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "120%", y: Math.random() * 100 + "%" }}
                animate={{ x: "-120%" }}
                transition={{ 
                  duration: Math.random() * 0.4 + 0.1, 
                  repeat: Infinity, 
                  delay: Math.random() * 2,
                  ease: "linear" 
                }}
                className="absolute h-[1px] w-16 bg-white/20"
              />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative px-6 md:px-0">
          {/* Central Road Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/5 border-x border-dashed border-white/10 hidden md:block"></div>
          
          <RoadSign 
            index={0}
            title="Basics & Controls"
            description="Master the steering, pedals, and dashboard indicators in a safe, controlled environment."
          />
          <RoadSign 
            index={1}
            title="Traffic Confidence"
            description="Learn to navigate city streets, intersections, and busy roundabouts with ease."
          />
          <RoadSign 
            index={2}
            title="Parking Mastery"
            description="Parallel, reverse, and tight-spot parking techniques made simple with our pro tips."
          />
          <RoadSign 
            index={3}
            title="RTO License Ready"
            description="Complete assistance with RTO documentation and final road tests to get your license hassle-free."
          />
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-32 px-6 md:px-24 bg-white/[0.02]">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Training Package</h2>
          <p className="text-white/40">A single, comprehensive course designed to make you a pro.</p>
        </div>

        <div className="flex justify-center max-w-6xl mx-auto">
          <div className="w-full max-w-md">
            <PackageCard 
              type="Complete Driving Course"
              price="5000"
              color="#f3ff00"
              image="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400"
              features={[
                "5km Daily Training Session",
                "Total 110 km Coverage",
                "4 Basic Car Maintenance Classes",
                "Training on Hatchback & SUV",
                "RTO License Assistance"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section id="simulator" className="py-32 px-6 md:px-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-yellow/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-20 max-w-6xl mx-auto">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Why Choose Us?</h2>
            <p className="text-lg text-white/50 mb-10 leading-relaxed">
              Experience our training methodology right here. Use the interactive steering wheel to see how our digital-first approach helps you visualize road maneuvers before you even step into a car.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-neon-yellow mb-1 font-bold text-xl">98%</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Pass Rate</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-neon-green mb-1 font-bold text-xl">12k+</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Lessons Done</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-colors">
                <Shield className="text-neon-yellow shrink-0 group-hover:scale-110 transition-transform" size={20} />
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold leading-tight">Best Safety<br/>Measures</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-colors">
                <User className="text-neon-green shrink-0 group-hover:scale-110 transition-transform" size={20} />
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold leading-tight">Experienced<br/>Instructors</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-colors col-span-2">
                <Zap className="text-neon-yellow shrink-0 group-hover:scale-110 transition-transform" size={20} />
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Affordable Fee Structure</div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <SteeringWheel />
          </div>
        </div>
      </section>


      {/* Training Areas Section - Road Ribbon */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Road Texture */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-full h-96 bg-white/5 skew-y-[-1deg]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-24 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Where We Train</h2>
            <div className="h-1.5 w-24 bg-neon-yellow mx-auto"></div>
          </div>

          <div className="relative">
            {/* Road Center Line (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 hidden md:block z-0">
              <div className="w-full h-full border-t border-dashed border-neon-yellow/20"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 relative z-10">
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-10 md:border-r-0 md:rounded-l-3xl backdrop-blur-sm relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-yellow scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                <div className="w-16 h-16 rounded-2xl bg-neon-yellow/10 flex items-center justify-center mb-8 group-hover:bg-neon-yellow/20 transition-colors">
                  <Navigation className="text-neon-yellow" size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight italic">City Driving</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  Mastering the chaos of urban traffic, pedestrians, and tight intersections in Rewari's busiest streets.
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="text-[10px] font-black tracking-[0.3em] text-neon-yellow/40">ZONE 01</div>
                  <div className="h-px flex-1 bg-white/5"></div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-10 md:border-x-0 backdrop-blur-sm relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                <div className="w-16 h-16 rounded-2xl bg-neon-green/10 flex items-center justify-center mb-8 group-hover:bg-neon-green/20 transition-colors">
                  <Car className="text-neon-green" size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight italic">Highway Practice</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  Learning high-speed merging, lane changes, and maintaining focus on long-distance highway stretches.
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="text-[10px] font-black tracking-[0.3em] text-neon-green/40">ZONE 02</div>
                  <div className="h-px flex-1 bg-white/5"></div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-10 md:border-l-0 md:rounded-r-3xl backdrop-blur-sm relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-yellow scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                <div className="w-16 h-16 rounded-2xl bg-neon-yellow/10 flex items-center justify-center mb-8 group-hover:bg-neon-yellow/20 transition-colors">
                  <MapPin className="text-neon-yellow" size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight italic">Parking Practice</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  Dedicated quiet zones for practicing parallel, reverse, and tight-spot parking maneuvers with precision.
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="text-[10px] font-black tracking-[0.3em] text-neon-yellow/40">ZONE 03</div>
                  <div className="h-px flex-1 bg-white/5"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Students Say</h2>
              <p className="text-white/40">Real feedback from confident drivers who started their journey with us.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neon-yellow/10 border border-neon-yellow/20 text-neon-yellow text-xs font-bold">
              <Star size={14} fill="currentColor" />
              <span>4.9/5 Average Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TestimonialCard 
              name="Arjun Mehta"
              rating={5}
              review="The instructors are incredibly patient. I was terrified of driving in Rewari traffic, but they built my confidence step-by-step. Highly recommended!"
            />
            <TestimonialCard 
              name="Deepika Gohil"
              rating={5}
              review="Best driving school in the area. The cars are well-maintained and the 110km package is very comprehensive. I got my license without any issues."
            />
            <TestimonialCard 
              name="Karan Solanki"
              rating={5}
              review="Very professional approach. The basic maintenance classes were a great addition—I actually know how to change a tire now!"
            />
            <TestimonialCard 
              name="Meera Vala"
              rating={4}
              review="Flexible timings really helped me as a working professional. The teaching style is very practical and road-focused."
            />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-32 px-6 md:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Drive?</h2>
            <p className="text-white/40">Fill out your application and book your first lesson today.</p>
          </div>

          <div className="glass-card p-10 md:p-16 rounded-[40px] relative overflow-hidden">
            {/* License Style Header */}
            <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-8">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-neon-yellow font-bold mb-1">Application Form</div>
                <h3 className="text-2xl font-bold">DRIVING LICENSE PREP</h3>
              </div>
              <div className="w-20 h-24 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                <User className="text-white/20" size={32} />
              </div>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-neon-yellow transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-neon-yellow transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Experience Level</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-neon-yellow transition-colors appearance-none">
                  <option className="bg-dark-bg">Total Beginner</option>
                  <option className="bg-dark-bg">Some Experience</option>
                  <option className="bg-dark-bg">Refresher Course</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Preferred Time</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-neon-yellow transition-colors appearance-none">
                  <option className="bg-dark-bg">Morning (8AM - 12PM)</option>
                  <option className="bg-dark-bg">Afternoon (12PM - 4PM)</option>
                  <option className="bg-dark-bg">Evening (4PM - 8PM)</option>
                </select>
              </div>
              
              <div className="md:col-span-2 pt-4">
                <button className="w-full py-6 rounded-2xl bg-neon-yellow text-dark-bg font-bold text-lg shadow-[0_0_30px_rgba(243,255,0,0.3)] hover:scale-[1.02] transition-transform active:scale-95">
                  BOOK YOUR FIRST DRIVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-20 px-6 md:px-24 border-t border-white/5 bg-dark-bg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neon-yellow flex items-center justify-center">
                <Car className="text-dark-bg" size={16} />
              </div>
              <span className="text-lg font-bold tracking-tighter">INDIA<span className="text-neon-yellow"> MOTOR</span></span>
            </div>
            <p className="text-white/30 text-sm">कार चलाना सीखिये</p>
            <p className="text-[10px] text-white/20 mt-2 max-w-[200px]">Rewari, Haryana 123401 | +91 94663 85062</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-neon-yellow"
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
            <div className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">System Status: Optimal</div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-right">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Working Hours</p>
              <p className="text-sm text-white/70">Mon - Sat: 6:00 AM - 7:00 PM</p>
              <p className="text-[10px] text-red-500/60 font-bold uppercase tracking-tighter">Sunday: Closed</p>
            </div>
            <a 
              href="tel:+919466385062" 
              className="px-6 py-2 rounded-xl bg-neon-green/10 border border-neon-green/20 text-neon-green text-sm font-bold hover:bg-neon-green hover:text-dark-bg transition-all flex items-center gap-2"
            >
              <Phone size={16} /> CALL US
            </a>
          </div>
        </div>
        
        <div className="text-center mt-20 text-[10px] text-white/10 uppercase tracking-widest font-bold">
          © 2026 New India Motor Training School. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
