import {
  classDayListState,
  classFeeState,
  classLevelState,
  classWayState,
  clickedTimeState,
  genreListState,
  isClickedGenreState,
  isClickedLocationState,
  locationListState,
  selectLevelClickIndexState,
  selectTimeClickIndexState,
  selectWayClickIndexState,
} from '@/store/filter/homeFilter';
import {
  classDayListSearchState,
  classFeeSearchState,
  classLevelSearchState,
  classWaySearchState,
  clickedTimeSearchState,
  genreListSearchState,
  isClickedGenreSearchState,
  isClickedLocationSearchState,
  locationListSearchState,
  selectLevelClickIndexSearchState,
  selectTimeClickIndexSearchState,
  selectWayClickIndexSearchState,
} from '@/store/filter/searchFilter';
import { useResetRecoilState } from 'recoil';

export const useResetFilter = () => {
  const resetLocationList = useResetRecoilState(locationListState);
  const resetIsClickedLocation = useResetRecoilState(isClickedLocationState);
  const resetGenreList = useResetRecoilState(genreListState);
  const resetIsClickedGenre = useResetRecoilState(isClickedGenreState);
  const resetClassDayList = useResetRecoilState(classDayListState);
  const resetClickedTime = useResetRecoilState(clickedTimeState);
  const resetClassWay = useResetRecoilState(classWayState);
  const resetClassLevel = useResetRecoilState(classLevelState);
  const resetClassFee = useResetRecoilState(classFeeState);
  const resetSelectWayClickIndex = useResetRecoilState(
    selectWayClickIndexState,
  );
  const resetSelectLevelClickIndex = useResetRecoilState(
    selectLevelClickIndexState,
  );
  const resetSelectTimeClickIndex = useResetRecoilState(
    selectTimeClickIndexState,
  );

  const resetLocationListSearch = useResetRecoilState(locationListSearchState);
  const resetIsClickedLocationSearch = useResetRecoilState(
    isClickedLocationSearchState,
  );
  const resetGenreListSearch = useResetRecoilState(genreListSearchState);
  const resetIsClickedGenreSearch = useResetRecoilState(
    isClickedGenreSearchState,
  );
  const resetClassDayListSearch = useResetRecoilState(classDayListSearchState);
  const resetClickedTimeSearch = useResetRecoilState(clickedTimeSearchState);
  const resetClassWaySearch = useResetRecoilState(classWaySearchState);
  const resetClassLevelSearch = useResetRecoilState(classLevelSearchState);
  const resetClassFeeSearch = useResetRecoilState(classFeeSearchState);
  const resetSelectWayClickIndexSearch = useResetRecoilState(
    selectWayClickIndexSearchState,
  );
  const resetSelectLevelClickIndexSearch = useResetRecoilState(
    selectLevelClickIndexSearchState,
  );
  const resetSelectTimeClickIndexSearch = useResetRecoilState(
    selectTimeClickIndexSearchState,
  );

  const resetHomeFilter = () => {
    resetLocationList();
    resetIsClickedLocation();
    resetGenreList();
    resetIsClickedGenre();
    resetClassDayList();
    resetClickedTime();
    resetClassWay();
    resetClassLevel();
    resetClassFee();
    resetSelectWayClickIndex();
    resetSelectLevelClickIndex();
    resetSelectTimeClickIndex();
  };

  const resetSearchFilter = () => {
    resetLocationListSearch();
    resetIsClickedLocationSearch();
    resetGenreListSearch();
    resetIsClickedGenreSearch();
    resetClassDayListSearch();
    resetClickedTimeSearch();
    resetClassWaySearch();
    resetClassLevelSearch();
    resetClassFeeSearch();
    resetSelectWayClickIndexSearch();
    resetSelectLevelClickIndexSearch();
    resetSelectTimeClickIndexSearch();
  };

  return {
    resetHomeFilter,
    resetSearchFilter,
  };
};
