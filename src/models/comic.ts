import { ListDataResponse } from "./character";

export interface Comic {
  title: String;
  id: number;
  description: String;
  modified: Date;
  resourceURI: String;
  thumbnail: {
    extension: String;
    path: String;
  };
  creators: ListDataResponse;
  characters: ListDataResponse;
  series: ListDataResponse;
}