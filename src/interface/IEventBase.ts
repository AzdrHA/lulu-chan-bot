export interface IEventBase {
	execute(...args: any[]): Promise<void>;
}
