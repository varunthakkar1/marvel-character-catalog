import axios from "axios";

export const API_OUTPUT_LIMIT = 15;
export const apiClient = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
});
