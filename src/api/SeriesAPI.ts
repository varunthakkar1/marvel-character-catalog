import { URL_ENDING } from "../constants";
import { apiClient, API_OUTPUT_LIMIT } from "./client";
import { GetSeriesRequest, GetSeriesResponse } from "./dto/getSeriesDto";

const getSeries = async ({
  page,
}: GetSeriesRequest): Promise<GetSeriesResponse> => {
  const response = await apiClient.get(
    "/series?" +
      URL_ENDING +
      "&offset=" +
      API_OUTPUT_LIMIT * (page - 1) +
      "&limit=" +
      API_OUTPUT_LIMIT
  );
  return response.data;
};

export default getSeries;