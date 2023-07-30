import { useState, useEffect } from 'react';
import styles from '../../styles/Profile.module.css';
import fonts from '../../styles/typography.module.css';
import Date from '../../../public/icons/date.svg';
import Location from '../../../public/icons/location.svg';
import Dot from '../../../public/icons/dot.svg';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import { useMutation } from '@tanstack/react-query';
import { getMyClass } from '@/apis/my';

type IOpenList = {
  isBtnOpen: boolean;
};

export default function Class() {
  const [classes, setClasses] = useState<any>([]);
  const [isBtnOpenList, setIsBtnOpenList] = useState<IOpenList[]>([
    {
      isBtnOpen: false,
    },
  ]);

  //api
  const user = useRecoilValue(userState);
  const accessToken = user.accessToken;

  const getMyClassMutation = useMutation(getMyClass, {
    onSuccess: data => {
      console.log(data.data);
      setClasses(data.data);
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    getMyClassMutation.mutate(accessToken);
  }, [accessToken]);

  return (
    <div className={styles.container}>
      <>
        {classes.length == 0 ? (
          <div className={styles.blank}>
            <div className={`${styles.blankText} ${fonts.body2_SemiBold}`}>
              운영중인 수업을 추가해주세요
            </div>
          </div>
        ) : (
          <>
            {classes.map((data: any, idx: any) => {
              let location = data.location.substring(
                0,
                data.location.indexOf('구 ') + 1,
              );
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
                        <button
                          className={styles.dot}
                          onClick={e => {
                            if (
                              e.currentTarget.name ==
                              data.danceClassId.toString()
                            ) {
                              const newItem = {
                                isBtnOpen:
                                  !isBtnOpenList[data.danceClassId]?.isBtnOpen,
                              };
                              setIsBtnOpenList([...isBtnOpenList, newItem]);
                              console.log(e.currentTarget.value);
                              console.log(data.danceClassId);
                              console.log(newItem);
                            } else {
                              const newItem = {
                                isBtnOpen:
                                  isBtnOpenList[data.danceClassId]?.isBtnOpen,
                              };
                              setIsBtnOpenList([...isBtnOpenList, newItem]);
                              console.log(e.currentTarget.value);
                              console.log(data.danceClassId);
                              console.log(newItem);
                            }
                          }}
                          name={data.danceClassId.toString()}
                        >
                          <Dot />
                        </button>
                        {isBtnOpenList[data.danceClassId]?.isBtnOpen ? (
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
                        {location}
                      </div>
                      <div className={styles.classDate}>
                        <Date className={styles.icon} />
                        {data.method} · {data.date}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.divider} />
              </>;
            })}
          </>
        )}
      </>
    </div>
  );
}
