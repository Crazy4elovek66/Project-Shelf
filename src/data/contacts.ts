export const CONTACTS = {
  email: "apalladiumtv@gmail.com",
  telegram: "https://t.me/Crazy4elovek",
  hh_resume: "https://saratov.hh.ru/resume/735f924bff106f79140039ed1f685350533748",
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
