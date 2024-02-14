import { MovieObjectType } from "../types";
import TrashCan from "../assets/trash-can-10416.svg";
import "./MovieThumbnail.css";
export default function MovieThumbnail({
  movie,
  handleDelete,
  handleClick,
}: {
  movie: MovieObjectType;
  handleDelete: (movie: MovieObjectType) => void;
  handleClick: (movieId: number) => void;
}) {
  return (
    <div className="thumbnail" onClick={() => handleClick(movie.id)}>
      {movie.poster_path ? (
        <img
          width={200}
          height={300}
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt="Poster"
        />
      ) : (
        <img
          width={200}
          height={300}
          src="https://placehold.co/200x300?text=Poster\nUnavailable"
          alt="Poster"
        />
      )}
      <div className="actions">
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(movie);
          }}
        >
          <img src={TrashCan} width="20" height="20" />
        </button>
      </div>
    </div>
  );
}
