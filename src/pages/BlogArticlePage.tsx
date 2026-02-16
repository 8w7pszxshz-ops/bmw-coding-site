import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import StickyContactButton from '@/components/StickyContactButton';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { detectCityByGeolocation } from '@/utils/geolocation';
import { getCityConfig } from '@/utils/cityConfig';
import { getArticleBySlug, blogArticles } from '@/data/blogArticles';
import { updateSeoMeta, injectArticleSchema, injectBreadcrumbSchema, cleanupSchemas } from '@/utils/seo';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedCity, setSelectedCity] = useState<City>('saratov');
  const [showCityPulse, setShowCityPulse] = useState(false);

  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) {
      const path = `/blog/${article.slug}`;
      updateSeoMeta({
        title: article.metaTitle,
        description: article.metaDescription,
        path,
        ogType: 'article'
      });
      injectArticleSchema({
        title: article.title,
        description: article.metaDescription,
        path,
        datePublished: article.date,
        readTime: article.readTime
      });
      injectBreadcrumbSchema([
        { name: 'Главная', url: 'https://reborn-bmw.tech/' },
        { name: 'Блог', url: 'https://reborn-bmw.tech/blog' },
        { name: article.title, url: `https://reborn-bmw.tech${path}` }
      ]);
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
  }, [article]);

  if (!article) return <Navigate to="/blog" replace />;

  const config = getCityConfig(selectedCity);
  const otherArticles = blogArticles.filter(a => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <StickyContactButton selectedCity={selectedCity} />
      <MainLayout selectedCity={selectedCity} onCityChange={setSelectedCity} showCityPulse={showCityPulse}>
        <article className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-6 flex-wrap">
            <Link to="/" className="hover:text-white/80 transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/blog" className="hover:text-white/80 transition-colors">Блог</Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-white/70 truncate max-w-[200px]">{article.title}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-light bg-red-500/15 text-red-300">{article.category}</span>
            <span className="text-white/30 text-xs">{article.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extralight text-white mb-6 leading-tight">{article.title}</h1>

          <p className="text-white/70 text-lg font-light mb-10 leading-relaxed">{article.intro}</p>

          <div className="space-y-10">
            {article.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-xl md:text-2xl font-light text-white mb-4">{section.heading}</h2>
                <p className="text-white/60 font-light leading-relaxed mb-4">{section.content}</p>
                {section.list && (
                  <div className="space-y-2">
                    {section.list.map((item, j) => (
                      <div key={j} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <Icon name="Check" className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 font-light text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/70 font-light leading-relaxed italic">{article.conclusion}</p>
          </div>

          <div className="p-6 rounded-2xl mt-10 text-center" style={{ background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.15), rgba(231, 34, 46, 0.05))', border: '1px solid rgba(231, 34, 46, 0.3)' }}>
            <h2 className="text-2xl font-light text-white mb-3">Хотите прошить BMW?</h2>
            <p className="text-white/60 mb-4">Бесплатная диагностика + расчёт мощности за 30 секунд</p>
            <a
              href={config.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))', boxShadow: '0 10px 40px rgba(231, 34, 46, 0.4)' }}
            >
              <Icon name="MessageCircle" size={18} />
              Написать в Telegram
            </a>
          </div>

          {article.relatedLinks.length > 0 && (
            <div className="mt-10 mb-6">
              <h3 className="text-lg font-light text-white/50 mb-3">Связанные материалы</h3>
              <div className="space-y-2">
                {article.relatedLinks.map((link) => (
                  <Link
                    key={link.url}
                    to={link.url}
                    className="flex items-center gap-2 p-3 rounded-xl transition-all hover:scale-[1.01]"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <Icon name="ArrowRight" size={14} className="text-red-400" />
                    <span className="text-white/70 font-light text-sm">{link.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {otherArticles.length > 0 && (
            <div className="mt-8 mb-8">
              <h3 className="text-lg font-light text-white/50 mb-3">Другие статьи</h3>
              <div className="space-y-3">
                {otherArticles.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/blog/${a.slug}`}
                    className="block p-4 rounded-xl transition-all hover:scale-[1.01]"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <h4 className="text-white font-light mb-1">{a.title}</h4>
                    <p className="text-white/40 text-xs">{a.category} · {a.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </MainLayout>
    </>
  );
}