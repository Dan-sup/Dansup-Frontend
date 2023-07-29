import { atom } from 'recoil';
import { IUser } from '@/types/user';
import { v1 } from 'uuid';

export const userState = atom<IUser>({
  key: `userState/${v1()}`,
  default: {
    accessToken: '',
    refreshToken: '',
    //profileImg: '',
  },
});
