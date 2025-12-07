import React, { useEffect, useRef, useState } from 'react';

// --- Entrance Animations (Scroll Triggered) ---

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur';
  duration?: number;
  fullWidth?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  className = "", 
  delay = 0, 
  direction = 'up',
  duration = 0.5,
  fullWidth = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on intersection
        // This ensures it animates BOTH when scrolling down AND up (re-entering)
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Optional: Set to false to re-animate every time it leaves view
          // Keeping it true behaves like standard AOS, setting to false makes it "always active" on scroll
          setIsVisible(false); 
        }
      },
      {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px" // Offset slightly
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(40px)';
        case 'down': return 'translateY(-40px)';
        case 'left': return 'translateX(40px)';
        case 'right': return 'translateX(-40px)';
        case 'zoom': return 'scale(0.8)';
        default: return 'none';
      }
    }
    return 'translate(0) scale(1)';
  };

  const getOpacity = () => isVisible ? 1 : 0;
  const getFilter = () => direction === 'blur' && !isVisible ? 'blur(10px)' : 'blur(0px)';

  return (
    <div
      ref={ref}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        transform: getTransform(),
        opacity: getOpacity(),
        filter: getFilter(),
        transition: `all ${duration}s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

// --- Micro-interactions (Hover) ---

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const HoverCard: React.FC<HoverCardProps> = ({ children, className = "", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        transform transition-all duration-300 ease-out
        hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-500/20
        active:scale-[0.98] active:translate-y-0
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// --- Attention Seekers (Buttons) ---

interface ShimmerButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden transition-all duration-300 transform active:scale-95
        ${className}
      `}
    >
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      <span className="relative z-20 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

// --- Text Animations ---

export const TypewriterText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  return (
    <div className={`inline-block overflow-hidden whitespace-nowrap border-r-4 border-brand-500 animate-typewriter ${className}`}>
      {text}
    </div>
  );
};