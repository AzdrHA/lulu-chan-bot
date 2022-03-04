import Application from '../../components/Application/Application';
import { Message, MessageEmbed, TextChannel, VoiceChannel } from 'discord.js';
import { BaseCommand } from '../../components/BaseCommand/BaseCommand';
import UtilsDate from '../../utils/UtilsDate';
import { UtilsDiscord } from '../../utils/UtilsDiscord';
import { CommandConstructor } from '../../types/CommandConstructor';
import { blacklists, commandsList, owners } from '../../config/Constants';
import cache from '../../lib/cache';
import ColorConfig from '../../config/ColorConfig';
import { AppConfig } from '../../config/AppConfig';
const cooldown = new Map<string, any>();

/**
 * @param {Application} client
 * @param {Message} message
 */
export default async (client: Application, message: Message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'DM')
    return UtilsDiscord.directMessage(client, message);

  if (client.development && message.channel.parentId !== '931503353463181342')
    return;

  if (
    client.development === false &&
    message.channel.parentId === '931503353463181342'
  )
    return;

  const setting = await cache.setting.get_or_create(message.guildId);

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
  const CommandClass = commandsList.get(commandName.toLowerCase());
  if (!CommandClass) return;

  const CTOR: CommandConstructor = {
    client: client,
    message: message,
    setting: setting,
    command: commandName,
    args: args
  };
  const command: BaseCommand = new CommandClass(CTOR);

  // Checks user blacklist
  if (blacklists.get(message.author.id))
    return command.warningMessage({
      description: 'You are blacklist'
    });

  if (command.onlyDev && !owners.has(command.author.id)) return;

  const userCooldown = message.author.id + command.alias[0];
  const commandCooldown = command.cooldown * 1000;

  if (cooldown.get(userCooldown)) {
    const cooldownEnd =
      commandCooldown - (Date.now() - cooldown.get(userCooldown));
    return command.message.channel
      .send({
        content: command
          .translation('COOLDOWN')
          .replace(/{TIME}/, UtilsDate.formatTime(cooldownEnd))
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
    // TODO NEED CLEANING
    const embed = new MessageEmbed({
      author: {
        name: `${command.author.tag}`,
        iconURL: command.author.avatarURL()
      },
      description: command.command,
      timestamp: new Date(),
      color: ColorConfig.default_color,
      footer: {
        text: `Guild ID: ${command.message.guild.id}`
      }
    });

    const channelGuild = await UtilsDiscord.getChannel(
      client,
      '949278454598205450'
    );

    if (channelGuild && channelGuild instanceof TextChannel)
      await channelGuild.send({ embeds: [embed] });

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
