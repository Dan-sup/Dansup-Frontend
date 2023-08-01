import typoStyles from '../styles/typography.module.css';
import AvatarIcon from '../../public/icons/ClassCard/avatar.svg';
import DateIcon from '../../public/icons/date.svg';
import LocationIcon from '../../public/icons/location.svg';
import styles from '../styles/components/ClassCard.module.css';
import { useRouter } from 'next/router';
import { changeDateForm, changeDayForm } from '@/utils/date';
import ReactPlayer from 'react-player';

interface ClassCardProps {
  classInfo: any;
}

export default function ClassCard({ classInfo }: ClassCardProps) {
  const router = useRouter();

  return (
    <>
      <div
        className={styles.titleBox}
        onClick={() => router.push(`class/${classInfo.danceClassId}`)}
      >
        <div className={styles.profileImgBox}>
          {!classInfo.userProfileImage ? (
            <AvatarIcon className={styles.profileImg} />
          ) : (
            <img
              src={classInfo.userProfileImage}
              className={styles.profileImg}
            />
          )}
        </div>

        <div className={styles.textBox}>
          <div className={`${styles.classTitle} ${typoStyles.body1_Regular}`}>
            {classInfo.title}
          </div>
          <div
            className={`${styles.dancerName} ${typoStyles.caption1_Regular}`}
          >
            {classInfo.userNickname}
          </div>
        </div>
      </div>

      <ReactPlayer
        url={classInfo?.videoUrl}
        muted
        playing={false}
        className={styles.video}
        width="100%"
        height={210}
        onClick={() => router.push(`class/${classInfo.danceClassId}`)}
      />

      <div className={`${styles.InfoBox} ${typoStyles.body2_Regular}`}>
        <div className={styles.genreBox}>
          {classInfo.genres.map((item: any, idx: any) => (
            <div
              className={`${styles.genre} ${typoStyles.caption1_Regular}`}
              key={idx}
            >
              {item.genre}
            </div>
          ))}
        </div>

        <div className={styles.rightBox}>
          <div className={styles.detailBox}>
            <LocationIcon className={styles.icon} />
            {classInfo.location.split(' ')[1]}
          </div>
          <div className={styles.detailBox}>
            <DateIcon className={styles.icon} />
            {classInfo.method}{' '}
            {classInfo.method == '원데이' ? (
              classInfo.date == null ? (
                <></>
              ) : (
                changeDateForm(classInfo.date)
              )
            ) : classInfo.mon == false &&
              classInfo.tue == false &&
              classInfo.wed == false &&
              classInfo.thu == false &&
              classInfo.fri == false &&
              classInfo.sat == false &&
              classInfo.sun == false ? (
              <></>
            ) : (
              changeDayForm(
                classInfo.mon,
                classInfo.tue,
                classInfo.wed,
                classInfo.thu,
                classInfo.fri,
                classInfo.sat,
                classInfo.sun,
              )
            )}
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>
    </>
  );
}
