import { useEffect, useRef, useState } from 'react';
import { FileCheck, Users, TrendingUp, Home } from 'lucide-react';
import { chiffresCles } from '../data/services';

const iconMap: { [key: string]: React.ElementType } = {
  FileCheck,
  Users,
  TrendingUp,
  Home,
};

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

interface ChiffreCardProps {
  valeur: number;
  suffixe: string;
  label: string;
  icon: string;
  delay: number;
  isVisible: boolean;
}

function ChiffreCard({ valeur, suffixe, label, icon, delay, isVisible }: ChiffreCardProps) {
  const [shouldStart, setShouldStart] = useState(false);
  const count = useCountUp(valeur, 2000, shouldStart);
  const IconComponent = iconMap[icon] || Home;

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldStart(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div className="text-center group">
      <div className="w-16 h-16 bg-[#7A9E9F]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#7A9E9F]/20 transition-colors">
        <IconComponent className="w-8 h-8 text-[#7A9E9F]" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-[#0D354E] mb-2 count-up">
        {count}
        <span className="text-[#7A9E9F]">{suffixe}</span>
      </div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

export default function ChiffresCles() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-script text-2xl text-[#7A9E9F]">Notre expérience</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D354E] mt-2">
            Chiffres clés
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Des années d'expérience et des centaines de clients satisfaits témoignent de notre engagement.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {chiffresCles.map((chiffre, index) => (
            <ChiffreCard
              key={chiffre.label}
              valeur={chiffre.valeur}
              suffixe={chiffre.suffixe}
              label={chiffre.label}
              icon={chiffre.icon}
              delay={index * 200}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
