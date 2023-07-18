import { useState } from 'react';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/Profile.module.css';
import dancerData from '../../jsons/dancerData.json';
import DropDownBefore from '../../../public/icons/dropdown-before.svg';
import DropDownAfter from '../../../public/icons/dropdown-after.svg';

export default function Portfolio() {
  const dancers = dancerData.dancers;
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isFull, setIsFull] = useState<boolean>(false);

  const onClickDropDown = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.awardPart}>
        <div className={styles.paddingContainer}>
          <div className={styles.awardBox}>
            <div className={`${styles.awardTitle} ${fonts.head2}`}>
              공연 및 활동경력
            </div>
            <div className={`${styles.awardList} ${fonts.body2_Regular}`}>
              {dancers.map(data => {
                return (
                  <>
                    {isClicked ? (
                      <>
                        {data.portfolios.map((data, idx) => (
                          <div className={styles.awards} key={idx}>
                            <div className={styles.date}>{data.date}</div>
                            <div className={styles.award}>{data.detail}</div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {data.portfolios.slice(0, 3).map((data, idx) => (
                          <div className={styles.awards} key={idx}>
                            <div className={styles.date}>{data.date}</div>
                            <div className={styles.award}>{data.detail}</div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <button className={styles.dragDown}>
            <div onClick={onClickDropDown}>
              {isClicked ? <DropDownAfter /> : <DropDownBefore />}
            </div>
          </button>
        </div>
      </div>
      <div className={styles.divider} />
    </div>
  );
}
