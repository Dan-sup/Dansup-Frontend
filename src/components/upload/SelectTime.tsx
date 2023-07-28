import { useState } from 'react';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/UploadPage.module.css';
import { IList } from '@/types/upload';

const timeSelect = [
  { id: 0, name: '전체', isShort: true },
  { id: 1, name: '오전', isShort: true },
  { id: 2, name: '오후', isShort: true },
  { id: 3, name: '저녁', isShort: true },
  { id: 4, name: '새벽', isShort: true },
  { id: 5, name: '오전-오후', isShort: false },
  { id: 6, name: '오후-저녁', isShort: false },
  { id: 7, name: '저녁-새벽', isShort: false },
  { id: 8, name: '새벽-오전', isShort: false },
];

interface selectProps {
  votedItem: string;
  setVotedItem: React.Dispatch<React.SetStateAction<string>>;
  clickIndex: number;
  setClickIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SelectTime({
  votedItem,
  setVotedItem,
  clickIndex,
  setClickIndex,
}: selectProps) {
  const onClick = (item: IList) => {
    setClickIndex(item.id);
    setVotedItem(item.name);
  };

  return (
    <div className={styles.clickedBox}>
      {timeSelect.map((item, idx) => (
        <div key={idx} onClick={() => onClick(item)}>
          {item.isShort ? (
            <>
              {clickIndex === item.id ? (
                <div
                  className={`${styles.genreBox} ${styles.clickedAfterBox} ${styles.shortBox} ${fonts.body2_Regular}`}
                >
                  {item.name}
                </div>
              ) : (
                <div
                  className={`${styles.genreBox} ${styles.clickedBeforeBox} ${styles.shortBox} ${fonts.body2_Regular}`}
                >
                  {item.name}
                </div>
              )}
            </>
          ) : (
            <>
              {clickIndex === item.id ? (
                <div
                  className={`${styles.genreBox} ${styles.clickedAfterBox} ${styles.longBox} ${fonts.body2_Regular}`}
                >
                  {item.name}
                </div>
              ) : (
                <div
                  className={`${styles.genreBox} ${styles.clickedBeforeBox} ${styles.longBox} ${fonts.body2_Regular}`}
                >
                  {item.name}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
