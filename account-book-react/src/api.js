import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "prod" ? "/api" : "http://localhost:18080/api",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => {
    console.log(`${res.config.url}`, { data: res.data });
    return Promise.resolve(res);
  },
  (error) => {
    console.log(`${error.config.url}`, { error });
    return Promise.reject(error);
  },
);

export default api;
