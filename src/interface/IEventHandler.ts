export interface IEventHandler {
	handle(): Promise<void>;
}
