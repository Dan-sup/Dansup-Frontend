import { atom } from 'recoil';
import { IUser } from '@/types/user';

export const userState = atom<IUser>({
  key: 'userState',
  default: {
    accessToken: '',
    refreshToken: '',
    //profileImg: '',
  },
});
