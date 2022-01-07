import axios from "axios";
import { URL_ENDING } from "../constants";
import { GetEventsRequest, GetEventsResponse } from "./dto/getEventsDto";

const API_OUTPUT_LIMIT = 20;
const apiClient = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
});

const getEvents = async ({
  page,
}: GetEventsRequest): Promise<GetEventsResponse> => {
  const response = await apiClient.get(
    "/events?" + URL_ENDING + "&offset=" + API_OUTPUT_LIMIT * (page - 1)
  );
  return response.data;
};

export default getEvents;
