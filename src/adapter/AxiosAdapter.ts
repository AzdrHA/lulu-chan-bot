import { type IFetchAdapter } from '../interface/IFetchAdapter'
import axios from 'axios'

export class AxiosAdapter implements IFetchAdapter {
  public makeRequest (
    url: string,
    method: string,
    data?: Record<string, string>
  ): unknown {
    return new Promise((resolve, reject): unknown => {
      return axios({
        method,
        url,
        data,
        baseURL: process.env.API_URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
