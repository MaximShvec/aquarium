/* Aquarium Art & Design — redesign concept (vanilla JS, no dependencies) */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     i18n — LV is the source language (lives in the HTML), RU is below.
     Texts for RU follow the existing aquarium.lv/ru/ version where it exists.
  ------------------------------------------------------------------ */
  const RU = {
    'skip': 'Перейти к содержимому',
    'top.addr': 'Braslas iela 29A-1, Рига',
    'top.hours': 'Пн–Ср, Пт 9.30–17.30',
    'nav.services': 'Услуги', 'nav.types': 'Аквариумы', 'nav.projects': 'Проекты', 'nav.architects': 'Архитекторам',
    'nav.shop': 'Магазин', 'nav.news': 'Новости', 'nav.contact': 'Контакты', 'nav.about': 'О нас',
    'cta.consult': 'Заказать консультацию', 'cta.projects': 'Смотреть проекты', 'cta.contact': 'Связаться с нами',
    'hero.eyebrow': 'Рига · с 1995 года',
    'hero.title': 'Подводный мир <em>в Вашем интерьере</em>',
    'hero.lead': 'Проектируем, изготавливаем и устанавливаем пресноводные, морские и рифовые аквариумы. Команда биологов, инженеров и дизайнеров — от идеи до запуска и обслуживания.',
    'chip1.t': 'Рифовые аквариумы с живыми кораллами', 'chip1.s': 'Красоты Красного моря в Вашем доме',
    'chip2.t': 'Аквариумы с медузами', 'chip2.s': 'Вечные странники океана в Вашем доме или офисе',
    'chip3.t': 'Короли аквариумов из Амазонки', 'chip3.s': 'Аквариумы с дискусами',
    'stat.years': 'лет в аквариумистике (основаны в 1995 году)', 'stat.mon.u': 'мес.',
    'stat.mon': 'на изготовление и установку аквариума', 'stat.acr': 'высота крупногабаритных акриловых аквариумов',
    'stat.clients': 'компаний среди наших клиентов',
    'mf.1': 'Мы готовы говорить о', 'mf.2': '<em>Вашем аквариуме мечты</em> столько, сколько нужно,',
    'mf.3': 'чтобы создать именно тот —', 'mf.4': '<em>уникальный подводный мир</em>.',
    'mf.sig': 'AKVASERVISS · Aquarium Art &amp; Design, с 1995 года',
    'mf.note': 'Изучим фотографии, стилистические решения и каталоги рыбок.', 'mf.more': 'О нас',
    'about.badge': 'основаны', 'about.eyebrow': 'О нас',
    'about.title': 'Создаём оригинальные аквариумы — <em>с 1995 года</em>',
    'about.p1': 'Компания AKVASERVISS основана в 1995 году для работы в сфере аквариумистики. Мы делаем всё возможное, чтобы создавать оригинальные аквариумы — как по дизайну внутри аквариума, так и по дизайну интерьера.',
    'pil1.t': 'Биологи', 'pil1.s': 'Создают уникальные биосистемы, обеспечивающие рыбкам хорошие условия жизни.',
    'pil2.t': 'Инженеры', 'pil2.s': 'Проектируют, изготавливают и устанавливают аквариумы, используя современные биологические технологии.',
    'pil3.t': 'Дизайнеры', 'pil3.s': 'Работают над эксклюзивным внешним видом каждого аквариума.',
    'about.lab': 'У нас есть собственная лаборатория, в которой сертифицированные сотрудники следят за состоянием рыб, растений, живых камней и кораллов. Каждая рыба перед продажей проходит тщательную проверку здоровья.',
    'about.suppliers': 'Наши поставщики и материалы',
    'serv.eyebrow': 'Наши услуги',
    'serv.title': 'От эскиза до <em>ежедневного ухода</em>',
    'serv.lead': 'Весь цикл выполняем сами: проектируем, устанавливаем, запускаем и обслуживаем пресноводные, морские и рифовые аквариумы.',
    's1.t': 'Проектирование аквариумов',
    's1.d': 'Проектируем и устанавливаем аквариумы различных видов и размеров, в том числе встраиваемые в стены. Предлагаем проектирование, поставку, установку, запуск и обслуживание крупногабаритных (высотой два и более метра) акриловых аквариумов.',
    's1.g1': 'Встраиваемые в стены', 's1.g2': 'Акрил от 2 м', 's1.g3': 'Пресноводные', 's1.g4': 'Морские и рифовые', 's1.g5': 'Торговые аквариумы',
    'more': 'Узнать больше',
    's9.t': 'Нужна консультация?', 's9.d': 'Позвоните или напишите — поможем выбрать параметры, внутренний и внешний дизайн аквариума.',
    's2.t': 'Обслуживание и чистка', 's2.d': 'Профессиональное обслуживание пресноводных, морских и рифовых аквариумов по вызову или на основании договора.',
    's3.t': 'Перевозка аквариумов', 's3.d': 'Профессиональная перевозка аквариумных комплексов — грамотно, чтобы обитатели аквариума пострадали как можно меньше.',
    's4.t': 'Вода для аквариумов', 's4.d': '«Живая» осмотическая вода — купите у нас или установите осмолятор дома (в офисе).',
    's5.t': 'Заказ и доставка товаров', 's5.d': 'Заказывайте любые товары из нашего каталога через интернет.',
    's6.t': 'Анализ воды', 's6.d': 'Важно создать благоприятные биологические условия для содержания рыбок, растений и морских животных.',
    's7.t': 'Смена дизайна аквариума', 's7.d': 'Есть аквариум, но хочется перемен? Выполняем смену внутреннего дизайна аквариума.',
    's8.t': 'Лечение рыбок', 's8.d': 'Здоровье рыб зависит от самочувствия аквариума и правильного содержания.',
    'types.eyebrow': 'Виды аквариумов', 'types.title': 'Выберите <em>свой подводный мир</em>',
    't1.t': 'Рифовые аквариумы', 't1.d': 'Морские аквариумы с живыми кораллами, моллюсками и другими беспозвоночными.',
    't2.t': 'Мини-риф', 't2.d': 'Альтернатива большому рифу — компактный мини-рифовый аквариум.',
    't3.t': 'Акриловые аквариумы', 't3.d': 'Акрил отвечает всем необходимым требованиям; предлагаем и крупногабаритные (от 2 м) акриловые аквариумы.',
    't4.t': 'Тропические пресноводные', 't4.d': 'Аквариум может быть выполнен в самых разных цветах и стилях.',
    't5.t': 'Африканский аквариум', 't5.d': 'Дизайн отличается от привычных аквариумов — в нём нет живых растений.',
    't6.t': 'Аквариумы с дискусами', 't6.d': 'Короли аквариумов из Амазонки.',
    't7.t': 'Аквариумы с медузами', 't7.d': 'Вечные странники океана в Вашем доме или офисе.',
    't8.t': 'Аквариум-картина', 't8.d': 'Идеальное решение для тех, кто хочет аквариум, но не имеет места для его установки.',
    't9.t': 'Коммерческие аквариумы', 't9.d': 'Предназначены для продажи живых рыб и ракообразных в магазинах.',
    't10.t': 'Аквариумы для омаров', 't10.d': 'Вид аквариума для содержания омаров.',
    'gal.eyebrow': 'Фотогалерея',
    'gal.title': 'Изготовленные, установленные и <em>оформленные нами аквариумы</em>',
    'gal.lead': 'Биологи создают уникальные биосистемы, дизайнеры работают над внешним видом каждого аквариума — чтобы дома аквариум улучшал атмосферу, а в офисе, кафе или ресторане дарил эстетическое удовольствие.',
    'f.all': 'Все', 'f.interior': 'В интерьере', 'f.reef': 'Рифовые', 'f.fresh': 'Пресноводные', 'f.acrylic': 'Акрил',
    'c.done': 'Реализованный проект', 'c.reef': 'Рифовый аквариум', 'c.acrylic': 'Акриловый аквариум', 'c.interior': 'Аквариум в интерьере',
    'c.office': 'Рифовый аквариум в офисе', 'c.fresh': 'Пресноводный аквариум', 'c.malawi': 'Аквариум с цихлидами Малави',
    'c.planted': 'Аквариум с живыми растениями', 'gal.all': 'Вся фотогалерея',
    'proc.eyebrow': 'Как мы работаем', 'proc.title': 'Четыре шага до <em>Вашего аквариума</em>',
    'p1.t': 'Консультация', 'p1.d': 'Позвоните, пришлите эскизы и размеры по e-mail или договоритесь о встрече в нашем салоне на Braslas iela или на Вашем объекте.',
    'p2.t': 'Проектирование', 'p2.d': 'Биологи, инженеры и дизайнеры учитывают воду, стекло, оптические эффекты освещения, удобный доступ для обслуживания и отделочные материалы.',
    'p3.t': 'Изготовление и установка', 'p3.d': 'В течение двух месяцев изготавливаем и устанавливаем пресноводные, морские и рифовые аквариумы с большим количеством кораллов и рыб.',
    'p4.t': 'Запуск и обслуживание', 'p4.d': 'Запускаем аквариум и обслуживаем его по вызову или на основании договора.',
    'proc.note': '<b>Рифовый аквариум</b> — самый интересный вид морского аквариума, но его создание может занять до года. Чтобы сумма была разумной, рекомендуем рифовый аквариум до 400 л.',
    'arch.eyebrow': 'Архитекторам и дизайнерам', 'arch.title': 'Аквариум как часть <em>Вашего проекта</em>',
    'arch.lead': 'Можем реализовать проекты любой сложности. Вместе с дизайнером или архитектором обсуждаем технические вопросы — нюансы изготовления, установки и дальнейшего обслуживания.',
    'arch.l1': 'Всё делается для того, чтобы в будущем обслуживание было удобным.',
    'arch.l2': 'Наши сотрудники следят за тем, чтобы все системы всегда работали безупречно.',
    'arch.l3': 'Богатый опыт с 1995 года; открыты новым идеям, дизайну и вызовам.',
    'arch.cta': 'Обсудить проект', 'arch.card': 'Что обсуждаем вместе',
    'par1': 'Размер аквариума (мин. и макс.)', 'par2': 'Отделка — мебель', 'par3': 'Подключение воды',
    'par4': 'Электричество', 'par5': 'Канализация', 'par6': 'Удобное последующее обслуживание',
    'shop.eyebrow': 'Интернет-магазин и аукционы', 'shop.title': 'Живые рыбы, кораллы и <em>всё для аквариума</em>',
    'shop.h3': 'Интернет-магазин <em>akva.lv</em>',
    'shop.p': 'Живые растения, рыбы, кораллы и живые камни, аквариумная техника и аксессуары — заказывайте онлайн и получайте с доставкой.',
    'cc1': 'Рыбки и кораллы', 'cc2': 'Живые камни для рифа', 'cc3': 'Живые растения', 'cc4': 'Гидрохимия', 'cc5': 'Морская соль',
    'cc6': 'Освещение', 'cc7': 'Фильтры и скиммеры', 'cc8': 'Охладители и нагреватели', 'cc9': 'Тесты воды',
    'cc10': 'Декоративные кораллы', 'cc11': 'Системы CO₂', 'cc12': 'Лечебные препараты',
    'pk1.t': '25+ лет', 'pk1.d': 'опыта на аквариумном рынке', 'pk2.t': 'DPD', 'pk2.d': 'быстрая доставка',
    'pk3.t': '24/7', 'pk3.d': 'заказы в любое время', 'shop.cta': 'Открыть akva.lv',
    'auc.live': 'Аукционы', 'auc.t': 'Аукционы морских рыб и кораллов', 'auc.d': 'Следите за новостями и добро пожаловать на аукционы рыб.',
    'nl.t': 'Не пропустите ни одного аукциона', 'nl.d': 'Подпишитесь на нашу рассылку, чтобы быть в курсе новостей.', 'nl.btn': 'Подписаться',
    'f.email': 'E-mail', 'demo.ok': 'Спасибо! (демонстрационная версия)',
    'news.eyebrow': 'Новости', 'news.title': 'Свежие <em>работы</em>', 'news.all': 'Все новости',
    'n1.d': 'Аквариум-террариум на заказ для древесной агамы, 2100×650×1000h.',
    'n2.d': 'Рифовый аквариум с живыми кораллами, 400 л.', 'n3.d': 'Пресноводный аквариум с живыми растениями, 400 л.',
    'n4.t': 'Пресноводный аквариум в интерьере 450L',
    'n4.d': 'Пресноводный аквариум вписался в дизайн интерьера современной зоны отдыха в крупной компании.',
    'faq.eyebrow': 'Вопросы и ответы', 'faq.title': 'Вопросы о содержании <em>аквариума</em>?',
    'faq.lead': 'Время от времени мы получаем Ваши вопросы — здесь ответы на самые популярные.', 'faq.all': 'Все вопросы',
    'q1.q': 'Я нашёл красивые камни на берегу моря. Можно ли положить их в аквариум?',
    'q1.a': 'Смело можно, предварительно вымыв в тёплой воде. Кипятить не нужно.',
    'q2.q': 'Можно ли класть в пресноводный аквариум ракушки с морского берега?',
    'q2.a': 'Это может повлиять на самочувствие аквариума и рыб. Велика вероятность, что в раковине остались остатки моллюска, который становится местом размножения бактерий — вода может помутнеть, а кислорода может не хватать.',
    'q3.q': 'Что нужно, чтобы в аквариуме росли живые растения?',
    'q3.a': 'Живые растения стабилизируют среду и положительно влияют на обитателей аквариума. Необходимо:<ul><li>аквариум не выше 65 см;</li><li>над водной поверхностью 0,4 м² (ок. 40×100 см) — 4 лампы по 18 Вт;</li><li>раз в неделю менять 10–20% воды;</li><li>вовремя обрезать повреждённые листья и следить, чтобы остатки корма не оставались на растениях;</li><li>проводить анализы воды на pH и gH.</li></ul>',
    'q4.q': 'Какой грунт выбрать для аквариума?',
    'q4.a': 'Зависит от цели аквариума. Для аквариумов с живыми растениями подойдёт грунт фракцией 2–4 мм; белый грунт подходит для аквариумов с цихлидами и морских; для золотых рыбок лучше круглый грунт крупной фракции (20–50 мм).',
    'q5.q': 'Можно ли у Вас купить живые растения?',
    'q5.a': 'Да. Напишите на info@aquarium.lv об интересующем растении — ответим, назовём цену и сможем заказать.',
    'cl.eyebrow': 'Наши клиенты', 'cl.title': 'Компании, которые нам <em>доверились</em>',
    'ct.eyebrow': 'Контакты', 'ct.title': 'Расскажите о своём <em>аквариуме мечты</em>',
    'ct.lead': 'Свяжитесь с нами, если у Вас есть вопросы или деловые предложения — мы обязательно свяжемся с Вами!',
    'ct.addr': 'Адрес', 'ct.tel': 'Телефон', 'ct.mail': 'E-mail', 'ct.hours': 'Время работы',
    'ct.hours.v': 'Пн–Ср и Пт: 9.30–17.30', 'ct.hours.s': 'Чт, сб, праздничные дни — выходной',
    'tm1.r': 'Проектирование аквариумов · биолог', 'tm2.r': 'Руководство проектами',
    'map.t': 'Салон Aquarium Art & Design', 'map.s': 'Открыть на карте · Braslas iela 29A-1',
    'form.t': 'Заказать консультацию', 'form.d': 'Опишите идею, укажите размеры или приложите эскиз — ответим как можно скорее.',
    'form.name': 'Имя', 'form.phone': 'Телефон', 'form.topic': 'Меня интересует', 'form.msg': 'Сообщение',
    'o1': 'Проектирование аквариумов', 'o2': 'Обслуживание и чистка', 'o3': 'Перевозка аквариумов', 'o4': 'Анализ воды',
    'o5': 'Смена дизайна', 'o6': 'Другой вопрос',
    'form.consent': 'Соглашаюсь на обработку персональных данных согласно', 'form.policy': 'политике конфиденциальности',
    'form.send': 'Отправить заявку',
    'ft.about': 'Проектирование, изготовление, установка и обслуживание аквариумов в Риге с 1995 года.',
    'ft.company': 'Компания', 'ft.suppliers': 'Наши поставщики', 'ft.info': 'Информация',
    'ft.privacy': 'Политика конфиденциальности', 'ft.cookies': 'Политика использования cookie',
    'ft.legal': 'Юр. адрес: Lielvārdes iela 115-6, Рига, LV-1084 · Фактический адрес: Braslas iela 29A-1, Рига, LV-1084',
    'ft.concept': 'Концепция дизайна — презентационная версия',
    'depth': 'Глубина', 'callbar.call': 'Позвонить', 'callbar.write': 'Заявка'
  };

  const langBtns = $$('[data-lang]');
  function setLang(lang) {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => {
      if (el._lv === undefined) el._lv = el.innerHTML;
      const k = el.dataset.i18n;
      el.innerHTML = (lang === 'ru' && RU[k] !== undefined) ? RU[k] : el._lv;
    });
    $$('[data-i18n-ph]').forEach(el => {
      if (el._lvPh === undefined) el._lvPh = el.getAttribute('placeholder') || '';
      const k = el.dataset.i18nPh;
      el.setAttribute('placeholder', (lang === 'ru' && RU[k]) ? RU[k] : el._lvPh);
    });
    langBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    try { localStorage.setItem('aq-lang', lang); } catch (e) { /* ignore */ }
    setDepth(true);
    splitManifesto();
    scene();
  }

  /* ---------- scroll scenes: hero exit, manifesto words, architects expand ---------- */
  const heroEl = $('.hero');
  const archEl = $('.architects');
  const mText = $('#manifesto');
  let words = [], pills = [];
  const clamp01 = v => Math.min(1, Math.max(0, v));

  function splitWords(node) {
    Array.from(node.childNodes).forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) splitWords(n);
    });
  }
  function splitManifesto() {
    if (!mText) return;
    $$('[data-i18n]', mText).forEach(splitWords);
    words = $$('.w', mText);
    pills = $$('.pill', mText);
  }

  function scene() {
    const vh = window.innerHeight;
    if (reduceMotion) return;
    if (heroEl) {
      const r = heroEl.getBoundingClientRect();
      heroEl.style.setProperty('--hp', clamp01(-r.top / Math.max(1, r.height)).toFixed(3));
    }
    if (mText && words.length) {
      const r = mText.getBoundingClientRect();
      const p = clamp01((vh * .85 - r.top) / (r.height + vh * .35));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < lit));
      pills.forEach((el, i) => el.style.setProperty('--pw', clamp01(p * (pills.length + 1) - i * .9).toFixed(3)));
    }
    if (archEl) {
      const r = archEl.getBoundingClientRect();
      const ap = Math.min(clamp01((vh - r.top) / (vh * .85)), clamp01(r.bottom / (vh * .85)));
      archEl.style.setProperty('--ap', ap.toFixed(3));
    }
  }
  let sTicking = false;
  window.addEventListener('scroll', () => { if (!sTicking) { sTicking = true; requestAnimationFrame(() => { scene(); sTicking = false; }); } }, { passive: true });
  window.addEventListener('resize', scene);

  /* ---------- page colour morph between sections ---------- */
  const morphSecs = $$('main > section[class*="theme-"]:not(.hero):not(.manifesto)');
  if ('IntersectionObserver' in window && morphSecs.length) {
    document.documentElement.classList.add('js-morph');
    morphSecs.forEach(s => { s.classList.add('morph'); s._bg = getComputedStyle(s).getPropertyValue('--bg').trim(); });
    const setActive = sec => {
      if (!sec) return;
      document.body.style.setProperty('--page-bg', sec._bg);
      morphSecs.forEach(s => s.classList.toggle('is-dim', s !== sec && !reduceMotion && sec._bg !== s._bg));
    };
    setActive(morphSecs[0]);
    const mo = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target); }),
      { rootMargin: '-55% 0px -45% 0px' });
    morphSecs.forEach(s => mo.observe(s));
    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive(morphSecs[morphSecs.length - 1]);
    }, { passive: true });
  }

  /* ---------- initial language ---------- */
  let initial = 'lv';
  try { initial = localStorage.getItem('aq-lang') || 'lv'; } catch (e) { /* ignore */ }
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'ru' || q === 'lv') initial = q;
  langBtns.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ---------- header, menu, active link ---------- */
  const header = $('.site-header');
  const nav = $('#nav');
  const toggle = $('.menu-toggle');
  const onScrollHeader = () => header.classList.toggle('is-stuck', window.scrollY > 24);
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('a', nav).forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('use').setAttribute('href', '#i-menu'); document.body.style.overflow = '';
  }));
  const links = $$('.nav a');
  const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => so.observe(s));
  }

  /* ---------- reveal on scroll ---------- */
  const rev = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const ro = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rev.forEach(el => ro.observe(el));
  } else rev.forEach(el => el.classList.add('in'));

  /* ---------- counters ---------- */
  const yearsEl = $('[data-count="years"]');
  if (yearsEl) yearsEl.textContent = String(new Date().getFullYear() - 1995);
  const yEl = $('#year'); if (yEl) yEl.textContent = String(new Date().getFullYear());
  const counters = $$('[data-count]');
  const animate = el => {
    const end = parseInt(el.textContent, 10);
    if (reduceMotion || isNaN(end)) return;
    const t0 = performance.now(), dur = 1400;
    const tick = t => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0'; requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { animate(e.target); co.unobserve(e.target); }
    }), { threshold: 0.6 });
    counters.forEach(c => co.observe(c));
  }

  /* ---------- depth gauge ---------- */
  const dFill = $('#depth-fill'), dDot = $('#depth-dot'), dVal = $('#depth-val');
  const track = $('.depth-track');
  let dTicking = false;
  function setDepth() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    const h = track.clientHeight;
    dFill.style.height = (p * h) + 'px';
    dDot.style.top = (p * h) + 'px';
    dVal.textContent = Math.round(p * 30) + (document.documentElement.lang === 'ru' ? ' м' : ' m');
    dTicking = false;
  }
  window.addEventListener('scroll', () => { if (!dTicking) { dTicking = true; requestAnimationFrame(setDepth); } }, { passive: true });
  window.addEventListener('resize', setDepth);

  /* ---------- hero bubbles ---------- */
  const cv = $('#bubbles');
  if (cv && !reduceMotion) {
    const ctx = cv.getContext('2d');
    let W = 0, H = 0, bubbles = [], running = true, last = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = cv.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(46, Math.max(16, W / 34)));
      bubbles = Array.from({ length: n }, () => mk(true));
    };
    const mk = init => ({ x: Math.random() * W, y: init ? Math.random() * H : H + 20, r: 1.5 + Math.random() * 5.5, v: 14 + Math.random() * 38, ph: Math.random() * 6.28, a: 0.15 + Math.random() * 0.3 });
    const frame = t => {
      if (!running) return;
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t;
      ctx.clearRect(0, 0, W, H);
      bubbles.forEach(b => {
        b.y -= b.v * dt; b.ph += dt * 1.4;
        const x = b.x + Math.sin(b.ph) * 10;
        if (b.y < -20) Object.assign(b, mk(false), { x: Math.random() * W });
        ctx.beginPath(); ctx.arc(x, b.y, b.r, 0, 6.283);
        ctx.strokeStyle = 'rgba(190,245,240,' + b.a + ')'; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,' + (b.a * 0.18) + ')'; ctx.fill();
        ctx.beginPath(); ctx.arc(x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.22, 0, 6.283);
        ctx.fillStyle = 'rgba(255,255,255,' + (b.a * 1.4) + ')'; ctx.fill();
      });
      requestAnimationFrame(frame);
    };
    resize(); window.addEventListener('resize', resize);
    const hero = $('.hero');
    const start = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } };
    new IntersectionObserver(es => { es[0].isIntersecting ? start() : (running = false); }, { threshold: 0 }).observe(hero);
    document.addEventListener('visibilitychange', () => { document.hidden ? (running = false) : start(); });
    requestAnimationFrame(frame);
  }

  /* ---------- types rail ---------- */
  const rail = $('#rail'), prev = $('#rail-prev'), next = $('#rail-next');
  if (rail) {
    const step = () => { const c = rail.querySelector('.type-card'); return c ? c.getBoundingClientRect().width + 22 : 360; };
    const upd = () => { prev.disabled = rail.scrollLeft < 8; next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8; };
    prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    rail.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
    rail.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
    });
  }

  /* ---------- gallery: filter + lightbox ---------- */
  const shots = $$('.shot');
  const chips = $$('.chip');
  chips.forEach(ch => ch.addEventListener('click', () => {
    const f = ch.dataset.filter;
    chips.forEach(c => c.setAttribute('aria-pressed', String(c === ch)));
    shots.forEach(s => s.classList.toggle('is-hidden', f !== 'all' && s.dataset.cat !== f));
  }));
  const lb = $('#lightbox'), lbImg = $('#lb-img'), lbCap = $('#lb-cap');
  let idx = 0, list = [];
  const show = i => {
    idx = (i + list.length) % list.length;
    const s = list[idx], im = $('img', s);
    lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt;
    lbCap.textContent = $('.cap > span', s).textContent + '  ·  ' + (idx + 1) + ' / ' + list.length;
  };
  shots.forEach(s => s.addEventListener('click', () => {
    list = shots.filter(x => !x.classList.contains('is-hidden'));
    show(list.indexOf(s));
    if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
  }));
  $('#lb-close').addEventListener('click', () => lb.close());
  $('#lb-prev').addEventListener('click', () => show(idx - 1));
  $('#lb-next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-inner') || e.target.classList.contains('lb-stage')) lb.close(); });
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });

  /* ---------- forms (demo) ---------- */
  const demo = (form, status) => form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    status.classList.add('show'); form.reset();
    setTimeout(() => status.classList.remove('show'), 6000);
  });
  demo($('#contact-form'), $('#form-status'));
  demo($('#newsletter'), $('#nl-status'));

  /* ---------- go ---------- */
  setLang(initial);
  setDepth();
})();
