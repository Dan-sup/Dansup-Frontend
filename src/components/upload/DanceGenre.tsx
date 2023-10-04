import fonts from '../../styles/typography.module.css';
import styles from '../../styles/UploadPage.module.css';
import { IGenreList } from '@/types/upload';

interface danceGenreProps {
  list: IGenreList[];
  setList: React.Dispatch<React.SetStateAction<IGenreList[]>>;
  isFull: boolean;
  setIsFull: React.Dispatch<React.SetStateAction<boolean>>;
  limit: number;
}

export default function DanceGenre({
  list,
  setList,
  isFull,
  setIsFull,
  limit,
}: danceGenreProps) {
  //genre 선택
  const genreList = [
    { id: 0, name: '락킹', isShort: true },
    { id: 1, name: '왁킹', isShort: true },
    { id: 2, name: '팝핑', isShort: true },
    { id: 3, name: '재즈', isShort: true },
    { id: 4, name: '걸스 힙합', isShort: false },
    { id: 5, name: '힙합', isShort: true },
    { id: 6, name: '텃팅', isShort: true },
    { id: 7, name: '디짓', isShort: true },
    { id: 8, name: '트월크', isShort: false },
    { id: 9, name: '힐댄스', isShort: false },
    { id: 10, name: '브레이킹', isShort: false },
    { id: 11, name: '크럼프', isShort: false },
    { id: 12, name: '하우스', isShort: false },
    { id: 13, name: '코레오', isShort: false },
    { id: 14, name: '보깅', isShort: true },
    { id: 15, name: '소울', isShort: true },
    { id: 16, name: '프리스타일', isShort: false },
    { id: 17, name: '현대무용', isShort: false },
    { id: 18, name: '한국무용', isShort: false },
    { id: 19, name: '발레', isShort: true },
    { id: 20, name: '기타', isShort: true },
  ];

  const handleChangeGenre = (e: any) => {
    const newItem = {
      genre: e.target.value,
    };

    if (list.filter(item => item.genre == e.target.value).length !== 0) {
      setList(list.filter(item => item.genre !== e.target.value));
      setIsFull(false);
    } else {
      if (list.length < limit - 1) {
        setList([...list, newItem]);
        setIsFull(false);
      } else {
        setIsFull(true);
      }
    }
  };

  return (
    <div className={styles.clickedBox}>
      {genreList.map(data => {
        if (list.filter(item => item.genre == data.name).length == 1) {
          return (
            <>
              {data.isShort ? (
                <button
                  className={`${styles.genreBox} ${styles.clickedAfterBox} ${styles.shortBox} ${fonts.body2_Regular}`}
                  key={data.id}
                  onClick={handleChangeGenre}
                  value={data.name}
                >
                  {data.name}
                </button>
              ) : (
                <button
                  className={`${styles.genreBox} ${styles.clickedAfterBox} ${styles.longBox} ${fonts.body2_Regular}`}
                  key={data.id}
                  onClick={handleChangeGenre}
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
                  className={`${styles.genreBox} ${styles.clickedBeforeBox} ${styles.shortBox}  ${fonts.body2_Regular}`}
                  key={data.id}
                  onClick={handleChangeGenre}
                  value={data.name}
                >
                  {data.name}
                </button>
              ) : (
                <button
                  className={`${styles.genreBox} ${styles.clickedBeforeBox} ${styles.longBox}  ${fonts.body2_Regular}`}
                  key={data.id}
                  onClick={handleChangeGenre}
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
