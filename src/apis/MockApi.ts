import { saveMovieURL } from "../constants";
import MovieObject from "../dtos/MovieObject";

export default class MockApi {
  async postMovies(
    movies: MovieObject[],
    successCallback: { (): void },
    failureCallback: { (err: string): void }
  ) {
    await fetch(saveMovieURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movies),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        successCallback();
      })
      .catch((err: Error) => {
        failureCallback(err.message);
      });
  }
}
