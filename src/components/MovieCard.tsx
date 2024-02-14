import {
  MovieObjectType,
  departments,
  trailerSites,
  videoType,
} from "../types";
import "./MovieCard.css";

export default function MovieCard({
  movie,
  handleClick,
}: {
  movie?: MovieObjectType;
  handleClick: () => void;
}) {
  if (!movie) {
    return <></>;
  }
  const directors =
    movie.credits && movie.credits.crew && movie.credits.crew.length > 0
      ? movie.credits.crew
          .filter(
            (crewMember) => crewMember.department === departments.directing
          )
          .map((castMember) => castMember.name)
          .join(", ")
      : "N/A";

  const actors =
    movie.credits && movie.credits.cast && movie.credits.cast.length > 0
      ? movie.credits.cast
          .slice(0, 20)
          .map((castMember) => castMember.name)
          .join(", ")
      : "N/A";
  const trailerLinks =
    movie.videos && movie.videos.results && movie.videos.results.length > 0
      ? movie.videos.results.filter(
          (video) =>
            video.type === videoType.trailer &&
            video.site == trailerSites.youTube
        )
      : [];
  return (
    <div className="card">
      <div className="cover" onClick={handleClick}>
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
      </div>
      <div className="info">
        <h2>{movie.title}</h2>

        <div>
          <span className="label">Overview:</span>
          {movie.overview}
        </div>
        <div>
          <span className="label">Directors:</span>
          {directors}
        </div>
        <div>
          <span className="label">Actors:</span>
          {actors}
        </div>
        <div>
          <span className="label">Genres: </span>
          {movie.genres && movie.genres.length > 0
            ? movie.genres.map((genre) => genre.name).join(", ")
            : "N/A"}
        </div>
        <div>
          <span className="label">Release:</span>
          {movie.release_date}
        </div>
        <div>
          <span className="label">Rating:</span>
          {movie.vote_average ? `${movie.vote_average}/10` : "N/A"}
        </div>
        <div>
          <span className="label">Duration:</span>
          {movie.runtime} minutes
        </div>
        <div>
          <span className="label">Trailer:</span>
          {trailerLinks.length > 0 ? (
            <a
              href={`https://youtube.com/watch?v=${trailerLinks[0].key}`}
              target="_blank"
            >
              https://youtube.com/watch?v={trailerLinks[0].key}
            </a>
          ) : (
            "N/A"
          )}
        </div>
      </div>
    </div>
  );
}
