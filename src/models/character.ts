export interface Character {
  name: string;
  id: number;
  description: string;
  modified: Date;
  resourceURI: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  comics: ListDataResponse;
  events: ListDataResponse;
  series: ListDataResponse;
}

export interface ListDataResponse {
  available: number;
  collectionURI: string;
  items: ListItem[];
  returned: number;
}

export interface ListItem {
  name: string;
  resourceURI: string;
}
