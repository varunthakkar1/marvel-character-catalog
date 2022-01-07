import { Comic } from "../../models/comic";

export interface GetComicsResponse {
  data: {
    results: Comic[];
    total: number;
  };
  code: number;
  status: String;
}

export interface GetComicsRequest {
  page: number;
}
