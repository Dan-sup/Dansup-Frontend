import { IDuplicationList, IList } from '@/types/upload';
import { atom } from 'recoil';

export const locationListState = atom<IDuplicationList[]>({
  key: 'locationListState',
  default: [],
});

export const isClickedLocationState = atom<boolean>({
  key: 'isClickedLocationState',
  default: false,
});

export const genreListState = atom<IDuplicationList[]>({
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

export const selectWayClickIndexState = atom<number>({
  key: 'selectWayClickIndexState',
  default: 0,
});

export const selectLevelClickIndexState = atom<number>({
  key: 'selectLevelClickIndexState',
  default: 0,
});

export const selectTimeListState = atom<IDuplicationList[]>({
  key: 'selectTimeListState',
  default: [],
});

//HomeFilter에 적용된 값 리스트 -> 필터 바에 넣을 것들
export const homeFilterValueListState = atom({
  key: 'homeFilterValueListState',
  default: [],
});
