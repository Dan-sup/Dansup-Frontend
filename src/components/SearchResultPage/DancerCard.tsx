import typoStyles from '../../styles/typography.module.css';
import styles from '../../styles/components/SearchResultPage/DancerCard.module.css';

export default function DancerCard() {
  return (
    <div className={styles.container}>
      <div className={styles.genreBox}>
        <div className={`${styles.genre} ${typoStyles.caption1_Regular}`}>
          힙합
        </div>
        <div className={`${styles.genre} ${typoStyles.caption1_Regular}`}>
          걸스힙합
        </div>
      </div>

      <div className={styles.bottomBox}>
        <div className={styles.profileImg}></div>
        <div className={styles.infoBox}>
          <div className={`${styles.nickname} ${typoStyles.body1_SemiBold}`}>
            임댄서
          </div>
          <div className={`${styles.intro} ${typoStyles.caption1_Regular}`}>
            춤에는 항상 진심입니다
          </div>
          <div className={styles.hashtagBox}>
            <div className={`${styles.hashtag} ${typoStyles.caption1_Regular}`}>
              #선위주의
            </div>
            <div className={`${styles.hashtag} ${typoStyles.caption1_Regular}`}>
              #허니제이같은
            </div>
            <div className={`${styles.hashtag} ${typoStyles.caption1_Regular}`}>
              #빠른
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
