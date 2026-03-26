'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  DollarSign,
  PackageOpen,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';

// Элементы меню
const menuItems = [
  { icon: LayoutDashboard, label: 'Дашборд', href: '/admin', id: 'dashboard' },
  { icon: Package, label: 'Товары', href: '/admin/products', id: 'products' },
  { icon: ShoppingCart, label: 'Заказы', href: '/admin/orders', id: 'orders' },
  { icon: Users, label: 'Клиенты', href: '/admin/customers', id: 'customers' },
  { icon: Settings, label: 'Настройки', href: '/admin/settings', id: 'settings' },
];

// Статистика
interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  color: string;
}

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных
  useEffect(() => {
    Promise.all([
      fetch('/api/admin/stats').then(r => r.json()),
      fetch('/api/admin/products').then(r => r.json()),
    ]).then(([statsData, productsData]) => {
      if (statsData.success) setStats(statsData.stats);
      if (productsData.success) setProducts(productsData.products);
      setLoading(false);
    });
  }, []);

  const statCards: StatCard[] = stats ? [
    {
      title: 'Всего товаров',
      value: stats.products.total,
      icon: Package,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      title: 'Заказов',
      value: stats.orders.total,
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Выручка',
      value: `${stats.revenue.total.toLocaleString('ru-RU')} ₽`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Средний чек',
      value: `${stats.revenue.avgOrderValue.toLocaleString('ru-RU')} ₽`,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
    },
  ] : [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="fixed left-0 top-0 bottom-0 bg-[#121212] border-r border-white/5 z-50 flex flex-col"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          <motion.div
            initial={false}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <Package className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-lg">CYBERFORGE</span>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ x: sidebarOpen ? 4 : 0 }}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </motion.button>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-black font-bold">
              A
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <div className="font-medium">Админ</div>
                <div className="text-xs text-gray-400">admin@cyberforge.ru</div>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <main
        style={{ marginLeft: sidebarOpen ? 280 : 80 }}
        className="flex-1 transition-all duration-300"
      >
        {/* Header */}
        <header className="h-16 bg-[#121212]/50 backdrop-blur-sm border-b border-white/5 sticky top-0 z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">
              {menuItems.find(m => m.id === activeTab)?.label || 'Дашборд'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                placeholder="Поиск..."
                className="w-64 bg-white/5 border-white/10 focus:border-cyan-500/50"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-gradient-to-b from-[#151515] to-[#0f0f0f] border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.title}</div>
                  </motion.div>
                ))}
              </div>

              {/* Products Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl bg-[#121212] border border-white/5 overflow-hidden"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Товары</h2>
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold">
                    Добавить товар
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5 text-left">
                        <th className="p-4 text-sm font-medium text-gray-400">Товар</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Тип</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Цена</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Статус</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Рейтинг</th>
                        <th className="p-4 text-sm font-medium text-gray-400">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 6).map((product, index) => (
                        <motion.tr
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden relative">
                                {product.images[0] && (
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-gray-400">{product.shortDescription}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={`
                              ${product.type === 'gaming' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                              ${product.type === 'workstation' ? 'bg-purple-500/20 text-purple-400' : ''}
                              ${product.type === 'creator' ? 'bg-pink-500/20 text-pink-400' : ''}
                              ${product.type === 'office' ? 'bg-gray-500/20 text-gray-400' : ''}
                            `}>
                              {product.type === 'gaming' && 'Игровой'}
                              {product.type === 'workstation' && 'Рабочая станция'}
                              {product.type === 'creator' && 'Для творчества'}
                              {product.type === 'office' && 'Офисный'}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold">{product.price.toLocaleString('ru-RU')} ₽</div>
                            {product.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                {product.originalPrice.toLocaleString('ru-RU')} ₽
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <Badge className={
                              product.inStock
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }>
                              {product.inStock ? 'В наличии' : 'Нет в наличии'}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{product.rating}</span>
                              <span className="text-gray-400 text-sm">({product.reviewsCount})</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                Изменить
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                Удалить
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Orders Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 rounded-2xl bg-[#121212] border border-white/5 overflow-hidden"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Последние заказы</h2>
                  <Button variant="outline" className="border-white/20 hover:bg-white/5">
                    Все заказы
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="p-6 text-center text-gray-400">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Заказы появятся здесь после оформления покупок</p>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
