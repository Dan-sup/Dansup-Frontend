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

export interface IList {
  id: number;
  name: string;
}
