import { useState } from "react";
import SearchButton from "./SearchButton";
import SaveButton from "./SaveButton";
import { useMovies } from "./movies-context";

export default function SearchSection({ entries }: { entries: string[] }) {
  const [entriesToQuery, setEntriesToQuery] = useState(() =>
    entries.map((movie) => ({ value: movie, checked: true }))
  );
  const { dispatch, state } = useMovies();
  const foundMovies = state.movies;
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
        <SearchButton
          entriesToQuery={entriesToQuery.map((obj) => obj.value)}
          onSearchSuccess={(movies) =>
            dispatch({ type: "update", data: movies.filter((movie) => movie) })
          }
          onSearchFail={() => {}}
        />
      ) : (
        <SaveButton movies={foundMovies} />
      )}
    </>
  );
}
