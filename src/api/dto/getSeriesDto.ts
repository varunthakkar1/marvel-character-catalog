import { Series } from "../../models/series";

export interface GetSeriesResponse {
  data: {
    results: Series[];
    total: number;
  };
  code: number;
  status: String;
}

export interface GetSeriesRequest {
  page: number;
}