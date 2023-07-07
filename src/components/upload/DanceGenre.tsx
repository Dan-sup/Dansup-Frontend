import styles from '../../styles/UploadPage.module.css';
import { IList } from '../../types/upload';

interface boxProps {
  list: IList[];
}

function Box({ list }: boxProps) {
  const clickedBox = list.map((data, idx) => {
    if (data.length == 2) {
      return (
        <div className={styles.smallGenreBox} key={idx}>
          {data.name}
        </div>
      );
    } else {
      return (
        <div className={styles.bigGenreBox} key={idx}>
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
    { name: '락킹', length: 2, line: 1 },
    { name: '왁킹', length: 2, line: 1 },
    { name: '팝핑', length: 2, line: 1 },
    { name: '재즈', length: 2, line: 1 },
    { name: '걸스 힙합', length: 5, line: 2 },
    { name: '힙합', length: 2, line: 2 },
    { name: '텃팅', length: 2, line: 2 },
    { name: '디짓', length: 2, line: 3 },
    { name: '트월크', length: 3, line: 3 },
    { name: '힐댄스', length: 3, line: 3 },
    { name: '브레이킹', length: 4, line: 4 },
    { name: '크럼프', length: 3, line: 4 },
    { name: '하우스', length: 3, line: 4 },
    { name: '코레오', length: 3, line: 5 },
    { name: '컨템', length: 2, line: 5 },
    { name: '보깅', length: 2, line: 5 },
    { name: '소울', length: 2, line: 6 },
    { name: '프리스타일', length: 5, line: 6 },
    { name: '기타', length: 2, line: 6 },
  ];

  const firstList = genreList.filter(data => data.line == 1);
  const secondList = genreList.filter(data => data.line == 2);
  const thirdList = genreList.filter(data => data.line == 3);
  const fourthList = genreList.filter(data => data.line == 4);
  const fifthList = genreList.filter(data => data.line == 5);
  const sixthList = genreList.filter(data => data.line == 6);

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
