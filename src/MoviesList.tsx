import MovieCard from "./MovieCard";
import { useMovies } from "./movies-context";
import "./MoviesList.css";

export default function MoviesList() {
  const {
    state: { movies },
    dispatch,
  } = useMovies();
  if (movies.length === 0) {
    return <></>;
  }

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <MovieCard
          movie={movie}
          handleDelete={(movie) => dispatch({ type: "deleteMovie", movie })}
        />
      ))}
    </div>
  );
}
