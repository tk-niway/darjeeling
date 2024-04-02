import axios from "axios";
// 共通ヘッダー
const headers = {
  "Content-Type": "application/json",
};

export const BackendApiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api`,
  headers,
});
