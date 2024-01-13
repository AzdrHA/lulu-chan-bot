export interface IFetchAdapter {
	makeRequest(
		url: string,
		method: string,
		data?: Record<string, string>,
	): unknown;
}
