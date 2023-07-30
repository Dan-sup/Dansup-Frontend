import { IFilter } from '@/types/filter';
import { atom } from 'recoil';
//import { recoilPersist } from 'recoil-persist';

//const { persistAtom } = recoilPersist();

//안쓸듯...
export const homeFilterState = atom<IFilter>({
  key: 'homeFilterState',
  default: {
    location: null,
    genres: [],
    days: {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    },
    time: null,
    method: null,
    difficulty: null,
    minTuition: null,
    maxTuition: null,
    startTime: null,
    endTime: null,
  },
});

export const searchFilterState = atom<IFilter>({
  key: 'searchFilterState',
  default: {
    location: null,
    genres: [],
    days: {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    },
    time: null,
    method: null,
    difficulty: null,
    minTuition: null,
    maxTuition: null,
    startTime: null,
    endTime: null,
  },
});

export const isHomeFilterOnState = atom<boolean>({
  key: 'isHomeFilterOnState',
  default: false,
  //effects_UNSTABLE: [persistAtom],
});

export const isSearchFilterOnState = atom<boolean>({
  key: 'isSearchFilterOnState',
  default: false,
  //effects_UNSTABLE: [persistAtom],
});

/*
페이지 리프레쉬해도 값 유지되도록 전역상태가 localstorage에 저장되게 하는 'recoil-persist'는 나중에!
*/

export const typingValueState = atom({
  key: 'typingValueState',
  default: '',
  //effects_UNSTABLE: [persistAtom],
});
