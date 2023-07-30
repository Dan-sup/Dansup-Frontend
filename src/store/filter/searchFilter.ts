import { IGenreList, IList } from '@/types/upload';
import { atom } from 'recoil';

export const locationListSearchState = atom<IList[]>({
  key: 'locationListSearchState',
  default: [{ id: 0, name: '서울 전체' }],
});

export const isClickedLocationSearchState = atom<boolean>({
  key: 'isClickedLocationSearchState',
  default: false,
});

export const genreListSearchState = atom<IGenreList[]>({
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
