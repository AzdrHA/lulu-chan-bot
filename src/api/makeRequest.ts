import { MakeRequestManager } from '../manager/MakeRequestManager';
import { AxiosAdapter } from '../adapter/AxiosAdapter';

export const makeRequest = async (url: string, method: string, data?: any) => {
  const makeRequestManager = new MakeRequestManager(new AxiosAdapter());
  return await makeRequestManager.makeRequest(url, method, data)
}