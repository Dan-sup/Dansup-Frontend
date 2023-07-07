import styles from '../../styles/UploadPage.module.css';

//genre 선택
const genreList = [
  { name: '락킹', length: 2 },
  { name: '왁킹', length: 2 },
  { name: '팝핑', length: 2 },
  { name: '재즈', length: 2 },
  { name: '걸스 힙합', length: 5 },
  { name: '힙합', length: 2 },
  { name: '텃팅', length: 2 },
  { name: '디짓', length: 2 },
  { name: '트월크', length: 3 },
  { name: '힐댄스', length: 3 },
  { name: '브레이킹', length: 4 },
  { name: '크럼프', length: 3 },
  { name: '하우스', length: 3 },
  { name: '코레오', length: 3 },
  { name: '컨템', length: 2 },
  { name: '보깅', length: 2 },
  { name: '소울', length: 2 },
  { name: '프리스타일', length: 5 },
  { name: '기타', length: 2 },
];

const clickedBox = genreList.map((data, idx) => {
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

export default function DanceGenre() {
  return <div className={styles.clickedBox}>{clickedBox}</div>;
}
