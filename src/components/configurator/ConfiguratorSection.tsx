'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Monitor, 
  MemoryStick, 
  HardDrive, 
  Box, 
  Fan, 
  Zap, 
  CircuitBoard,
  ChevronRight,
  Check,
  AlertTriangle,
  RotateCcw,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useConfiguratorStore, useCartStore } from '@/store';
import { components } from '@/data/products';
import type { Component, ComponentCategory } from '@/types/product';

// Категории комплектующих
const CATEGORIES: { 
  id: ComponentCategory; 
  label: string; 
  icon: React.ElementType;
  description: string;
  required: boolean;
}[] = [
  { id: 'cpu', label: 'Процессор', icon: Cpu, description: 'Сердце вашего ПК', required: true },
  { id: 'gpu', label: 'Видеокарта', icon: Monitor, description: 'Для игр и рендеринга', required: true },
  { id: 'ram', label: 'Память', icon: MemoryStick, description: 'Оперативная память', required: true },
  { id: 'storage', label: 'Накопитель', icon: HardDrive, description: 'SSD или NVMe', required: true },
  { id: 'motherboard', label: 'Мат. плата', icon: CircuitBoard, description: 'Основа системы', required: true },
  { id: 'case', label: 'Корпус', icon: Box, description: 'Дом для компонентов', required: true },
  { id: 'cooling', label: 'Охлаждение', icon: Fan, description: 'Система охлаждения CPU', required: true },
  { id: 'psu', label: 'Блок питания', icon: Zap, description: 'Питание системы', required: true },
];

