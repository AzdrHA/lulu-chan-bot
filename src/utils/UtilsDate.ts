export default class UtilsDate {
  /**
   * @param {number} ms
   * @return {string}
   */
  public static formatTime = (ms: number): string => {
    const timeMs = new Date(ms);
    const minutes = timeMs.getMinutes();
    const seconds = timeMs.getSeconds();
    const milliseconds = timeMs.getMilliseconds();

    let time = '';
    time += minutes ? '' + minutes : '';
    time += seconds ? '' + seconds : seconds;
    time += '.' + milliseconds;

    return time;
  };

  /**
   * @param {number[]} data
   * @param {string} separator
   * @return {string}
   */
  public static dateTransform = (data: number[], separator?: string): string =>
    data.map((fn) => String(fn).padStart(2, '0')).join(separator);

  /**
   * @param {Date} date
   * @return {string}
   */
  public static convertDateToFormat = (date: Date): string =>
    `${UtilsDate.dateTransform(
      [date.getDate(), date.getMonth(), date.getFullYear()],
      '/'
    )} ${UtilsDate.dateTransform(
      [date.getHours(), date.getMinutes(), date.getSeconds()],
      ':'
    )}`;
}
