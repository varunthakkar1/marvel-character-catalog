import axios, { AxiosInstance } from "axios";

export const API_OUTPUT_LIMIT: number = 12;
export const apiClient: AxiosInstance = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
});
