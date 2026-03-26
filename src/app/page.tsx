'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { CatalogSection } from '@/components/sections/CatalogSection';
import { ConfiguratorSection } from '@/components/configurator/ConfiguratorSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - фиксированный */}
      <Header />
      
      {/* Основной контент */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Catalog Section */}
        <CatalogSection />
        
        {/* Configurator Section */}
        <ConfiguratorSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Reviews Section (placeholder) */}
        <section id="reviews" className="py-20 relative">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Отзывы наших <span className="text-glow-cyan text-cyan-400">клиентов</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
              Более 10,000 довольных клиентов по всей России
            </p>
            
            {/* Placeholder для отзывов */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Алексей М.',
                  rating: 5,
                  text: 'Заказывал игровой ПК с RTX 4090. Собрали за 2 дня, доставили бесплатно. Качество сборки на высшем уровне!',
                  product: 'PHANTOM X1',
                },
                {
                  name: 'Мария К.',
                  rating: 5,
                  text: 'Рабочая станция для 3D-моделирования работает идеально. Техподдержка помогла с настройкой софта.',
                  product: 'TITAN WORKSTATION',
                },
                {
                  name: 'Дмитрий В.',
                  rating: 5,
                  text: 'Собирал ПК в конфигураторе сам. Всё совместимо, цена адекватная. Рекомендую!',
                  product: 'Кастомная сборка',
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-b from-[#151515] to-[#0f0f0f] border border-white/5 text-left"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-black font-bold">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-white">{review.name}</div>
                      <div className="text-xs text-gray-500">{review.product}</div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Фон */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10" />
          <div className="absolute inset-0 cyber-grid opacity-20" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Готовы создать <span className="text-glow-cyan text-cyan-400">свой идеальный ПК</span>?
              </h2>
              <p className="text-gray-400 mb-8">
                Свяжитесь с нами для консультации или начните собирать свой ПК прямо сейчас
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#configurator"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  Начать сборку
                </a>
                <a
                  href="tel:+78001234567"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 text-white font-medium transition-all"
                >
                  Позвонить нам
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
