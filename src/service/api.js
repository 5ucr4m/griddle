import axios from "axios";

import store from "../store";

const api = axios.create({
  baseURL: "http://67.227.214.144:3010/",
  // baseURL: "http://192.168.15.11:3010/",
});

api.interceptors.request.use(async (config) => {
  const headers = { ...config.headers };

  const { token } = store.getState().session;

  if (!!token) headers.Authorization = `Bearer ${token}`;

  return { ...config, headers };
});

export default api;
