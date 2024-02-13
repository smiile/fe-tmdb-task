import { useCallback, useState } from "react";
import { useMovies } from "../contexts/movies-context";
import Button from "../components/Button";
import { useApi } from "../contexts/api-context";
import { saveMovieURL } from "../constants";

export default function ActionsSection({ entries }: { entries: string[] }) {
  const [entriesToQuery, setEntriesToQuery] = useState(() =>
    entries.map((movie) => ({ value: movie, checked: true }))
  );
  const {
    dispatch,
    state: { movies: foundMovies, isLoading },
  } = useMovies();
  const { tmdbApi } = useApi();

  const handleSearch = useCallback(async () => {
    dispatch({ type: "initiateLoading" });
    const movies = await tmdbApi.getMovies(
      entriesToQuery.filter((obj) => obj.checked).map((obj) => obj.value)
    );
    console.log(movies);
    dispatch({ type: "setMovies", data: movies });
  }, [entriesToQuery, tmdbApi, dispatch]);

  const handleSave = useCallback(async () => {
    const saveResponse = await fetch(saveMovieURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foundMovies),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
    alert(`Successfully saved! ${JSON.stringify(saveResponse)}`);
  }, [foundMovies]);

  return (
    <>
      {entriesToQuery.map((movie, idx) => (
        <div>
          <label>
            <input
              type="checkbox"
              checked={movie.checked}
              onChange={(event) => {
                const updatedEntries = [...entriesToQuery];
                if (event.target.checked) {
                  updatedEntries[idx].checked = true;
                } else {
                  updatedEntries[idx].checked = false;
                }
                setEntriesToQuery(updatedEntries);
              }}
            />{" "}
            {movie.value}{" "}
          </label>
        </div>
      ))}
      {foundMovies.length === 0 ? (
        <>
          <Button onClick={handleSearch} disabled={isLoading}>
            Search
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleSave}>Save</Button>{" "}
          <Button onClick={() => dispatch({ type: "resetState" })}>
            Clear results
          </Button>
        </>
      )}
    </>
  );
}
