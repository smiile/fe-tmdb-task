import { useCallback } from "react";
import { readAccessToken } from "./constants";
import { MovieObjectResponse } from "./types";

export default function SearchButton({
  entriesToQuery: moviesToQuery,
  onSearchSuccess,
  onSearchFail,
}: {
  entriesToQuery: string[];
  onSearchSuccess: (movies: MovieObjectResponse[]) => void;
  onSearchFail: () => void;
}) {
  const handleSearch = useCallback(async () => {
    const movies = await Promise.all(
      Array.from(moviesToQuery).map((movie) =>
        fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            movie
          )}&language=en-US`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${readAccessToken}`,
              accept: "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((jsonResponse) => {
            if (jsonResponse.total_results > 0) {
              return fetch(
                `https://api.themoviedb.org/3/movie/${jsonResponse.results[0].id}?language=en-US`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${readAccessToken}`,
                    accept: "application/json",
                  },
                }
              )
                .then((response) => response.json())
                .catch((err) => {
                  console.error(`error while fetching details: ${err}`);
                  onSearchFail();
                });
            }
            return null;
          })
          .catch((err) => console.error(`error while fetching list: ${err}`))
      )
    );

    console.log(movies);
    onSearchSuccess(movies);
  }, [moviesToQuery, onSearchFail, onSearchSuccess]);
  return <button onClick={handleSearch}>Search</button>;
}
