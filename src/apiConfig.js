import axios from "axios";

const BASE_URL = "http://localhost:1111";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use(
  (requestConfig) => {
    if (requestConfig.url !== "login" || requestConfig.url !== "signup") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) requestConfig.headers["Authorization"] = `Bearer ${accessToken}`;
      return requestConfig;
    }
  },
  (err) => Promise.reject(err)
);

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.requestConfig;
    const errCode = err.response.status;
    if (errCode === 401 && originalConfig.url === "auth/token") Promise.reject(err);
    if (errCode === 401) {
      const tokenResponse = await axiosClient.post("auth/token", {
        email: localStorage.getItem("email"),
        refreshToken: localStorage.getItem("refreshToken"),
      });
      localStorage.setItem("accessToken", tokenResponse.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.refreshToken);
      return axiosClient(originalConfig);
    }
    return Promise.reject(err);
  }
);

export { BASE_URL };
export default axiosClient;
