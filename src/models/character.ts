export interface Character {
  name: String;
  id: number;
  description: String;
  modified: Date;
  resourceURI: String;
  thumbnail: {
    extension: String;
    path: String;
  };
  comics: ListDataResponse;
  events: ListDataResponse;
  series: ListDataResponse;
}

export interface ListDataResponse {
  available: number;
  collectionURI: String;
  items: ListItem[];
  returned: number;
}

export interface ListItem {
  name: String;
  resourceURI: String;
}
