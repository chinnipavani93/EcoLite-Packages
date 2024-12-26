import axios from "axios";

const BASE_URL = "https://eco-lite-packages-5f4j.vercel.app/api/v1";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