export function ConfiguratorSection() {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('cpu');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    config, 
    totalPrice, 
    setComponent, 
    resetConfig, 
    checkCompatibility 
  } = useConfiguratorStore();
  
  const { addItem } = useCartStore();

  // Проверка совместимости
  const compatibility = checkCompatibility();

  // Фильтрация компонентов по категории и поиску
  const filteredComponents = components.filter(
    c => c.category === selectedCategory && 
    (searchQuery === '' || c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Подсчет выбранных компонентов
  const selectedCount = Object.values(config).filter(Boolean).length;
  const progress = (selectedCount / CATEGORIES.length) * 100;

  // Категория для отображения
  const currentCategory = CATEGORIES.find(c => c.id === selectedCategory);

  // Добавление кастомной сборки в корзину
  const handleAddToCart = () => {
    // Создаем временный продукт из конфигурации
    const customProduct = {
      id: `custom-${Date.now()}`,
      name: 'Кастомная сборка',
      slug: `custom-${Date.now()}`,
      type: 'gaming' as const,
      description: 'Ваша уникальная сборка',
      shortDescription: 'Индивидуальная конфигурация',
      price: totalPrice,
      images: [],
      specs: {
        cpu: config.cpu?.name || 'Не выбрано',
        cpuCores: 0,
        cpuThreads: 0,
        gpu: config.gpu?.name || 'Не выбрано',
        gpuMemory: 0,
        ram: config.ram?.name || 'Не выбрано',
        ramSize: 0,
        ramType: 'DDR5' as const,
        storage: config.storage?.name || 'Не выбрано',
        storageSize: 0,
        storageType: 'NVMe' as const,
        case: config.case?.name || 'Не выбрано',
        psu: config.psu?.name || 'Не выбрано',
        cooling: config.cooling?.name || 'Не выбрано',
        motherboard: config.motherboard?.name || 'Не выбрано',
      },
      features: [],
      inStock: true,
      rating: 5,
      reviewsCount: 0,
    };
    
    addItem(customProduct, 1, config);
    resetConfig();
  };

  return (
    <section id="configurator" className="py-20 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-semibold mb-4">
            КОНФИГУРАТОР
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Собери свой <span className="text-glow-cyan text-cyan-400">идеальный ПК</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Выберите комплектующие, и мы соберём для вас уникальную систему с гарантией качества
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Левая панель - категории */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Прогресс */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Прогресс сборки</span>
                  <span className="text-sm font-medium text-white">{selectedCount}/{CATEGORIES.length}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Список категорий */}
              <div className="space-y-2">
                {CATEGORIES.map((category) => {
                  const isSelected = selectedCategory === category.id;
                  const hasComponent = config[category.id] !== null;
                  const Icon = category.icon;

                  return (
                    <motion.button
                      key={category.id}
                      whileHover={{ x: 4 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'
                          : 'bg-white/5 border border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        hasComponent ? 'bg-cyan-500/20' : 'bg-white/5'
                      }`}>
                        <Icon className={`w-5 h-5 ${hasComponent ? 'text-cyan-400' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                            {category.label}
                          </span>
                          {category.required && (
                            <span className="text-[10px] text-red-400">*</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {hasComponent ? config[category.id]?.name : 'Не выбрано'}
                        </span>
                      </div>
                      {hasComponent && (
                        <Check className="w-5 h-5 text-cyan-400" />
                      )}
                      {!hasComponent && (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Кнопка сброса */}
              <Button
                variant="outline"
                onClick={resetConfig}
                className="w-full border-white/10 hover:bg-white/5 text-gray-400 hover:text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Сбросить сборку
              </Button>
            </div>
          </div>

          {/* Центральная панель - выбор компонентов */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
              {/* Заголовок категории */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {currentCategory && (
                    <>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                        <currentCategory.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{currentCategory.label}</h3>
                        <p className="text-sm text-gray-400">{currentCategory.description}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Поиск */}
              <div className="p-4 border-b border-white/10">
                <input
                  type="text"
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              {/* Список компонентов */}
              <ScrollArea className="h-[500px]">
                <div className="p-4 space-y-3">
                  <AnimatePresence mode="popLayout">
                    {filteredComponents.map((component) => (
                      <ComponentOption
                        key={component.id}
                        component={component}
                        isSelected={config[component.category]?.id === component.id}
                        onSelect={() => setComponent(component.category, component)}
                      />
                    ))}
                  </AnimatePresence>

                  {filteredComponents.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      Компоненты не найдены
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Правая панель - итоги */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Итоговая цена */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-[#151515] to-[#0f0f0f] border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Ваша сборка</h3>
                
                {/* Выбранные компоненты */}
                <div className="space-y-3 mb-6">
                  {CATEGORIES.map((category) => {
                    const component = config[category.id];
                    return (
                      <div key={category.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <category.icon className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-400">{category.label}</span>
                        </div>
                        {component ? (
                          <span className="text-white font-medium">
                            {component.price.toLocaleString('ru-RU')} ₽
                          </span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <Separator className="bg-white/10 mb-4" />

                {/* Итого */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Итого:</span>
                  <span className="text-2xl font-bold text-white">
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                {/* Предупреждения о совместимости */}
                {!compatibility.isCompatible && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mb-4"
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-500">Проблемы совместимости</p>
                        <ul className="text-xs text-yellow-400/80 mt-1 space-y-1">
                          {compatibility.issues.map((issue, i) => (
                            <li key={i}>• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Кнопки действий */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold"
                    disabled={selectedCount < CATEGORIES.length}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Добавить в корзину
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 hover:bg-white/5"
                    disabled={selectedCount < CATEGORIES.length}
                  >
                    Заказать сборку
                  </Button>
                </div>

                {/* Инфо */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  Сборка займет 1-3 рабочих дня
                </p>
              </div>

              {/* Преимущества */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-sm font-medium text-white mb-3">Что включено:</h4>
                <ul className="space-y-2">
                  {[
                    'Профессиональная сборка',
                    'Тестирование 72 часа',
                    'Гарантия 3 года',
                    'Бесплатная доставка',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Компонент опции выбора
interface ComponentOptionProps {
  component: Component;
  isSelected: boolean;
  onSelect: () => void;
}

function ComponentOption({ component, isSelected, onSelect }: ComponentOptionProps) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-xl transition-all ${
        isSelected
          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'
          : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-white truncate">{component.name}</span>
            {isSelected && (
              <Check className="w-4 h-4 text-cyan-400 shrink-0" />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(component.specs).slice(0, 3).map(([key, value]) => (
              <span key={key} className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                {value}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-lg font-semibold text-white">
            {component.price.toLocaleString('ru-RU')}
          </div>
          <div className="text-xs text-gray-400">руб.</div>
          {component.inStock ? (
            <Badge className="text-[10px] bg-green-500/20 text-green-400 border-0">
              В наличии
            </Badge>
          ) : (
            <Badge className="text-[10px] bg-yellow-500/20 text-yellow-400 border-0">
              Под заказ
            </Badge>
          )}
        </div>
      </div>
    </motion.button>
  );
}
