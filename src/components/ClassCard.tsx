import typoStyles from '../styles/typography.module.css';
import DateIcon from '../../public/icons/date.svg';
import LocationIcon from '../../public/icons/location.svg';
import styles from '../styles/components/ClassCard.module.css';

export default function ClassCard() {
  return (
    <>
      <div className={styles.titleBox}>
        <div className={styles.profileImg}></div>

        <div className={styles.textBox}>
          <div className={`${styles.classTitle} ${typoStyles.body1_Regular}`}>
            임댄서와 함께 배우는 락킹 기초
          </div>
          <div
            className={`${styles.dancerName} ${typoStyles.caption1_Regular}`}
          >
            임댄서
          </div>
        </div>
      </div>

      <div className={styles.video}></div>

      <div className={`${styles.InfoBox} ${typoStyles.body2_Regular}`}>
        <div className={`${styles.genre} ${typoStyles.caption1_Regular}`}>
          락킹
        </div>
        <div className={styles.rightBox}>
          <div className={styles.detailBox}>
            <LocationIcon className={styles.icon} />
            서울시 마포구
          </div>
          <div className={styles.detailBox}>
            <DateIcon className={styles.icon} />
            원데이 6월 28일
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>
    </>
  );
}
