import * as util from 'util';

const color = {
  cyan: function (message: string) {
    return `\x1b[36m${message}\x1b[0m`;
  },
  black: function (message: string) {
    return `\x1b[30m${message}\x1b[0m`;
  },
  red: function (message: string) {
    return `\x1b[31m${message}\x1b[0m`;
  }
};

/**
 * @param {string} prefix = ''
 * @param {string} message
 * @param {any[]} optionalParams
 * @return {boolean}
 */
const log = (
  prefix = '',
  message: string,
  ...optionalParams: any[]
): boolean => {
  const date = new Date();
  let dateFormat = util.format(
    '%s/%s/%s %s:%s:%s',
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
  // TODO remove process.env.DEVELOPMENT. Go through app config
  dateFormat = process.env.DEVELOPMENT ? dateFormat.split(' ')[1] : dateFormat;
  return process.stdout.write(
    prefix +
      ' ' +
      color.black(dateFormat) +
      ' ' +
      util.format(message, ...optionalParams) +
      '\n'
  );
};

/**
 * @param {string} message
 * @param {any[]} optionalParams
 * @return {boolean}
 */
export const info = (message: string, ...optionalParams: any[]): boolean => {
  return log('[' + color.cyan('INFO') + ']', message, ...optionalParams);
};

/**
 * @param {string} message
 * @param {any[]} optionalParams
 * @return {boolean}
 */
export const danger = (message: string, ...optionalParams: any[]): boolean => {
  return log('[' + color.red('ERROR') + ']', '⨯ ' + message, ...optionalParams);
};

export const options = {
  /**
   * @param {string} message
   * @return {string}
   */
  bright: (message: string): string => {
    return `\x1b[1m${message}\x1b[0m`;
  }
};

const print = {
  options,
  info,
  danger
};

export default print;
