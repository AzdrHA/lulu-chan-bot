type AppConfig = {
  api_domain: string;
  token: string;
  development: boolean;
};

export const AppConfig: AppConfig = {
  api_domain: process.env.API_URL,
  token: process.env.TOKEN,
  development: Boolean(process.env.DEVELOPMENT) ?? true
};
