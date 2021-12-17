import axios, { AxiosError, Method } from 'axios';
import { AppConfig } from '../config/appConfig';
import print from '../lib/print';

export const makeRequest = async (url: string, method: Method, data = {}) => {
  return new Promise((resolve, reject) => {
    return axios({
      baseURL: AppConfig.api_domain,
      method,
      url,
      data
    })
      .then((r) => resolve(r.data))
      .catch((e: AxiosError) => {
        if (e.code === 'ECONNREFUSED' && typeof e.response === 'undefined') {
          print.danger('Unable to connect to the api!');
          print.danger('Unable to connect to the api!');
          print.danger('Unable to connect to the api!');
          process.exit(1);
        }
        return reject(e);
      });
  });
};
