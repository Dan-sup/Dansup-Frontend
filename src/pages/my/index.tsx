import { useState } from 'react';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/Profile.module.css';
import ClassUpload from '@/components/modal/ClassUpload';
import PortfolioUpload from '@/components/modal/PortfolioUpload';
import Portfolio from '@/components/profile/MyPortfolio';
import Class from '@/components/profile/MyClass';
import myData from '../../jsons/myData.json';
import FloatingBtn from '../../../public/icons/floating-btn.svg';
import PortfolioBtn from '../../../public/icons/portfolio-upload.svg';
import ClassBtn from '../../../public/icons/class-upload.svg';
import BlankImage from '../../../public/icons/blank-image.svg';
import Image from 'next/image';
import MyPageHeader from '@/components/common/Header/MyPageHeader';

export default function MyPage() {
  const [isUploadBoxOpen, setIsUploadBoxOpen] = useState<boolean>(false);
  const [isClassOpen, setIsClassOpen] = useState<boolean>(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);
  const [isPortfolio, setIsPortfolio] = useState<boolean>(true);
  const profiles = myData.profile;
  const image = myData.image;

  /*modal*/
  const openClassModal = () => {
    setIsClassOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeClassModal = () => {
    setIsClassOpen(false);
    setIsUploadBoxOpen(!isUploadBoxOpen);
    document.body.style.overflow = 'unset';
  };

  const openPortfolioModal = () => {
    setIsPortfolioOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePortfolioModal = () => {
    setIsPortfolioOpen(false);
    setIsUploadBoxOpen(!isUploadBoxOpen);
    document.body.style.overflow = 'unset';
  };

  /*button*/
  const onClickPortfolio = () => {
    setIsPortfolio(true);
  };

  const onClickClass = () => {
    setIsPortfolio(false);
  };

  return (
    <>
      <MyPageHeader />
      <div className={styles.container}>
        {profiles.map((data, idx) => (
          <div className={styles.profilePart} key={idx}>
            <div className={styles.backVideo}></div>
            <div className={styles.paddingContainer}>
              {image.map((data, idx) => (
                <div key={idx}>
                  {data.url == '' ? (
                    <BlankImage
                      alt="blank"
                      className={styles.profileImg}
                      width={100}
                      heigth={100}
                    />
                  ) : (
                    <Image
                      className={styles.profileImg}
                      src={data.url}
                      alt={data.url}
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              ))}
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
                {data.hashtags.map((data, idx) => (
                  <div className={styles.hashTagBox} key={idx}>
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
        <button onClick={() => setIsUploadBoxOpen(!isUploadBoxOpen)}>
          <FloatingBtn className={styles.floatingBtn} />
        </button>
        {isUploadBoxOpen ? (
          <div className={styles.modalBox}>
            <button
              onClick={openPortfolioModal}
              className={`${styles.upBtn} ${styles.modalBtn} ${fonts.body1_SemiBold}`}
            >
              <PortfolioBtn />
              <div className={styles.modalText}>포트폴리오 올리기</div>
            </button>
            <PortfolioUpload
              isOpen={isPortfolioOpen}
              closeModal={closePortfolioModal}
            />
            <button
              onClick={openClassModal}
              className={`${styles.downBtn} ${styles.modalBtn} ${fonts.body1_SemiBold}`}
            >
              <ClassBtn />
              <div className={styles.modalText}>내수업 올리기</div>
            </button>
            <ClassUpload isOpen={isClassOpen} closeModal={closeClassModal} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
