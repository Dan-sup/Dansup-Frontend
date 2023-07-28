import { IFilter } from '@/types/filter';
import { atom } from 'recoil';
//import { IUser } from '@/types/user';

export const userState = atom<IFilter>({
  key: 'userState',
  default: {
    days: {
      fri: false,
      mon: false,
      sat: false,
      sun: false,
      thu: false,
      tue: false,
      wed: false,
    },
    difficulty: '',
    genres: [],
    location: '',
    maxTuition: 30000,
    minTuition: 1000,
    method: '',
    startTime: null,
    endTime: null,
    time: '',
  },
});
