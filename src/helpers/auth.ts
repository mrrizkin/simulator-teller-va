import axios from "axios";

export const getCbsToken = async () => {
  return await axios.post(
    `${import.meta.env.VITE_API_EXTERNAL}/external/auth`,
    {
      username: import.meta.env.VITE_USER_EXTERNAL,
      password: import.meta.env.VITE_PASS_EXTERNAL,
    }
  );
};

export const getPaymentToken = async () => {
  return axios.post(`${import.meta.env.VITE_API_INTERNAL}/auth`, {
    username: import.meta.env.VITE_USER_INTERNAL,
    password: import.meta.env.VITE_PASS_INTERNAL,
  });
};
