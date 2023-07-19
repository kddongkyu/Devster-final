import jwt_decode from "jwt-decode";
import axios from "axios";
import { jwtHandleError } from "./JwtHandleError";

function isTokenExpired(token) {
  if (!token) {
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  const expTime = jwt_decode(token).exp;

  // return currentTime >= expTime;
  return currentTime >= expTime - 300;
}

async function refreshAccessToken(refreshToken) {
  try {
    const res = await axios({
      method: "post",
      url: "/api/member/D1/check",
      headers: { "Authorization-refresh": `Bearer ${refreshToken}` },
    });

    if (res.status === 200) {
      const newAccessToken = res.headers.authorization;
      const newRefreshToken = res.headers["authorization-refresh"];
      const newExpiredTime = jwt_decode(newAccessToken);

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      localStorage.setItem("expiredTime", newExpiredTime.exp);

      return newAccessToken;
    }
  } catch (error) {
    throw error;
  }
}

const axiosIns = axios.create();

axiosIns.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (isTokenExpired(accessToken) && refreshToken) {
      try {
        accessToken = await refreshAccessToken(refreshToken);
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      } catch (error) {
        throw error;
      }
    } else if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    jwtHandleError(error);
  }
);

axiosIns.interceptors.response.use(
  (response) => response,
  (error) => {
    jwtHandleError(error);
  }
);

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    jwtHandleError(error);
  }
);

export default axiosIns;
