import styles from '../../styles/Profile.module.css';
import fonts from '../../styles/typography.module.css';
import Date from '../../../public/icons/date.svg';
import Location from '../../../public/icons/location.svg';
import Avatar from '../../../public/icons/ClassCard/avatar.svg';
import ReactPlayer from 'react-player';
import { changeDateForm, changeDayForm } from '@/utils/date';
import { useRouter } from 'next/router';
import Link from 'next/link';

type IOpenList = {
  isBtnOpen: boolean;
};

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
                <Link
                  href={{
                    pathname: `/class/[classId]`,
                    query: { classId: data.danceClassId },
                  }}
                  className={styles.classBox}
                >
                  <div key={idx}>
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
                        className={styles.classVideo}
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
                          ) : data.mon == false &&
                            data.tue == false &&
                            data.wed == false &&
                            data.thu == false &&
                            data.fri == false &&
                            data.sat == false &&
                            data.sun == false ? (
                            <></>
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
                </Link>
                <div className={styles.divider} />
              </>
            ))}
          </>
        ) : (
          <div className={styles.blank}>
            <div className={`${styles.blankText} ${fonts.body2_SemiBold}`}>
              운영중인 수업이 없어요
            </div>
          </div>
        )}
      </>
    </div>
  );
}
