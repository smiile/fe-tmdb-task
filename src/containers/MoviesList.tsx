import MovieCard from "../components/MovieCard";
import { useMovies } from "../contexts/movies-context";
import "./MoviesList.css";

export default function MoviesList() {
  const {
    state: { movies, isLoading, isQueryPerformed },
    dispatch,
  } = useMovies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (movies.length === 0) {
    if (isQueryPerformed) {
      return <div>No movies found</div>;
    }
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
