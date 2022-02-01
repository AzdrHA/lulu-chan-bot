import axios, { AxiosError, Method } from 'axios';
import { AppConfig } from '../config/appConfig';
import print from '../lib/print';

export const makeRequest = async (url: string, method: Method, data = {}) =>
  new Promise((resolve, reject) =>
    axios({
      baseURL: AppConfig.api_domain,
      method,
      url,
      data,
      headers: {
        authorization: `Bearer ${process.env.API_TOKEN}`
      }
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
      })
  );
