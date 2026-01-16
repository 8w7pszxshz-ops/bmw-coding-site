import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';


const reviews = [
  {
    id: 1,
    author: 'Елена Б.',
    rating: 5,
    text: 'Александр прошивал мне BMW, до этого машину прошивали в другом месте. Разница колоссальная, что в работе мотора, что по мощности автомобиля. Александр рассказал как ухаживать за автомобилем чтобы он ездил долго и правильно. Очень советую👍',
    date: '2023-01-07'
  },
  {
    id: 2,
    author: 'Никита С.',
    rating: 5,
    text: 'Очень доволен чипом от reborn, машину просто не узнать) Отдельное спасибо Александру, всегда все сделает в лучшем виде, активирует все возможные опции, всё расскажет и покажет!',
    date: '2023-03-13'
  },
  {
    id: 3,
    author: 'Ирина Сандрацкая',
    rating: 5,
    text: 'Отличный специалист, мастер своего дела! Быстро помог с проблемой моего авто! Очень вежливый специалист и все понятно объясняет! Так же делала у него чип тюнинг своего bmw!!! Я в восторге!!! Теперь только к нему!',
    date: '2023-02-24'
  },
  {
    id: 4,
    author: 'Никита Горнаев',
    rating: 5,
    text: 'За чипом bmw дизелей точно сюда, езжу на чипе Stage 2 от reborn 2.5 года проблем абсолютно никаких. По цифрам заявленной мощности явно скромничают перед конкурентами, чип максимально злой и в тоже время безопасный что ОЧЕНЬ не маловажно в наше сложное время.',
    date: '2022-05-16'
  },
  {
    id: 5,
    author: 'Владимир Р.',
    rating: 5,
    text: 'Мастер очень хороший, все выслушает (очень главное), объяснит и все по полочкам расставит как говориться! знает свою работу, советую, не пожалеете!!! И ещё прошил у них свою 520d, очень доволен, машина 🚀',
    date: '2022-05-14'
  },
  {
    id: 6,
    author: 'Дмитрий Ермаков',
    rating: 5,
    text: 'Лучший мастер по прошивке и диагностике! 10/10',
    date: '2024-07-21'
  },
  {
    id: 7,
    author: 'Марина К.',
    rating: 5,
    text: 'Перепрошили мою бмв, летит как ракета 😊 Ребята спасибо, вы лучшие',
    date: '2022-12-22'
  },
  {
    id: 8,
    author: 'Andrei',
    rating: 5,
    text: 'Производили прошивку на евро2 для BMW x3 e83 с мотором м54. Перед прошивкой всё объяснили и рассказали. Произвели все манипуляции, встало всё ровно и работает коректно. Отклонений ни каких. Спасибо Вам большое 😎',
    date: '2022-05-14'
  }
];

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Icon
      key={i}
      name="Star"
      className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/10'}`}
    />
  ));
};

function ReviewsMobile() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-lg font-light text-white tracking-tight">Отзывы клиентов</h2>
        <a
          href="https://yandex.ru/maps/org/reborn_technologies/70103871083/reviews/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-white/40"
        >
          <Icon name="ExternalLink" className="w-3 h-3" />
        </a>
      </div>

      <div className="overflow-x-auto scrollbar-hide -mx-4 snap-x snap-mandatory">
        <div className="flex gap-3 px-4 pb-2">
          {reviews.map((review) => (
            <div key={review.id} className="snap-center">
              <Card
                className="border-0 overflow-hidden flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
                  backdropFilter: 'blur(40px)',
                  boxShadow: '0 20px 50px -20px rgba(0, 0, 0, 0.5)',
                  minWidth: '260px',
                  width: '260px'
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-white font-medium text-xs mb-1">{review.author}</div>
                      <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                    </div>
                  </div>
                  <p className="text-white/70 text-[11px] leading-relaxed line-clamp-5">
                    {review.text}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewsDesktop() {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-light text-white tracking-tight">Отзывы клиентов</h2>
        <a
          href="https://yandex.ru/maps/org/reborn_technologies/70103871083/reviews/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-blue-400 transition-colors duration-300"
        >
          <span>Все отзывы на Яндекс.Картах</span>
          <Icon name="ExternalLink" className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review, index) => (
          <Card
            key={review.id}
            className="border-0 overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              animationDelay: `${index * 50}ms`
            }}
          >
            <CardContent className="p-7">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-white font-medium text-base mb-2">{review.author}</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/10'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {review.text}
              </p>
              <div className="text-white/40 text-xs">
                {new Date(review.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <Adaptive
      mobile={<ReviewsMobile />}
      desktop={<ReviewsDesktop />}
    />
  );
}