import { useState } from "react";
import "./App.css";
import FileRead from "./FileRead";
import SearchSection from "./SearchSection";
import { MoviesProvider } from "./movies-context";
import MoviesList from "./MoviesList";

function App() {
  const [userEntries, setUserEntries] = useState<string[]>([]);

  return (
    <>
      <FileRead
        onFileParsed={(result) => {
          setUserEntries(result);
        }}
      />
      {userEntries.length > 0 && (
        <MoviesProvider>
          <SearchSection entries={userEntries} />
          <MoviesList />
        </MoviesProvider>
      )}
    </>
  );
}

export default App;
