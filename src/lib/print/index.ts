import * as util from 'util';

/*
* const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
}; */

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

const log = (prefix = '', message: string, ...optionalParams: any[]) => {
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

export const info = (message: string, ...optionalParams: any[]) => {
  return log('[' + color.cyan('INFO') + ']', message, ...optionalParams);
};

export const danger = (message: string, ...optionalParams: any[]) => {
  return log('[' + color.red('ERROR') + ']', '⨯ ' + message, ...optionalParams);
};

const print = {
  info,
  danger
};

export default print;
