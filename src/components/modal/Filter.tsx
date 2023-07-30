import { useState, useEffect } from 'react';
import styles from '../../styles/UploadPage.module.css';
import modalStyles from '../../styles/Modal.module.css';
import buttonStyles from '../../styles/Button.module.css';
import fonts from '../../styles/typography.module.css';
import { IList, IGenreList } from '@/types/upload';
import DanceGenre from '@/components/upload/DanceGenre';
import Select from '@/components/upload/Select';
import ClassDay from '@/components/upload/ClassDay';
import ClassLocation from '@/components/upload/ClassLocation';
import SelectTime from '@/components/upload/SelectTime';
import {
  filterLevelList,
  filterWayList,
  classFeeList,
} from '@/data/class-data';
import Close from '../../../public/icons/close.svg';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { homeFilterState, searchFilterState } from '@/store/filter';

interface filterProps {
  isOpen: boolean;
  closeModal: () => void;
  handleHomeFilterOn?: any;
  handleSearchFilterOn?: any;
}

export default function Filter({
  isOpen,
  closeModal,
  handleHomeFilterOn,
  handleSearchFilterOn,
}: filterProps) {
  const [locationList, setLocationList] = useState<IList[]>([
    { id: 0, name: '서울 전체' },
  ]);
  const [isClickedLocation, setIsClickedLocation] = useState<boolean>(false);
  //Genre 박스 열기
  const [genreList, setGenreList] = useState<IGenreList[]>([]);
  const [isGenreFull, setIsGenreFull] = useState<boolean>(false);
  const [isClickedGenre, setIsClickedGenre] = useState<boolean>(false);
  const [classDayList, setClassDayList] = useState<IList[]>([
    { id: 0, name: '' },
  ]);
  const [selectWayClickIndex, setSelectWayClickIndex] = useState<number>(0);
  const [selectLevelClickIndex, setSelectLevelClickIndex] = useState<number>(0);
  const [classWay, setClassWay] = useState<string>('');
  const [classLevel, setClassLevel] = useState<string>('');
  const [classFee, setClassFee] = useState<string>('전체 가격');

  //목록 선택
  const [selectTimeClickIndex, SetSelectTimeClickIndex] = useState<number>(0);
  const [clickedTime, setClickedTime] = useState<string>('전체');

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
    if (e.target.value == '전체 가격') {
      setIsClassFeeChecked(false);
    } else {
      setIsClassFeeChecked(true);
    }
  };

  useEffect(() => {
    if (locationList[0].name !== '서울 전체') {
      setIsLocationChecked(true);
    } else {
      setIsLocationChecked(false);
    }

    if (genreList.length !== 0) {
      setIsGenreListChecked(true);
    } else {
      setIsGenreListChecked(false);
    }

    if (classLevel !== '') {
      setIsClassLevelChecked(true);
    } else {
      setIsClassLevelChecked(false);
    }

    if (classDayList.length !== 1) {
      setIsClassDayChecked(true);
    } else {
      setIsClassDayChecked(false);
    }

    if (classWay !== '') {
      setIsClassWayChecked(true);
    } else {
      setIsClassWayChecked(false);
    }

    if (clickedTime !== '전체') {
      setIsSelectTimeChecked(true);
    } else {
      setIsSelectTimeChecked(false);
    }
  }, [
    locationList,
    genreList,
    classLevel,
    classDayList,
    classWay,
    clickedTime,
  ]);

  //초기화
  const onClickReset = () => {
    setLocationList([{ id: 0, name: '서울 전체' }]);
    setGenreList([]);
    setClassDayList([{ id: 0, name: '' }]);
    setSelectWayClickIndex(0);
    setClassWay('');
    setClassFee('전체 가격');
    setIsClassFeeChecked(false);
    setSelectLevelClickIndex(0);
    setClassLevel('');
    SetSelectTimeClickIndex(0);
    setClickedTime('전체');
  };

  const router = useRouter();
  const [homeFilter, setHomeFilter] = useRecoilState(homeFilterState);
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

  const handleSubmit = () => {
    //console.log(locationList);
    //console.log(genreList);
    //console.log(classDayList);
    //console.log(clickedTime);
    //console.log(classWay);
    //console.log(classLevel);
    //console.log(classFee);

    //console.log(classDayList.map(item => item.name)); //['', '수', '목', '금']
    console.log(
      locationList[0].name === '서울 전체' ? null : locationList[0].name,
    );
    console.log(genreList);
    console.log({
      days: {
        mon: newClassDayList.includes('월'),
        tue: newClassDayList.includes('화'),
        wed: newClassDayList.includes('수'),
        thu: newClassDayList.includes('목'),
        fri: newClassDayList.includes('금'),
        sat: newClassDayList.includes('토'),
        sun: newClassDayList.includes('일'),
      },
    });
    console.log(clickedTime === '전체' ? null : clickedTime);
    console.log(classWay === '' ? null : classWay);
    console.log(classLevel === '' ? null : classLevel);
    console.log(minTuition);
    console.log(maxTuition);
    //startTime,endTime은 그냥 null로 보내기

    if (router.pathname === '/') {
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

      closeModal();
    } else if (router.pathname === '/search-result') {
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

      closeModal();
    }
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
                  <ClassLocation
                    list={locationList}
                    setList={setLocationList}
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
                  <DanceGenre
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
              <SelectTime
                votedItem={clickedTime}
                setVotedItem={setClickedTime}
                clickIndex={selectTimeClickIndex}
                setClickIndex={SetSelectTimeClickIndex}
              />
            </div>
            <div className={styles.box}>
              <div className={fonts.body1_SemiBold}>수업 방식</div>
              <Select
                list={filterWayList}
                votedItem={classWay}
                setVotedItem={setClassWay}
                clickIndex={selectWayClickIndex}
                setClickIndex={setSelectWayClickIndex}
              />
            </div>
            <div className={styles.box}>
              <div className={fonts.body1_SemiBold}>수업 난이도</div>
              <Select
                list={filterLevelList}
                votedItem={classLevel}
                setVotedItem={setClassLevel}
                clickIndex={selectLevelClickIndex}
                setClickIndex={setSelectLevelClickIndex}
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
