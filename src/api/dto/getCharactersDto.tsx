import { Character } from "../../models/character";

export interface GetCharactersResponse {
  data: {
    results: Character[];
    total: number;
  };
  code: number;
  status: String;
}

export interface GetCharactersRequest {
  events: number[];
  series: number[];
  comics: number[];
  page: number;
}
