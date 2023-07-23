import { useState } from 'react';
import styles from '../../styles/UploadPage.module.css';
import buttonStyles from '../../styles/Button.module.css';
import fonts from '../../styles/typography.module.css';
import { IGenreList, IClassDayList, ILocationList } from '@/types/upload';
import DanceGenre from '@/components/upload/DanceGenre';
import Select from '@/components/upload/Select';
import ClassDay from '@/components/upload/ClassDay';
import ClassLocation from '@/components/upload/ClassLocation';
import BasicHeader from '@/components/common/Header/BasicHeader';
import { levelList, wayList } from '@/data/class-data';

export default function Filter() {
  const [locationList, setLocationList] = useState<ILocationList[]>([
    { id: 0, location: '' },
  ]);
  const [isClickedLocation, setIsClickedLocation] = useState<boolean>(false);
  //Genre 박스 열기
  const [genreList, setGenreList] = useState<IGenreList[]>([
    { id: 0, genre: '' },
  ]);
  const [isGenreFull, setIsGenreFull] = useState<boolean>(false);
  const [isClickedGenre, setIsClickedGenre] = useState<boolean>(false);
  const [classDayList, setClassDayList] = useState<IClassDayList[]>([
    { id: 0, day: '' },
  ]);
  const [classWay, setClassWay] = useState<string>('');
  const [classLevel, setClassLevel] = useState<string>('');

  //location 박스 열기
  const onClickOpenLocationBox = () => {
    setIsClickedLocation(!isClickedLocation);
  };

  //Genre 박스 열기
  const onClickOpenGenreBox = () => {
    setIsClickedGenre(!isClickedGenre);
  };

  return (
    <>
      <BasicHeader type="register" />
      <div className={styles.container}>
        <div className={styles.inputList}>
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
                <ClassLocation list={locationList} setList={setLocationList} />
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
            <div className={fonts.body1_SemiBold}>수업 방식</div>
            <Select
              list={wayList}
              votedItem={classWay}
              setVotedItem={setClassWay}
            />
          </div>
          <div className={styles.box}>
            <div className={fonts.body1_SemiBold}>수업 난이도</div>
            <Select
              list={levelList}
              votedItem={classLevel}
              setVotedItem={setClassLevel}
            />
          </div>
        </div>
      </div>
    </>
  );
}
