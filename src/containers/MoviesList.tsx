import Modal from "react-modal";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../contexts/movies-context";
import "./MoviesList.css";
import { useState } from "react";
import MovieThumbnail from "../components/MovieThumbnail";
import { MovieObjectType } from "../types";
import CrossClose from "../assets/cross-close.svg";
import Spinner from "../components/Spinner";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0.2rem",
    background: "#E8AE68",
    maxHeight: "98vh",
  },
};

Modal.setAppElement("#root");

export default function MoviesList() {
  const {
    state: { movies, isLoading, isQueryPerformed },
    dispatch,
  } = useMovies();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieObjectType>();

  if (isLoading) {
    return <Spinner />;
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
        <MovieThumbnail
          movie={movie}
          handleClick={() => {
            setSelectedMovie(movie);
            setModalIsOpen(true);
          }}
          handleDelete={(movie) => dispatch({ type: "deleteMovie", movie })}
        />
      ))}
      <Modal
        closeTimeoutMS={200}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "5px", right: "10px" }}>
            <img
              src={CrossClose}
              alt="Close"
              width="13"
              height="13"
              style={{ cursor: "pointer" }}
              onClick={() => setModalIsOpen(false)}
            />
          </div>
        </div>
        <MovieCard
          movie={selectedMovie}
          handleClick={() => setModalIsOpen(true)}
        />
      </Modal>
    </div>
  );
}
