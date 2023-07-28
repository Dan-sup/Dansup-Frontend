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
import ClassTime from '@/components/upload/ClassTime';
import {
  filterLevelList,
  filterWayList,
  classFeeList,
} from '@/data/class-data';
import Close from '../../../public/icons/close.svg';

const timeSelectWay = [
  { id: 0, name: '목록에서 선택' },
  { id: 1, name: '직접 선택' },
];

interface filterProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function Filter({ isOpen, closeModal }: filterProps) {
  const [locationList, setLocationList] = useState<IList[]>([
    { id: 0, name: '' },
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
  const [classWay, setClassWay] = useState<string>('전체');
  const [classLevel, setClassLevel] = useState<string>('전체');
  const [classFee, setClassFee] = useState<string>('전체 가격');

  //목록 선택
  const [selectTimeClickIndex, SetSelectTimeClickIndex] = useState<number>(0);
  const [clickedTime, setClickedTime] = useState<string>('');

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
  const [isStartTimeChecked, setIsStartTimeChecked] = useState<boolean>(false);
  const [isEndTImeChecked, setIsEndTimeChecked] = useState<boolean>(false);

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
    if (locationList.length !== 1) {
      setIsLocationChecked(true);
    } else {
      setIsLocationChecked(false);
    }

    if (genreList.length !== 1) {
      setIsGenreListChecked(true);
    } else {
      setIsGenreListChecked(false);
    }

    if (classLevel !== '전체') {
      setIsClassLevelChecked(true);
    } else {
      setIsClassLevelChecked(false);
    }

    if (classDayList.length !== 1) {
      setIsClassDayChecked(true);
    } else {
      setIsClassDayChecked(false);
    }

    if (classWay !== '전체') {
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
    setLocationList([{ id: 0, name: '' }]);
    setGenreList([{ genre: '' }]);
    setClassDayList([{ id: 0, name: '' }]);
    setSelectWayClickIndex(0);
    setClassWay('전체');
    setClassFee('전체 가격');
    setIsClassFeeChecked(false);
    setSelectLevelClickIndex(0);
    setClassLevel('전체');
    SetSelectTimeClickIndex(0);
    setClickedTime('');
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
        </div>

        <div className={styles.bottom}>
          <div className={buttonStyles.buttonSpace}>
            {isLocationChecked ||
            isClassDayChecked ||
            isClassFeeChecked ||
            isClassLevelChecked ||
            isGenreListChecked ||
            isClassWayChecked ||
            isSelectTimeChecked ||
            (isStartTimeChecked && isEndTImeChecked) ? (
              <button
                className={`${buttonStyles.CTA_Large} ${buttonStyles.before} ${fonts.body1_SemiBold}`}
              >
                필터 적용하기
              </button>
            ) : (
              <button
                className={`${buttonStyles.CTA_Large} ${buttonStyles.after} ${fonts.body1_SemiBold}`}
              >
                필터 적용하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
