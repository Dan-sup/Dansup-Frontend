import { useState } from 'react';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/UploadPage.module.css';
import { IList } from '@/types/upload';

interface selectProps {
  list: IList[];
  votedItem: string;
  setVotedItem: React.Dispatch<React.SetStateAction<string>>;
  clickIndex: number;
  setClickIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Select({
  list,
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
      {list.map((item, idx) => (
        <div key={idx} onClick={() => onClick(item)}>
          {clickIndex === item.id ? (
            <div
              className={`${styles.selectBox} ${styles.clickedAfterBox} ${fonts.body2_Regular}`}
            >
              {item.name}
            </div>
          ) : (
            <div
              className={`${styles.selectBox} ${styles.clickedBeforeBox} ${fonts.body2_Regular}`}
            >
              {item.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
