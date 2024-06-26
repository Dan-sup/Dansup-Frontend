import typoStyles from '../../styles/typography.module.css';
import styles from '../../styles/components/DancerCard/DancerCard.module.css';
import AvatarIcon from '../../../public/icons/avatar-dancercard.svg';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface DancerCardProps {
  dancerInfo: any;
}

export default function DancerCard({ dancerInfo }: DancerCardProps) {
  const router = useRouter();

  return (
    <Link
      href={{
        pathname: `/dancer-profile/[dancerId]`,
        query: { dancerId: dancerInfo?.profileId },
      }}
    >
      <div
        className={styles.container}
        //onClick={() => router.push(`/dancer-profile/${dancerInfo.profileId}`)}
      >
        {!dancerInfo.genres && (
          <div className={styles.genreBox}>
            {dancerInfo.genres.map((item: any, idx: any) => (
              <div
                className={`${styles.genre} ${typoStyles.caption1_Regular}`}
                key={idx}
              >
                {item.genre}
              </div>
            ))}
          </div>
        )}

        <div className={styles.divider}></div>

        <div className={styles.bottomBox}>
          {!dancerInfo.profileImage ? (
            <AvatarIcon className={styles.profileImg} />
          ) : (
            <img src={dancerInfo.profileImage} className={styles.profileImg} />
          )}

          <div className={styles.infoBox}>
            <div className={`${styles.nickname} ${typoStyles.body1_SemiBold}`}>
              {dancerInfo.nickname}
            </div>
            <div className={`${styles.intro} ${typoStyles.caption1_Regular}`}>
              {dancerInfo.intro}
            </div>
            <div className={styles.hashtagBox}>
              {[
                dancerInfo.hashtag1,
                dancerInfo.hashtag2,
                dancerInfo.hashtag3,
              ].map(
                (hashtag: any, idx: any) =>
                  hashtag && (
                    <div
                      className={`${styles.hashtag} ${typoStyles.caption1_Regular}`}
                      key={idx}
                    >
                      {hashtag}
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
