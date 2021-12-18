import Application from '../../components/application/application';
import { Message } from 'discord.js';
import { AppConfig } from '../../config/appConfig';

const messageCreate = (client: Application, message: Message) => {
  if (message.author.bot) return;
  if (client.development) {
    if (
      (AppConfig.owners && !AppConfig.owners.includes(message.author.id)) ||
      (message.channel.id !== '653610950141935668' &&
        message.channel.id !== '685214662572507138')
    )
      return;
  }

  console.log("Hello i'm messageCreate event");
};
export default messageCreate;
