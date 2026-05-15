import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

API.interceptors.request.use((req) => {
  const userInfo =
    localStorage.getItem("userInfo");

  if (userInfo) {
    const token = JSON.parse(userInfo).token;

    req.headers.Authorization =
      `Bearer ${token}`;
  }

  return req;
});

export default API;
