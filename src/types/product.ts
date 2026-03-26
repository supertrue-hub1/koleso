// Типы данных для магазина кастомных ПК

// Тип назначения ПК
export type PCType = 'gaming' | 'workstation' | 'creator' | 'office';

// Тип категории комплектующего
export type ComponentCategory = 'cpu' | 'gpu' | 'ram' | 'storage' | 'case' | 'cooling' | 'psu' | 'motherboard';

// Производители
export type GPUManufacturer = 'nvidia' | 'amd' | 'intel';
export type CPUManufacturer = 'intel' | 'amd';

// Интерфейс комплектующего
export interface Component {
  id: string;
  name: string;
  category: ComponentCategory;
  manufacturer: string;
  price: number;
  specs: Record<string, string>;
  image?: string;
  inStock: boolean;
}

// Интерфейс продукта (готового ПК)
export interface Product {
  id: string;
  name: string;
  slug: string;
  type: PCType;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  specs: ProductSpecs;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
}

// Характеристики ПК
export interface ProductSpecs {
  cpu: string;
  cpuCores: number;
  cpuThreads: number;
  gpu: string;
  gpuMemory: number;
  ram: string;
  ramSize: number;
  ramType: 'DDR4' | 'DDR5';
  storage: string;
  storageSize: number;
  storageType: 'SSD' | 'NVMe';
  case: string;
  psu: string;
  cooling: string;
  motherboard: string;
}

// Элемент корзины
export interface CartItem {
  product: Product;
  quantity: number;
  customConfig?: CustomConfig;
}

// Кастомная конфигурация ПК
export interface CustomConfig {
  cpu: Component | null;
  gpu: Component | null;
  ram: Component | null;
  storage: Component | null;
  case: Component | null;
  cooling: Component | null;
  psu: Component | null;
  motherboard: Component | null;
}

// Фильтры каталога
export interface CatalogFilters {
  types: PCType[];
  priceRange: [number, number];
  gpuManufacturers: GPUManufacturer[];
  minRam: number;
  inStockOnly: boolean;
}

// Сортировка
export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';

// Категория для навигации
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

// Отзыв
export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}
