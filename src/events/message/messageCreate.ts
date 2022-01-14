import Application from '../../components/application/application';
import { Message } from 'discord.js';
import { AppConfig } from '../../config/appConfig';
import { commandsList, Settings, settings } from '../../lib/constants';
import { BaseCommand } from '../../components/baseCommand';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/apiConfig';

const messageCreate = async (client: Application, message: Message) => {
  if (message.author.bot) return;
  if (client.development && message.channel.type === 'GUILD_TEXT') {
    if (
      AppConfig.owners &&
      !AppConfig.owners.includes(message.author.id) &&
      message.channel.parentId !== '653610950141935668'
    )
      return;
  }

  if (!settings.get(message.guildId)) {
    const setting = (await makeRequest(
      ApiConfig.get_or_create_setting(message.guildId),
      'POST'
    )) as Settings;
    settings.set(message.guildId, setting);
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

  const CommandClass = commandsList.get(args.shift());
  if (!CommandClass) return;
  const command: BaseCommand = new CommandClass({ client, message, setting });
  return command.execute();
};
export default messageCreate;
