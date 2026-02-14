import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import StickyContactButton from '@/components/StickyContactButton';
import BurgerMenu from '@/components/BurgerMenu';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { detectCityByGeolocation } from '@/utils/geolocation';
import { getCityConfig } from '@/utils/cityConfig';
import { getEngineBySlug, bmwEngines } from '@/data/bmwEngines';
import { bmwModels } from '@/data/bmwModels';
import { updateSeoMeta, injectFaqSchema, injectBreadcrumbSchema, injectServiceSchema, cleanupSchemas } from '@/utils/seo';

export default function BMWEnginePage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedCity, setSelectedCity] = useState<City>('saratov');
  const [showCityPulse, setShowCityPulse] = useState(false);

  const engine = slug ? getEngineBySlug(slug) : undefined;

  useEffect(() => {
    if (engine) {
      const path = `/engines/${engine.slug}`;
      updateSeoMeta({ title: engine.metaTitle, description: engine.metaDescription, path });
      injectBreadcrumbSchema([
        { name: 'Главная', url: 'https://reborn-bmw.tech/' },
        { name: 'Чип-тюнинг', url: 'https://reborn-bmw.tech/chip-tuning' },
        { name: `Двигатель ${engine.name}`, url: `https://reborn-bmw.tech${path}` }
      ]);
      injectServiceSchema({ name: `Чип-тюнинг двигателя BMW ${engine.name}`, description: engine.description, path });
      if (engine.faq?.length) injectFaqSchema({ questions: engine.faq });
    }

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
  }, [engine]);

  if (!engine) return <Navigate to="/chip-tuning" replace />;

  const config = getCityConfig(selectedCity);
  const relatedEngines = bmwEngines.filter(e => e.slug !== engine.slug).slice(0, 4);
  const relatedModels = bmwModels.filter(m =>
    m.engines.some(me => me.name.toLowerCase().includes(engine.name.toLowerCase()))
  ).slice(0, 4);

  return (
    <>
      <StickyContactButton selectedCity={selectedCity} />
      <BurgerMenu />
      <MainLayout selectedCity={selectedCity} onCityChange={setSelectedCity} showCityPulse={showCityPulse}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-6 flex-wrap">
            <Link to="/" className="hover:text-white/80 transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/chip-tuning" className="hover:text-white/80 transition-colors">Чип-тюнинг</Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-white/70">{engine.name}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-light ${engine.type === 'бензиновый' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
              {engine.type}
            </span>
            <span className="text-white/40 text-sm">{engine.years}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extralight text-white mb-4 leading-tight">
            Чип-тюнинг двигателя <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">BMW {engine.name}</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-light mb-8 leading-relaxed">{engine.heroText}</p>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Характеристики {engine.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {engine.specs.map((spec) => (
                <div key={spec.label} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{spec.label}</div>
                  <div className="text-white font-light">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Модели с двигателем {engine.name}</h2>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
                <thead>
                  <tr>
                    <th className="text-left text-white/40 text-xs uppercase tracking-wider px-4 py-2">Модель</th>
                    <th className="text-left text-white/40 text-xs uppercase tracking-wider px-4 py-2">Сток</th>
                    <th className="text-left text-white/40 text-xs uppercase tracking-wider px-4 py-2">Stage 1</th>
                  </tr>
                </thead>
                <tbody>
                  {engine.models.map((m) => (
                    <tr key={m.name} style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <td className="px-4 py-3 rounded-l-xl">
                        <span className="text-white font-light">{m.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white/60">{m.power}</span>
                      </td>
                      <td className="px-4 py-3 rounded-r-xl">
                        <span className="text-red-400 font-medium">{m.stage1}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(10, 10, 15, 0.98))', border: '1px solid rgba(231, 34, 46, 0.25)' }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(231, 34, 46, 0.8), transparent)' }} />
              <h3 className="text-white text-lg font-light mb-2">Stage 1</h3>
              <p className="text-white/60 text-sm leading-relaxed">{engine.stage1gains}</p>
            </div>
            <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(10, 10, 15, 0.98))', border: '1px solid rgba(231, 34, 46, 0.15)' }}>
              <h3 className="text-white text-lg font-light mb-2">Stage 2</h3>
              <p className="text-white/60 text-sm leading-relaxed">{engine.stage2gains}</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">Потенциал тюнинга {engine.name}</h2>
            <p className="text-white/60 leading-relaxed">{engine.tuningPotential}</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">{engine.name} — описание двигателя</h2>
            <p className="text-white/60 leading-relaxed">{engine.description}</p>
          </div>

          {engine.knownIssues.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-light text-white mb-6">На что обратить внимание у {engine.name}</h2>
              <div className="space-y-3">
                {engine.knownIssues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(234, 179, 8, 0.05)', border: '1px solid rgba(234, 179, 8, 0.15)' }}>
                    <Icon name="AlertTriangle" className="w-5 h-5 text-yellow-400/60 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 font-light text-sm">{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Вопросы о чип-тюнинге {engine.name}</h2>
            <div className="space-y-4">
              {engine.faq.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl mb-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.15), rgba(231, 34, 46, 0.05))', border: '1px solid rgba(231, 34, 46, 0.3)' }}>
            <h2 className="text-2xl font-light text-white mb-3">Прошить {engine.name}</h2>
            <p className="text-white/60 mb-4">Бесплатная диагностика + расчёт мощности для вашего двигателя</p>
            <a
              href={config.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))', boxShadow: '0 10px 40px rgba(231, 34, 46, 0.4)' }}
            >
              <Icon name="MessageCircle" size={18} />
              Записаться в Telegram
            </a>
          </div>

          {relatedModels.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-light text-white/50 mb-4">Модели с {engine.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {relatedModels.map((m) => (
                  <Link
                    key={m.slug}
                    to={`/chip-tuning/${m.slug}`}
                    className="p-4 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <h3 className="text-white font-light text-sm mb-1">{m.generation}</h3>
                    <p className="text-white/40 text-xs">{m.series} • {m.years}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-xl font-light text-white/50 mb-4">Другие двигатели BMW</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedEngines.map((e) => (
                <Link
                  key={e.slug}
                  to={`/engines/${e.slug}`}
                  className="p-4 rounded-xl transition-all hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <h3 className="text-white font-light text-sm mb-1">{e.name}</h3>
                  <p className="text-white/40 text-xs">{e.type} • {e.displacement}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-light text-white/50 mb-4">Услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: 'Чип-тюнинг BMW', desc: 'Все модели и двигатели', link: '/chip-tuning' },
                { title: 'Кодирование BMW', desc: 'Активация скрытых функций', link: '/coding' },
                { title: 'Отключение экологии', desc: 'EGR, DPF, ADBLUE', link: '/ecology' },
              ].map((s) => (
                <Link
                  key={s.link}
                  to={s.link}
                  className="p-4 rounded-xl transition-all hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <h3 className="text-white font-light mb-1">{s.title}</h3>
                  <p className="text-white/40 text-xs">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}