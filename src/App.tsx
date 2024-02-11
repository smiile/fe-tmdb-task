import { useState } from "react";
import "./App.css";
import TrashCan from "./assets/trash-can-10416.svg";
import FileRead from "./FileRead";
import ParsedEntries from "./ParsedEntries";

interface MovieObjectResponse {
  id: number;
  title: string;
}
const readAccessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODFkZmUyMjA3MWJlMmFhNTc1MjkyOWUzY2IwNzlkYyIsInN1YiI6IjY1YzhhYTQ3NTRhMDk4MDE4NDAzMGJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gXWnEhzEatVOcIpTT802NjaWO2gCdwJNh7R60aQoSKg";
function App() {
  const [uploadedMovies, setUploadedMovies] = useState<string[]>([]);
  const [moviesToQuery, setMoviesToQuery] = useState<string[]>([]);
  const [foundMovies, setFoundMovies] = useState<MovieObjectResponse[]>([]);

  return (
    <>
      <FileRead
        onFileParsed={(result) => {
          setUploadedMovies(result);
          setMoviesToQuery(result);
        }}
      />
      {uploadedMovies.length > 0 && (
        <>
          {uploadedMovies.map((movie) => (
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={moviesToQuery.indexOf(movie) !== -1}
                  onChange={(event) => {
                    let updatedValue = [...moviesToQuery];
                    if (event.target.checked) {
                      updatedValue.push(movie);
                    } else {
                      updatedValue = updatedValue.filter((el) => el !== movie);
                    }
                    setMoviesToQuery(updatedValue);
                  }}
                />{" "}
                {movie}{" "}
              </label>
            </div>
          ))}
          <button
            onClick={async () => {
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
                          .catch((err) =>
                            console.error(
                              `error while fetching details: ${err}`
                            )
                          );
                      }
                      return null;
                    })
                    .catch((err) =>
                      console.error(`error while fetching list: ${err}`)
                    )
                )
              );
              console.log(movies);
              setFoundMovies(movies.filter((movie) => movie));
            }}
          >
            Search
          </button>

          {foundMovies.length > 0 &&
            foundMovies.map((movie) => (
              <p>
                {movie.title}{" "}
                <img
                  src={TrashCan}
                  width="16"
                  height="16"
                  onClick={() =>
                    setFoundMovies(foundMovies.filter((el) => movie != el))
                  }
                />
              </p>
            ))}
        </>
      )}
    </>
  );
}

export default App;
