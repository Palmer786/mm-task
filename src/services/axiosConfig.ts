import axios from "axios";

const createConfig = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  return api;
};

const api = createConfig();

export default api;
