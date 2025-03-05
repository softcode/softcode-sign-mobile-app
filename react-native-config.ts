import { API_URL, SHARED_SECRET } from '@env';

console.log('API URL:', API_URL);

const Config = {
  API_URL: API_URL || 'https://office.softcode.se/api',
  SHARED_SECRET: SHARED_SECRET || ""
};

export default Config;
