import { IFetchAdapter } from '../interface/IFetchAdapter';
import axios from 'axios';

export class AxiosAdapter implements IFetchAdapter {
  public makeRequest(url: string, method: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'GET',
        url: url,
        data: data,
        baseURL: process.env.API_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
      }).then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
}