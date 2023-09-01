import axios from 'axios';

export const axiosx = (auth?: boolean) => {
  const instance = axios.create();

  instance.interceptors.request.use(
    async (config) => {
      if (auth) {
        const token = getToken();
        if (!token) return config;

        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const getToken = () => {
  const token = localStorage.getItem('token') ?? {};
  return token;
};
