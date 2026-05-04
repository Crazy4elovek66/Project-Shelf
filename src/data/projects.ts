export type ProjectStatus = "Готово" | "MVP" | "В разработке" | "Технический эксперимент";

export type Project = {
  title: string;
  status: ProjectStatus;
  description: string;
  features: string[];
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
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

export const projects: Project[] = [
  {
    title: "JobRadar",
    status: "MVP",
    description:
      "Telegram-бот для поиска IT-вакансий с упором на отсев шумных и нерелевантных предложений.",
    features: [
      "Поиск вакансий через API",
      "Фильтрация колл-центров и нетехнической поддержки",
      "Команды Telegram-бота",
      "Подбор под заданные критерии",
    ],
    stack: ["Python", "Telegram Bot API", "HH API", "SQLite", "Supabase"],
    repoUrl: "https://github.com/Crazy4elovek66/JobRadar",
    demoUrl: "",
    imageUrl: "/projects/JobRadar1.png",
    visual: {
      label: "поиск / вакансии / радар",
      accent: "from-cyan-300 via-sky-500 to-indigo-500",
      pattern: "radar",
    },
  },
  {
    title: "Twitch AI Viewers",
    status: "Технический эксперимент",
    description:
      "Эксперимент с умным Twitch-ботом, который анализирует контекст стрима и генерирует сообщения от разных персонажей.",
    features: [
      "Анализ чата и контекста",
      "STT для аудиопотока",
      "LLM-генерация реплик",
      "Память и разные характеры ботов",
    ],
    stack: ["Python", "Twitch API", "STT", "LLM", "FFmpeg"],
    repoUrl: "https://github.com/Crazy4elovek66/TwitchChatAi",
    demoUrl: "",
    imageUrl: "/projects/TwitchAiViev.png",
    visual: {
      label: "чат / стрим / AI",
      accent: "from-violet-300 via-fuchsia-500 to-cyan-400",
      pattern: "chat",
    },
  },
  {
    title: "Aura.net",
    status: "В разработке",
    description:
      "Веб-интерфейс для исследования современной цифровой эстетики. Разработка компонентной базы и проектирование UI/UX решений.",
    features: [
      "Современный веб-интерфейс",
      "Компонентная структура",
      "Подготовка к MVP-сценариям",
      "Аккуратная упаковка идеи",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/Crazy4elovek66/aura-net",
    demoUrl: "",
    imageUrl: "/projects/AuraNet1.png",
    visual: {
      label: "сеть / веб-сервис",
      accent: "from-emerald-300 via-cyan-500 to-blue-500",
      pattern: "network",
    },
  },
  {
    title: "ProfitCheck",
    status: "Готово",
    description:
      "Небольшой сервисный калькулятор для расчета цены заказа с учетом закупки, комиссии, вывода и нужной прибыли.",
    features: [
      "Расчет итоговой цены",
      "Учет комиссии площадки",
      "Планирование маржи",
      "Быстрая проверка вариантов",
    ],
    stack: ["TypeScript", "React", "Tailwind CSS"],
    repoUrl: "https://github.com/Crazy4elovek66/ProfitCheck",
    demoUrl: "",
    imageUrl: "/projects/ProfitCheck.png",
    visual: {
      label: "калькулятор / финансы",
      accent: "from-lime-200 via-emerald-400 to-teal-500",
      pattern: "calc",
    },
  },
  {
    title: "AutoClip",
    status: "MVP",
    description: "Инструмент для автоматической нарезки и обработки видеоклипов.",
    features: [
      "Анализ видеоряда",
      "Автоматизированная нарезка",
      "Работа с видеоформатами",
      "Оптимизация процесса",
    ],
    stack: ["Python", "FFmpeg"],
    repoUrl: "https://github.com/Crazy4elovek66/AutoClip",
    demoUrl: "",
    imageUrl: "/projects/AutoClip1.png",
    visual: {
      label: "видео / скрипт",
      accent: "from-purple-400 via-pink-500 to-rose-500",
      pattern: "network",
    },
  },
];
