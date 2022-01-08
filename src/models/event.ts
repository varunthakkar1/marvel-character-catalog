import { ListDataResponse } from "./character";

export interface Event {
  title: string;
  id: number;
  description: string;
  modified: Date;
  resourceURI: string;
  start: Date;
  end: Date;
  thumbnail: {
    extension: string;
    path: string;
  };
  comics: ListDataResponse;
  characters: ListDataResponse;
  series: ListDataResponse;
}
