import * as React from "react";
import TmdbApi from "../apis/TmdbApi";
import SurferApi from "../apis/SurferApi";

const ApiContext = React.createContext<
  { tmdbApi: TmdbApi; surferApi: SurferApi } | undefined
>(undefined);

function ApiProvider({ children }: { children: React.ReactNode }) {
  const value = { tmdbApi: new TmdbApi(), surferApi: new SurferApi() };

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
