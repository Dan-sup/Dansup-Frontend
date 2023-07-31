import { useState } from 'react';
import Date from '../../../public/icons/date.svg';
import Location from '../../../public/icons/location.svg';
import Dot from '../../../public/icons/dot.svg';
import Avatar from '../../../public/icons/avatar.svg';
import ReactPlayer from 'react-player';
import styles from '../../styles/Profile.module.css';
import fonts from '../../styles/typography.module.css';
import { useRouter } from 'next/router';

type IOpenList = {
  isBtnOpen: boolean;
};

interface ClassCardProps {
  classes: any;
  isMyPage: boolean;
}

export default function ClassCard({ classes, isMyPage }: ClassCardProps) {
  const router = useRouter();
  const [isBtnOpenList, setIsBtnOpenList] = useState<IOpenList[]>([
    {
      isBtnOpen: false,
    },
  ]);
  return (
    <>
      {classes.map((data: any, idx: any) => (
        <>
          <div
            className={styles.classBox}
            key={idx}
            onClick={() => router.push(`class/${data.danceClassId}`)}
          >
            <div
              className={`${styles.classTitleBox} ${styles.paddingContainer}`}
            >
              <div className={styles.classProfileBox}>
                {data.userProfileImage == '' ? (
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
                <div className={`${styles.classTitle} ${fonts.body1_Regular}`}>
                  {data.title}
                  {isMyPage ? (
                    <>
                      <button className={styles.dot}>
                        <Dot />
                      </button>
                      {isBtnOpenList[0].isBtnOpen ? (
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
                    </>
                  ) : (
                    <></>
                  )}
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
                  {data.location.substring(
                    data.location.indexOf('시 ') + 1,
                    data.location.indexOf('구 ') + 1,
                  )}
                </div>
                <div className={styles.classDate}>
                  {data.method == null ? (
                    <>
                      {data.date == null ? (
                        <></>
                      ) : (
                        <>
                          <Date className={styles.icon} />
                          {data.date}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {data.date == null ? (
                        <>
                          <Date className={styles.icon} />
                          {data.method}
                        </>
                      ) : (
                        <>
                          <Date className={styles.icon} />
                          {data.method} · {data.date}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
        </>
      ))}
    </>
  );
}
