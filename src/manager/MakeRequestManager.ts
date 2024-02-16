import { type IFetchAdapter } from '../interface/IFetchAdapter'

export class MakeRequestManager {
  private readonly fetchAdapter: IFetchAdapter

  constructor (fetchAdapter: IFetchAdapter) {
    this.fetchAdapter = fetchAdapter
  }

  public makeRequest (
    url: string,
    method: string,
    data?: Record<string, string>
  ): any {
    return this.fetchAdapter.makeRequest(url, method, data)
  }
}
