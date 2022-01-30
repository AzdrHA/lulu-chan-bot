export type Language = {
  [lang: string]: {
    lang: string;
    flag: string;
    id: string;
  };
};

export const AppLanguage: Language = {
  en: {
    id: 'en',
    lang: 'English',
    flag: ':flag_gb:'
  },
  fr: {
    id: 'fr',
    lang: 'Français',
    flag: ':flag_fr:'
  }
};
