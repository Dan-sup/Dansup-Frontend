export interface IFilter {
  location: string | null;
  genres: IGenre[] | [];
  days: {
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
  };
  time: string | null;
  method: string | null;
  difficulty: string | null;
  minTuition: number | null;
  maxTuition: number | null;
  startTime: null;
  endTime: null;
}

export interface IGenre {
  genre: string;
}
