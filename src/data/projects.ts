import projectCommits from "./project-commits.json";

export type ProjectStatus = "Готово" | "MVP" | "В разработке" | "Технический эксперимент" | "Сырой прототип";

export type ProjectCategory = "ai" | "fullstack" | "automation";

export type Project = {
  title: string;
  status: ProjectStatus;
  category?: ProjectCategory;
  categoryLabel?: string;
  description: string;
  architectureNote?: string;
  metrics?: string;
  features: string[];
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  images?: string[];
  updatedAt?: string;
  visual: {
    label: string;
    accent: string;
    pattern: "radar" | "chat" | "network" | "rank" | "calc" | "overlay" | "order";
  };
  // Simple mode fields
  simpleSubtitle?: string;
  simpleDescription?: string;
  simpleArchitectureNote?: string;
  simpleMetrics?: string;
  simpleFeatures?: string[];
  simpleCategoryLabel?: string;
};

export function getProjectId(title: string) {
  return `project-${title
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

const rawProjects: Project[] = [
  {
    title: "JobRadar",
    status: "MVP",
    category: "automation",
    categoryLabel: "DATA PIPELINE & TELEGRAM BOT",
    description:
      "Асинхронный Telegram-бот для автоматического поиска и фильтрации IT-вакансий с умным отсевом шумных нетехнических предложений и колл-центров.",
    architectureNote:
      "Асинхронный сбор через HeadHunter API с динамической нормализацией зарплатных вилок, дедупликацией по хэшу требований и синхронизацией в Supabase PostgreSQL.",
    metrics: "Отсев 85%+ нерелевантного шума // Индексация < 1.2с",
    features: [
      "Автоматический сбор вакансий через HH API в реальном времени",
      "Многоуровневый фильтр колл-центров и нетехнической поддержки",
      "Индивидуальный подбор под заданный стек и зарплатные ожидания",
      "Асинхронная доставка уведомлений пользователю в Telegram",
    ],
    simpleCategoryLabel: "TELEGRAM-БОТ ДЛЯ ПОИСКА РАБОТЫ",
    simpleDescription: "Telegram-бот для умного поиска IT-вакансий",
    simpleArchitectureNote:
      "Бот сам следит за новыми вакансиями, отсеивает спам, колл-центры и неподходящие предложения, присылая только релевантные варианты прямо в Telegram.",
    simpleMetrics: "Отсеивает 85%+ спама // Мгновенные уведомления",
    simpleFeatures: [
      "Автоматический поиск свежих вакансий",
      "Фильтрация спама и неподходящих предложений",
      "Удобные кнопки управления прямо в чате",
      "Подбор строго под ваши требования",
    ],
    stack: ["Python", "aiogram", "HH API", "SQLite", "Supabase", "PostgreSQL"],
    repoUrl: "https://github.com/Crazy4elovek66/JobRadar",
    demoUrl: "",
    imageUrl: "/projects/JobRadar1.webp",
    images: ["/projects/JobRadar1.webp", "/projects/JobRadar2.webp"],
    visual: {
      label: "поиск / вакансии / радар",
      accent: "from-cyan-400 via-sky-500 to-indigo-600",
      pattern: "radar",
    },
  },
  {
    title: "Twitch AI Viewers",
    status: "Технический эксперимент",
    category: "ai",
    categoryLabel: "SPEECH-TO-TEXT & MULTI-AGENT LLM",
    description:
      "Интеллектуальный агент для Twitch-стримов, анализирующий голосовой поток стримера в реальном времени и генерирующий реплики от персонажей с уникальными личностями.",
    architectureNote:
      "Захват аудиопотока через FFmpeg, распознавание речи Whisper STT, буферизация семантического контекста и роутинг промптов в LLM с раздельной долговременной памятью персон.",
    metrics: "Задержка реплики < 2.8с // 4 автономные персоны чата",
    features: [
      "Захват и транскрибация живого аудиопотока стрима через STT",
      "Анализ семантического контекста происходящего на трансляции",
      "Генерация сообщений с сохранением характера и настроения ботов",
      "Автономная координация диалога между несколькими агентами",
    ],
    simpleCategoryLabel: "НЕЙРОСЕТЬ ДЛЯ ЧАТА СТРИМА",
    simpleDescription: "Умные виртуальные зрители с нейросетью для живого общения в чате стрима",
    simpleArchitectureNote:
      "Программа слушает речь стримера и смотрит на экран, после чего разные виртуальные персонажи осмысленно комментируют происходящее в чате в реальном времени.",
    simpleMetrics: "Ответ за 2-3 секунды // 4 персонажа с разным характером",
    simpleFeatures: [
      "Понимает голос стримера и картинку на экране",
      "Несколько персонажей со своим характером",
      "Естественные ответы без шаблонных фраз",
      "Поддерживает активность и вовлеченность в чате",
    ],
    stack: ["Python", "Twitch API", "Whisper STT", "LLM", "FFmpeg", "AsyncIO"],
    repoUrl: "https://github.com/Crazy4elovek66/TwitchChatAi",
    demoUrl: "",
    imageUrl: "/projects/TwitchAiViev.webp",
    images: ["/projects/TwitchAiViev.webp"],
    visual: {
      label: "чат / стрим / AI",
      accent: "from-violet-400 via-fuchsia-500 to-cyan-400",
      pattern: "chat",
    },
  },
  {
    title: "Aura.net",
    status: "В разработке",
    category: "fullstack",
    categoryLabel: "CREATIVE ENGINEERING & NEXT.JS WEB APP",
    description:
      "Высокопроизводительный веб-интерфейс для исследования современной цифровой эстетики. Разработка модульной дизайн-системы, компонентной базы и микро-интеракций.",
    architectureNote:
      "Next.js App Router с гибридным SSR/CSR рендерингом, Framer Motion хореографией переходов и масштабируемой дизайн-системой на Tailwind CSS.",
    metrics: "Lighthouse Performance 98+ // 60 FPS интерфейсные микро-анимации",
    features: [
      "Кастомная кинетическая дизайн-система и сетка компонентов",
      "Плавная физика интерфейсных анимаций и хореография переходов",
      "Адаптивная верстка под десктопные, планшетные и мобильные экраны",
      "Оптимизированный бандл и мгновенный отклик интерактивных элементов",
    ],
    simpleCategoryLabel: "ВЕБ-СЕРВИС И ДИЗАЙН-СИСТЕМА",
    simpleDescription: "Веб-приложение внутри Telegram для социального рейтинга и голосования",
    simpleArchitectureNote:
      "Современный интерактивный сервис, который открывается прямо в Telegram без установки лишних приложений: пользователи оценивают друг друга и следят за рейтингом.",
    simpleMetrics: "Мгновенная загрузка // Плавная работа на любых устройствах",
    simpleFeatures: [
      "Открывается в один клик прямо в Telegram",
      "Быстрый и плавный современный интерфейс",
      "Система голосования и живых рейтингов",
      "Готовая основа для запуска онлайн-сообщества",
    ],
    stack: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    repoUrl: "https://github.com/Crazy4elovek66/aura-net",
    demoUrl: "https://aura-net.vercel.app",
    imageUrl: "/projects/AuraNet1.webp",
    images: ["/projects/AuraNet1.webp", "/projects/AuraNet2.webp", "/projects/AuraNet3.webp"],
    visual: {
      label: "сеть / веб-сервис",
      accent: "from-emerald-400 via-cyan-500 to-blue-600",
      pattern: "network",
    },
  },
  {
    title: "ProfitCheck",
    status: "Готово",
    category: "fullstack",
    categoryLabel: "FINANCIAL TELEGRAM MINI APP",
    description:
      "Сервисный калькулятор и Telegram-бот для мгновенного финансового моделирования сделок с учетом закупочной стоимости, многоуровневых комиссий площадок и вывода средств.",
    architectureNote:
      "Легковесный реактивный стейт с мгновенным пересчетом маржинальности, поддержкой сложных формул комиссионных ступеней и Telegram WebApp интеграцией.",
    metrics: "Мгновенный расчет < 16мс // 100% точность математики комиссий",
    features: [
      "Точный расчет итоговой цены реализации под целевую маржу",
      "Учет сложных прогрессивных комиссий торговых площадок",
      "Моделирование сценариев скидок, затрат на вывод и налогов",
      "Оптимизированный интерфейс для мгновенного доступа со смартфона",
    ],
    simpleCategoryLabel: "КАЛЬКУЛЯТОР ПРИБЫЛИ В TELEGRAM",
    simpleDescription: "Умный калькулятор в Telegram для быстрого расчета цены заказа и чистой прибыли",
    simpleArchitectureNote:
      "Помогает продавцам и фрилансерам за секунду посчитать, какую цену назвать клиенту, чтобы после всех комиссий площадки и расходов осталась нужная чистая прибыль.",
    simpleMetrics: "Точный расчет за секунду // Без математических ошибок",
    simpleFeatures: [
      "Мгновенный расчет итоговой цены для клиента",
      "Автоматический учет комиссий площадок и вывода",
      "Показывает точную чистую прибыль со сделки",
      "Удобная работа со смартфона за пару секунд",
    ],
    stack: ["TypeScript", "React", "Tailwind CSS", "Telegram WebApp API"],
    repoUrl: "https://github.com/Crazy4elovek66/ProfitCheck",
    demoUrl: "https://t.me/ProfitCheckkbot",
    imageUrl: "/projects/ProfitCheck.webp",
    images: ["/projects/ProfitCheck.webp"],
    visual: {
      label: "калькулятор / финансы",
      accent: "from-lime-300 via-emerald-400 to-teal-500",
      pattern: "calc",
    },
  },
  {
    title: "AutoClip",
    status: "MVP",
    category: "ai",
    categoryLabel: "COMPUTER VISION & VIDEO AUTOMATION",
    description:
      "Автоматизированный конвейер нарезки горизонтальных стримов в виральный вертикальный формат (9:16) с трехэтапным трекингом лиц спикера для удержания в кадре.",
    architectureNote:
      "Каскадный трекинг OpenCV Haar + Caffe DNN + MediaPipe Face Mesh, сглаживание траектории кропа экспоненциальным фильтром и ускоренный FFmpeg аппаратный рендеринг.",
    metrics: "Кадрирование 9:16 с удержанием 94%+ // Автопостинг в каналы",
    features: [
      "Автоматизированный захват хайлайтов и клипов с платформ стриминга",
      "Трехэтапная гибридная детекция лиц спикера для стабильного кадрирования",
      "Динамическое сглаживание перемещения виртуальной камеры без дерганий",
      "Пакетный рендеринг FFmpeg и автоматический экспорт в соцсети",
    ],
    simpleCategoryLabel: "АВТОМАТИЧЕСКАЯ НАРЕЗКА ВИДЕО",
    simpleDescription: "Автопилот для нарезки лучших моментов со стримов и публикации в YouTube Shorts",
    simpleArchitectureNote:
      "Система сама находит самые эмоциональные моменты прямого эфира, обрезает видео под вертикальный формат телефона с фокусом на лице и публикует ролики.",
    simpleMetrics: "Авто-формат 9:16 // Публикация без участия человека",
    simpleFeatures: [
      "Автоматический поиск ярких моментов эфира",
      "Умная обрезка под вертикальный экран телефона",
      "Автоматическая сборка и подготовка роликов",
      "Публикация в YouTube Shorts без ручного монтажа",
    ],
    stack: ["Python", "OpenCV", "Caffe DNN", "FFmpeg", "MediaPipe", "AsyncIO"],
    repoUrl: "https://github.com/Crazy4elovek66/AutoClip",
    demoUrl: "",
    imageUrl: "/projects/AutoClip1.webp",
    images: ["/projects/AutoClip1.webp", "/projects/AutoClip2.webp", "/projects/AutoClip3.webp"],
    visual: {
      label: "видео / компьютерное зрение",
      accent: "from-purple-400 via-pink-500 to-rose-600",
      pattern: "network",
    },
  },
  {
    title: "Магия Бабушки",
    status: "Готово",
    category: "ai",
    categoryLabel: "TELEGRAM MINI APP // MULTI-LLM PIPELINE",
    description:
      "Полнофункциональное интерактивное WebApp-приложение внутри Telegram для психологических раскладов на базе ИИ с отказоустойчивой архитектурой генерации.",
    architectureNote:
      "Многоуровневый Fallback роутинг через OpenRouter API (Mistral/Claude/GPT), автоматическая бэкенд-нормализация грамматики и сохранение сессий в Supabase PostgreSQL.",
    metrics: "99.9% доступность ответов // Fallback защита от сбоев провайдеров",
    features: [
      "Многослойный prompt-пайплайн с контролем тональности и структуры",
      "Умный автоматический Fallback между LLM-провайдерами без разрыва сессии",
      "Динамическое согласование грамматических родов и параметров пользователя",
      "Интерактивный WebApp интерфейс внутри Telegram с тактильным откликом",
    ],
    simpleCategoryLabel: "ПРИЛОЖЕНИЕ ВНУТРИ TELEGRAM",
    simpleDescription: "Интерактивное приложение-оракул в Telegram с разборами по фото, ладони и картам",
    simpleArchitectureNote:
      "Мини-приложение внутри Telegram, где нейросеть проводит персональные разборы в теплом стиле, сохраняет историю сеансов и стабильно отвечает даже при высокой нагрузке.",
    simpleMetrics: "Бесперебойная работа 24/7 // Память диалогов",
    simpleFeatures: [
      "Разборы по фото кофейной гущи, ладони и картам",
      "Теплая и живая подача текста от нейросети",
      "Запасные нейросети для бесперебойной работы",
      "Удобный экран приложения внутри Telegram",
    ],
    stack: [
      "Node.js",
      "Express",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "OpenRouter API",
      "Telegram WebApp API",
    ],
    repoUrl: "https://t.me/BabushkaMagicBot/app",
    demoUrl: "https://github.com/Crazy4elovek66/Project-Shelf/blob/main/docs/case-study-magic.md",
    imageUrl: "/projects/Magic.webp",
    images: ["/projects/Magic.webp"],
    visual: {
      label: "ИИ / Telegram Mini App / WebApp",
      accent: "from-indigo-600 via-purple-600 to-pink-500",
      pattern: "chat",
    },
  },
  {
    title: "Ракомания",
    status: "Готово",
    category: "fullstack",
    categoryLabel: "FULL-STACK DISPATCH HUB & TELEGRAM WEBAPP",
    description:
      "Омниканальная цифровая платформа доставки живых и вареных раков: витрина Telegram WebApp, умная маршрутизация заказов между кухней и курьерами, геозоны доставки.",
    architectureNote:
      "FastAPI бэкенд на Python 3.11+, асинхронная ORM SQLAlchemy с SQLite/PostgreSQL, расчет полигональных геозон через Shapely, интеграция с платежами и Telegram Bot FSM.",
    metrics: "Автоматизация 90%+ заказов // Расчет геозон < 4мс",
    features: [
      "Telegram WebApp витрина с выбором граммовок и варок",
      "Автоматическая диспетчеризация по сменам и статусам кухни",
      "Расчет стоимости доставки по полигональным геозонам Shapely",
      "Интерактивная панель управления для диспетчера и поваров",
    ],
    simpleCategoryLabel: "СИСТЕМА ДОСТАВКИ И ТОРГОВЛИ ПОД КЛЮЧ",
    simpleDescription: "Автоматизированная система онлайн-заказов и доставки раков с Telegram-витриной и панелью управления",
    simpleArchitectureNote:
      "Полноценный комплекс для бизнеса: клиенты заказывают свежих или вареных раков через Telegram, система автоматически считает стоимость доставки по адресу, передает заказ на кухню и назначает курьера.",
    simpleMetrics: "90% заказов без участия оператора // Точный расчет доставки",
    simpleFeatures: [
      "Удобная витрина в Telegram для заказа в пару кликов",
      "Автоматический расчет цены доставки до двери",
      "Панель для кухни: статусы варки и готовности",
      "Оповещения клиенту о каждом этапе заказа",
    ],
    stack: ["Python", "FastAPI", "Telegram Bot API", "SQLAlchemy", "SQLite", "Shapely", "Docker", "Tailwind CSS"],
    repoUrl: "https://github.com/Crazy4elovek66/Rak",
    demoUrl: "",
    imageUrl: "/projects/Rakomania1.webp",
    images: ["/projects/Rakomania1.webp", "/projects/Rakomania2.webp"],
    visual: {
      label: "доставка / диспетчерская / webapp",
      accent: "from-rose-500 via-orange-500 to-amber-500",
      pattern: "order",
    },
  },
  {
    title: "DotaOverlay",
    status: "Сырой прототип",
    category: "automation",
    categoryLabel: "ELECTRON & VAC-SAFE GAME STATE INTEGRATION",
    description:
      "Десктопный оверлей для Dota 2 на Electron и React с живым анализом драфтов, определением сигнатурных героев противников и рекомендацией контрпиков.",
    architectureNote:
      "100% VAC-безопасная архитектура без инъекций в память процесса: локальный Express HTTP-сервер слушает Valve GSI (Game State Integration), синхронизируется с OpenDota API и кеширует историю в SQLite.",
    metrics: "0 инъекций в память // Задержка GSI < 15мс",
    features: [
      "VAC-безопасный перехват игровых событий через Valve GSI HTTP",
      "Парсинг логов сервера Dota 2 для идентификации 10 игроков",
      "Мгновенный скоринг винрейта связок и контрпиков по мете",
      "Оверлей на прозрачном Electron-окне с поддержкой клик-сквозь",
    ],
    simpleCategoryLabel: "ПОМОЩНИК В ИГРЕ ДЛЯ АНАЛИЗА ДРАФТОВ",
    simpleDescription: "Умный игровой оверлей для Dota 2 с анализом пиков и подсказками контргероев",
    simpleArchitectureNote:
      "Программа работает как подсказчик во время выбора героев: считывает матч через официальный API игры (без риска бана), показывает любимых героев соперников и советует, кого лучше взять.",
    simpleMetrics: "Безопасно без риска бана // Мгновенный расчет контрпиков",
    simpleFeatures: [
      "Официальный безопасный способ работы без блокировок",
      "Показывает сильных героев каждого игрока в матче",
      "Рекомендует лучших персонажей против текущего пика",
      "Удобное окно поверх игры во время выбора героев",
    ],
    stack: ["Electron", "TypeScript", "React", "Node.js", "Express", "SQLite", "OpenDota API", "Tailwind CSS"],
    repoUrl: "https://github.com/Crazy4elovek66/DotaOverlay",
    demoUrl: "",
    imageUrl: "/projects/DotaOverlay1.webp",
    images: ["/projects/DotaOverlay1.webp", "/projects/DotaOverlay2.webp"],
    visual: {
      label: "игры / оверлей / киберспорт",
      accent: "from-amber-400 via-red-500 to-purple-600",
      pattern: "overlay",
    },
  },
];

export const projects: Project[] = rawProjects.map((p) => ({
  ...p,
  updatedAt: (projectCommits as Record<string, string>)[p.title] || undefined,
}));
