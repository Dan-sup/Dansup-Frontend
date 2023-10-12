import { useState, useEffect } from 'react';
import styles from '../../styles/UploadPage.module.css';
import modalStyles from '../../styles/Modal.module.css';
import buttonStyles from '../../styles/Button.module.css';
import fonts from '../../styles/typography.module.css';
import { IList, IDuplicationList } from '@/types/upload';
import {
  allLocationList,
  allGenreList,
  allTimeSelect,
  levelList,
  wayList,
  classFeeList,
} from '@/data/class-data';
import DuplicationSelect from '@/components/upload/DuplicationSelect';
import Select from '@/components/upload/Select';
import ClassDay from '@/components/upload/ClassDay';
import Close from '../../../public/icons/close.svg';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { homeFilterState } from '@/store/filter';
import {
  classDayListState,
  classFeeState,
  classLevelState,
  classWayState,
  genreListState,
  homeFilterValueListState,
  isClickedGenreState,
  isClickedLocationState,
  locationListState,
  selectTimeListState,
} from '@/store/filter/homeFilter';
import { changeClassWayToK, changeClassLevelToK } from '@/utils/filter';

interface filterProps {
  isOpen: boolean;
  closeModal: () => void;
  handleHomeFilterOn: any;
}

export default function HomeFilter({
  isOpen,
  closeModal,
  handleHomeFilterOn,
}: filterProps) {
  const [locationList, setLocationList] = useRecoilState(locationListState);
  const [isLocationFull, setIsLocationFull] = useState<boolean>(false);
  const [isClickedLocation, setIsClickedLocation] = useRecoilState(
    isClickedLocationState,
  );
  //Genre 박스 열기
  const [genreList, setGenreList] = useRecoilState(genreListState);
  const [isGenreFull, setIsGenreFull] = useState<boolean>(false);
  const [isClickedGenre, setIsClickedGenre] =
    useRecoilState(isClickedGenreState);
  const [classDayList, setClassDayList] = useRecoilState(classDayListState);
  const [classWayList, setClassWayList] = useRecoilState(classWayState);
  const [classLevelList, setClassLevelList] = useRecoilState(classLevelState);
  const [isClassWayFull, setIsClassWayFull] = useState<boolean>(false);
  const [isClassLevelFull, setIsClassLevelFull] = useState<boolean>(false);
  const [classFee, setClassFee] = useRecoilState(classFeeState);

  //목록 선택
  const [selectTimeList, setSelectTimeList] =
    useRecoilState(selectTimeListState);
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

  const setHomeFilterValueList = useSetRecoilState<any>(
    homeFilterValueListState,
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

    if (selectTimeList.length !== 0) {
      setIsSelectTimeChecked(true);
    } else {
      setIsSelectTimeChecked(false);
    }

    if (classFee !== '전체 가격') {
      setIsClassFeeChecked(true);
    } else {
      setIsClassFeeChecked(false);
    }
  }, [
    locationList,
    genreList,
    classLevelList,
    classDayList,
    classWayList,
    selectTimeList,
    classFee,
  ]);

  //초기화
  const onClickReset = () => {
    setLocationList([]);
    setGenreList([]);
    setClassDayList([{ id: 0, name: '' }]);
    setClassWayList([]);
    setClassFee('전체 가격');
    setClassWayList([]);
    setClassLevelList([]);
    setSelectTimeList([]);
  };

  const router = useRouter();
  const [homeFilter, setHomeFilter] = useRecoilState(homeFilterState);

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

  const locationValue = locationList.map(item => item.name);
  const genreListValue = genreList.map(item => item.name);
  const classDayListValue = classDayList
    .map(item => item.name)
    .filter(item => item !== '');
  const classTimeValue = selectTimeList.map(item => item.name);
  const classWayValue = classWayList.map(item => item.name);
  const classLevelValue = classLevelList.map(item => item.name);
  const classFeeValue = classFee === '전체 가격' ? null : classFee;

  //HomeFilter에 적용된 값 리스트 -> 필터 바에 넣을 것들
  const valueList = [
    locationValue,
    genreListValue,
    classDayListValue,
    classTimeValue,
    classWayValue,
    classLevelValue,
    classFeeValue,
  ]
    .flat()
    .filter(item => item !== null);

  const handleSubmit = () => {
    /*
    console.log(
      locationList[0].name === '서울 전체' ? null : locationList[0].name,
    );
    console.log(genreList.map(item => item.genre));
    console.log(
      classDayList.map(item => item.name).filter(item => item !== ''),
    );
    console.log(clickedTime === '전체' ? null : clickedTime);
    console.log(classWay === '' ? null : changeClassWayToK(classWay));
    console.log(classLevel === '' ? null : changeClassLevelToK(classLevel));
    console.log(classFee === '전체 가격' ? null : classFee);
    */

    console.log(valueList);
    setHomeFilterValueList(valueList);

    /* 전역상태로 하면 한박자 밀림...
      setHomeFilter({
        ...homeFilter,
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

    handleHomeFilterOn({
      location: locationList,
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
      time: selectTimeList,
      method: classWayList,
      difficulty: classLevelList,
      minTuition: minTuition,
      maxTuition: maxTuition,
      startTime: null,
      endTime: null,
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
                    limit={26}
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
                    limit={20}
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
              <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                수업 요일
              </div>
              <ClassDay list={classDayList} setList={setClassDayList} />
            </div>
            <div className={styles.box}>
              <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                수업 시간
              </div>
              <DuplicationSelect
                allList={allTimeSelect}
                list={selectTimeList}
                setList={setSelectTimeList}
                isFull={isSelectTimeFull}
                setIsFull={setIsSelectTimeFull}
                limit={9}
              />
            </div>
            <div className={styles.box}>
              <div className={fonts.body1_SemiBold}>수업 방식</div>
              <DuplicationSelect
                allList={wayList}
                list={classWayList}
                setList={setClassWayList}
                isFull={isClassWayFull}
                setIsFull={setIsClassWayFull}
                limit={8}
              />
            </div>
            <div className={styles.box}>
              <div className={fonts.body1_SemiBold}>수업 난이도</div>
              <DuplicationSelect
                allList={levelList}
                list={classLevelList}
                setList={setClassLevelList}
                isFull={isClassLevelFull}
                setIsFull={setIsClassLevelFull}
                limit={6}
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
