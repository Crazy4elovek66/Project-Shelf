export const CONTACTS = {
  email: "apalladiumtv@gmail.com",
  telegram: "https://t.me/Crazy4elovek",
  hh_resume: "https://hh.ru/resume/fe6b710dff10831cac0039ed1f46335a764430",
} as const;

export const contactItems = [
  {
    label: "Telegram",
    href: CONTACTS.telegram,
    type: "link",
  },
  {
    label: "HH / резюме",
    href: CONTACTS.hh_resume,
    type: "link",
  },
  {
    label: "Почта",
    href: `mailto:${CONTACTS.email}`,
    type: "email",
  },
] as const;
