import typoStyles from '../../styles/typography.module.css';
import AvatarIcon from '../../../public/icons/ClassCard/avatar.svg';
import styles from '../../styles/components/ClassCard/ClassCard.module.css';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import ScrapBtn from '../common/ScrapBtn';
import Location from '../common/Location';
import Date from '../common/Date';

interface ClassCardProps {
  classInfo: any;
}

export default function ClassCard({ classInfo }: ClassCardProps) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <div className={styles.dancerBox}>
          {!classInfo.userProfileImage ? (
            <AvatarIcon className={styles.profileImg} />
          ) : (
            <img
              src={classInfo.userProfileImage}
              className={styles.profileImg}
            />
          )}

          <div
            className={`${styles.dancerName} ${typoStyles.caption1_SemiBold}`}
          >
            {classInfo.userNickname}
          </div>
        </div>

        <ScrapBtn />
      </div>

      <ReactPlayer
        url={classInfo?.videoUrl}
        muted
        playing={false}
        className={styles.video}
        width="100%"
        height={271}
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

        <div
          className={`${styles.classTitle} ${typoStyles.head1}`}
          onClick={() => router.push(`class/${classInfo.danceClassId}`)}
        >
          {classInfo.title}
        </div>

        <div className={styles.bottomLineBox}>
          <Location classInfo={classInfo} />
          <Date classInfo={classInfo} />
        </div>
      </div>
    </div>
  );
}
