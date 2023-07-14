import { useState } from 'react';
import styles from '../../styles/UploadPage.module.css';
import { IList } from '@/types/upload';

interface selectProps {
  list: IList[];
  votedItem: string;
  setVotedItem: React.Dispatch<React.SetStateAction<string>>;
}

export default function Select({ list, votedItem, setVotedItem }: selectProps) {
  const [clickIndex, setClickIndex] = useState<number>(5);

  const onClick = (item: IList) => {
    setClickIndex(item.id);
    setVotedItem(item.name);
  };

  return (
    <div className={styles.clickedBox}>
      {list.map((item, idx) => (
        <div key={idx} onClick={() => onClick(item)}>
          {clickIndex === item.id ? (
            <div className={`${styles.selectBox} ${styles.clickedAfterBox}`}>
              {item.name}
            </div>
          ) : (
            <div className={`${styles.selectBox} ${styles.clickedBeforeBox}`}>
              {item.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
