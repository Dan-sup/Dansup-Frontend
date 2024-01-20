import EditPageHeader from '../../components/common/Header/EditPageHeader';
import Plus from '../../../public/icons/plus.svg';
import Delete from '../../../public/icons/delete-award.svg';
import { IAwardList } from '../../types/upload';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getPortfolio } from '@/apis/my';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import styles from '../../styles/Edit.module.css';
import fonts from '../../styles/typography.module.css';

export default function EditPortflioPage() {
  const [awardList, setAwardList] = useState<IAwardList[]>([]);

  //api
  const user = useRecoilValue(userState);
  const accessToken = user.accessToken;

  //portfolio
  const getPortfolioMutation = useMutation(getPortfolio, {
    onSuccess: data => {
      console.log(data.data);
      setAwardList(data.data);
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    getPortfolioMutation.mutate(accessToken);
  }, [accessToken]);

  //Award,Date
  const addAward = () => {
    const awardItem = {
      date: '',
      detail: '',
    };

    setAwardList([...awardList, awardItem]);
  };

  const deleteAward = (item: IAwardList) => {
    awardList.splice(awardList.indexOf(item), 1);
    setAwardList([...awardList]);
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
              className={
                item.date === ''
                  ? `${styles.input} ${styles.short} ${fonts.body2_Regular}`
                  : `${styles.input} ${styles.short} ${styles.white} ${fonts.body2_Regular} `
              }
              placeholder="2023/01/01"
              type="text"
              value={item.date}
              onChange={e => handleChangeDate(e, idx)}
            />
            <input
              className={
                item.detail === ''
                  ? `${styles.input} ${styles.mid} ${fonts.body2_Regular}`
                  : `${styles.input} ${styles.mid} ${styles.white} ${fonts.body2_Regular}`
              }
              placeholder="ex.OO댄스대회 최우수상"
              type="text"
              value={item.detail}
              onChange={e => handleChangeAward(e, idx)}
            />
            {item.date !== '' || item.detail !== '' ? (
              <div
                onClick={() => deleteAward(item)}
                className={styles.awardDelete}
              >
                <Delete />
              </div>
            ) : (
              <></>
            )}
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
