import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import StickyContactButton from '@/components/StickyContactButton';
import BurgerMenu from '@/components/BurgerMenu';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { detectCityByGeolocation } from '@/utils/geolocation';
import { blogArticles } from '@/data/blogArticles';
import { updateSeoMeta, injectBreadcrumbSchema, cleanupSchemas } from '@/utils/seo';

export default function BlogPage() {
  const [selectedCity, setSelectedCity] = useState<City>('saratov');
  const [showCityPulse, setShowCityPulse] = useState(false);

  useEffect(() => {
    updateSeoMeta({
      title: 'Блог о чип-тюнинге BMW — статьи и руководства | Reborn BMW',
      description: 'Статьи о чип-тюнинге BMW: руководства, сравнения двигателей, советы по выбору. Полезная информация от специалистов Reborn BMW.',
      path: '/blog'
    });
    injectBreadcrumbSchema([
      { name: 'Главная', url: 'https://reborn-bmw.tech/' },
      { name: 'Блог', url: 'https://reborn-bmw.tech/blog' }
    ]);

    const initCity = async () => {
      const result = await detectCityByGeolocation();
      if (result.detected && result.city) {
        setSelectedCity(result.city);
      } else {
        setShowCityPulse(true);
        setTimeout(() => setShowCityPulse(false), 5000);
      }
    };
    initCity();

    return () => { cleanupSchemas(); };
  }, []);

  return (
    <>
      <StickyContactButton selectedCity={selectedCity} />
      <BurgerMenu />
      <MainLayout selectedCity={selectedCity} onCityChange={setSelectedCity} showCityPulse={showCityPulse}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-6 flex-wrap">
            <Link to="/" className="hover:text-white/80 transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-white/70">Блог</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extralight text-white mb-4 leading-tight">
            Блог о <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">чип-тюнинге BMW</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-light mb-10 leading-relaxed">
            Полезные статьи, руководства и сравнения для владельцев BMW.
          </p>

          <div className="space-y-4">
            {blogArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="block p-6 rounded-2xl transition-all hover:scale-[1.01]"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-light bg-red-500/15 text-red-300">{article.category}</span>
                  <span className="text-white/30 text-xs">{article.readTime}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-light text-white mb-2">{article.title}</h2>
                <p className="text-white/50 font-light leading-relaxed line-clamp-2">{article.intro}</p>
                <div className="flex items-center gap-2 mt-4 text-red-400 text-sm">
                  <span>Читать</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 mb-8">
            <h2 className="text-xl font-light text-white/50 mb-4">Услуги</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { title: 'Чип-тюнинг', link: '/chip-tuning' },
                { title: 'Кодирование', link: '/coding' },
                { title: 'Ключи BMW', link: '/keys' },
                { title: 'Цены', link: '/prices' },
              ].map((s) => (
                <Link
                  key={s.link}
                  to={s.link}
                  className="p-4 rounded-xl transition-all hover:scale-[1.02] text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span className="text-white font-light text-sm">{s.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}