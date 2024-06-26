import typoStyles from '../../styles/typography.module.css';
import AvatarIcon from '../../../public/icons/ClassCard/avatar.svg';
import styles from '../../styles/components/ClassCard/ClassCard.module.css';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import ScrapBtn from '../common/ScrapBtn';
import Location from '../common/Location';
import Date from '../common/Date';
import GenreChip from '../common/GenreChip';
import Link from 'next/link';

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

        <Link
          href={{
            pathname: `/class/[classId]`,
            query: { classId: classInfo?.danceClassId },
          }}
        >
          <ReactPlayer
            url={classInfo?.videoUrl}
            muted
            playing={false}
            //className={styles.reactPlayer}
            width="100%"
            height="100%"
            //onClick={() => router.push(`/class/${classInfo.danceClassId}`)}
          />
        </Link>

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
        <Link
          href={{
            pathname: `/dancer-profile/[dancerId]`,
            query: { dancerId: classInfo?.profileId },
          }}
        >
          {!classInfo.userProfileImage ? (
            <AvatarIcon className={styles.profileImg} />
          ) : (
            <img
              src={classInfo.userProfileImage}
              className={styles.profileImg}
            />
          )}
        </Link>

        <div className={styles.rigthInfoBox}>
          <Link
            href={{
              pathname: `/class/[classId]`,
              query: { classId: classInfo?.danceClassId },
            }}
          >
            <div
              className={`${styles.classTitle} ${typoStyles.body1_Regular}`}
              //onClick={() => router.push(`/class/${classInfo.danceClassId}`)}
            >
              {classInfo.title}
            </div>
          </Link>

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
