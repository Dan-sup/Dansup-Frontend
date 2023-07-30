import { useState } from 'react';
import fonts from '../../../styles/typography.module.css';
import styles from '../../../styles/Profile.module.css';
import Portfolio from '@/components/profile/Portfolio';
import Class from '@/components/profile/Class';
import BlankImage from '../../../../public/icons/blank-image.svg';
import ReactPlayer from 'react-player';
import { useQuery } from '@tanstack/react-query';
import { getDancerProfile } from '@/apis/dancer';

export default function DancerProfile() {
  const [isPortfolio, setIsPortfolio] = useState<boolean>(true);
  const [profiles, setProfiles] = useState<any>([]);
  const [genres, setGenres] = useState<any>([]);

  /*button*/
  const onClickPortfolio = () => {
    setIsPortfolio(true);
  };

  const onClickClass = () => {
    setIsPortfolio(false);
  };

  //api
  const { data: getProfile } = useQuery(['dancer-profile'], getDancerProfile, {
    onSuccess: data => {
      console.log(data.data);
      setProfiles(data.data);
      setGenres(data.data.genres);
    },
  });

  return (
    <div className={styles.container}>
      {profiles.map((data: any, idx: any) => (
        <div className={styles.profilePart} key={idx}>
          {profiles.profileVideoUrl == '' ? (
            <div className={styles.backVideo}></div>
          ) : (
            <div className={styles.backVideoPlayer}>
              <ReactPlayer url={profiles.profileVideoUrl} playing muted loop />
            </div>
          )}
          <div className={styles.paddingContainer}>
            {profiles.profileImageUrl == '' ? (
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
            <div className={`${styles.genreList} ${fonts.body2_Regular}`}>
              {genres.map((data: any, idx: any) => (
                <div className={styles.genreBox} key={idx}>
                  <div className={styles.genre}>{data.genre}</div>
                </div>
              ))}
            </div>
            <div className={`${styles.nickname} ${fonts.head1}`}>
              {data.nickname}
            </div>
            <div className={`${styles.username} ${fonts.caption1_Regular}`}>
              {data.username}
            </div>
            <div className={`${styles.intro} ${fonts.body2_Regular}`}>
              {data.intro}
            </div>
            <div className={`${styles.hashTagList} ${fonts.body2_Regular}`}>
              {profiles.hashtag1 !== null ? (
                <div className={styles.hashTagBox}>
                  <div className={styles.hashTag}>{profiles.hashtag1}</div>
                </div>
              ) : (
                <></>
              )}
              {profiles.hashtag2 !== null ? (
                <div className={styles.hashTagBox}>
                  <div className={styles.hashTag}>{profiles.hashtag2}</div>
                </div>
              ) : (
                <></>
              )}
              {profiles.hashtag3 !== null ? (
                <div className={styles.hashTagBox}>
                  <div className={styles.hashTag}>{profiles.hashtag3}</div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ))}
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
      {isPortfolio ? <Portfolio /> : <Class />}
    </div>
  );
}
