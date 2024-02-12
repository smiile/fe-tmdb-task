import TrashCan from "./assets/trash-can-10416.svg";
import { MovieObjectResponse } from "./types";
import "./MovieCard.css";

export default function MovieCard({
  movie,
  handleDelete,
}: {
  movie: MovieObjectResponse;
  handleDelete: (movie: MovieObjectResponse) => void;
}) {
  return (
    <div className="card">
      <div className="cover">
        <img
          width={200}
          height={300}
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt="Poster"
        />
      </div>
      <div className="info">
        <p>ID: {movie.id}</p>
        <p>Title: {movie.title}</p>
        <p>Overview: {movie.overview}</p>
        <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
        <p>Release: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}/10</p>
        <p>Duration: {movie.runtime} minutes</p>
      </div>
      <div className="actions">
        <img
          src={TrashCan}
          width="16"
          height="16"
          onClick={() => handleDelete(movie)}
        />
      </div>
    </div>
  );
}
