import { Category } from "./category";

export type Place = {
  id: string;
  name: string;
  tabelog_url: string;
  youtube_url: string;
  description: string;
  category: Category;
  coordinate: Coordinate;
  created_at: Date;
};

export type Coordinate = {
  lat: number;
  lng: number;
};
