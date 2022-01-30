import { HexColorString } from 'discord.js';

export type Color = {
  success: HexColorString;
  danger: HexColorString;
  warning: HexColorString;
  info: HexColorString;
  disable: HexColorString;
  default_color: HexColorString;
};

const color: Color = {
  success: '#29b362',
  danger: '#0xed4245', // c2352b
  warning: '#e5bf4c',
  info: '#0x3498db', // 2b8fc2
  disable: '#dddddd',
  default_color: '#67acbb'
};

export default color;
