import Application from '../components/application/application';
import { Message } from 'discord.js';
import { Setting } from './Setting';

export type CommandConstructor = {
  client: Application;
  message: Message;
  setting: Setting;
  command: string;
  args: string[];
};
