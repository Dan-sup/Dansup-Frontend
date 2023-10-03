import { IFilter } from '@/types/filter';
import { atom } from 'recoil';
//import { recoilPersist } from 'recoil-persist';

//const { persistAtom } = recoilPersist();

export const filteredClassListState = atom({
  key: 'filteredClassListState',
  default: [],
  //effects_UNSTABLE: [persistAtom],
});

export const typingFilteredClassListState = atom({
  key: 'typingFilteredClassListState',
  default: [],
  //effects_UNSTABLE: [persistAtom],
});

export const bothFilteredClassListState = atom({
  key: 'bothFilteredClassListState',
  default: [],
  //effects_UNSTABLE: [persistAtom],
});

export const closeClassListState = atom({
  key: 'closeClassListState',
  default: [],
});

/*
페이지 리프레쉬해도 값 유지되도록 전역상태가 localstorage에 저장되게 하는 'recoil-persist'는 나중에!
*/
