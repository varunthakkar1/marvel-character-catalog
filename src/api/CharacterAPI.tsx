import { apiClient } from "./client";
import {
  GetCharactersResponse,
  GetCharactersRequest,
} from "./dto/getCharactersDto";
import constructCharacterQuery from "./utils/apiUtils";

const getCharacters = async ({
  events,
  series,
  comics,
  page,
}: GetCharactersRequest): Promise<GetCharactersResponse> => {
  const response = await apiClient.get(
    constructCharacterQuery({
      events: events,
      series: series,
      comics: comics,
      page: page,
    })
  );
  return response.data;
};

export default getCharacters;
