import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:18080/api",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    console.log(`req ${config.method} ${config.url}`, { data: config.data });
    return Promise.resolve(config);
  },
  (error) => {
    console.log(`req ${error.config.url}`, { error });
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  (res) => {
    console.log(`res ${res.config.method} ${res.config.url}`, {
      data: res.data,
    });
    return Promise.resolve(res);
  },
  (error) => {
    console.log(`res ${error.config.url}`, { error });
    return Promise.reject(error);
  },
);

export default api;
