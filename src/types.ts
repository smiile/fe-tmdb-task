export interface MovieObjectResponse {
  id: number;
  title: string;
  overview: string;
  genres?: {
    id: number;
    name: string;
  }[];
  poster_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
}
