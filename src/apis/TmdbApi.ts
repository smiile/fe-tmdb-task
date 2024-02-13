import Bottleneck from "bottleneck";
import {
  getMovieDetailsURL,
  getOptionsObjForGetRequests,
  getSearchURL,
} from "../utils";
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

  async getMovies(movieTitles: string[]) {
    const movies = await Promise.all(
      Array.from(movieTitles).map((movieTitle) =>
        this.limiter.schedule(() =>
          fetch(getSearchURL(movieTitle), getOptionsObjForGetRequests())
            .then((response) => response.json())
            .then((jsonResponse) => {
              if (jsonResponse.total_results > 0) {
                return this.limiter.schedule(() =>
                  fetch(
                    getMovieDetailsURL(jsonResponse.results[0].id),
                    getOptionsObjForGetRequests()
                  )
                    .then((response) => response.json())
                    .catch((err) => {
                      console.error(`error while fetching details: ${err}`);
                    })
                );
              }
              return null;
            })
            .catch((err) => console.error(`error while fetching list: ${err}`))
        )
      )
    );
    return movies;
  }
}
