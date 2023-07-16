import { useRef } from 'react';
import { IClassDayList } from '@/types/upload';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/UploadPage.module.css';
import BeforeCheck from '../../../public/icons/before-check.svg';
import AfterCheck from '../../../public/icons/after-check.svg';

interface classDayProps {
  list: IClassDayList[];
  setList: React.Dispatch<React.SetStateAction<IClassDayList[]>>;
}

export default function ClassDay({ list, setList }: classDayProps) {
  const dayList = [
    { id: 0, name: '월' },
    { id: 1, name: '화' },
    { id: 2, name: '수' },
    { id: 3, name: '목' },
    { id: 4, name: '금' },
    { id: 5, name: '토' },
    { id: 6, name: '일' },
  ];

  const nextId = useRef<number>(1);

  const handleChangeDay = (e: any) => {
    const newItem = {
      id: nextId.current,
      day: e.target.value,
    };

    if (list.filter(item => item.day == e.target.value).length !== 0) {
      setList(list.filter(item => item.day !== e.target.value));
    } else {
      setList([...list, newItem]);
      nextId.current += 1;
    }
  };

  return (
    <div className={`${styles.dayBoxs} ${fonts.body2_Regular}`}>
      {dayList.map(data => {
        if (list.filter(item => item.day === data.name).length == 1) {
          return (
            <button
              className={`${styles.dayBox} ${styles.clickedAfterBox}`}
              key={data.id}
              onClick={handleChangeDay}
              value={data.name}
            >
              {data.name}
              <AfterCheck className={styles.check} />
            </button>
          );
        } else {
          return (
            <button
              className={`${styles.dayBox} ${styles.clickedBeforeBox}`}
              key={data.id}
              onClick={handleChangeDay}
              value={data.name}
            >
              {data.name}
              <BeforeCheck className={styles.check} />
            </button>
          );
        }
      })}
    </div>
  );
}
