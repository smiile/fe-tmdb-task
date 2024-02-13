import { readAccessToken, tmdbBaseURL } from "../constants";

export const getSearchURL = (movieTitle: string, language = "en-US") =>
  `${tmdbBaseURL}/search/movie?query=${encodeURIComponent(
    movieTitle
  )}&language=${language}`;

export const getMovieDetailsURL = (id: number, language = "en-US") =>
  `${tmdbBaseURL}/movie/${id}?language=${language}&append_to_response=videos,credits`;

export const getOptionsObjForGetRequests = () => ({
  method: "GET",
  headers: {
    Authorization: `Bearer ${readAccessToken}`,
    accept: "application/json",
  },
});
