import { IFetchAdapter } from "../interface/IFetchAdapter";

export class MakeRequestManager {
	private fetchAdapter: IFetchAdapter;

	constructor(fetchAdapter: IFetchAdapter) {
		this.fetchAdapter = fetchAdapter;
	}

	makeRequest(url, method, data) {
		return this.fetchAdapter.makeRequest(url, method, data);
	}
}
