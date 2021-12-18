import UtilsStr from '../utils/utilsStr';

type AppConfig = {
  api_domain: string;
  token: string;
  development: boolean;
  owners: string[];
  prefixes: string[];
};

export const AppConfig: AppConfig = {
  api_domain: process.env.API_URL,
  token: process.env.TOKEN,
  development: Boolean(process.env.DEVELOPMENT) ?? true,
  owners: UtilsStr.convertStringArrayToArray(process.env.OWNERS),
  prefixes: UtilsStr.convertStringArrayToArray(process.env.PREFIXES)
};
