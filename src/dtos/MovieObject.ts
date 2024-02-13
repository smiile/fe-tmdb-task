import {
  MovieObjectType,
  departments,
  trailerSites,
  videoType,
} from "../types";

export default class MovieObject implements MovieObjectType {
  id: number;
  title: string;
  overview: string;
  genres?: { id: number; name: string }[] | undefined;
  credits?:
    | {
        cast?: { name: string }[] | undefined;
        crew?: { name: string; department: departments }[] | undefined;
      }
    | undefined;
  videos?:
    | {
        results?:
          | { site: trailerSites; type: videoType; key: string }[]
          | undefined;
      }
    | undefined;
  poster_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;

  constructor(
    id: number,
    title: string,
    overview: string,
    genres: { id: number; name: string }[] | undefined,
    credits:
      | {
          cast?: { name: string }[] | undefined;
          crew?: { name: string; department: departments }[] | undefined;
        }
      | undefined,
    videos:
      | {
          results?:
            | { site: trailerSites; type: videoType; key: string }[]
            | undefined;
        }
      | undefined,
    poster_path: string,
    release_date: string,
    vote_average: number,
    runtime: number
  ) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.genres = genres;
    this.credits = credits;
    this.videos = videos;
    this.poster_path = poster_path;
    this.release_date = release_date;
    this.vote_average = vote_average;
    this.runtime = runtime;
  }
}
