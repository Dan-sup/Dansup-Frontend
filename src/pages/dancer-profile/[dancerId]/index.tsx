import { useState } from 'react';
import fonts from '../../../styles/typography.module.css';
import styles from '../../../styles/Profile.module.css';
import ClassUpload from '@/components/modal/ClassUpload';
import PortfolioUpload from '@/components/modal/PortfolioUpload';
import Portfolio from '@/components/profile/Porfolio';
import Class from '@/components/profile/Class';
import dancerData from '../../../jsons/dancerData.json';

export default function DancerProfile() {
  const [isClassOpen, setIsClassOpen] = useState<boolean>(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);
  const [isPortfolio, setIsPortfolio] = useState<boolean>(true);
  const dancers = dancerData.dancers;

  /*modal*/
  const openClassModal = () => {
    setIsClassOpen(true);
  };

  const closeClassModal = () => {
    setIsClassOpen(false);
  };

  const openPortfolioModal = () => {
    setIsPortfolioOpen(true);
  };

  const closePortfolioModal = () => {
    setIsPortfolioOpen(false);
  };

  /*button*/
  const onClickPortfolio = () => {
    setIsPortfolio(true);
  };

  const onClickClass = () => {
    setIsPortfolio(false);
  };

  return (
    <div className={styles.container}>
      {dancers.map(data => (
        <div className={styles.profilePart} key={data.username}>
          <div className={styles.backVideo}></div>
          <div className={styles.profileContainer}>
            <div className={styles.profileImg}></div>
            <div className={`${styles.genreList} ${fonts.body2_Regular}`}>
              {data.genres.map(data => (
                <div className={styles.genreBox} key={data.genre}>
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
              {data.hashtags.map(data => (
                <div className={styles.hashTagBox} key={data.hashtag}>
                  <div className={styles.hashTag}>{data.hashtag}</div>
                </div>
              ))}
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
            내 수업
          </button>
        </div>
      </div>
      {isPortfolio ? <Portfolio /> : <Class />}
      <button onClick={openClassModal} className={styles.modal}>
        내수업 올리기
      </button>
      <ClassUpload isOpen={isClassOpen} closeModal={closeClassModal} />
      <button onClick={openPortfolioModal} className={styles.modal}>
        포트폴리오 올리기
      </button>
      <PortfolioUpload
        isOpen={isPortfolioOpen}
        closeModal={closePortfolioModal}
      />
    </div>
  );
}
