import EditPageHeader from '../../components/common/Header/EditPageHeader';
import Plus from '../../../public/icons/plus.svg';
import { IAwardList } from '../../types/upload';
import { useState } from 'react';
import styles from '../../styles/Edit.module.css';
import fonts from '../../styles/typography.module.css';

export default function EditPortflioPage() {
  const [awardList, setAwardList] = useState<IAwardList[]>([]);

  //Award,Date
  const addAward = () => {
    const awardItem = {
      date: '',
      detail: '',
    };

    setAwardList([...awardList, awardItem]);
  };

  const handleChangeDate = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const awardListsCopy: IAwardList[] = JSON.parse(JSON.stringify(awardList));
    awardListsCopy[index].date = e.target.value;
    setAwardList(awardListsCopy);
  };

  const handleChangeAward = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const awardListsCopy: IAwardList[] = JSON.parse(JSON.stringify(awardList));
    awardListsCopy[index].detail = e.target.value;
    setAwardList(awardListsCopy);
  };
  return (
    <>
      <EditPageHeader />
      <div className={styles.portContainer}>
        <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
          공연 및 활동경력
        </div>
        {awardList.map((item, idx) => (
          <div
            className={`${styles.row_Between} ${styles.awardBetween}`}
            key={idx}
          >
            <input
              className={`${styles.input} ${styles.short} ${fonts.body2_Regular}`}
              placeholder="2023/01/01"
              type="text"
              value={item.date}
              onChange={e => handleChangeDate(e, idx)}
            />
            <input
              className={`${styles.input} ${styles.mid} ${fonts.body2_Regular}`}
              placeholder="ex.OO댄스대회 최우수상"
              type="text"
              value={item.detail}
              onChange={e => handleChangeAward(e, idx)}
            />
          </div>
        ))}
        <div
          className={`${styles.blank} ${styles.addAward}`}
          onClick={addAward}
        >
          <div className={styles.awardButton}>
            <Plus />
            경력 추가하기
          </div>
        </div>
      </div>
    </>
  );
}
