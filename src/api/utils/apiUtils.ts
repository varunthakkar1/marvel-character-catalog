import { URL_ENDING } from "../../constants";
import { API_OUTPUT_LIMIT } from "../client";
import { GetCharactersRequest } from "../dto/getCharactersDto";

const constructCharacterQuery = ({
  events,
  series,
  comics,
  page,
}: GetCharactersRequest): string => {
  let url =
    "/characters?" +
    URL_ENDING +
    "&offset=" +
    API_OUTPUT_LIMIT * (page - 1) +
    "&limit=" +
    API_OUTPUT_LIMIT;
  if (events.length > 0) {
    url = url + "&events=";
    events.forEach((event) => {
      url = url + event.id + "%2C";
    });
  }
  if (series.length > 0) {
    url = url + "&series=";
    series.forEach((series) => {
      url = url + series.id + "%2C";
    });
  }
  if (comics.length > 0) {
    url = url + "&comics=";
    comics.forEach((comic) => {
      url = url + comic.id + "%2C";
    });
  }
  return url;
};

export default constructCharacterQuery;
