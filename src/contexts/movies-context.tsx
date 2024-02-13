import * as React from "react";
import MovieObject from "../dtos/MovieObject";

type ActionResetState = { type: "resetState" };
type ActionSetMovies = { type: "setMovies"; data: MovieObject[] };
type ActionInitiateLoading = { type: "initiateLoading" };
type ActionDelete = { type: "deleteMovie"; movie: MovieObject };
type Action =
  | ActionSetMovies
  | ActionDelete
  | ActionInitiateLoading
  | ActionResetState;
type Dispatch = (action: Action) => void;
type State = {
  movies: MovieObject[];
  isLoading: boolean;
  isQueryPerformed: boolean;
};

const MoviesStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const inititalState: State = {
  movies: [],
  isLoading: false,
  isQueryPerformed: false,
};

function moviesReducer(state: State, action: Action) {
  switch (action.type) {
    case "resetState": {
      return { ...inititalState };
    }
    case "initiateLoading": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "setMovies": {
      return {
        ...state,
        movies: action.data.filter((movie) => movie),
        isLoading: false,
        isQueryPerformed: true,
      };
    }
    case "deleteMovie": {
      return {
        ...state,
        movies: state.movies.filter((el) => action.movie.id != el.id),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(moviesReducer, inititalState);
  const value = { state, dispatch };
  return (
    <MoviesStateContext.Provider value={value}>
      {children}
    </MoviesStateContext.Provider>
  );
}

function useMovies() {
  const context = React.useContext(MoviesStateContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
}

export { MoviesProvider, useMovies };
