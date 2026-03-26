import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem, Component, CustomConfig } from '@/types/product';

// Начальная пустая конфигурация
const emptyConfig: CustomConfig = {
  cpu: null,
  gpu: null,
  ram: null,
  storage: null,
  case: null,
  cooling: null,
  psu: null,
  motherboard: null,
};

// Интерфейс корзины
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  // Действия
  addItem: (product: Product, quantity?: number, customConfig?: CustomConfig) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// Интерфейс конфигуратора
interface ConfiguratorState {
  config: CustomConfig;
  totalPrice: number;
  
  // Действия
  setComponent: (category: keyof CustomConfig, component: Component | null) => void;
  resetConfig: () => void;
  calculateTotal: () => number;
  
  // Проверка совместимости
  checkCompatibility: () => { isCompatible: boolean; issues: string[] };
}

// Хранилище корзины
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      addItem: (product, quantity = 1, customConfig) => {
        const items = get().items;
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          // Если товар уже в корзине, обновляем количество
          const updatedItems = items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems });
        } else {
          // Добавляем новый товар
          set({ items: [...items, { product, quantity, customConfig }] });
        }
        
        // Пересчитываем итоги
        const state = get();
        const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = state.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        set({ totalItems, totalPrice });
      },
      
      removeItem: (productId) => {
        set(state => {
          const items = state.items.filter(item => item.product.id !== productId);
          const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          return { items, totalItems, totalPrice };
        });
      },
      
      updateQuantity: (productId, quantity) => {
        set(state => {
          const items = state.items.map(item =>
            item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          );
          const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          return { items, totalItems, totalPrice };
        });
      },
      
      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: 'cyberforge-cart',
    }
  )
);

// Хранилище конфигуратора
export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    (set, get) => ({
      config: emptyConfig,
      totalPrice: 0,
      
      setComponent: (category, component) => {
        set(state => {
          const newConfig = { ...state.config, [category]: component };
          const totalPrice = Object.values(newConfig)
            .reduce((sum, comp) => sum + (comp?.price || 0), 0);
          return { config: newConfig, totalPrice };
        });
      },
      
      resetConfig: () => {
        set({ config: emptyConfig, totalPrice: 0 });
      },
      
      calculateTotal: () => {
        const config = get().config;
        return Object.values(config).reduce((sum, comp) => sum + (comp?.price || 0), 0);
      },
      
      checkCompatibility: () => {
        const config = get().config;
        const issues: string[] = [];
        
        // Проверка сокета CPU и материнской платы
        if (config.cpu && config.motherboard) {
          const cpuSocket = config.cpu.specs.socket;
          const mbSocket = config.motherboard.specs.socket;
          if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
            issues.push(`Несовместимость сокетов: CPU ${cpuSocket}, MB ${mbSocket}`);
          }
        }
        
        // Проверка типа памяти
        if (config.cpu && config.ram && config.motherboard) {
          const mbMemory = config.motherboard.specs.memory;
          const ramSpec = config.ram.specs.speed;
          if (mbMemory && ramSpec) {
            const mbDdr = mbMemory.includes('DDR5') ? 'DDR5' : 'DDR4';
            const ramDdr = ramSpec.includes('DDR5') ? 'DDR5' : 'DDR4';
            if (mbDdr !== ramDdr) {
              issues.push(`Несовместимость памяти: MB поддерживает ${mbDdr}, выбрано ${ramDdr}`);
            }
          }
        }
        
        // Проверка мощности блока питания
        if (config.gpu && config.psu) {
          const gpuTdp = parseInt(config.gpu.specs.tdp || '0');
          const cpuTdp = config.cpu ? parseInt(config.cpu.specs.tdp?.split('/')[0] || '0') : 0;
          const psuPower = parseInt(config.psu.specs.power || '0');
          const recommendedPsu = (gpuTdp + cpuTdp) * 1.3; // 30% запас
          if (psuPower < recommendedPsu) {
            issues.push(`Маломощный БП: рекомендуется ${Math.ceil(recommendedPsu)}W, выбрано ${psuPower}W`);
          }
        }
        
        // Проверка размеров корпуса
        if (config.case && config.gpu) {
          const maxGpuLength = parseInt(config.case.specs.gpuLength || '0');
          // Для упрощения считаем, что все видеокарты влезают
          // В реальном приложении нужно проверять длину конкретной модели
        }
        
        return {
          isCompatible: issues.length === 0,
          issues,
        };
      },
    }),
    {
      name: 'cyberforge-configurator',
    }
  )
);
