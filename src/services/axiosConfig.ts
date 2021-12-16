import axios from "axios";

const createConfig = () => {
  const api = axios.create({
    baseURL: "https://localhost:60001/",
  });

  return api;
};

const api = createConfig();

export default api;
