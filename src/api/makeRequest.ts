import { MakeRequestManager } from '../manager/MakeRequestManager'
import { AxiosAdapter } from '../adapter/AxiosAdapter'

export const makeRequest = async (
  url: string,
  method: string,
  data?: Record<string, string>
): Promise<any> => {
  const makeRequestManager = new MakeRequestManager(new AxiosAdapter())
  return makeRequestManager.makeRequest(url, method, data)
}
