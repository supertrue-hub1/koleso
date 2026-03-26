'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Zap, Shield, Truck, ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ParticleField, ParticleNetwork } from '@/components/effects/ParticleField';
import { GlitchText, MorphingText } from '@/components/effects/TextEffects';
import { useRef } from 'react';

// Анимации
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Частицы на фоне */}
      <ParticleField count={40} />
      <ParticleNetwork count={20} />
      
      {/* Градиентные сферы с параллаксом */}
      <motion.div 
        style={{ y }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px]"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']) }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[128px]"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '70%']) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-[100px]"
      />
      
      {/* Анимированная сетка */}
      <div className="absolute inset-0 cyber-grid opacity-30">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Основной контент */}
      <motion.div
        style={{ opacity }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Бейдж с анимацией */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-sm text-gray-300"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Новая линейка 2026</span>
            </motion.span>
          </motion.div>

          {/* Заголовок */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Создай машину</span>
            <br />
            <GlitchText 
              text="своей мечты" 
              className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            />
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Профессиональная сборка{' '}
            <MorphingText 
              words={['игровых ПК', 'рабочих станций', 'мощных систем', 'кастомных билдов']}
              className="text-cyan-400 font-semibold"
            />
            <br />
            Индивидуальный подход, премиальные комплектующие,{' '}
            <span className="text-purple-400 font-semibold">гарантия до 5 лет</span>.
          </motion.p>

          {/* Кнопки CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold text-lg px-8 py-6 overflow-hidden group"
                asChild
              >
                <Link href="#configurator">
                  <Zap className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Собрать ПК</span>
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5 hover:border-cyan-500/30 text-white text-lg px-8 py-6"
                asChild
              >
                <Link href="#catalog">
                  Смотреть каталог
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Преимущества */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { icon: Shield, label: 'Гарантия', value: 'до 5 лет' },
              { icon: Zap, label: 'Тестирование', value: '72 часа' },
              { icon: Truck, label: 'Доставка', value: 'по всей РФ' },
              { icon: Sparkles, label: 'Сборка', value: '1-3 дня' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <item.icon className="w-6 h-6 text-cyan-400 mb-2" />
                </motion.div>
                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{item.label}</span>
                <span className="text-sm font-semibold text-white">{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Декоративные элементы */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Свечение */}
          <motion.div 
            className="absolute inset-0 w-[350px] h-[450px] bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* SVG ПК */}
          <svg viewBox="0 0 350 450" className="w-[350px] h-[450px]">
            <defs>
              <linearGradient id="pcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            
            {/* Корпус */}
            <motion.rect x="50" y="50" width="250" height="350" rx="8" fill="none" stroke="url(#pcGrad)" strokeWidth="2"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
            
            {/* RGB полосы */}
            <motion.line x1="70" y1="80" x2="280" y2="80" stroke="#00f0ff" strokeWidth="3" filter="url(#glow)"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <motion.line x1="70" y1="100" x2="280" y2="100" stroke="#8b5cf6" strokeWidth="3" filter="url(#glow)"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
            
            {/* Вентиляторы */}
            {[0, 1].map((i) => (
              <motion.g key={i}>
                <circle cx={120 + i * 100} cy="180" r="30" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.5" />
                <motion.circle cx={120 + i * 100} cy="180" r="25" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.3"
                  animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: `${120 + i * 100}px 180px` }} />
              </motion.g>
            ))}
            
            {/* Видеокарта */}
            <motion.rect x="70" y="260" width="210" height="35" rx="3" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" strokeWidth="1" />
            
            {/* Материнская плата */}
            <motion.rect x="90" y="320" width="170" height="60" rx="2" fill="rgba(0,240,255,0.03)" stroke="#00f0ff" strokeWidth="1" />
            
            {/* RAM */}
            {[0, 1, 2, 3].map((i) => (
              <motion.rect key={i} x={130 + i * 12} y="325" width="8" height="40"
                fill={i < 2 ? 'rgba(0,240,255,0.3)' : 'rgba(139,92,246,0.3)'}
                stroke={i < 2 ? '#00f0ff' : '#8b5cf6'} strokeWidth="1"
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.2 + i * 0.1 }}
                style={{ transformOrigin: 'bottom' }} />
            ))}
          </svg>
        </motion.div>
      </motion.div>

      {/* Скролл индикатор */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#catalog"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-cyan-400 transition-colors"
        >
          <span className="text-xs mb-2">Листайте вниз</span>
          <ArrowDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
