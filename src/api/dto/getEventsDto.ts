import { Event } from "../../models/event";

export interface GetEventsResponse {
  data: {
    results: Event[];
    total: number;
  };
  code: number;
  status: string;
}

export interface GetEventsRequest {
  page: number;
}
