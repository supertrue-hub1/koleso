'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingCart, Heart, Star, Eye, Cpu, HardDrive, MemoryStick, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store';
import type { Product } from '@/types/product';
import { useState, useRef } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Маппинг типов ПК
const typeLabels: Record<string, string> = {
  gaming: 'Игровой',
  workstation: 'Рабочая станция',
  creator: 'Для творчества',
  office: 'Офисный',
};

const typeColors: Record<string, { gradient: string; glow: string; border: string }> = {
  gaming: { 
    gradient: 'from-cyan-500 to-cyan-600', 
    glow: 'shadow-cyan-500/25',
    border: 'hover:border-cyan-500/40'
  },
  workstation: { 
    gradient: 'from-purple-500 to-purple-600', 
    glow: 'shadow-purple-500/25',
    border: 'hover:border-purple-500/40'
  },
  creator: { 
    gradient: 'from-pink-500 to-purple-500', 
    glow: 'shadow-pink-500/25',
    border: 'hover:border-pink-500/40'
  },
  office: { 
    gradient: 'from-gray-500 to-gray-600', 
    glow: 'shadow-gray-500/25',
    border: 'hover:border-gray-500/40'
  },
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCartStore();
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D эффект при наведении мыши
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  // Получаем первое изображение или используем placeholder
  const imageUrl = product.images[0];
  const hasValidImage = imageUrl && !imageError;
  const typeStyle = typeColors[product.type] || typeColors.gaming;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative perspective-1000"
    >
      {/* Внешнее свечение */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${typeStyle.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
      />
      
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#151515] to-[#0f0f0f] border border-white/5 ${typeStyle.border} transition-all duration-500`}>
        {/* Анимированный бордер */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.1), transparent)`,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Верхняя часть с изображением */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
          {/* Реальное изображение или placeholder */}
          {hasValidImage ? (
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
            </motion.div>
          ) : (
            /* Placeholder при ошибке загрузки */
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 150" className="w-3/4 h-3/4 opacity-60">
                <rect x="40" y="20" width="120" height="110" rx="5" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30" />
                <motion.line
                  x1="50" y1="35" x2="150" y2="35"
                  stroke="#00f0ff" strokeWidth="2"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <circle cx="100" cy="80" r="25" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.5" />
                <circle cx="100" cy="80" r="20" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.3" />
                <rect x="55" y="95" width="90" height="15" rx="2" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1" />
              </svg>
            </div>
          )}

          {/* Оверлей при наведении */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            initial={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
          />

          {/* Быстрый просмотр при наведении */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="flex gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-black font-semibold flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Быстрый заказ
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Бейджи с анимацией появления */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            {product.isNew && (
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-semibold border-0 shadow-lg shadow-cyan-500/25">
                  <Sparkles className="w-3 h-3 mr-1" />
                  NEW
                </Badge>
              </motion.div>
            )}
            {product.originalPrice && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <Badge className="bg-red-500 text-white font-semibold border-0 shadow-lg shadow-red-500/25">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              </motion.div>
            )}
            <motion.div
              initial={{ scale: 0, x: -20 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              <Badge className={`bg-gradient-to-r ${typeStyle.gradient} text-white font-medium border-0 shadow-lg ${typeStyle.glow}`}>
                {typeLabels[product.type]}
              </Badge>
            </motion.div>
          </div>

          {/* Кнопки действий с улучшенной анимацией */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <motion.button
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              whileHover={{ scale: 1.1, x: 0 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                isLiked 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 scale-110' 
                  : 'bg-black/50 text-white hover:bg-white/20'
              }`}
            >
              <motion.div
                animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </motion.div>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              whileHover={{ scale: 1.1, x: 0 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Градиент снизу */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#151515] to-transparent pointer-events-none" />
        </div>

        {/* Контент */}
        <div className="p-5 space-y-4" style={{ transform: 'translateZ(20px)' }}>
          {/* Название и рейтинг */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <motion.h3 
                className="text-lg font-bold text-white group-hover:text-transparent bg-clip-text bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300"
              >
                {product.name}
              </motion.h3>
              <p className="text-sm text-gray-400 mt-1">{product.shortDescription}</p>
            </div>
            <motion.div 
              className="flex items-center gap-1 text-yellow-400 shrink-0 bg-yellow-500/10 px-2 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
            </motion.div>
          </div>

          {/* Характеристики с hover эффектами */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Cpu, label: 'CPU', value: product.specs.cpu.split(' ').slice(-1), color: 'cyan' },
              { icon: MemoryStick, label: 'GPU', value: product.specs.gpu.split(' ').slice(-2).join(' '), color: 'purple' },
              { icon: HardDrive, label: 'RAM', value: `${product.specs.ramSize}GB`, color: 'green' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.1)' }}
                className={`flex flex-col items-center p-2 rounded-lg bg-white/5 transition-all duration-200 cursor-pointer`}
              >
                <item.icon className={`w-4 h-4 text-${item.color}-400 mb-1`} />
                <span className="text-[10px] text-gray-400">{item.label}</span>
                <span className="text-xs text-white font-medium text-center truncate w-full">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Цена и кнопка */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <motion.div 
              className="flex items-baseline gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {product.price.toLocaleString('ru-RU')}
              </span>
              <span className="text-gray-400">₽</span>
              {product.originalPrice && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-sm text-gray-500 line-through"
                >
                  {product.originalPrice.toLocaleString('ru-RU')}
                </motion.span>
              )}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="sm"
                onClick={handleAddToCart}
                className={`bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold shadow-lg ${typeStyle.glow}`}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Купить
              </Button>
            </motion.div>
          </div>

          {/* Статус наличия */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.span 
              className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`}
              animate={product.inStock ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-gray-400">
              {product.inStock ? 'В наличии' : 'Под заказ'}
            </span>
            {product.reviewsCount > 0 && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-xs text-gray-400">
                  {product.reviewsCount} отзывов
                </span>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
