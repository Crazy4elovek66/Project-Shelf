import projectCommits from "./project-commits.json";

export type ProjectStatus = "Готово" | "MVP" | "В разработке" | "Технический эксперимент";

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
    pattern: "radar" | "chat" | "network" | "rank" | "calc";
  };
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
    stack: ["Python", "aiogram", "HH API", "SQLite", "Supabase", "PostgreSQL"],
    repoUrl: "https://github.com/Crazy4elovek66/JobRadar",
    demoUrl: "",
    imageUrl: "/projects/JobRadar1.png",
    images: ["/projects/JobRadar1.png", "/projects/JobRadar2.png"],
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
    stack: ["Python", "Twitch API", "Whisper STT", "LLM", "FFmpeg", "AsyncIO"],
    repoUrl: "https://github.com/Crazy4elovek66/TwitchChatAi",
    demoUrl: "",
    imageUrl: "/projects/TwitchAiViev.png",
    images: ["/projects/TwitchAiViev.png"],
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
    stack: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    repoUrl: "https://github.com/Crazy4elovek66/aura-net",
    demoUrl: "https://aura-net.vercel.app",
    imageUrl: "/projects/AuraNet1.png",
    images: ["/projects/AuraNet1.png", "/projects/AuraNet2.png", "/projects/AuraNet3.png"],
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
    stack: ["TypeScript", "React", "Tailwind CSS", "Telegram WebApp API"],
    repoUrl: "https://github.com/Crazy4elovek66/ProfitCheck",
    demoUrl: "https://t.me/ProfitCheckkbot",
    imageUrl: "/projects/ProfitCheck.png",
    images: ["/projects/ProfitCheck.png"],
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
    stack: ["Python", "OpenCV", "Caffe DNN", "FFmpeg", "MediaPipe", "AsyncIO"],
    repoUrl: "https://github.com/Crazy4elovek66/AutoClip",
    demoUrl: "",
    imageUrl: "/projects/AutoClip1.png",
    images: ["/projects/AutoClip1.png", "/projects/AutoClip2.png", "/projects/AutoClip3.png"],
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
    imageUrl: "/projects/Magic.png",
    images: ["/projects/Magic.png"],
    visual: {
      label: "ИИ / Telegram Mini App / WebApp",
      accent: "from-indigo-600 via-purple-600 to-pink-500",
      pattern: "chat",
    },
  },
];

export const projects: Project[] = rawProjects.map((p) => ({
  ...p,
  updatedAt: (projectCommits as Record<string, string>)[p.title] || undefined,
}));
