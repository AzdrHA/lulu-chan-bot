import { type IEventHandler } from '../interface/IEventHandler'

export default class EventManager {
  public async handle (event: IEventHandler): Promise<void> {
    await event.handle()
  }
}
