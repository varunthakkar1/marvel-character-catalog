import { Character } from "../../models/character";
import { Filter } from "../../models/filter";

export interface GetCharactersResponse {
  data: {
    results: Character[];
    total: number;
  };
  code: number;
  status: string;
}

export interface GetCharactersRequest {
  events: Filter[];
  series: Filter[];
  comics: Filter[];
  nameStartsWith: string;
  page: number;
}
