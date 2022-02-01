import emojis from '../../utils/emoji';
/**
 *
 * @param {string} keyTranslation
 * @param {object} options
 * @return {string}
 */
const t = (
  keyTranslation: string,
  options: {
    lang: string;
    variables?: object;
  }
): string => {
  try {
    // TODO REMOVE eslint-disable-next-line

    if (!options.lang) return keyTranslation;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const lang: object = require(`../../translations/${options.lang}.json`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const defaultLanguage = require(`../../translations/en.json`);
    let str = lang[keyTranslation] ?? defaultLanguage[keyTranslation];

    if (!str) return keyTranslation;

    for (const k of Object.keys(emojis)) {
      const re = new RegExp(`{${k}}`, 'gi');
      if (re) str = str.replace(re, emojis[k]);
    }

    if (options.variables) {
      for (const i of Object.keys(options.variables)) {
        const re = new RegExp(`{${i}}`, 'gi');
        if (re) str = str.replace(re, options.variables[i]);
      }
    }

    return str;
  } catch (e) {
    switch (e.code) {
      case 'MODULE_NOT_FOUND':
        return keyTranslation;
    }
  }
};

export default t;
