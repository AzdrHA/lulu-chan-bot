import { type IEvent } from '../../interface/IEvent'
import { type ClientEvents, Events } from 'discord.js'

export default class ReadyEvent implements IEvent {
  public name: keyof ClientEvents = Events.ClientReady

  public async execute (): Promise<void> {
    console.log('Ready!')
    await Promise.resolve(undefined)
  }
}
