export default class UtilsStr {
  /**
   * @param {string} input
   * @return {string[]}
   */
  public static convertStringArrayToArray = (input: string): string[] => {
    return input.replace(/[\[\]]/g, '').split(',');
  };
}
