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
  comics: CollectionDataResponse;
  events: CollectionDataResponse;
  series: CollectionDataResponse;
}

interface CollectionDataResponse {
  available: number;
  collectionURI: String;
  items: DataItem[];
  returned: number;
}

export interface DataItem {
  name: String;
  resourceURI: String;
}
