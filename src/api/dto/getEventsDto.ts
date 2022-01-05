import { Event } from "../../models/event";

export interface GetEventsResponse {
  data: {
    results: Event[];
  };
  code: number;
  status: String;
}

export interface GetEventsRequest {
  page: number;
}
