import * as util from 'util';
import UtilsDate from '../../utils/UtilsDate';

const color = {
  cyan: (message: string) => {
    return `\x1b[36m${message}\x1b[0m`;
  },
  black: (message: string) => {
    return `\x1b[30m${message}\x1b[0m`;
  },
  gray: (message: string) => {
    return `\x1b[2m${message}\x1b[0m`;
  },
  red: (message: string) => {
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
  return process.stdout.write(
    prefix +
      ' ' +
      color.gray(UtilsDate.convertDateToFormat(date)) +
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
