import typoStyles from '../../styles/typography.module.css';
import AvatarIcon from '../../../public/icons/ClassCard/avatar.svg';
import styles from '../../styles/components/ClassCard/ClassCard.module.css';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import ScrapBtn from '../common/ScrapBtn';
import Location from '../common/Location';
import Date from '../common/Date';
import GenreChip from '../common/GenreChip';

interface ClassCardProps {
  classInfo: any;
}

export default function ClassCard({ classInfo }: ClassCardProps) {
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        {/*
        <div className={styles.scrapBtnBox}>
          <ScrapBtn />
        </div>
        */}

        <ReactPlayer
          url={classInfo?.videoUrl}
          muted
          playing={false}
          //className={styles.reactPlayer}
          width="100%"
          height="100%"
          onClick={() => router.push(`class/${classInfo.danceClassId}`)}
        />

        <div className={styles.genreBox}>
          {classInfo.genres.map((item: any, idx: any) => (
            <>
              <GenreChip text={item.genre} size="small" />
              <div className={styles.genreChipDivider} />
            </>
          ))}
        </div>
      </div>

      <div className={styles.InfoBox}>
        <>
          {!classInfo.userProfileImage ? (
            <AvatarIcon className={styles.profileImg} />
          ) : (
            <img
              src={classInfo.userProfileImage}
              className={styles.profileImg}
            />
          )}
        </>

        <div className={styles.rigthInfoBox}>
          <div
            className={`${styles.classTitle} ${typoStyles.body1_Regular}`}
            onClick={() => router.push(`class/${classInfo.danceClassId}`)}
          >
            {classInfo.title}
          </div>

          <div className={styles.bottomLineBox}>
            <div
              className={`${styles.dancerName} ${typoStyles.caption1_Regular}`}
            >
              {classInfo.userNickname}
            </div>

            <div className={styles.bottomInfoDivider} />

            <Location classInfo={classInfo} />

            <div className={styles.bottomInfoDivider} />

            <Date classInfo={classInfo} />
          </div>
        </div>
      </div>
    </>
  );
}
