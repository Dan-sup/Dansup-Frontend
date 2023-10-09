import { useState } from 'react';
import fonts from '../../../styles/typography.module.css';
import styles from '../../../styles/Profile.module.css';
import Portfolio from '@/components/profile/Portfolio';
import Class from '@/components/profile/Class';
import BlankImage from '../../../../public/icons/blank-image.svg';
import ReactPlayer from 'react-player';
import BasicHeader from '@/components/common/Header/BasicHeader';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import {
  getDancerProfile,
  getDancerPortfolio,
  getDancerPortfolioVideo,
  getDancerClass,
} from '@/apis/dancer';

export default function DancerProfile() {
  const [profiles, setProfiles] = useState<any>([]);
  const [genres, setGenres] = useState<any>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [portfolioVideo, setPortfolioVideo] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [isPortfolio, setIsPortfolio] = useState<boolean>(true);
  const router = useRouter();
  const { dancerId } = router.query;

  /*button*/
  const onClickPortfolio = () => {
    setIsPortfolio(true);
  };

  const onClickClass = () => {
    setIsPortfolio(false);
  };

  //api
  //profile
  const { data: dancerProfiles } = useQuery(
    ['dancer-profile', dancerId],
    () => getDancerProfile(dancerId),
    {
      onSuccess: data => {
        console.log(data.data);
        setProfiles(data.data);
        setGenres(data.data?.genres);
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  //portfolio
  const { data: dancerPortfolio } = useQuery(
    ['dancer-portfolio', dancerId],
    () => getDancerPortfolio(dancerId),
    {
      onSuccess: data => {
        console.log(data.data);
        setPortfolios(data.data);
      },
    },
  );

  const { data: dancerPortfolioVideo } = useQuery(
    ['dancer-portfolioVideo', dancerId],
    () => getDancerPortfolioVideo(dancerId),
    {
      onSuccess: data => {
        console.log(data.data);
        setPortfolioVideo(data.data);
      },
    },
  );

  //class
  const { data: dancerClass } = useQuery(
    ['dancer-class', dancerId],
    () => getDancerClass(dancerId),
    {
      onSuccess: data => {
        console.log(data.data);
        setClasses(data.data);
      },
    },
  );

  return (
    <>
      <div className={styles.header}>
        <BasicHeader type="dancer-profile" />
      </div>
      <div className={styles.container}>
        <div className={styles.profilePart}>
          <div className={styles.files}>
            {profiles?.profileVideoUrl == null ? (
              <div className={styles.backVideo}></div>
            ) : (
              <div className={styles.backVideoPlayer}>
                <ReactPlayer
                  url={profiles.profileVideoUrl}
                  playing
                  loop
                  muted
                  width="100%"
                  height={386}
                />
              </div>
            )}
            <div className={styles.paddingContainer}>
              {profiles?.profileImageUrl == null ? (
                <BlankImage
                  alt="blank"
                  className={styles.profileImg}
                  width={100}
                  heigth={100}
                />
              ) : (
                <img
                  className={styles.profileImg}
                  src={profiles.profileImageUrl}
                  alt={profiles.profileImageUrl}
                  width={100}
                  height={100}
                />
              )}
            </div>
          </div>
          <div className={styles.paddingContainer}>
            <div className={`${styles.genreList} ${fonts.body2_Regular}`}>
              {genres?.map((data: any, idx: any) => (
                <>
                  {data.genre !== null ? (
                    <div className={styles.genreBox} key={idx}>
                      <div className={styles.genre}>{data.genre}</div>
                    </div>
                  ) : (
                    <div className={styles.genreBlankBox} key={idx}></div>
                  )}
                </>
              ))}
            </div>
            <div className={`${styles.nickname} ${fonts.head1}`}>
              {profiles?.nickname}
            </div>
            <div className={`${styles.username} ${fonts.caption1_Regular}`}>
              {profiles?.username}
            </div>
            <div className={`${styles.intro} ${fonts.body2_Regular}`}>
              {profiles?.intro}
            </div>
            <div className={`${styles.hashTagList} ${fonts.body2_Regular}`}>
              {profiles?.hashtag1 !== null ? (
                <div className={styles.hashTagBox}>
                  <div className={styles.hashTag}>{profiles?.hashtag1}</div>
                </div>
              ) : (
                <></>
              )}
              {profiles?.hashtag2 !== null ? (
                <div className={styles.hashTagBox}>
                  <div className={styles.hashTag}>{profiles?.hashtag2}</div>
                </div>
              ) : (
                <></>
              )}
              {profiles?.hashtag3 !== null ? (
                <div className={styles.hashTagBox}>
                  <div className={styles.hashTag}>{profiles?.hashtag3}</div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className={styles.buttonBox}>
          <div className={styles.buttons}>
            <button
              className={
                isPortfolio
                  ? `${styles.button} ${styles.clicked} ${fonts.head2}`
                  : `${styles.button} ${fonts.head2}`
              }
              onClick={onClickPortfolio}
            >
              포트폴리오
            </button>
            <button
              className={
                isPortfolio
                  ? `${styles.button} ${fonts.head2}`
                  : `${styles.button} ${styles.clicked} ${fonts.head2}`
              }
              onClick={onClickClass}
            >
              운영중인 수업
            </button>
          </div>
        </div>
        {isPortfolio ? (
          <Portfolio portfolios={portfolios} video={portfolioVideo} />
        ) : (
          <Class classes={classes} />
        )}
      </div>
    </>
  );
}
