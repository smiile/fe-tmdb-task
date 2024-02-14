import { useState } from "react";
import "./App.css";
import FileRead from "./components/FileRead";
import ActionsSection from "./containers/ActionsSection";
import { MoviesProvider } from "./contexts/movies-context";
import MoviesList from "./containers/MoviesList";
import { ApiProvider } from "./contexts/api-context";

function App() {
  const [userEntries, setUserEntries] = useState<string[]>([]);

  return (
    <>
      <h1>The Movie Surfer</h1>
      <div className="file-read">
        <FileRead
          onFileParsed={(result) => {
            setUserEntries(result);
          }}
        />
      </div>
      {userEntries.length > 0 && (
        <ApiProvider>
          <MoviesProvider>
            <ActionsSection entries={userEntries} key={userEntries.join("")} />
            <MoviesList />
          </MoviesProvider>
        </ApiProvider>
      )}
    </>
  );
}

export default App;
