import axios, { AxiosError, Method } from 'axios';
import { AppConfig } from '../config/AppConfig';
import print from '../lib/print';

/**
 * @param {string} url
 * @param {Method} method
 * @param {Object} data
 */
export const makeRequest = async (
  url: string,
  method: Method,
  data = {}
): Promise<any> =>
  new Promise((resolve, reject) =>
    axios({
      baseURL: AppConfig.api_domain,
      method,
      url,
      data,
      headers: {
        authorization: `Bearer ${AppConfig.api_token}`
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
