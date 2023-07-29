import { IFilter } from '@/types/filter';
import { atom } from 'recoil';

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
    minTuition: 1000,
    maxTuition: 30000,
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
    minTuition: 1000,
    maxTuition: 30000,
    startTime: null,
    endTime: null,
  },
});
