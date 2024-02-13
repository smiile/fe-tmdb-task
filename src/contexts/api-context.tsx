import * as React from "react";
import TmdbApi from "../apis/TmdbApi";

const ApiContext = React.createContext<{ tmdbApi: TmdbApi } | undefined>(
  undefined
);

function ApiProvider({ children }: { children: React.ReactNode }) {
  const value = { tmdbApi: new TmdbApi() };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

function useApi() {
  const context = React.useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within a ApiProvider");
  }
  return context;
}

export { ApiProvider, useApi };
