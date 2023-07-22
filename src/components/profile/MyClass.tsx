import { useState } from 'react';
import styles from '../../styles/Profile.module.css';
import fonts from '../../styles/typography.module.css';
import myData from '../../jsons/myData.json';
import Date from '../../../public/icons/date.svg';
import Location from '../../../public/icons/location.svg';
import Dot from '../../../public/icons/dot.svg';

export default function Class() {
  const classes = myData.class;
  const [isBtnOpen, setIsBtnOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      {classes.map((data, idx) => {
        return (
          <>
            {data.title.length == 0 ? (
              <div className={styles.blank}>
                <div className={`${styles.blankText} ${fonts.body2_SemiBold}`}>
                  운영중인 수업을 추가해주세요
                </div>
              </div>
            ) : (
              <>
                <div className={styles.classBox} key={idx}>
                  <div
                    className={`${styles.classTitleBox} ${styles.paddingContainer}`}
                  >
                    <div className={styles.classProfileBox}>
                      <div className={styles.classProfileImg}></div>
                    </div>
                    <div className={styles.texts}>
                      <div
                        className={`${styles.classTitle} ${fonts.body1_Regular}`}
                      >
                        {data.title}
                        <div
                          className={styles.dot}
                          onClick={() => setIsBtnOpen(!isBtnOpen)}
                        >
                          <Dot />
                        </div>
                        {isBtnOpen ? (
                          <div className={styles.classBtnBox}>
                            <button
                              className={`${styles.upBtn} ${styles.classBtn} ${fonts.body2_SemiBold}`}
                            >
                              수업 마감하기
                            </button>
                            <button
                              className={`${styles.downBtn} ${styles.classBtn} ${fonts.body2_SemiBold}`}
                            >
                              수업 삭제하기
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className={fonts.caption1_Regular}>
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
        );
      })}
    </div>
  );
}
