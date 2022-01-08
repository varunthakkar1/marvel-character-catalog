import { ListDataResponse } from "./character";

export interface Comic {
  title: string;
  id: number;
  description: string;
  modified: Date;
  resourceURI: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  creators: ListDataResponse;
  characters: ListDataResponse;
  series: ListDataResponse;
}
