import { useCallback, useState } from "react";
import { useMovies } from "../contexts/movies-context";
import Button from "../components/Button";
import { useApi } from "../contexts/api-context";

export default function ActionsSection({ entries }: { entries: string[] }) {
  const [entriesToQuery, setEntriesToQuery] = useState(() =>
    entries.map((movie) => ({ value: movie, checked: true }))
  );
  const [language, setLanguage] = useState("en-US");
  const [isSaving, setIsSaving] = useState(false);
  const {
    dispatch,
    state: { movies: foundMovies, isLoading },
  } = useMovies();
  const { tmdbApi, mockApi } = useApi();

  const handleSearch = useCallback(async () => {
    dispatch({ type: "initiateLoading" });
    const movies = await tmdbApi.getMovies(
      entriesToQuery.filter((obj) => obj.checked).map((obj) => obj.value),
      language
    );
    dispatch({ type: "setMovies", data: movies });
  }, [entriesToQuery, tmdbApi, dispatch, language]);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    mockApi.postMovies(
      foundMovies,
      () => {
        alert("Successfully saved!");
        setIsSaving(false);
      },
      (err) => {
        alert(`An error occurred ${err}`);
        setIsSaving(false);
      }
    );
  }, [foundMovies, mockApi]);

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
          <span>Select language </span>
          <select onChange={(event) => setLanguage(event.target.value)}>
            <option value="en-US">English</option>
            <option value="bg-BG">Bulgarian</option>
            <option value="fr-FR">French</option>
            <option value="pt-BR">Portuguese</option>
          </select>
          <Button onClick={handleSearch} disabled={isLoading}>
            Search
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleSave} disabled={isSaving}>
            Save
          </Button>{" "}
          <Button onClick={() => dispatch({ type: "resetState" })}>
            Clear results
          </Button>
        </>
      )}
    </>
  );
}
