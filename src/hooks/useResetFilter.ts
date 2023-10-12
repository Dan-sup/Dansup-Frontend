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
  selectTimeListState,
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
  selectTimeListSearchState,
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
  const resetSelectTimeClickIndex = useResetRecoilState(selectTimeListState);

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
  const resetSelectTimeClickIndexSearch = useResetRecoilState(
    selectTimeListSearchState,
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

    resetSelectTimeClickIndexSearch();
  };

  return {
    resetHomeFilter,
    resetSearchFilter,
  };
};
