import styles from '../../styles/Profile.module.css';
import fonts from '../../styles/typography.module.css';
import Date from '../../../public/icons/date.svg';
import Location from '../../../public/icons/location.svg';
import Avatar from '../../../public/icons/ClassCard/avatar.svg';
import ReactPlayer from 'react-player';
import { changeDateForm, changeDayForm } from '@/utils/date';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Dot from '../../../public/icons/dot.svg';
import Modal from '../common/Modal';
import { closeClassListState } from '@/store/class';
import { useRecoilState } from 'recoil';
import Link from 'next/link';
interface classProps {
  classes: any;
}

export default function Class({ classes }: classProps) {
  const router = useRouter();
  const fillIsOpen = Array.from({ length: classes.length }, () => true);
  const [isOpen, setIsOpen] = useState<boolean[]>(fillIsOpen);
  const [clickedClass, setClickedClass] = useState<string[]>(['']);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState<boolean[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean[]>([]);
  const [closeClassList, setCloseClassList] =
    useRecoilState(closeClassListState);

  return (
    <div className={styles.container}>
      <>
        {classes.length !== 0 ? (
          <>
            {classes.map((data: any, idx: any) => {
              const clickDot = () => {
                if (!clickedClass.includes(data.title))
                  setClickedClass(prevClickedClass => [
                    ...prevClickedClass,
                    data.title,
                  ]);
                isOpen[clickedClass.indexOf(data.title, 0) - 1] =
                  !isOpen[clickedClass.indexOf(data.title, 0) - 1];
                setIsOpen(prevClass => [...prevClass]);
              };

              //마감 모달
              const openCloseModal = () => {
                isCloseModalOpen[clickedClass.indexOf(data.title, 0) - 1] =
                  true;
                setIsCloseModalOpen(prevCloseModal => [...prevCloseModal]);
                isOpen[clickedClass.indexOf(data.title, 0) - 1] = false;
                setIsOpen(prevClass => [...prevClass]);
                document.body.style.overflow = 'hidden';
              };

              const closeCloseModal = () => {
                isCloseModalOpen[clickedClass.indexOf(data.title, 0) - 1] =
                  false;
                setIsCloseModalOpen(prevCloseModal => [...prevCloseModal]);
                document.body.style.overflow = 'unset';
              };

              //삭제 모달
              const openDeleteModal = () => {
                isDeleteModalOpen[clickedClass.indexOf(data.title, 0) - 1] =
                  true;
                setIsDeleteModalOpen(prevDeleteModal => [...prevDeleteModal]);
                isOpen[clickedClass.indexOf(data.title, 0) - 1] = false;
                setIsOpen(prevClass => [...prevClass]);
                document.body.style.overflow = 'hidden';
              };

              const closeDeleteModal = () => {
                isDeleteModalOpen[clickedClass.indexOf(data.title, 0) - 1] =
                  false;
                setIsDeleteModalOpen(prevDeleteModal => [...prevDeleteModal]);
                document.body.style.overflow = 'unset';
              };

              return (
                <>
                  <div className={styles.classBox} key={idx}>
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
                          <div className={styles.dot} onClick={clickDot}>
                            <Dot />
                          </div>
                          {isOpen[clickedClass.indexOf(data.title, 0) - 1] ? (
                            <div className={styles.classBtnBox}>
                              <button
                                className={`${styles.upBtn} ${styles.classBtn} ${fonts.body2_SemiBold}`}
                                onClick={openCloseModal}
                              >
                                수업 마감하기
                              </button>
                              <button
                                className={`${styles.downBtn} ${styles.classBtn} ${fonts.body2_SemiBold}`}
                                onClick={openDeleteModal}
                              >
                                수업 삭제하기
                              </button>
                            </div>
                          ) : (
                            <></>
                          )}
                          {isCloseModalOpen[
                            clickedClass.indexOf(data.title, 0) - 1
                          ] ? (
                            <Modal
                              question=" 수업을 마감할까요?"
                              requestion="더 이상 수강인원을 받지 않아요"
                              button="마감하기"
                              closeModal={closeCloseModal}
                            />
                          ) : (
                            <></>
                          )}
                          {isDeleteModalOpen[
                            clickedClass.indexOf(data.title, 0) - 1
                          ] ? (
                            <Modal
                              question="수업을 삭제할까요?"
                              requestion="수업을 아예 목록에서 지울게요"
                              button="삭제하기"
                              closeModal={closeDeleteModal}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className={fonts.caption1_Regular}>
                          {data.userNickname}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={{
                        pathname: `/class/[classId]`,
                        query: { classId: data.danceClassId },
                      }}
                    >
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
                    </Link>
                  </div>
                  <div className={styles.divider} />
                </>
              );
            })}
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
