export const CONTACTS = {
  name: "Илья",
  handle: "idleON",
  role: "Full-Stack AI Developer & Systems Engineer",
  location: "Волгоград // Remote (любая таймзона)",
  email: "apalladiumtv@gmail.com",
  telegram: "https://t.me/Crazy4elovek",
  telegramHandle: "@Crazy4elovek",
  github: "https://github.com/Crazy4elovek66",
  hh_resume: "https://hh.ru/resume/fe6b710dff10831cac0039ed1f46335a764430",
} as const;

export const contactItems = [
  {
    label: "Telegram",
    value: "@Crazy4elovek",
    href: CONTACTS.telegram,
    type: "link" as const,
    copyValue: "@Crazy4elovek",
    badge: "Быстрый ответ < 15 мин",
  },
  {
    label: "GitHub",
    value: "Crazy4elovek66",
    href: CONTACTS.github,
    type: "link" as const,
    copyValue: "https://github.com/Crazy4elovek66",
    badge: "Все исходники",
  },
  {
    label: "Email",
    value: "apalladiumtv@gmail.com",
    href: `mailto:${CONTACTS.email}`,
    type: "email" as const,
    copyValue: CONTACTS.email,
    badge: "Коммерческие предложения",
  },
  {
    label: "HH / Резюме",
    value: "fe6b710d...",
    href: CONTACTS.hh_resume,
    type: "link" as const,
    copyValue: CONTACTS.hh_resume,
    badge: "Подробный опыт",
  },
] as const;
