export enum departments {
  directing = "Directing",
}

export enum trailerSites {
  youTube = "YouTube",
}

export enum videoType {
  trailer = "Trailer",
}

export interface MovieObject {
  id: number;
  title: string;
  overview: string;
  genres?: {
    id: number;
    name: string;
  }[];
  credits?: {
    cast?: {
      name: string;
    }[];
    crew?: {
      name: string;
      department: departments;
    }[];
  };
  videos?: {
    results?: {
      site: trailerSites;
      type: videoType;
      key: string;
    }[];
  };
  poster_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
}
