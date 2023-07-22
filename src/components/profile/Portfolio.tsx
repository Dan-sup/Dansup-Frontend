import { useState } from 'react';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/Profile.module.css';
import dancerData from '../../jsons/dancerData.json';
import DropDownBefore from '../../../public/icons/dropdown-before.svg';
import DropDownAfter from '../../../public/icons/dropdown-after.svg';
import ReactPlayer from 'react-player';

export default function Portfolio() {
  const portfolios = dancerData.portfolio;
  const portfolioVideo = dancerData.portfolioVideo;
  const [isClicked, setIsClicked] = useState<boolean>(false);

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
              {isClicked ? (
                <>
                  {portfolios.map((data, idx) => (
                    <div className={styles.awards} key={idx}>
                      <div className={styles.date}>{data.date}</div>
                      <div className={styles.award}>{data.detail}</div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {portfolios.slice(0, 3).map((data, idx) => (
                    <div className={styles.awards} key={idx}>
                      {data.date?.length == 0 ? (
                        <div className={styles.awardBlank}>
                          <div
                            className={`${styles.blankText} ${fonts.body2_SemiBold}`}
                          >
                            공연 및 활동경력이 없어요
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className={styles.date}>{data.date}</div>
                          <div className={styles.award}>{data.detail}</div>
                        </>
                      )}
                    </div>
                  ))}
                </>
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
        <div className={styles.paddingContainer}>
          {portfolioVideo.map((data, idx) => (
            <div key={idx}>
              {data.url.length == 0 ? (
                <div className={styles.blank}>
                  <div
                    className={`${styles.blankText} ${fonts.body2_SemiBold}`}
                  >
                    포트폴리오 영상이 없어요
                  </div>
                </div>
              ) : (
                <div className="video">
                  <ReactPlayer
                    url={data.url}
                    muted
                    playing={false}
                    className={styles.video}
                    width="100%"
                    height={210}
                    controls
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
