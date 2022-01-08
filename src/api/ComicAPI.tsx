import { URL_ENDING } from "../constants";
import { apiClient, API_OUTPUT_LIMIT } from "./client";
import { GetComicsRequest, GetComicsResponse } from "./dto/getComicsDto";

const getComics = async ({
  page,
}: GetComicsRequest): Promise<GetComicsResponse> => {
  const response = await apiClient.get(
    "/comics?" +
      URL_ENDING +
      "&offset=" +
      API_OUTPUT_LIMIT * (page - 1) +
      "&limit=" +
      API_OUTPUT_LIMIT
  );
  return response.data;
};

export default getComics;
