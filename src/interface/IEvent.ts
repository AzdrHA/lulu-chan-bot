import { type ClientEvents } from 'discord.js'

export interface IEvent {
  name: keyof ClientEvents
  execute: (...args: any[]) => Promise<void>
}
