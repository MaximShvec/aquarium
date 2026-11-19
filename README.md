# Aquarium.lv — новая главная (презентационная версия)

Статический сайт без сборки: HTML + CSS + vanilla JS.

- `site/` — сайт (точка входа `site/index.html`)
- `docs/` — документ: концепция, киллер-фичи, админка, оценка в часах (DOCX и PDF)
- `vercel.json` — деплой на Vercel (публикуется папка `site`)

## Локальный просмотр

```bash
cd site
python -m http.server 8765
# http://localhost:8765  (русская версия: ?lang=ru)
```

## Деплой на Vercel

Импортировать репозиторий, Framework Preset — Other. Настройки берутся из `vercel.json`
(Build Command и Install Command пустые, Output Directory — `site`).
