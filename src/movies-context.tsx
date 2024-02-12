import * as React from "react";
import { MovieObjectResponse } from "./types";

type ActionUpdate = { type: "update"; data: MovieObjectResponse[] };
type ActionDelete = { type: "deleteMovie"; movie: MovieObjectResponse };
type Action = ActionUpdate | ActionDelete;
type Dispatch = (action: Action) => void;
type State = { movies: MovieObjectResponse[] };
type MoviesProviderProps = { children: React.ReactNode };

const MoviesStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function moviesReducer(state: State, action: Action) {
  switch (action.type) {
    case "update": {
      return { movies: [...action.data] };
    }
    case "deleteMovie": {
      return { movies: state.movies.filter((el) => action.movie.id != el.id) };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MoviesProvider({ children }: MoviesProviderProps) {
  const [state, dispatch] = React.useReducer(moviesReducer, { movies: [] });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
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
