export type IUploadFile = {
  file: File;
  thumnail: string;
  type: string;
};

export interface IAwardList {
  id: number;
  date: string;
  award: string;
}

export interface IGenreList {
  id: number;
  genre: string;
}

export interface IHashTagList {
  id: number;
  hashTag: string;
}

export interface ILocation {
  address: string;
}

export interface IList {
  id: number;
  name: string;
}
