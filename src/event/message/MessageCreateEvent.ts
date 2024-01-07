import { ClientEvents, EmbedBuilder, Events, Message } from 'discord.js';
import { IEvent } from '../../interface/IEvent';

export default class MessageCreateEvent implements IEvent {
  public name: keyof ClientEvents = Events.MessageCreate;

  public async execute(message: Message): Promise<void> {
    if (message.author.bot) return;

    console.log(message);

    if (message.content === '!fakensfw') {
      message.channel.send({
        embeds: [
          new EmbedBuilder().setImage('https://imgs.search.brave.com/pl-4HqGcYlrREz6vQmF4U2n54AmaRZhKHYtZ1KB-Ksk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cGhvdG9zLXByZW1p/dW0vY2hhdC1taWdu/b25fOTczMzMyLTEw/NjkuanBn').setColor('#add8e6')
          ]
      });
    }
  }
}
