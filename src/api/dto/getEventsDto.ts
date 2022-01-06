import { Event } from "../../models/event";

export interface GetEventsResponse {
  data: {
    results: Event[];
    total: number;
  };
  code: number;
  status: String;
}

export interface GetEventsRequest {
  page: number;
}
