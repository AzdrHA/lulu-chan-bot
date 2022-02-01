import { BaseCommand } from '../../components/baseCommand/baseCommand';
import { Message } from 'discord.js';
import { Category } from '../../types/Category';
import * as util from 'util';
import childProcess from 'child_process';
import { UtilsSystem } from '../../utils/utilsSystem';

export default class Info extends BaseCommand {
  alias: string[];
  allowDM: boolean;
  category: Category;
  cooldown: number;
  description: string;
  disable: boolean;
  example: string;
  onlyDev: boolean;
  multipleCommand: boolean;

  constructor(props) {
    super(props);

    this.alias = ['info'];
    this.allowDM = true;
    this.category = 'misc';
    this.cooldown = 0;
    this.description = '';
    this.disable = false;
    this.example = '{prefix} info';
    this.onlyDev = false;
  }

  async execute(): Promise<Message> {
    const exec = util.promisify(childProcess.exec);
    // const {stdout} = await exec('git log --pretty="%ct" -n 1');
    // const {stdout} = await exec('git show -s --date=format:%cd --format=%cd');
    const { stdout } = await exec('git show -s --format=%ct');
    const oneDay = 24 * 60 * 60 * 1000;

    return this.messageEmbed({
      fields: [
        {
          name: 'Servers',
          value: this.client.guilds.cache.size.toString(),
          inline: true
        },
        {
          name: 'Users',
          value: this.client.users.cache.size.toString(),
          inline: true
        },
        {
          name: 'Channels',
          value: this.client.channels.cache.size.toString(),
          inline: true
        },
        {
          name: 'Processor',
          value: UtilsSystem.getCpu(),
          inline: false
        },
        {
          name: 'Platform',
          value: UtilsSystem.getPlatform(),
          inline: true
        },
        {
          name: 'Architecture',
          value: UtilsSystem.getArch(),
          inline: true
        },
        {
          name: 'Ram',
          value: `${UtilsSystem.getUsedRam()}Gb / ${UtilsSystem.getTotalRam()}Gb (${UtilsSystem.getPercentRamUsed()}%)`,
          inline: true
        },
        {
          name: 'UpTime',
          value: this.client.uptime.toString(),
          inline: true
        },
        {
          name: 'Last update',
          value: `${parseInt(stdout)} | v.${process.env.npm_package_version}`,
          inline: true
        }
      ]
    });
  }
}
