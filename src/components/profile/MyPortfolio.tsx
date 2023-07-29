import { useState, useEffect } from 'react';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/Profile.module.css';
import DropDownBefore from '../../../public/icons/dropdown-before.svg';
import DropDownAfter from '../../../public/icons/dropdown-after.svg';
import ReactPlayer from 'react-player';
import { useMutation } from '@tanstack/react-query';
import { getPortfolio, getPortfolioVideo } from '@/apis/my';

export default function Portfolio(accessToken: any) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [video, setVideo] = useState<any[]>([]);

  const onClickDropDown = () => {
    setIsClicked(!isClicked);
  };

  //api
  const getPortfolioMutation = useMutation(getPortfolio, {
    onSuccess: data => {
      console.log(data.data);
      setPortfolios(data.data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const getPortfolioVideoMutation = useMutation(getPortfolioVideo, {
    onSuccess: data => {
      console.log(data.data);
      setVideo(data.data);
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    getPortfolioMutation.mutate(accessToken);
    getPortfolioVideoMutation.mutate(accessToken);
  }, [accessToken]);

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
          {video.map((data, idx) => (
            <div key={idx}>
              {data.url.length == 0 ? (
                <div className={styles.blank}>
                  <div
                    className={`${styles.blankText} ${fonts.body2_SemiBold}`}
                  >
                    나를 소개할 수 있는 포트폴리오 영상을 추가해주세요
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
