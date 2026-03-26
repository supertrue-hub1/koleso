'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Truck, 
  Clock, 
  Award, 
  Cpu, 
  HeartHandshake,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
  {
    icon: Shield,
    title: 'Гарантия до 5 лет',
    description: 'Расширенная гарантия на все компоненты. Бесплатный ремонт или замена в случае поломки.',
    color: 'cyan',
  },
  {
    icon: Clock,
    title: 'Тестирование 72 часа',
    description: 'Каждый ПК проходит стресс-тестирование в течение 72 часов перед отправкой клиенту.',
    color: 'purple',
  },
  {
    icon: Truck,
    title: 'Бесплатная доставка',
    description: 'Доставим ваш ПК в любую точку России бесплатно. Надежная упаковка гарантирует сохранность.',
    color: 'green',
  },
  {
    icon: Cpu,
    title: 'Премиум комплектующие',
    description: 'Используем только проверенные комплектующие от ведущих производителей с официальной гарантией.',
    color: 'cyan',
  },
  {
    icon: Award,
    title: 'Профессиональная сборка',
    description: 'Наши инженеры имеют опыт работы более 10 лет. Идеальная укладка кабелей и оптимизация системы.',
    color: 'purple',
  },
  {
    icon: HeartHandshake,
    title: 'Техподдержка 24/7',
    description: 'Консультации по любым вопросам. Помощь с настройкой, апгрейдом и решением проблем.',
    color: 'green',
  },
];

const stats = [
  { value: '10K+', label: 'Довольных клиентов' },
  { value: '99%', label: 'Рекомендуют нас' },
  { value: '48ч', label: 'Среднее время сборки' },
  { value: '4.9', label: 'Средний рейтинг' },
];

const colorClasses: Record<string, { bg: string; text: string; glow: string }> = {
  cyan: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    glow: 'group-hover:shadow-cyan-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    glow: 'group-hover:shadow-purple-500/20',
  },
  green: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    glow: 'group-hover:shadow-green-500/20',
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Почему выбирают <span className="text-glow-cyan text-cyan-400">нас</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мы не просто собираем компьютеры — мы создаём машины, которые будут радовать вас годами
          </p>
        </motion.div>

        {/* Статистика */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Карточки преимуществ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#151515] to-[#0f0f0f] border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                {/* Иконка */}
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <feature.icon className={`w-7 h-7 ${colors.text}`} />
                </div>

                {/* Контент */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Декоративный уголок */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>

        {/* Процесс работы */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Как это работает</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {[
              { step: '01', title: 'Выберите конфигурацию' },
              { step: '02', title: 'Оформите заказ' },
              { step: '03', title: 'Мы соберём ПК' },
              { step: '04', title: 'Получите и наслаждайтесь' },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className="flex flex-col items-center text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-3">
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {item.step}
                    </span>
                  </div>
                  <span className="text-sm text-gray-300 max-w-[150px]">{item.title}</span>
                </div>
                {index < 3 && (
                  <ArrowRight className="hidden md:block w-5 h-5 text-gray-600" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold"
              asChild
            >
              <Link href="#configurator">
                Собрать свой ПК
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/5"
              asChild
            >
              <Link href="#catalog">
                Смотреть каталог
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Чеклист */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-white/5"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">
                Каждый компьютер включает:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Windows 11 Pro',
                  'Антивирус на год',
                  'Офисный пакет',
                  'Драйверы установлены',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
