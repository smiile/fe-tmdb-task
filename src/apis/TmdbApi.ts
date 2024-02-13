import Bottleneck from "bottleneck";
import {
  getMovieDetailsURL,
  getOptionsObjForGetRequests,
  getSearchURL,
} from "./utils";
import { MovieObjectType } from "../types";
import MovieObject from "../dtos/MovieObject";
export default class TmdbApi {
  limiter: Bottleneck;
  constructor() {
    this.limiter = new Bottleneck({
      reservoir: 50,
      reservoirRefreshAmount: 50,
      /* Ideally it should be a 1000 (one second), as the rate limit is 50req/sec
       *, but just to be on the safe side
       */
      reservoirRefreshInterval: 1100,
    });
  }

  async getMovies(movieTitles: string[], language: string) {
    const movies = (await Promise.all(
      Array.from(movieTitles).map((movieTitle) =>
        this.limiter.schedule(() =>
          fetch(
            getSearchURL(movieTitle, language),
            getOptionsObjForGetRequests()
          )
            .then((response) => response.json())
            .then((jsonResponse) => {
              if (jsonResponse.total_results > 0) {
                const movieId = jsonResponse.results[0].id;
                return this.limiter.schedule(() =>
                  fetch(
                    getMovieDetailsURL(movieId, language),
                    getOptionsObjForGetRequests()
                  )
                    .then((response) => response.json())
                    .then(
                      (movie: MovieObjectType) =>
                        // keeping only necessary data
                        new MovieObject(
                          movie.id,
                          movie.title,
                          movie.overview,
                          movie.genres,
                          movie.credits,
                          movie.videos,
                          movie.poster_path,
                          movie.release_date,
                          movie.vote_average,
                          movie.runtime
                        )
                    )
                    .catch((err) => {
                      console.error(`error while fetching details: ${err}`);
                    })
                );
              }
              return null;
            })
            .catch((err) => {
              console.error(`error while fetching list: ${err}`);
            })
        )
      )
    )) as MovieObject[];
    return movies;
  }
}
