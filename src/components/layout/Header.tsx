'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Cpu, 
  Zap, 
  ChevronDown,
  Search,
  User,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

// Навигационные ссылки
const navLinks = [
  { href: '#catalog', label: 'Каталог' },
  { 
    href: '#configurator', 
    label: 'Конфигуратор',
    badge: 'NEW'
  },
  { href: '#features', label: 'Почему мы' },
  { href: '#reviews', label: 'Отзывы' },
];

const catalogLinks = [
  { href: '#gaming', label: 'Игровые ПК', icon: '🎮' },
  { href: '#workstation', label: 'Рабочие станции', icon: '💼' },
  { href: '#creator', label: 'Для творчества', icon: '🎨' },
  { href: '#office', label: 'Офисные ПК', icon: '🏢' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCartStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-black" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CYBER
              </span>
              <span className="text-xl font-bold text-white">FORGE</span>
            </div>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Каталог с выпадающим меню */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white hover:bg-white/5 gap-1"
                >
                  Каталог
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start"
                className="w-56 bg-[#121212] border-white/10"
              >
                {catalogLinks.map((link) => (
                  <DropdownMenuItem 
                    key={link.href}
                    className="focus:bg-white/5 cursor-pointer"
                  >
                    <Link href={link.href} className="flex items-center gap-2 w-full">
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                {link.label}
                {link.badge && (
                  <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-[10px] px-1.5 py-0 h-4">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Поиск (десктоп) */}
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden md:flex text-gray-300 hover:text-white hover:bg-white/5"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Конфигуратор (десктоп) */}
            <Button
              className="hidden md:flex bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold glow-cyan"
              asChild
            >
              <Link href="#configurator">
                <Zap className="w-4 h-4 mr-2" />
                Собрать ПК
              </Link>
            </Button>

            {/* Корзина */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative text-gray-300 hover:text-white hover:bg-white/5"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs flex items-center justify-center text-black font-bold"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#0a0a0a] border-white/10 w-full sm:max-w-md">
                <SheetTitle className="text-white">Корзина</SheetTitle>
                <CartContent />
              </SheetContent>
            </Sheet>

            {/* Админ-панель */}
            <Link href="/admin" target="_blank">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-white/5"
                title="Админ-панель"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </Link>

            {/* Мобильное меню */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-gray-300 hover:text-white"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="bg-[#0a0a0a] border-white/10 w-full sm:max-w-xs"
              >
                <SheetTitle className="sr-only">Меню навигации</SheetTitle>
                <MobileNav onClose={() => setIsMenuOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

// Компонент содержимого корзины
function CartContent() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <ShoppingCart className="w-16 h-16 text-gray-600 mb-4" />
        <p className="text-gray-400 mb-4">Корзина пуста</p>
        <Button 
          variant="outline" 
          className="border-white/20 hover:bg-white/5"
          asChild
        >
          <Link href="#catalog">Перейти в каталог</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pt-4">
      <div className="flex-1 overflow-y-auto space-y-4">
        {items.map((item) => (
          <motion.div
            key={item.product.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex gap-4 p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white truncate">{item.product.name}</h4>
              <p className="text-sm text-gray-400">{item.product.shortDescription}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 border-white/20"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 border-white/20"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                <span className="font-semibold text-cyan-400">
                  {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-red-400"
              onClick={() => removeItem(item.product.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </div>
      
      <div className="border-t border-white/10 pt-4 mt-4 space-y-4">
        <div className="flex justify-between text-lg">
          <span className="text-gray-400">Итого:</span>
          <span className="font-bold text-white">{totalPrice.toLocaleString('ru-RU')} ₽</span>
        </div>
        <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold">
          Оформить заказ
        </Button>
        <Button 
          variant="ghost" 
          className="w-full text-gray-400 hover:text-white"
          onClick={clearCart}
        >
          Очистить корзину
        </Button>
      </div>
    </div>
  );
}

// Мобильная навигация
function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <nav className="flex flex-col gap-2 pt-4">
      <Link 
        href="#catalog" 
        onClick={onClose}
        className="text-lg font-medium text-white hover:text-cyan-400 transition-colors py-2"
      >
        Каталог
      </Link>
      
      <div className="pl-4 border-l border-white/10 ml-2 space-y-2">
        {catalogLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors py-1"
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
      
      {navLinks.slice(1).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="text-lg font-medium text-white hover:text-cyan-400 transition-colors py-2 flex items-center gap-2"
        >
          {link.label}
          {link.badge && (
            <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-[10px] px-1.5 py-0 h-4">
              {link.badge}
            </Badge>
          )}
        </Link>
      ))}
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <Button
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold"
          onClick={onClose}
          asChild
        >
          <Link href="#configurator">
            <Zap className="w-4 h-4 mr-2" />
            Собрать ПК
          </Link>
        </Button>
      </div>
    </nav>
  );
}
