import { useState, useEffect } from 'react';
import styles from '../../styles/UploadPage.module.css';
import modalStyles from '../../styles/Modal.module.css';
import buttonStyles from '../../styles/Button.module.css';
import fonts from '../../styles/typography.module.css';
import { IList, IDuplicationList } from '@/types/upload';
import ClassTime from '../upload/ClassTime';
import DuplicationSelect from '@/components/upload/DuplicationSelect';
import {
  allLocationList,
  allGenreList,
  allTimeSelect,
  levelList,
  wayList,
  classFeeList,
} from '@/data/class-data';
import Select from '@/components/upload/Select';
import ClassDay from '@/components/upload/ClassDay';
import Close from '../../../public/icons/close.svg';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchFilterState } from '@/store/filter';
import {
  classDayListSearchState,
  classFeeSearchState,
  classLevelSearchState,
  classWaySearchState,
  clickedTimeSearchState,
  genreListSearchState,
  homeFilterValueListSearchState,
  isClickedGenreSearchState,
  isClickedLocationSearchState,
  locationListSearchState,
  selectTimeListSearchState,
} from '@/store/filter/searchFilter';
import { changeClassWayToK, changeClassLevelToK } from '@/utils/filter';

interface filterProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSearchFilterOn: any;
}

export default function SearchFilter({
  isOpen,
  closeModal,
  handleSearchFilterOn,
}: filterProps) {
  const [locationList, setLocationList] = useRecoilState(
    locationListSearchState,
  );
  const [isLocationFull, setIsLocationFull] = useState<boolean>(false);
  const [isClickedLocation, setIsClickedLocation] = useRecoilState(
    isClickedLocationSearchState,
  );
  //Genre 박스 열기
  const [genreList, setGenreList] = useRecoilState(genreListSearchState);
  const [isGenreFull, setIsGenreFull] = useState<boolean>(false);
  const [isClickedGenre, setIsClickedGenre] = useRecoilState(
    isClickedGenreSearchState,
  );
  const [classDayList, setClassDayList] = useRecoilState(
    classDayListSearchState,
  );

  const [classWayList, setClassWayList] = useRecoilState(classWaySearchState);
  const [isClassWayFull, setIsClassWayFull] = useState<boolean>(false);
  const [classLevelList, setClassLevelList] = useRecoilState(
    classLevelSearchState,
  );
  const [isClassLevelFull, setIsClassLevelFull] = useState<boolean>(false);
  const [classFee, setClassFee] = useRecoilState(classFeeSearchState);

  //목록 선택
  const [isSelectWay, setIsSelectWay] = useState<boolean>(true);
  const [selectTimeList, setSelectTimeList] = useRecoilState(
    selectTimeListSearchState,
  );
  const [isSelectTimeFull, setIsSelectTimeFull] = useState<boolean>(false);

  //우효성 검사 state (Checked => 형식)
  const [isLocationChecked, setIsLocationChecked] = useState<boolean>(false);
  const [isGenreListChecked, setIsGenreListChecked] = useState<boolean>(false);
  const [isClassDayChecked, setIsClassDayChecked] = useState<boolean>(false);
  const [isClassLevelChecked, setIsClassLevelChecked] =
    useState<boolean>(false);
  const [isClassFeeChecked, setIsClassFeeChecked] = useState<boolean>(false);
  const [isClassWayChecked, setIsClassWayChecked] = useState<boolean>(false);
  const [isSelectTimeChecked, setIsSelectTimeChecked] =
    useState<boolean>(false);
  const [startHour, setStartHour] = useState<number>();
  const [startTime, setStartTime] = useState<string>('');
  const [endHour, setEndHour] = useState<number>();
  const [endTime, setEndTime] = useState<string>('');

  const setSearchFilterValueList = useSetRecoilState<any>(
    homeFilterValueListSearchState,
  );

  //location 박스 열기
  const onClickOpenLocationBox = () => {
    setIsClickedLocation(!isClickedLocation);
  };

  //Genre 박스 열기
  const onClickOpenGenreBox = () => {
    setIsClickedGenre(!isClickedGenre);
  };

  //classfee
  const handleChangeClassFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassFee(e.target.value);
  };

  const onClickinList = () => {
    setIsSelectWay(true);
    setStartTime('');
    setEndTime('');
  };

  const onClickSelf = () => {
    setIsSelectWay(false);
    setSelectTimeList([]);
  };

  useEffect(() => {
    if (locationList.length !== 0) {
      setIsLocationChecked(true);
    } else {
      setIsLocationChecked(false);
    }

    if (genreList.length !== 0) {
      setIsGenreListChecked(true);
    } else {
      setIsGenreListChecked(false);
    }

    if (classLevelList.length !== 0) {
      setIsClassLevelChecked(true);
    } else {
      setIsClassLevelChecked(false);
    }

    if (classDayList.length !== 1) {
      setIsClassDayChecked(true);
    } else {
      setIsClassDayChecked(false);
    }

    if (classWayList.length !== 0) {
      setIsClassWayChecked(true);
    } else {
      setIsClassWayChecked(false);
    }

    if (selectTimeList.length != 0 || (startTime !== '' && endTime !== '')) {
      setIsSelectTimeChecked(true);
    } else {
      setIsSelectTimeChecked(false);
    }

    if (classFee !== '전체 가격') {
      setIsClassFeeChecked(true);
    } else {
      setIsClassFeeChecked(false);
    }

    if (
      parseInt(startTime) > 12 &&
      parseInt(startTime) <= 24 &&
      parseInt(endTime) < 13
    ) {
      setStartHour(parseInt(startTime));
      setEndHour(parseInt(endTime) + 24);
    } else {
      setStartHour(parseInt(startTime));
      setEndHour(parseInt(endTime));
    }
  }, [
    locationList,
    genreList,
    classLevelList,
    classDayList,
    classWayList,
    selectTimeList,
    classFee,
    startTime,
    endTime,
  ]);

  //초기화
  const onClickReset = () => {
    setLocationList([]);
    setGenreList([]);
    setClassDayList([{ id: 0, name: '' }]);
    setClassWayList([]);
    setClassFee('전체 가격');
    setClassLevelList([]);
    setSelectTimeList([]);
    setStartTime('');
    setEndTime('');
  };

  const router = useRouter();
  const [searchFilter, setSearchFilter] = useRecoilState(searchFilterState);

  const newClassDayList = classDayList.map(item => item.name);

  let minTuition: any = null;
  let maxTuition: any = null;

  if (classFee === '전체 가격') {
    minTuition = null;
    maxTuition = null;
  } else if (classFee === '1,000원 ~ 10,000원') {
    minTuition = 1000;
    maxTuition = 10000;
  } else if (classFee === '10,000원 ~ 30,000원') {
    minTuition = 10000;
    maxTuition = 30000;
  } else if (classFee === '30,000원 ~ 60,000원') {
    minTuition = 30000;
    maxTuition = 60000;
  } else if (classFee === '60,000원 ~ 90,000원') {
    minTuition = 60000;
    maxTuition = 90000;
  } else if (classFee === '100,000원 이상') {
    minTuition = 100000;
    maxTuition = null;
  }

  const locationValue =
    /*locationList.map(item => item.name)*/ locationList[0] === null
      ? null
      : locationList[0]?.name;
  const genreListValue = /*genreList.map(item => item.name)*/ genreList.map(
    item => item.name,
  );
  const classDayListValue = classDayList
    .map(item => item.name)
    .filter(item => item !== '');
  const classTimeValue =
    /*selectTimeList.map(item => item.name)*/ selectTimeList[0] === null
      ? null
      : selectTimeList[0]?.name;
  const classSlefTimeValue =
    startTime !== '' && endTime !== '' ? startTime + '~' + endTime : null;
  const classWayValue =
    /*classWayList.map(item => item.name)*/ classWayList[0] === null
      ? null
      : classWayList[0]?.name;
  const classLevelValue =
    /*classLevelList.map(item => item.name)*/ classLevelList[0] === null
      ? null
      : classLevelList[0]?.name;
  const classFeeValue = classFee === '전체 가격' ? null : classFee;

  //SearchFilter에 적용된 값 리스트 -> 필터 바에 넣을 것들
  const valueList = [
    locationValue,
    genreListValue,
    classDayListValue,
    classTimeValue,
    classSlefTimeValue,
    classWayValue,
    classLevelValue,
    classFeeValue,
  ]
    .flat()
    .filter(item => item !== null);

  const handleSubmit = () => {
    setSearchFilterValueList(valueList);

    /* 전역상태로 하면 한박자 밀림...
      setSearchFilter({
        ...searchFilter,
        location:
          locationList[0].name === '서울 전체' ? null : locationList[0].name,
        genres: genreList,
        days: {
          mon: newClassDayList.includes('월'),
          tue: newClassDayList.includes('화'),
          wed: newClassDayList.includes('수'),
          thu: newClassDayList.includes('목'),
          fri: newClassDayList.includes('금'),
          sat: newClassDayList.includes('토'),
          sun: newClassDayList.includes('일'),
        },
        time: clickedTime === '전체' ? null : clickedTime,
        method: classWay === '' ? null : classWay,
        difficulty: classLevel === '' ? null : classLevel,
        minTuition: minTuition,
        maxTuition: maxTuition,
        startTime: null,
        endTime: null,
      });
      */

    handleSearchFilterOn({
      location: locationList[0] === null ? null : locationList[0]?.name,
      genres: genreList.map(item => item.name),
      days: {
        mon: newClassDayList.includes('월'),
        tue: newClassDayList.includes('화'),
        wed: newClassDayList.includes('수'),
        thu: newClassDayList.includes('목'),
        fri: newClassDayList.includes('금'),
        sat: newClassDayList.includes('토'),
        sun: newClassDayList.includes('일'),
      },
      time: selectTimeList[0] === null ? null : selectTimeList[0]?.name,
      method:
        classWayList[0] === null
          ? null
          : changeClassWayToK(classWayList[0]?.name),
      difficulty:
        classLevelList[0] === null
          ? null
          : changeClassLevelToK(classLevelList[0]?.name),
      minTuition: minTuition,
      maxTuition: maxTuition,
      startHour: startHour,
      endHour: endHour,
    });

    closeModal();
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={`${modalStyles.container} ${modalStyles.black}`}>
        <div
          className={`${modalStyles.filterCloseBox} ${modalStyles.paddingContainer}`}
        >
          <div
            className={`${styles.reset} ${fonts.body1_Regular}`}
            onClick={onClickReset}
          >
            초기화
          </div>
          <button className={modalStyles.modalClose} onClick={closeModal}>
            <Close />
          </button>
        </div>
        <div
          className={`${modalStyles.modalBody}  ${modalStyles.paddingContainer} `}
        >
          <div className={`${styles.inputList} ${styles.filterInputList}`}>
            <div className={styles.box}>
              <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                수업 장소
              </div>
              {isClickedLocation ? (
                <>
                  <button
                    className={`${styles.input} ${styles.genre} ${styles.after} ${fonts.body2_Regular}`}
                    onClick={onClickOpenLocationBox}
                  >
                    지역명을 선택해주세요
                  </button>
                  <DuplicationSelect
                    allList={allLocationList}
                    list={locationList}
                    setList={setLocationList}
                    isFull={isLocationFull}
                    setIsFull={setIsLocationFull}
                    limit={2}
                  />
                </>
              ) : (
                <>
                  <button
                    className={`${styles.input} ${styles.genre} ${styles.before} ${fonts.body2_Regular}`}
                    onClick={onClickOpenLocationBox}
                  >
                    지역명을 선택해주세요
                  </button>
                </>
              )}
            </div>
            <div className={styles.box}>
              <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                댄스 장르
              </div>
              {isClickedGenre ? (
                <>
                  <button
                    className={`${styles.input} ${styles.genre} ${styles.after} ${fonts.body2_Regular}`}
                    onClick={onClickOpenGenreBox}
                  >
                    댄스 장르를 선택해주세요
                  </button>
                  <DuplicationSelect
                    allList={allGenreList}
                    list={genreList}
                    setList={setGenreList}
                    isFull={isGenreFull}
                    setIsFull={setIsGenreFull}
                    limit={22}
                  />
                </>
              ) : (
                <>
                  <button
                    className={`${styles.input} ${styles.genre} ${styles.before} ${fonts.body2_Regular}`}
                    onClick={onClickOpenGenreBox}
                  >
                    댄스 장르를 선택해주세요
                  </button>
                </>
              )}
            </div>
            <div className={styles.box}>
              <div
                className={`${styles.textWithDayBox} ${fonts.body1_SemiBold}`}
              >
                수업 요일
              </div>
              <ClassDay list={classDayList} setList={setClassDayList} />
            </div>
            <div className={styles.box}>
              <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                수업 시간
              </div>
              <div className={`${styles.selectWayBox} ${fonts.body2_Regular}`}>
                <div
                  className={
                    isSelectWay
                      ? `${styles.selectWay} ${styles.selectWayLeft} ${styles.selectedWay}`
                      : `${styles.selectWay} ${styles.selectWayLeft} ${styles.normalWay}`
                  }
                  onClick={onClickinList}
                >
                  목록에서 선택
                </div>
                <div className={`${styles.midLine}`}></div>
                <div
                  className={
                    isSelectWay
                      ? `${styles.selectWay} ${styles.selectWayRight} ${styles.normalWay}`
                      : `${styles.selectWay} ${styles.selectWayRight} ${styles.selectedWay}`
                  }
                  onClick={onClickSelf}
                >
                  직접 선택
                </div>
              </div>
              {isSelectWay ? (
                <DuplicationSelect
                  allList={allTimeSelect}
                  list={selectTimeList}
                  setList={setSelectTimeList}
                  isFull={isSelectTimeFull}
                  setIsFull={setIsSelectTimeFull}
                  limit={2}
                />
              ) : (
                <div className={styles.selfTimeSelect}>
                  <ClassTime
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                  />
                </div>
              )}
            </div>
            <div className={styles.box}>
              <div
                className={`${styles.textWithClickedBox} ${fonts.body1_SemiBold}`}
              >
                수업 방식
              </div>
              <DuplicationSelect
                allList={wayList}
                list={classWayList}
                setList={setClassWayList}
                isFull={isClassWayFull}
                setIsFull={setIsClassWayFull}
                limit={2}
              />
            </div>
            <div className={styles.box}>
              <div
                className={`${styles.textWithClickedBox} ${fonts.body1_SemiBold}`}
              >
                수업 난이도
              </div>
              <DuplicationSelect
                allList={levelList}
                list={classLevelList}
                setList={setClassLevelList}
                isFull={isClassLevelFull}
                setIsFull={setIsClassLevelFull}
                limit={2}
              />
            </div>
            <div className={styles.box}>
              <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                수강료
              </div>
              <div className={`${styles.detailText} ${fonts.body2_Regular}`}>
                클래스 1회 당 수강료를 선택해주세요.
              </div>
              <form className={`${styles.radios} ${fonts.body2_Regular}`}>
                {classFeeList.map((item, idx) => (
                  <>
                    <label className={styles.radio}>
                      <input
                        type="radio"
                        id={item.name}
                        value={item.name}
                        onChange={handleChangeClassFee}
                        name="classFee"
                        key={idx}
                        checked={item.name == classFee}
                      />
                      <span>{item.name}</span>
                    </label>
                  </>
                ))}
              </form>
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={buttonStyles.buttonSpace}>
              {!isLocationChecked &&
              !isClassDayChecked &&
              !isClassFeeChecked &&
              !isClassLevelChecked &&
              !isGenreListChecked &&
              !isClassWayChecked &&
              !isSelectTimeChecked ? (
                <button
                  className={`${buttonStyles.CTA_Large} ${buttonStyles.after} ${fonts.body1_SemiBold}`}
                >
                  필터 적용하기
                </button>
              ) : (
                <button
                  className={`${buttonStyles.CTA_Large} ${buttonStyles.before} ${fonts.body1_SemiBold}`}
                  onClick={handleSubmit}
                >
                  필터 적용하기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
