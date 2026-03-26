'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Cpu, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Github,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  products: [
    { label: 'Игровые ПК', href: '#gaming' },
    { label: 'Рабочие станции', href: '#workstation' },
    { label: 'Для творчества', href: '#creator' },
    { label: 'Офисные ПК', href: '#office' },
    { label: 'Конфигуратор', href: '#configurator' },
  ],
  company: [
    { label: 'О нас', href: '#about' },
    { label: 'Почему мы', href: '#features' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'Блог', href: '#blog' },
    { label: 'Карьера', href: '#careers' },
  ],
  support: [
    { label: 'Доставка', href: '#delivery' },
    { label: 'Гарантия', href: '#warranty' },
    { label: 'Возврат', href: '#returns' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Контакты', href: '#contacts' },
  ],
};

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5">
      {/* Градиент сверху */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Основной контент */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Логотип и описание */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-black" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  CYBER
                </span>
                <span className="text-xl font-bold text-white">FORGE</span>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-sm">
              Профессиональная сборка игровых и рабочих компьютеров. 
              Индивидуальный подход, премиальные комплектующие, гарантия до 5 лет.
            </p>

            {/* Контакты */}
            <div className="space-y-3 mb-6">
              <a href="tel:+78001234567" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>8 (800) 123-45-67</span>
              </a>
              <a href="mailto:info@cyberforge.ru" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@cyberforge.ru</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Москва, ул. Технопарковая, 1</span>
              </div>
            </div>

            {/* Соцсети */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Ссылки */}
          <div>
            <h4 className="text-white font-semibold mb-4">Продукты</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Рассылка */}
        <div className="py-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold mb-1">Подпишитесь на новости</h4>
              <p className="text-gray-400 text-sm">Получайте эксклюзивные предложения и скидки</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                placeholder="Ваш email"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 w-full md:w-64"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 CYBERFORGE. Все права защищены.</p>
          <div className="flex gap-6">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#terms" className="hover:text-white transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
