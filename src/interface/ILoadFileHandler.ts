import { IEvent } from "./IEvent";

export interface ILoadFileHandler {
	searchInFolder(): Promise<IEvent[]>;
}
