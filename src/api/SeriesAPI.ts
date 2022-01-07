import axios from "axios";
import { URL_ENDING } from "../constants";
import { GetSeriesRequest, GetSeriesResponse } from "./dto/getSeriesDto";

const API_OUTPUT_LIMIT = 20;
const apiClient = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
});

const getSeries = async ({
  page,
}: GetSeriesRequest): Promise<GetSeriesResponse> => {
  const response = await apiClient.get(
    "/series?" + URL_ENDING + "&offset=" + API_OUTPUT_LIMIT * (page - 1)
  );
  return response.data;
};

export default getSeries;