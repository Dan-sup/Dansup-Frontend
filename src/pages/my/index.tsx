import { useEffect, useState } from 'react';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/Profile.module.css';
import ClassUpload from '@/components/modal/ClassUpload';
import PortfolioUpload from '@/components/modal/PortfolioUpload';
import Portfolio from '@/components/profile/MyPortfolio';
import Class from '@/components/profile/MyClass';
import FloatingBtn from '../../../public/icons/floating-btn.svg';
import FloatingBtnX from '../../../public/icons/floating-btnX.svg';
import PortfolioBtn from '../../../public/icons/portfolio-upload.svg';
import ClassBtn from '../../../public/icons/class-upload.svg';
import BlankImage from '../../../public/icons/blank-image.svg';
import PencilIcon from '../../../public/icons/pencil-icon.svg';
import MyPageHeader from '@/components/common/Header/MyPageHeader';
import { useRecoilValue } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { userState } from '@/store/user';
import {
  getMyInfo,
  getMyClass,
  getPortfolio,
  getPortfolioVideo,
} from '@/apis/my';
import ReactPlayer from 'react-player';
import Footer from '@/components/common/Footer';
import Link from 'next/link';

export default function MyPage() {
  const [isUploadBoxOpen, setIsUploadBoxOpen] = useState<boolean>(false);
  const [isClassOpen, setIsClassOpen] = useState<boolean>(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);
  const [isPortfolio, setIsPortfolio] = useState<boolean>(true);
  const [isHeader, setIsHeader] = useState<boolean>(true);
  const [profiles, setProfiles] = useState<any>([]);
  const [genres, setGenres] = useState<any>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [video, setVideo] = useState<any[]>([]);

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

  useEffect(() => {
    if (isClassOpen || isPortfolioOpen) {
      setIsHeader(false);
    } else {
      setIsHeader(true);
    }
  });

  //api
  const user = useRecoilValue(userState);
  const accessToken = user.accessToken;

  //profile
  const getMyInfoMutation = useMutation(getMyInfo, {
    onSuccess: data => {
      console.log(data.data);
      setProfiles(data.data);
      setGenres(data.data.genres);
    },
    onError: error => {
      console.log(error);
    },
  });

  //class
  const getMyClassMutation = useMutation(getMyClass, {
    onSuccess: data => {
      console.log(data.data);
      setClasses(data.data);
    },
    onError: error => {
      console.log(error);
    },
  });

  //portfolio
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
    getMyInfoMutation.mutate(accessToken);
    getMyClassMutation.mutate(accessToken);
    getPortfolioMutation.mutate(accessToken);
    getPortfolioVideoMutation.mutate(accessToken);
  }, [accessToken]);

  return (
    <>
      <div style={{ display: isHeader ? 'block' : 'none' }}>
        <MyPageHeader />
      </div>
      <div className={styles.myContainer}>
        <div className={styles.profilePart}>
          {profiles.profileVideoUrl == null ? (
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
            {profiles.profileImageUrl == null ? (
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

            <Link href="/edit-profile" className={styles.editBtn}>
              <PencilIcon />
            </Link>
            <div className={`${styles.genreList} ${fonts.body2_Regular}`}>
              {genres.map((data: any, idx: any) => (
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
              {profiles.nickname}
            </div>
            <div className={`${styles.username} ${fonts.caption1_Regular}`}>
              {profiles.username}
            </div>
            <div className={`${styles.intro} ${fonts.body2_Regular}`}>
              {profiles.intro}
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
        {isPortfolio ? (
          <Portfolio portfolios={portfolios} video={video} />
        ) : (
          <Class classes={classes} />
        )}
        <button onClick={() => setIsUploadBoxOpen(!isUploadBoxOpen)}>
          {isUploadBoxOpen ? (
            <FloatingBtnX className={styles.floatingBtn} />
          ) : (
            <FloatingBtn className={styles.floatingBtn} />
          )}
        </button>
        <Footer />
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
              <div className={styles.modalText}>내 수업 올리기</div>
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
