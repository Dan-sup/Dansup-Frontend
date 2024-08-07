import { useState } from 'react';
import styles from '../../styles/components/FilterBar.module.css';
import typoStyles from '../../styles/typography.module.css';
import FilterIcon from '../../../public/icons/filter.svg';
import Filter from '../modal/Filter';

interface FilterBarProps {
  isFilterOn?: boolean;
}

//나중에 쓰기
export default function FilterBar({ isFilterOn }: FilterBarProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  /*modal*/
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {!isFilterOn ? (
        <div className={styles.bar}>
          <div className={`${styles.barText} ${typoStyles.body1_SemiBold}`}>
            최근 업로드 된 수업
          </div>
          <button className={styles.filterIcon} onClick={openModal}>
            <FilterIcon />
          </button>
          <Filter isOpen={isModalOpen} closeModal={closeModal} />
        </div>
      ) : (
        <>
          <div className={styles.bar}>
            <div className={`${styles.onBarText} ${typoStyles.body2_Regular}`}>
              총
              <span
                className={`${styles.onNumberText} ${typoStyles.body2_Regular}`}
              >
                8
              </span>
              건
            </div>
            <button className={styles.filterIcon} onClick={openModal}>
              <FilterIcon />
            </button>
            <Filter isOpen={isModalOpen} closeModal={closeModal} />
          </div>

          <div className={styles.appliedFiltersBox}></div>
        </>
      )}
    </>
  );
}
