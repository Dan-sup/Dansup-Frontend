import styles from '../../styles/Profile.module.css';
import fonts from '../../styles/typography.module.css';
import dancerData from '../../jsons/dancerData.json';
import Date from '../../../public/icons/date.svg';
import Location from '../../../public/icons/location.svg';

export default function Class() {
  const classes = dancerData.class;

  return (
    <div className={styles.container}>
      {classes.map((data, idx) => (
        <>
          {data.title.length == 0 ? (
            <div className={styles.blank}>
              <div className={`${styles.blankText} ${fonts.body2_SemiBold}`}>
                운영중인 수업이 없어요
              </div>
            </div>
          ) : (
            <>
              <div className={styles.classBox} key={idx}>
                <div
                  className={`${styles.classTitleBox} ${styles.paddingContainer}`}
                >
                  <div className={styles.classProfileImg}></div>
                  <div className={styles.texts}>
                    <div
                      className={`${styles.classTitle} ${fonts.body1_Regular}`}
                    >
                      {data.title}
                    </div>
                    <div
                      className={`${styles.dancer} ${fonts.caption1_Regular}`}
                    >
                      {data.userNickname}
                    </div>
                  </div>
                </div>
                <div className={styles.classVideoBox}></div>
                <div
                  className={`${styles.classDetailBox} ${styles.paddingContainer} ${fonts.body2_Regular}`}
                >
                  <div
                    className={`${styles.classGenre} ${fonts.caption1_Regular}`}
                  >
                    {data.genres}
                  </div>
                  <div className={styles.classDetail}>
                    <div className={styles.classLocation}>
                      <Location className={styles.icon} />
                      {data.location}
                    </div>
                    <div className={styles.classDate}>
                      <Date className={styles.icon} />
                      {data.method} {data.date}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.divider} />
            </>
          )}
        </>
      ))}
    </div>
  );
}
