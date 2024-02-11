import { useState } from "react";

export default function ParsedEntries({ entries }: { entries: string[] }) {
  const [moviesToQuery, setMoviesToQuery] = useState<string[]>([...entries]);
  return (
    <>
      {entries.map((movie) => (
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
    </>
  );
}
