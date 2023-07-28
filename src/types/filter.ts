export interface IFilter {
  days: {
    fri: boolean;
    mon: boolean;
    sat: boolean;
    sun: boolean;
    thu: boolean;
    tue: boolean;
    wed: boolean;
  };
  difficulty: string | null;
  genres: IGenre[];
  location: string | null;
  maxTuition: number | null;
  minTuition: number | null;
  method: string | null;
  startTime: number | null;
  endTime: number | null;
  time: string | null;
}

export interface IGenre {
  genre: string;
}
