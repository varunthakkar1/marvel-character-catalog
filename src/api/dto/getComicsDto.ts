import { Comic } from "../../models/comic";

export interface GetComicsResponse {
  data: {
    results: Comic[];
    total: number;
  };
  code: number;
  status: string;
}

export interface GetComicsRequest {
  page: number;
}
