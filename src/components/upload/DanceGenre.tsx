import { useState, useRef } from 'react';
import styles from '../../styles/UploadPage.module.css';
import { IGenreList } from '@/types/upload';

export default function DanceGenre() {
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
    { id: 14, name: '컨템', isShort: true },
    { id: 15, name: '보깅', isShort: true },
    { id: 16, name: '소울', isShort: true },
    { id: 17, name: '프리스타일', isShort: false },
    { id: 18, name: '기타', isShort: true },
  ];

  const [list, setList] = useState<IGenreList[]>([{ id: 0, genre: '' }]);
  const nextId = useRef<number>(1);
  const deleteId = useRef<number>(1);

  const handleChangeGenre = (e: any) => {
    const newItem = {
      id: nextId.current,
      genre: e.target.value,
    };

    if (list.filter(item => item.genre == e.target.value).length !== 0) {
      setList(list.filter(item => item.genre !== e.target.value));
    } else {
      if (list.length < 4) {
        setList([...list, newItem]);
        nextId.current += 1;
      } else {
        setList([
          ...list.filter(item => item.id !== deleteId.current),
          newItem,
        ]);
        nextId.current += 1;
        deleteId.current += 1;
      }
    }

    console.log(list);
  };

  return (
    <div className={styles.clickedBox}>
      {genreList.map(data => {
        if (data.isShort) {
          return (
            <button
              className={`${styles.GenreBox} ${styles.shortBox}`}
              key={data.id}
              onClick={handleChangeGenre}
              value={data.name}
            >
              {data.name}
            </button>
          );
        } else {
          return (
            <button
              className={`${styles.GenreBox} ${styles.longBox}`}
              key={data.id}
              onClick={handleChangeGenre}
              value={data.name}
            >
              {data.name}
            </button>
          );
        }
      })}
    </div>
  );
}
