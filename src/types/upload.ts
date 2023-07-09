export type uploadFile = {
  file: File;
  thumnail: string;
  type: string;
};

export interface IList {
  id: number;
  name: string;
  isShort: boolean;
}

export interface IAwardList {
  id: number;
  date: string;
  award: string;
}

export interface IHashTagList {
  id: number;
  hashTag: string;
}
