export interface IAwardList {
  date: string;
  detail: string;
}

export interface IList {
  id: number;
  name: string;
}

export interface ISelectList {
  id: number;
  name: string;
  shortName: string;
}

export interface IDuplicationList {
  name: string;
}

export interface IAllList {
  id: number;
  name: string;
  isShort: boolean;
}
