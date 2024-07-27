import typoStyles from '../../styles/typography.module.css';
import styles from '../../styles/components/ClassDetailPage/ClassDetail.module.css';
import PulseIcon from '../../../public/icons/ClassDetailPage/pulse.svg';
import LocationIcon from '../../../public/icons/ClassDetailPage/location-big.svg';
import ClockIcon from '../../../public/icons/ClassDetailPage/clock.svg';
import TrailIcon from '../../../public/icons/ClassDetailPage/trail.svg';
import AvatarIcon from '../../../public/icons/ClassDetailPage/avatar.svg';
import ArrowIcon from '../../../public/icons/ClassDetailPage/arrow-right.svg';
import Hashtag from '../common/Hashtag';
import Kind from './Kind';
import InfoBox from './InfoBox';
import DescriptionBox from './DescriptionBox';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { getClass } from '@/apis/class';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Modal from '../common/Modal';
import {
  changeDateForm,
  changeDateNoDotForm,
  changeDayForm,
  changeDayNoDotForm,
  changeTimeForm,
} from '@/utils/date';

export default function ClassDetail() {
  const router = useRouter();

  const [classInfo, setClassInfo] = useState<any>(); //이거 굳이 왜했지??
  const [onSite, setOnSite] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;
    const { classId } = router.query;
    //console.log(classId);
    const classIdNumber = Number(classId);
    //console.log(classIdNumber);

    getClassMutation.mutate(classIdNumber);
  }, [router.isReady]);

  /* useQuery 말고, useMutation 사용!!
  const { data: classInfo } = useQuery(
    ['classInfo'],
    classIdNumber => getClass(classIdNumber),
    {
      onSuccess: data => {
        console.log(data);
      },
      onError: error => {
        console.log(error);
      },
    },
  );
  */

  const getClassMutation = useMutation(getClass, {
    onSuccess: data => {
      console.log(data);
      setClassInfo(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (classInfo?.reserveLink === null) {
      setOnSite(false);
    } else {
      setOnSite(true);
    }
  });

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const actModal = () => {};

  return (
    <>
      <ReactPlayer
        url={classInfo?.videoUrl}
        playing={false}
        className={styles.video}
        width="100%"
        height={210}
        controls
      />

      <div className={styles.topContainer}>
        <div className={`${styles.title} ${typoStyles.head2_SemiBold}`}>
          {classInfo?.title}
        </div>

        <div className={styles.priceBox}>
          <div className={`${styles.price} ${typoStyles.head2_SemiBold}`}>
            {classInfo?.tuition}원
          </div>
          <div className={`${styles.oneTime} ${typoStyles.body2_Regular}`}>
            (1회당)
          </div>
        </div>

        <div className={styles.hashtagBox}>
          {[classInfo?.hashtag1, classInfo?.hashtag2, classInfo?.hashtag3].map(
            (hashtag: any, idx: any) => (
              <Hashtag text={hashtag} key={idx} />
            ),
          )}
        </div>

        <div className={styles.kindContainer}>
          <Kind icon={<PulseIcon />} text={classInfo?.genres[0]?.genre} />
          <Kind
            icon={<LocationIcon />}
            text={classInfo?.location.split(' ')[1]}
          />
          <Kind icon={<ClockIcon />} text={classInfo?.method} />
          <Kind icon={<TrailIcon />} text={classInfo?.difficulty} />
        </div>

        <Link
          href={{
            pathname: `/dancer-profile/[dancerId]`,
            query: { dancerId: classInfo?.profileId },
          }}
        >
          <div className={styles.dancerContainer}>
            <div className={styles.dancerBox}>
              {classInfo?.userProfileImage ? (
                <img
                  src={classInfo?.userProfileImage}
                  className={styles.dancerImg}
                />
              ) : (
                <AvatarIcon className={styles.dancerImg} />
              )}
              <div
                className={`${styles.dancerName} ${typoStyles.body1_SemiBold}`}
              >
                {classInfo?.userNickname}
              </div>
            </div>

            <ArrowIcon className={styles.arrowIcon} />
          </div>
        </Link>
      </div>

      <div className={styles.divider}></div>

      <InfoBox
        title="수업 일정"
        text={`${
          classInfo?.method == '원데이'
            ? classInfo?.date == null
              ? '날짜 정보 없음'
              : changeDateNoDotForm(classInfo?.date)
            : classInfo?.mon == false &&
              classInfo?.tue == false &&
              classInfo?.wed == false &&
              classInfo?.thu == false &&
              classInfo?.fri == false &&
              classInfo?.sat == false &&
              classInfo?.sun == false
            ? '요일 정보 없음'
            : changeDayNoDotForm(
                classInfo?.mon,
                classInfo?.tue,
                classInfo?.wed,
                classInfo?.thu,
                classInfo?.fri,
                classInfo?.sat,
                classInfo?.sun,
              )
        }    ${
          classInfo?.startTime == null || classInfo?.endTime == null
            ? '시간 정보 없음'
            : changeTimeForm(classInfo?.startTime, classInfo?.endTime)
        }`}
      />
      <InfoBox title="수업 위치" text={classInfo?.location} />
      <InfoBox title="수업 총원" text={`${classInfo?.maxPeople} 명`} />
      <InfoBox
        title="수업 노래"
        text={classInfo?.song == null ? '정보 없음' : `🎵 ${classInfo?.song}`}
      />
      <div className={styles.additionalInfo}>
        <div
          className={`${styles.additionalInfoTitle} ${typoStyles.body1_SemiBold}`}
        >
          수업 추가 공지
        </div>
        <DescriptionBox
          title="이런 것들을 배울 거예요"
          text={classInfo?.detail1}
        />
        <DescriptionBox
          title="이런 분들을 위한 레슨이에요"
          text={classInfo?.detail2}
        />
        <DescriptionBox title="드리는 인사말" text={classInfo?.detail3} />
      </div>

      <div className={styles.bottomBtnBox}>
        {!onSite ? (
          <div
            className={`${styles.bottomBtn} ${styles.after} ${typoStyles.body1_SemiBold}`}
          >
            현장결제 수업이에요
          </div>
        ) : (
          <div
            className={`${styles.bottomBtn} ${styles.before} ${typoStyles.body1_SemiBold}`}
            onClick={openModal}
          >
            예약하러 가기
          </div>
        )}
      </div>
      {isModalOpen ? (
        <Modal
          question="수업을 예약하시겠어요?"
          requestion="예약하기를 누르면 예약 링크로 이동해요"
          button="예약하기"
          closeModal={closeModal}
          actModal={actModal}
        />
      ) : (
        <></>
      )}
    </>
  );
}
