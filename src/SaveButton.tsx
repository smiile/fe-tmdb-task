import { useCallback } from "react";
import { saveMovieURL } from "./constants";
import { MovieObjectResponse } from "./types";

export default function SaveButton({
  movies,
}: {
  movies: MovieObjectResponse[];
}) {
  const handleSave = useCallback(async () => {
    const alabala = await fetch(saveMovieURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movies),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
    console.log("post resp: ", alabala);
  }, [movies]);
  return <button onClick={handleSave}>Save</button>;
}
