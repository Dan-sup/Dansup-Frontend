import styles from '../../styles/UploadPage.module.css';
import { IList } from '../../types/upload';

interface boxProps {
  list: IList[];
}

function Box({ list }: boxProps) {
  const clickedBox = list.map((data, idx) => {
    if (data.isShort) {
      return (
        <div className={styles.shortGenreBox} key={idx}>
          {data.name}
        </div>
      );
    } else {
      return (
        <div className={styles.longGenreBox} key={idx}>
          {data.name}
        </div>
      );
    }
  });

  return <div className={styles.clickedBox}>{clickedBox}</div>;
}

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

  const firstList = genreList.filter(data => data.id < 4);
  const secondList = genreList.filter(data => data.id < 7 && data.id > 3);
  const thirdList = genreList.filter(data => data.id < 10 && data.id > 6);
  const fourthList = genreList.filter(data => data.id < 13 && data.id > 9);
  const fifthList = genreList.filter(data => data.id < 16 && data.id > 12);
  const sixthList = genreList.filter(data => data.id < 19 && data.id > 15);

  return (
    <div className={styles.clickedBoxs}>
      <div className={styles.clickedBox}>
        <Box list={firstList} />
      </div>
      <div className={styles.clickedBox}>
        <Box list={secondList} />
      </div>
      <div className={styles.clickedBox}>
        <Box list={thirdList} />
      </div>
      <div className={styles.clickedBox}>
        <Box list={fourthList} />
      </div>
      <div className={styles.clickedBox}>
        <Box list={fifthList} />
      </div>
      <div className={styles.clickedBox}>
        <Box list={sixthList} />
      </div>
    </div>
  );
}
