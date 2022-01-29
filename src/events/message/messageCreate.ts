import Application from '../../components/application/application';
import { Message } from 'discord.js';
import { AppConfig } from '../../config/appConfig';
import { commandsList, Guild, settings } from '../../lib/constants';
import { BaseCommand, CommandConstructor } from '../../components/baseCommand';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/apiConfig';

const messageCreate = async (client: Application, message: Message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'DM') return;
  if (client.development && message.channel.type === 'GUILD_TEXT') {
    if (
      AppConfig.owners &&
      !AppConfig.owners.includes(message.author.id) &&
      message.channel.parentId !== '653610950141935668'
    )
      return;
  }

  if (!settings.get(message.guildId)) {
    const guild = (await makeRequest(
      ApiConfig.get_or_create_setting(message.guildId),
      'POST'
    )) as Guild;
    settings.set(message.guildId, guild.setting);
  }

  const setting = settings.get(message.guildId);

  const prefixes = [
    `<@${client.user.id}>`,
    `<@!${client.user.id}>`,
    'lulu',
    setting.prefix
  ];

  const prefix = prefixes.find((p) =>
    message.content.toLowerCase().startsWith(p)
  );
  if (!prefix) return;

  const args: string[] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const commandName = args.shift();
  const CommandClass = commandsList.get(commandName);
  if (!CommandClass) return;

  const CTOR: CommandConstructor = {
    client: client,
    message: message,
    setting: setting,
    command: commandName,
    args: args
  };
  const command: BaseCommand = new CommandClass(CTOR);
  return command.execute();
};
export default messageCreate;
