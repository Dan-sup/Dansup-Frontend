import { useState, useEffect } from 'react';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/Profile.module.css';
import DropDownBefore from '../../../public/icons/dropdown-before.svg';
import DropDownAfter from '../../../public/icons/dropdown-after.svg';
import ReactPlayer from 'react-player';

interface portfolioProps {
  portfolios: any;
  video: any;
}

export default function Portfolio({ portfolios, video }: portfolioProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [clickedVideo, setClickedVideo] = useState<string[]>(['']);
  const [isPlaying, setIsPlaying] = useState<boolean[]>([]);

  const onClickDropDown = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.Part}>
        <div className={styles.paddingContainer}>
          <div className={styles.awardBox}>
            <div className={`${styles.awardTitle} ${fonts.head2}`}>
              공연 및 활동경력
            </div>
            <div className={`${styles.awardList} ${fonts.body2_Regular}`}>
              {portfolios?.length !== 0 ? (
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
                      {portfolios?.slice(0, 3).map((data: any, idx: any) => (
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
            {portfolios?.length < 4 ? (
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
        {video?.length == 0 ? (
          <div className={styles.paddingContainer}>
            <div className={styles.blank}>
              <div className={`${styles.blankText} ${fonts.body2_SemiBold}`}>
                포트폴리오 영상이 없어요
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.gap}>
            {video?.map((data: any, idx: any) => {
              const clickPlaying = () => {
                if (!clickedVideo.includes(data.pvId))
                  setClickedVideo(prevClickedClass => [
                    ...prevClickedClass,
                    data.pvId,
                  ]);
                isPlaying[clickedVideo.indexOf(data.pvId, 0) - 1] =
                  !isPlaying[clickedVideo.indexOf(data.pvId, 0) - 1];
                setIsPlaying(prevVideo => [...prevVideo]);
              };

              return (
                <div key={idx}>
                  <div className={styles.video}>
                    <div onClick={clickPlaying}>
                      <ReactPlayer
                        url={data.url}
                        muted
                        playing={
                          isPlaying[clickedVideo.indexOf(data.pvId, 0) - 1]
                        }
                        className={styles.video}
                        width="100%"
                        height={210}
                        controls={false}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
