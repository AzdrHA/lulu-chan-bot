import { type IEventHandler } from '../interface/IEventHandler'
import type Client from '../client'
import LoadFileHandler from './LoadFileHandler'
import { EVENT_DIR } from '../config/constant.config'
import { type IEvent } from '../interface/IEvent'

export default class EventHandler
  extends LoadFileHandler
  implements IEventHandler {
  private readonly client: Client

  public constructor (client: Client) {
    super(EVENT_DIR)
    this.client = client
  }

  public async handle (): Promise<void> {
    console.log('Loading events...')
    const handlers = await this.searchInFolder<IEvent>()
    handlers.forEach((handler) => {
      console.log(`Loaded event ${handler.name}`)
      this.client.on(handler.name, async (...args: unknown[]) => { await handler.execute(...args) })
    })
    console.log('Loaded events\n')
  }
}
