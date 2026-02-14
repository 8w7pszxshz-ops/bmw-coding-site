import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { blogArticles } from '@/data/blogArticles';

export default function BlogPreview() {
  return (
    <div className="max-w-3xl mx-auto mt-12 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-light text-white">Полезные статьи</h2>
        <Link to="/blog" className="flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors">
          <span>Все статьи</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>

      <div className="space-y-3">
        {blogArticles.slice(0, 2).map((article) => (
          <Link
            key={article.slug}
            to={`/blog/${article.slug}`}
            className="block p-4 rounded-xl transition-all hover:scale-[1.01]"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-light bg-red-500/15 text-red-300">{article.category}</span>
              <span className="text-white/25 text-[10px]">{article.readTime}</span>
            </div>
            <h3 className="text-white font-light text-sm md:text-base mb-1">{article.title}</h3>
            <p className="text-white/40 text-xs line-clamp-1">{article.intro}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
