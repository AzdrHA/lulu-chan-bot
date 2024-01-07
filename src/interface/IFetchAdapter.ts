export interface IFetchAdapter {
  makeRequest(url: string, method: string, data?: any): any;
}