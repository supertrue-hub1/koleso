'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  X, 
  ChevronDown, 
  Gamepad2, 
  Cpu, 
  Palette, 
  Briefcase,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import type { PCType, GPUManufacturer, SortOption } from '@/types/product';

// Константы фильтров
const PC_TYPES: { value: PCType; label: string; icon: React.ElementType }[] = [
  { value: 'gaming', label: 'Игровые', icon: Gamepad2 },
  { value: 'workstation', label: 'Рабочие станции', icon: Cpu },
  { value: 'creator', label: 'Для творчества', icon: Palette },
  { value: 'office', label: 'Офисные', icon: Briefcase },
];

const GPU_MANUFACTURERS: { value: GPUManufacturer; label: string }[] = [
  { value: 'nvidia', label: 'NVIDIA' },
  { value: 'amd', label: 'AMD' },
  { value: 'intel', label: 'Intel' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'По популярности' },
  { value: 'newest', label: 'Сначала новинки' },
  { value: 'price-asc', label: 'Сначала дешевые' },
  { value: 'price-desc', label: 'Сначала дорогие' },
  { value: 'rating', label: 'По рейтингу' },
];

export function CatalogSection() {
  // Состояние фильтров
  const [selectedTypes, setSelectedTypes] = useState<PCType[]>([]);
  const [selectedGPU, setSelectedGPU] = useState<GPUManufacturer[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [minRam, setMinRam] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Фильтрация и сортировка
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Фильтр по типу
    if (selectedTypes.length > 0) {
      result = result.filter(p => selectedTypes.includes(p.type));
    }

    // Фильтр по цене
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Фильтр по RAM
    if (minRam > 0) {
      result = result.filter(p => p.specs.ramSize >= minRam);
    }

    // Фильтр по производителю GPU
    if (selectedGPU.length > 0) {
      result = result.filter(p => {
        const gpu = p.specs.gpu.toLowerCase();
        return selectedGPU.some(manufacturer => gpu.includes(manufacturer));
      });
    }

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [selectedTypes, selectedGPU, priceRange, minRam, sortBy]);

  // Сброс фильтров
  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedGPU([]);
    setPriceRange([0, 500000]);
    setMinRam(0);
  };

  // Количество активных фильтров
  const activeFiltersCount = 
    selectedTypes.length + 
    selectedGPU.length + 
    (minRam > 0 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 500000 ? 1 : 0);

  return (
    <section id="catalog" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Каталог <span className="text-glow-cyan text-cyan-400">компьютеров</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Выберите готовое решение или соберите свой идеальный ПК в нашем конфигураторе
          </p>
        </motion.div>

        {/* Панель управления */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Кнопка фильтров (мобильная) */}
          <Button
            variant="outline"
            className="lg:hidden border-white/20 hover:bg-white/5"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Фильтры
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-cyan-500 text-black">{activeFiltersCount}</Badge>
            )}
          </Button>

          {/* Активные фильтры */}
          <AnimatePresence>
            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-2"
              >
                {selectedTypes.map(type => {
                  const typeInfo = PC_TYPES.find(t => t.value === type);
                  return (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="bg-white/10 text-white gap-1"
                    >
                      {typeInfo?.label}
                      <button onClick={() => setSelectedTypes(prev => prev.filter(t => t !== type))}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
                {selectedGPU.map(gpu => (
                  <Badge
                    key={gpu}
                    variant="secondary"
                    className="bg-white/10 text-white gap-1"
                  >
                    {gpu.toUpperCase()}
                    <button onClick={() => setSelectedGPU(prev => prev.filter(g => g !== gpu))}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-gray-400 hover:text-white"
                >
                  Сбросить всё
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Сортировка */}
          <div className="lg:ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-400 hidden sm:inline">Сортировать:</span>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-white/10">
                {SORT_OPTIONS.map(option => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-white focus:bg-white/10"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Боковая панель фильтров */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`w-full lg:w-64 shrink-0 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-24 space-y-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Фильтры
                </h3>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Сбросить
                  </Button>
                )}
              </div>

              {/* Тип ПК */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-300">Назначение</h4>
                <div className="space-y-2">
                  {PC_TYPES.map(type => (
                    <label
                      key={type.value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedTypes.includes(type.value)}
                        onCheckedChange={(checked) => {
                          setSelectedTypes(prev =>
                            checked
                              ? [...prev, type.value]
                              : prev.filter(t => t !== type.value)
                          );
                        }}
                        className="border-white/20 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                      />
                      <type.icon className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Цена */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-300">Цена</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500000}
                    step={10000}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
                    <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>

              {/* Производитель GPU */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-300">Видеокарта</h4>
                <div className="space-y-2">
                  {GPU_MANUFACTURERS.map(gpu => (
                    <label
                      key={gpu.value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedGPU.includes(gpu.value)}
                        onCheckedChange={(checked) => {
                          setSelectedGPU(prev =>
                            checked
                              ? [...prev, gpu.value]
                              : prev.filter(g => g !== gpu.value)
                          );
                        }}
                        className="border-white/20 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {gpu.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Минимальная RAM */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-300">Минимум RAM</h4>
                <div className="flex flex-wrap gap-2">
                  {[0, 16, 32, 64].map(ram => (
                    <Button
                      key={ram}
                      variant={minRam === ram ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMinRam(ram)}
                      className={minRam === ram 
                        ? 'bg-cyan-500 text-black hover:bg-cyan-400' 
                        : 'border-white/20 text-gray-300 hover:text-white hover:bg-white/5'
                      }
                    >
                      {ram === 0 ? 'Все' : `${ram}GB`}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Сетка товаров */}
          <div className="flex-1">
            {/* Количество найденных */}
            <div className="mb-4 text-sm text-gray-400">
              Найдено: <span className="text-white font-medium">{filteredProducts.length}</span> товаров
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Filter className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Ничего не найдено</h3>
                <p className="text-gray-400 mb-4">Попробуйте изменить параметры фильтрации</p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="border-white/20 hover:bg-white/5"
                >
                  Сбросить фильтры
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
