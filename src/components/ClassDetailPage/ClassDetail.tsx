import typoStyles from '../../styles/typography.module.css';
import styles from '../../styles/components/ClassDetailPage/ClassDetail.module.css';
import PulseIcon from '../../../public/icons/ClassDetailPage/pulse.svg';
import LocationIcon from '../../../public/icons/ClassDetailPage/location-big.svg';
import ClockIcon from '../../../public/icons/ClassDetailPage/clock.svg';
import TrailIcon from '../../../public/icons/ClassDetailPage/trail.svg';
import AvatarIcon from '../../../public/icons/ClassDetailPage/avatar.svg';
import ArrowIcon from '../../../public/icons/ClassDetailPage/arrow-right.svg';
import Hashtag from './Hashtag';
import Kind from './Kind';
import InfoBox from './InfoBox';
import DescriptionBox from './DescriptionBox';

export default function ClassDetail() {
  return (
    <>
      <div className={styles.video}></div>

      <div className={styles.topContainer}>
        <div className={`${styles.title} ${typoStyles.head2_SemiBold}`}>
          임댄서와 함께하는 재즈 입문
        </div>

        <div className={styles.priceBox}>
          <div className={`${styles.price} ${typoStyles.head2_SemiBold}`}>
            22,800원
          </div>
          <div className={`${styles.oneTime} ${typoStyles.body2_Regular}`}>
            (1회당)
          </div>
        </div>

        <div className={styles.hashtagBox}>
          <Hashtag text="#선위주의" />
          <Hashtag text="#허니제이같은" />
          <Hashtag text="#빠른" />
        </div>

        <div className={styles.kindContainer}>
          <Kind icon={<PulseIcon />} text="재즈" />
          <Kind icon={<LocationIcon />} text="강남구" />
          <Kind icon={<ClockIcon />} text="정규반" />
          <Kind icon={<TrailIcon />} text="초중급" />
        </div>

        <div className={styles.dancerContainer}>
          <div className={styles.dancerBox}>
            <AvatarIcon className={styles.dancerImg} />
            <div
              className={`${styles.dancerName} ${typoStyles.body1_SemiBold}`}
            >
              임댄서
            </div>
          </div>

          <ArrowIcon className={styles.arrowIcon} />
        </div>
      </div>

      <div className={styles.divider}></div>

      <InfoBox
        title="수업 일정"
        text="월요일,화요일,수요일  오후 8:00 ~ 오후 10:00"
      />
      <InfoBox title="수업 위치" text="서울특별시 강남구 00로 13길 165-13" />
      <InfoBox title="수업 총원" text="8-10 명" />
      <InfoBox title="수업 노래" text="🎵 Reveal - The Boyz" />
      <div className={styles.additionalInfo}>
        <div
          className={`${styles.additionalInfoTitle} ${typoStyles.body1_SemiBold}`}
        >
          수업 추가 공지
        </div>
        <DescriptionBox
          title="이런 것들을 배울 거예요"
          text="안녕하세요! 이 수업에선 재즈를 배웁니다.
안무는 코레오로 창작이라 쉽게 배울 수 있습니다"
        />
        <DescriptionBox
          title="이런 분들을 위한 레슨이에요"
          text="배워보고 싶은데 혼자 배워보고 싶으신 분들!
시간이 안맞아서 배우질 못했던 직장인 분들!"
        />
        <DescriptionBox
          title="드리는 인사말"
          text="안녕하세요. 임댄서입니다
저에게 신청해주시는 분들 한 분 한 분 너무 소중해요.
제가 차근차근 알려드릴게요.
재밌게 배워보아요!"
        />
      </div>

      <div className={styles.bottomBtnBox}>
        <div className={`${styles.bottomBtn} ${typoStyles.body1_SemiBold}`}>
          예약하러 가기
        </div>
      </div>
    </>
  );
}
