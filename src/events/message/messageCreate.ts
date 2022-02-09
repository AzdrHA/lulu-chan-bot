import Application from '../../components/Application/Application';
import { Message } from 'discord.js';
import { AppConfig } from '../../config/AppConfig';
import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import { makeRequest } from '../../api/makeRequest';
import { ApiConfig } from '../../config/ApiConfig';
import UtilsDate from '../../utils/UtilsDate';
import { UtilsDiscord } from '../../utils/UtilsDiscord';
import { Guild } from '../../types/Guild';
import { CommandConstructor } from '../../types/CommandConstructor';
import { commandsList, settings } from '../../config/Constants';
const cooldown = new Map<string, any>();

/**
 * @param {Application} client
 * @param {Message} message
 */
export default async (client: Application, message: Message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'DM')
    return UtilsDiscord.directMessage(client, message);

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
      ApiConfig.get_or_create_or_update_setting(message.guildId),
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

  const userCooldown = message.author.id + command.alias[0];
  const commandCooldown = command.cooldown * 1000;

  if (cooldown.get(userCooldown)) {
    const cooldownEnd =
      commandCooldown - (Date.now() - cooldown.get(userCooldown));
    return command.message.channel
      .send({
        content: command
          .translation('COOLDOWN')
          .replace(/{time}/, UtilsDate.formatTime(cooldownEnd))
      })
      .then((r) => setTimeout(() => r.delete(), cooldownEnd));
  }

  // SET THE COOLDOWN
  cooldown.set(userCooldown, Date.now());

  // DELETE THE COOLDOWN
  setTimeout(() => {
    cooldown.delete(userCooldown);
  }, commandCooldown);

  try {
    return command.execute();
  } catch (e) {
    if (e instanceof RangeError)
      return command.crashMessage(client, commandName, {
        message: e.message,
        name: e.name,
        stack: e.stack
      });

    return command.crashMessage(client, commandName, e);
  }
};
