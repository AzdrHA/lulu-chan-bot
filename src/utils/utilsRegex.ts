export const hexColorRegex = /^#([A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?)$/;

export default class UtilsRegex {
  /**
   * @param {string} color
   * @return {boolean}
   */
  public static isHexColor = (color: string): boolean => {
    return hexColorRegex.test(color);
  };
}
