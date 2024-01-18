import { useState, useEffect } from 'react';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/Profile.module.css';
import DropDownBefore from '../../../public/icons/dropdown-before.svg';
import DropDownAfter from '../../../public/icons/dropdown-after.svg';
import ReactPlayer from 'react-player';
import Dot from '../../../public/icons/dot.svg';
import ClassModal from '../common/ClassModal';
import Link from 'next/link';

interface portfolioProps {
  portfolios: any;
  video: any;
}
export default function Portfolio({ portfolios, video }: portfolioProps) {
  const fillIsOpen = Array.from({ length: video.length }, () => true);
  const fillIsPlaying = Array.from({ length: video.length }, () => true);
  const [isOpen, setIsOpen] = useState<boolean[]>(fillIsOpen);
  const [clickedVideo, setClickedVideo] = useState<string[]>(['']);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean[]>([]);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean[]>(fillIsPlaying);
  const [durations, setDurations] = useState<number[]>([]);
  const [playings, setPlayings] = useState<number[]>([]);

  const onClickDropDown = () => {
    setIsClicked(!isClicked);
  };

  // formatTime 함수 '분:초' 형태로 리턴
  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.Part}>
        <div className={styles.paddingContainer}>
          <div className={styles.awardBox}>
            <div className={`${styles.awardTitle} ${fonts.head2}`}>
              공연 및 활동경력
              <Link
                href="/edit-portfolio"
                className={`${styles.editText} ${fonts.caption1_SemiBold}`}
              >
                편집
              </Link>
            </div>
            <div className={`${styles.awardList} ${fonts.body2_Regular}`}>
              {portfolios.length !== 0 ? (
                <>
                  {isClicked ? (
                    <>
                      {portfolios.map((data: any, idx: any) => (
                        <div className={styles.awards} key={idx}>
                          <div className={styles.date}>{data.date}</div>
                          <div className={styles.award}>{data.detail}</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {portfolios.slice(0, 3).map((data: any, idx: any) => (
                        <div className={styles.awards} key={idx}>
                          <div className={styles.date}>{data.date}</div>
                          <div className={styles.award}>{data.detail}</div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <div className={styles.awardBlank}>
                  <div
                    className={`${styles.blankText} ${fonts.body2_SemiBold}`}
                  >
                    공연 및 활동경력이 없어요
                  </div>
                </div>
              )}
            </div>
            {portfolios.length < 4 ? (
              <></>
            ) : (
              <button className={styles.dragDown}>
                <div onClick={onClickDropDown}>
                  {isClicked ? <DropDownAfter /> : <DropDownBefore />}
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.Part}>
        <div className={styles.titleContainer}>
          <div className={`${styles.awardTitle} ${fonts.head2}`}>대표 영상</div>
        </div>
        {video.length == 0 ? (
          <div className={styles.paddingContainer}>
            <div className={styles.blank}>
              <div className={`${styles.blankText} ${fonts.body2_SemiBold}`}>
                나를 소개할 수 있는 포트폴리오 영상을 추가해주세요
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.gap}>
            {video.map((data: any, idx: any) => {
              const clickDot = () => {
                if (!clickedVideo.includes(data.pvId)) {
                  setClickedVideo(prevClickedVideo => [
                    ...prevClickedVideo,
                    data.pvId,
                  ]);
                  setIsOpen(prevVideo => [...prevVideo, true]);
                } else {
                  isOpen[clickedVideo.indexOf(data.pvId, 0) - 1] =
                    !isOpen[clickedVideo.indexOf(data.pvId, 0) - 1];
                  setIsOpen(prevVideo => [...prevVideo]);
                }
              };

              const clickPlaying = () => {
                if (!clickedVideo.includes(data.pvId)) {
                  setClickedVideo(prevClickedVideo => [
                    ...prevClickedVideo,
                    data.pvId,
                  ]);
                  setIsPlaying(prevVideo => [...prevVideo, true]);
                } else {
                  isPlaying[clickedVideo.indexOf(data.pvId, 0) - 1] =
                    !isPlaying[clickedVideo.indexOf(data.pvId, 0) - 1];
                  setIsPlaying(prevVideo => [...prevVideo]);
                }
              };

              //삭제 모달
              const openDeleteModal = () => {
                isDeleteModalOpen[clickedVideo.indexOf(data.pvId, 0) - 1] =
                  true;
                setIsDeleteModalOpen(prevDeleteModal => [...prevDeleteModal]);
                isOpen[clickedVideo.indexOf(data.pvId, 0) - 1] = false;
                setIsOpen(prevVideo => [...prevVideo]);
                document.body.style.overflow = 'hidden';
              };

              const closeDeleteModal = () => {
                isDeleteModalOpen[clickedVideo.indexOf(data.pvId, 0) - 1] =
                  false;
                setIsDeleteModalOpen(prevDeleteModal => [...prevDeleteModal]);
                document.body.style.overflow = 'unset';
              };

              return (
                <div key={idx}>
                  <div className={styles.video}>
                    <div className={styles.videoDotBox}>
                      <div className={styles.videoDot} onClick={clickDot}>
                        <Dot />
                      </div>
                    </div>
                    {isOpen[clickedVideo.indexOf(data.pvId, 0) - 1] ? (
                      <div className={styles.deleteBox}>
                        <button
                          onClick={openDeleteModal}
                          className={`${styles.deleteText} ${fonts.body2_SemiBold}`}
                        >
                          삭제하기
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div
                      className={`${styles.duration} ${fonts.caption1_Regular}`}
                    >
                      {playings.length === 0 || durations.length === 0
                        ? '0:00'
                        : playings[data.pvId] === 0
                        ? formatTime(durations[data.pvId])
                        : formatTime(
                            playings[data.pvId] * durations[data.pvId],
                          )}
                    </div>
                    <div onClick={clickPlaying}>
                      <ReactPlayer
                        url={data.url}
                        playing={
                          isPlaying[clickedVideo.indexOf(data.pvId, 0) - 1]
                        }
                        className={styles.video}
                        width="100%"
                        height={210}
                        controls={false}
                        onDuration={duration => {
                          durations[data.pvId] = duration;
                          setDurations(prevDuration => [...prevDuration]);
                        }}
                        onProgress={({ played }) => {
                          playings[data.pvId] = played;
                          setPlayings(prevPlaying => [...prevPlaying]);
                        }}
                      />
                    </div>
                  </div>
                  {isDeleteModalOpen[clickedVideo.indexOf(data.pvId, 0) - 1] ? (
                    <ClassModal
                      question="영상을 삭제할까요?"
                      requestion="영상을 아예 목록에서 지울게요"
                      button="삭제하기"
                      closeModal={closeDeleteModal}
                      classNumber={data.pvId}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
