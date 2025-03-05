import { API_URL } from "@env";

import axios, { AxiosHeaders } from "axios";
import Config from "./react-native-config";
import { generateToken } from "./appTokenUtil";

export const setBaseUrl = () => {
  // Set Base URL dynamically
  axios.defaults.baseURL = Config.API_URL || 'https://your-api-url.com';
  console.log("test >>>>>>>>>>>>>>>>>>>>> baseurl:" + axios.defaults.baseURL);

  // console.log("ENV:", ENV);
  console.log("API_URL from env:", API_URL);

  if (!API_URL) {
    console.error("API_URL is undefined! Check your environment setup.");
  }
}

axios.interceptors.request.use(
  async (config) => {
    config.headers["X-App-Token"] = generateToken();

    return {
      ...config,
      headers: {
        ...config.headers,
      } as AxiosHeaders,
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);



