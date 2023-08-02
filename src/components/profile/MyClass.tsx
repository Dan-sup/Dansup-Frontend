import styles from '../../styles/Profile.module.css';
import fonts from '../../styles/typography.module.css';
import Date from '../../../public/icons/date.svg';
import Location from '../../../public/icons/location.svg';
import Dot from '../../../public/icons/dot.svg';
import Avatar from '../../../public/icons/ClassCard/avatar.svg';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import { changeDateForm, changeDayForm } from '@/utils/date';

interface classProps {
  classes: any;
}

export default function Class({ classes }: classProps) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <>
        {classes.length !== 0 ? (
          <>
            {classes.map((data: any, idx: any) => (
              <>
                <div
                  className={styles.classBox}
                  key={idx}
                  onClick={() => router.push(`/my-class/${data.danceClassId}`)}
                >
                  <div
                    className={`${styles.classTitleBox} ${styles.paddingContainer}`}
                  >
                    <div className={styles.classProfileBox}>
                      {data.userProfileImage == null ? (
                        <Avatar
                          alt="blank"
                          className={styles.classProfileImg}
                          width={42}
                          heigth={42}
                        />
                      ) : (
                        <img
                          className={styles.classProfileImg}
                          src={data.userProfileImage}
                          alt={data.userProfileImage}
                          width={42}
                          height={42}
                        />
                      )}
                    </div>
                    <div className={styles.texts}>
                      <div
                        className={`${styles.classTitle} ${fonts.body1_Regular}`}
                      >
                        {data.title}
                        {/*<button className={styles.dot}>
                          <Dot />
                        </button>
                        {? (
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
                        )}*/}
                      </div>
                      <div className={fonts.caption1_Regular}>
                        {data.userNickname}
                      </div>
                    </div>
                  </div>
                  {data.videoUrl == '' ? (
                    <div className={styles.classVideoBox}></div>
                  ) : (
                    <ReactPlayer
                      url={data.videoUrl}
                      playing={false}
                      muted
                      width="100%"
                      height={210}
                    />
                  )}
                  <div
                    className={`${styles.classDetailBox} ${styles.paddingContainer} ${fonts.body2_Regular}`}
                  >
                    <div className={styles.classGenreBox} key={idx}>
                      {data.genres.map((data: any, idx: any) => (
                        <>
                          {data.genre !== '' ? (
                            <div
                              className={`${styles.classGenre} ${fonts.caption1_Regular}`}
                            >
                              <div className={styles.classGenreText}>
                                {data.genre}
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </div>

                    <div className={styles.classDetail}>
                      <div className={styles.classLocation}>
                        <Location className={styles.icon} />
                        {data.location.split(' ')[1]}
                      </div>
                      <div className={styles.classDate}>
                        <Date className={styles.icon} />
                        {data.method}{' '}
                        {data.method == '원데이' ? (
                          data.date == null ? (
                            <></>
                          ) : (
                            changeDateForm(data.date)
                          )
                        ) : (
                          changeDayForm(
                            data.mon,
                            data.tue,
                            data.wed,
                            data.thu,
                            data.fri,
                            data.sat,
                            data.sun,
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.divider} />
              </>
            ))}
          </>
        ) : (
          <div className={styles.blank}>
            <div className={`${styles.blankText} ${fonts.body2_SemiBold}`}>
              운영중인 수업을 추가해주세요
            </div>
          </div>
        )}
      </>
    </div>
  );
}
