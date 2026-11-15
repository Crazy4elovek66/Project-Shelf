export type SkillGroup = {
  title: string;
  category: "ai" | "frontend" | "backend" | "infra";
  items: string[];
};

export type SkillCategory = "all" | "ai" | "frontend" | "backend";

export const skillFilterTabs: { id: SkillCategory; label: string }[] = [
  { id: "all", label: "Все технологии" },
  { id: "ai", label: "AI & Automation" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "backend", label: "Backend & Infra" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "ИИ, LLM & Агенты",
    category: "ai",
    items: [
      "OpenRouter API",
      "LLM Fallback Routing",
      "Prompt Architecture",
      "Whisper STT",
      "OpenCV / Caffe",
      "MediaPipe",
      "Multi-Agent Systems",
    ],
  },
  {
    title: "Фронтенд & WebApp",
    category: "frontend",
    items: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Telegram WebApp API",
      "Vite",
    ],
  },
  {
    title: "Бэкенд, Боты & API",
    category: "backend",
    items: [
      "Python",
      "aiogram",
      "Node.js",
      "Express",
      "FastAPI",
      "HH API",
      "Twitch API",
      "REST API",
    ],
  },
  {
    title: "Данные & Инфраструктура",
    category: "infra",
    items: [
      "Supabase",
      "PostgreSQL",
      "SQLite",
      "FFmpeg",
      "Git / GitHub",
      "Vercel",
      "Linux VPS",
      "Docker",
    ],
  },
];

export const skillRelations: Record<string, string[]> = {
  "Next.js 15": ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
  "React 19": ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Telegram WebApp API"],
  "TypeScript": ["Next.js 15", "React 19", "Node.js", "Express"],
  "Tailwind CSS": ["Next.js 15", "React 19"],
  "Framer Motion": ["React 19", "Next.js 15", "Tailwind CSS"],
  "Telegram WebApp API": ["React 19", "TypeScript", "aiogram", "Node.js"],
  "Python": ["aiogram", "FastAPI", "OpenCV / Caffe", "Whisper STT", "FFmpeg", "HH API"],
  "aiogram": ["Python", "Telegram WebApp API", "SQLite", "Supabase"],
  "OpenRouter API": ["LLM Fallback Routing", "Prompt Architecture", "Multi-Agent Systems"],
  "LLM Fallback Routing": ["OpenRouter API", "Multi-Agent Systems", "Prompt Architecture"],
  "Prompt Architecture": ["OpenRouter API", "Multi-Agent Systems"],
  "OpenCV / Caffe": ["Python", "MediaPipe", "FFmpeg"],
  "MediaPipe": ["OpenCV / Caffe", "Python"],
  "FFmpeg": ["OpenCV / Caffe", "Whisper STT", "Python"],
  "Supabase": ["PostgreSQL", "Next.js 15", "React 19", "Node.js"],
  "PostgreSQL": ["Supabase", "Node.js", "Python"],
  "Vercel": ["Next.js 15", "React 19", "Git / GitHub"],
  "Git / GitHub": ["Vercel", "Linux VPS"],
};

export const workSteps = [
  {
    step: "01",
    title: "Декомпозиция и системная архитектура",
    text: "Анализирую корневую бизнес-проблему, проектирую архитектуру данных, контракты API и выбираю оптимальный стек без лишней сложности.",
    tags: ["System Design", "API Specs", "Risk Audit"],
  },
  {
    step: "02",
    title: "AI-прототипирование и ядро бэкенда",
    text: "Разворачиваю асинхронный бэкенд, интегрирую LLM/STT/CV пайплайны с защитой от сбоев (fallback) и собираю рабочий каркас логики.",
    tags: ["LLM Pipelines", "FastAPI/aiogram", "Supabase"],
  },
  {
    step: "03",
    title: "Интерфейс, интеграция и стресс-тесты",
    text: "Создаю кинетический интерфейс (Next.js/Telegram WebApp), связываю с бэкендом, отлаживаю граничные сценарии и исключения.",
    tags: ["Next.js 15", "Framer Motion", "Error Handling"],
  },
  {
    step: "04",
    title: "Деплой, CI/CD и мониторинг 24/7",
    text: "Вывожу систему в прод на Vercel и Linux VPS, настраиваю логирование, автоматические алерты и документирую архитектуру в README.",
    tags: ["Vercel", "Docker", "Monitoring", "Zero-Downtime"],
  },
];
