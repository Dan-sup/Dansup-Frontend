import { IDuplicationList, IList } from '@/types/upload';
import { atom } from 'recoil';

export const locationListSearchState = atom<IDuplicationList[]>({
  key: 'locationListSearchState',
  default: [],
});

export const isClickedLocationSearchState = atom<boolean>({
  key: 'isClickedLocationSearchState',
  default: false,
});

export const genreListSearchState = atom<IDuplicationList[]>({
  key: 'genreListSearchState',
  default: [],
});

export const isClickedGenreSearchState = atom<boolean>({
  key: 'isClickedGenreSearchState',
  default: false,
});

export const classDayListSearchState = atom<IList[]>({
  key: 'classDayListSearchState',
  default: [{ id: 0, name: '' }],
});

export const clickedTimeSearchState = atom<string>({
  key: 'clickedTimeSearchState',
  default: '전체',
});

export const classWaySearchState = atom<string>({
  key: 'classWaySearchState',
  default: '',
});

export const classLevelSearchState = atom<string>({
  key: 'classLevelSearchState',
  default: '',
});

export const classFeeSearchState = atom<string>({
  key: 'classFeeSearchState',
  default: '전체 가격',
});

export const selectWayClickIndexSearchState = atom<number>({
  key: 'selectWayClickIndexSearchState',
  default: 0,
});

export const selectLevelClickIndexSearchState = atom<number>({
  key: 'selectLevelClickIndexSearchState',
  default: 0,
});

export const selectTimeListSearchState = atom<IDuplicationList[]>({
  key: 'selectTimeListClickIndexSearchState',
  default: [],
});

//SearchFilter에 적용된 값 리스트 -> 필터 바에 넣을 것들
export const homeFilterValueListSearchState = atom({
  key: 'homeFilterValueListSearchState',
  default: [],
});
