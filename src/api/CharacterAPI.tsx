import axios from "axios";
import { URL_ENDING } from "../constants";
import {
  GetCharactersResponse,
  GetCharactersRequest,
} from "./dto/getCharactersDto";

const API_OUTPUT_LIMIT = 20;
const apiClient = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
});

const getCharacters = async ({
  events,
  series,
  comics,
  page,
}: GetCharactersRequest): Promise<GetCharactersResponse> => {
  const response = await apiClient.get(
    "/characters?" + URL_ENDING + "&offset=" + API_OUTPUT_LIMIT * (page - 1)
  );
  return response.data;
};

export default getCharacters;
