import { ListDataResponse } from "./character";

export interface Series {
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
