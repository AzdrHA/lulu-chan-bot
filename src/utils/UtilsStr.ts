export default class UtilsStr {
  /**
   * @param {string} input
   * @return {string[]}
   */
  public static convertStringArrayToArray = (input: string): string[] => {
    return input.replace(/[\[\]]/g, '').split(',');
  };

  /**
   * @param {string} content
   * @param {object} options
   * @return {string}
   */
  public static replace = (
    content: string,
    options: { [key: string]: string }
  ): string => {
    let str = content;
    if (options) {
      for (const i of Object.keys(options)) {
        const re = new RegExp(`{${i}}`, 'gi');
        if (re) str = str.replace(re, options[i]);
      }
    }
    return str;
  };
}
