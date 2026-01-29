# SSR Configuration for BMW Coding Site

Ваш сайт теперь поддерживает Server-Side Rendering (SSR), что улучшит индексацию в поисковиках.

## Как работает SSR

- **Поисковики** видят полностью отрендеренный HTML с контентом
- **Пользователи** получают быстрый первый рендер
- **React гидратация** делает сайт интерактивным после загрузки

## Файлы SSR

1. **src/entry-server.tsx** - серверный entry point
2. **src/entry-client.tsx** - клиентский entry point с гидратацией
3. **server.js** - Express сервер для SSR
4. **build.sh** - скрипт для билда клиента и сервера

## Разработка

```bash
# Запуск dev сервера с SSR
node server.js
```

## Продакшен билд

```bash
# Билд клиента и сервера
bash build.sh

# Запуск продакшен сервера
NODE_ENV=production node server.js
```

## Что изменилось

- `index.html` теперь содержит `<!--app-html-->` для SSR контента
- `src/main.tsx` заменен на `src/entry-client.tsx` с гидратацией
- Добавлен Express сервер для рендеринга на сервере
- React Router использует StaticRouter на сервере

## Деплой

Для деплоя с SSR нужно:
1. Запустить `bash build.sh`
2. Загрузить папку `dist/` и `server.js` на хостинг
3. Запустить `NODE_ENV=production node server.js`

Альтернативно можно использовать платформы с поддержкой Node.js:
- Vercel
- Netlify
- Railway
- Render
