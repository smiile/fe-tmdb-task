import { saveMovieURL } from "../constants";
import MovieObject from "../dtos/MovieObject";

export default class MockApi {
  async postMovies(
    movies: MovieObject[],
    successCallback: { (): void },
    failureCallback: { (err: string): void }
  ) {
    const postPromises = movies.map((movie) =>
      fetch(saveMovieURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      })
    );

    return Promise.all(postPromises)
      .then((responses) => {
        for (const response of responses) {
          if (!response.ok) {
            throw Error(`${response.status} ${response.statusText}`);
          }
        }
        successCallback();
      })
      .catch((err: Error) => {
        failureCallback(err.message);
        throw err.message;
      });
  }
}
