import { ListDataResponse } from "./character";

export interface Event {
  title: String;
  id: number;
  description: String;
  modified: Date;
  resourceURI: String;
  start: Date;
  end: Date;
  thumbnail: {
    extension: String;
    path: String;
  };
  comics: ListDataResponse;
  characters: ListDataResponse;
  series: ListDataResponse;
}
