import fonts from '../../styles/typography.module.css';
import styles from '../../styles/UploadPage.module.css';
import { IDuplicationList, IAllList } from '@/types/upload';

interface danceGenreProps {
  allList: IAllList[];
  list: IDuplicationList[];
  setList: React.Dispatch<React.SetStateAction<IDuplicationList[]>>;
  isFull: boolean;
  setIsFull: React.Dispatch<React.SetStateAction<boolean>>;
  limit: number;
}

export default function DanceGenre({
  allList,
  list,
  setList,
  isFull,
  setIsFull,
  limit,
}: danceGenreProps) {
  //genre 선택

  const handleChangeGenre = (e: any) => {
    const newItem = {
      name: e.target.value,
    };

    if (list.filter(item => item.name == e.target.value).length !== 0) {
      setList(list.filter(item => item.name !== e.target.value));
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
      {allList.map(data => {
        if (list.filter(item => item.name == data.name).length == 1) {
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
