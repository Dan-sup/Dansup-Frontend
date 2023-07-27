export type IUploadFile = {
  file: File;
  thumnail: string;
  type: string;
};

export interface IAwardList {
  date: string;
  detail: string;
}

export interface IList {
  id: number;
  name: string;
}

export interface IGenreList {
  genre: string;
}
