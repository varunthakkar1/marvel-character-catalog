import { URL_ENDING } from "../constants";
import { apiClient, API_OUTPUT_LIMIT } from "./client";
import { GetEventsRequest, GetEventsResponse } from "./dto/getEventsDto";

const getEvents = async ({
  page,
}: GetEventsRequest): Promise<GetEventsResponse> => {
  const response = await apiClient.get(
    "/events?" +
      URL_ENDING +
      "&offset=" +
      API_OUTPUT_LIMIT * (page - 1) +
      "&limit=" +
      API_OUTPUT_LIMIT
  );
  return response.data;
};

export default getEvents;
