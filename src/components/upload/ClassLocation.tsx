import { useRef } from 'react';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/UploadPage.module.css';
import { IList } from '@/types/upload';

interface danceGenreProps {
  list: IList[];
  setList: React.Dispatch<React.SetStateAction<IList[]>>;
}

export default function ClassLocation({ list, setList }: danceGenreProps) {
  //location 선택
  const locationList = [
    { id: 0, name: '서울 전체', isShort: false },
    { id: 1, name: '강남구', isShort: true },
    { id: 2, name: '강동구', isShort: true },
    { id: 3, name: '강북구', isShort: true },
    { id: 4, name: '강서구', isShort: true },
    { id: 5, name: '관악구', isShort: true },
    { id: 6, name: '광진구', isShort: true },
    { id: 7, name: '구로구', isShort: true },
    { id: 8, name: '금천구', isShort: true },
    { id: 9, name: '노원구', isShort: true },
    { id: 10, name: '도봉구', isShort: true },
    { id: 11, name: '동대문구', isShort: true },
    { id: 12, name: '동작구', isShort: true },
    { id: 13, name: '마포구', isShort: true },
    { id: 14, name: '서대문구', isShort: true },
    { id: 15, name: '서초구', isShort: true },
    { id: 16, name: '성동구', isShort: true },
    { id: 17, name: '성북구', isShort: true },
    { id: 18, name: '송파구', isShort: true },
    { id: 18, name: '양천구', isShort: true },
    { id: 18, name: '영등포구', isShort: true },
    { id: 18, name: '용산구', isShort: true },
    { id: 18, name: '은평구', isShort: true },
    { id: 18, name: '종로구', isShort: true },
    { id: 18, name: '중구', isShort: true },
    { id: 18, name: '중량구', isShort: true },
  ];

  const nextId = useRef<number>(1);

  const handleChangeLocation = (e: any) => {
    const newItem = {
      id: nextId.current,
      name: e.target.value,
    };

    if (
      e.target.value == '서울 전체' ||
      list.filter(item => item.name == '서울 전체').length == 1
    ) {
      nextId.current == 1;
      setList(list.filter(item => item.name === e.target.value));
      setList([newItem]);
    } else {
      if (list.filter(item => item.name == e.target.value).length !== 0) {
        setList(list.filter(item => item.name !== e.target.value));
      } else {
        setList([...list, newItem]);
        nextId.current += 1;
      }
    }
  };

  return (
    <div className={styles.clickedBox}>
      {locationList.map(data => {
        if (list.filter(item => item.name == data.name).length == 1) {
          return (
            <>
              {data.isShort ? (
                <button
                  className={`${styles.genreBox} ${styles.clickedAfterBox} ${styles.shortBox} ${fonts.body2_Regular}`}
                  key={data.id}
                  onClick={handleChangeLocation}
                  value={data.name}
                >
                  {data.name}
                </button>
              ) : (
                <button
                  className={`${styles.genreBox} ${styles.clickedAfterBox} ${styles.longBox} ${fonts.body2_Regular}`}
                  key={data.id}
                  onClick={handleChangeLocation}
                  value={data.name}
                >
                  {data.name}
                </button>
              )}
            </>
          );
        } else {
          return (
            <>
              {data.isShort ? (
                <button
                  className={`${styles.genreBox} ${styles.clickedBeforeBox} ${styles.shortBox} ${fonts.body2_Regular}`}
                  key={data.id}
                  onClick={handleChangeLocation}
                  value={data.name}
                >
                  {data.name}
                </button>
              ) : (
                <button
                  className={`${styles.genreBox} ${styles.clickedBeforeBox} ${styles.longBox} ${fonts.body2_Regular}`}
                  key={data.id}
                  onClick={handleChangeLocation}
                  value={data.name}
                >
                  {data.name}
                </button>
              )}
            </>
          );
        }
      })}
    </div>
  );
}
