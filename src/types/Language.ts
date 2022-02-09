export type Language = 'en' | 'fr';

export type LanguageList = {
  [lang in Language]: {
    id: lang;
    lang: string;
    flag: string;
  };
};
