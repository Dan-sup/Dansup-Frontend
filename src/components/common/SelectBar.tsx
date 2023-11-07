import { useState } from 'react';
import styles from '../../styles/components/common/SelectBar.module.css';
import typoStyles from '../../styles/typography.module.css';

interface SelectBarProps {
  isClassBtnClicked: any;
  isDancerBtnClicked: any;
  handleBtnClick: any;
}

export default function SelectBar({
  isClassBtnClicked,
  isDancerBtnClicked,
  handleBtnClick,
}: SelectBarProps) {
  return (
    <div className={styles.selectBar}>
      <div
        className={`${isClassBtnClicked ? styles.clickedBtn : styles.btn} ${
          typoStyles.head2_SemiBold
        }`}
        onClick={handleBtnClick}
      >
        수업
      </div>
      <div
        className={`${isDancerBtnClicked ? styles.clickedBtn : styles.btn} ${
          typoStyles.head2_SemiBold
        }`}
        onClick={handleBtnClick}
      >
        댄서
      </div>
    </div>
  );
}
