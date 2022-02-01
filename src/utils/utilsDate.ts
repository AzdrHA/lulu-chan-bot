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
}
