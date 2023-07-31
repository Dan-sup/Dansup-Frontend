import typoStyles from '../styles/typography.module.css';
import AvatarIcon from '../../public/icons/ClassCard/avatar.svg';
import DateIcon from '../../public/icons/date.svg';
import LocationIcon from '../../public/icons/location.svg';
import styles from '../styles/components/ClassCard.module.css';

interface ClassCardProps {
  classInfo: any;
}

export default function ClassCard({ classInfo }: ClassCardProps) {
  return (
    <>
      <div className={styles.titleBox}>
        {!classInfo.userProfileImage ? (
          <AvatarIcon className={styles.profileImg} />
        ) : (
          <img src={classInfo.userProfileImage} className={styles.profileImg} />
        )}

        <div className={styles.textBox}>
          <div className={`${styles.classTitle} ${typoStyles.body1_Regular}`}>
            {classInfo.title}
          </div>
          <div
            className={`${styles.dancerName} ${typoStyles.caption1_Regular}`}
          >
            {classInfo.userNickname}
          </div>
        </div>
      </div>

      <div className={styles.video}></div>

      <div className={`${styles.InfoBox} ${typoStyles.body2_Regular}`}>
        <div className={styles.genreBox}>
          {classInfo.genres.map((item: any, idx: any) => (
            <div
              className={`${styles.genre} ${typoStyles.caption1_Regular}`}
              key={idx}
            >
              {item.genre}
            </div>
          ))}
        </div>

        <div className={styles.rightBox}>
          <div className={styles.detailBox}>
            <LocationIcon className={styles.icon} />
            서울시 마포구
          </div>
          <div className={styles.detailBox}>
            <DateIcon className={styles.icon} />
            {classInfo.method} 6월 28일
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>
    </>
  );
}
