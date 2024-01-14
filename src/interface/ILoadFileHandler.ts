import { type IEvent } from './IEvent'

export interface ILoadFileHandler {
  searchInFolder: () => Promise<IEvent[]>
}
