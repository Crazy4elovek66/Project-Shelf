export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Фронтенд",
    items: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Бэкенд и боты",
    items: ["Python", "Node.js", "Telegram Bot API"],
  },
  {
    title: "API и интеграции",
    items: ["HH API", "Twitch API", "REST API"],
  },
  {
    title: "ИИ и автоматизация",
    items: ["ChatGPT", "Gemini", "Codex", "Prompt Engineering", "AI-assisted development"],
  },
  {
    title: "Инструменты",
    items: ["Git", "GitHub", "Vercel", "Supabase", "FFmpeg"],
  },
];

export const workSteps = [
  {
    title: "Идея и задача",
    text: "Разбираю, какую проблему должен закрыть проект и где у него реальная польза.",
  },
  {
    title: "Архитектура и стек",
    text: "Выбираю понятную структуру, подходящие API и минимальный набор технологий без лишней сложности.",
  },
  {
    title: "MVP и интеграции",
    text: "Собираю рабочую версию, подключаю сервисы и довожу основной сценарий до результата.",
  },
  {
    title: "Тестирование и отладка",
    text: "Проверяю поведение, ищу слабые места, чиню ошибки и уточняю логику.",
  },
  {
    title: "Улучшение и упаковка",
    text: "Дорабатываю интерфейс, тексты, документацию и подачу проекта для внешнего просмотра.",
  },
];
