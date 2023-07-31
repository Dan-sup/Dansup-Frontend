import { IGenreList, IList } from '@/types/upload';
import { atom } from 'recoil';

export const locationListState = atom<IList[]>({
  key: 'locationListState',
  default: [{ id: 0, name: '서울 전체' }],
});

export const isClickedLocationState = atom<boolean>({
  key: 'isClickedLocationState',
  default: false,
});

export const genreListState = atom<IGenreList[]>({
  key: 'genreListState',
  default: [],
});

export const isClickedGenreState = atom<boolean>({
  key: 'isClickedGenreState',
  default: false,
});

export const classDayListState = atom<IList[]>({
  key: 'classDayListState',
  default: [{ id: 0, name: '' }],
});

export const clickedTimeState = atom<string>({
  key: 'clickedTimeState',
  default: '전체',
});

export const classWayState = atom<string>({
  key: 'classWayState',
  default: '',
});

export const classLevelState = atom<string>({
  key: 'classLevelState',
  default: '',
});

export const classFeeState = atom<string>({
  key: 'classFeeState',
  default: '전체 가격',
});
