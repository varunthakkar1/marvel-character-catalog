import axios from "axios";
import { URL_ENDING } from "../constants";
import { GetComicsRequest, GetComicsResponse } from "./dto/getComicsDto";

const API_OUTPUT_LIMIT = 20;
const apiClient = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
});

const getComics = async ({
  page,
}: GetComicsRequest): Promise<GetComicsResponse> => {
  const response = await apiClient.get(
    "/comics?" + URL_ENDING + "&offset=" + API_OUTPUT_LIMIT * (page - 1)
  );
  return response.data;
};
