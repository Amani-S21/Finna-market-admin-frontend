import axios from "axios";
// const BASE_URL = "http://localhost:3000/v1";
const BASE_URL = "https://api.finna-entreprise.com/v1";
const MEDIAS_UPLOAD_BASE_URL = "https://medias.finna-entreprise.com/v1/uploads";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosMedias = axios.create({
  baseURL: MEDIAS_UPLOAD_BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});
