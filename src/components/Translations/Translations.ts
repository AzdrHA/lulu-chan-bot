import EmojiConfig from '../../config/EmojiConfig';
import UtilsStr from '../../utils/UtilsStr';

/**
 *
 * @param {string} keyTranslation
 * @param {object} options
 * @return {string}
 */
const translations = (
  keyTranslation: string,
  options: {
    lang: string;
    variables?: { [key: string]: string };
  }
): string => {
  try {
    // TODO REMOVE eslint-disable-next-line
    if (!options.lang) return keyTranslation;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const lang: object = require(`../../translations/${options.lang}.json`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const defaultLanguage = require(`../../translations/en.json`);

    return UtilsStr.replace(
      lang[keyTranslation] ?? defaultLanguage[keyTranslation] ?? keyTranslation,
      Object.assign(EmojiConfig, options.variables)
    );
  } catch (e) {
    switch (e.code) {
      case 'MODULE_NOT_FOUND':
        return keyTranslation;
    }
  }
};

export default translations;
