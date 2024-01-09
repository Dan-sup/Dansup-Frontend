import { useState } from 'react';
import styles from '../../styles/components/common/SelectBar.module.css';
import typoStyles from '../../styles/typography.module.css';

interface SelectBarProps {
  isClassBtnClicked: any;
  isDancerBtnClicked: any;
  handleChangeSelectBar: any;
}

export default function SelectBar({
  isClassBtnClicked,
  isDancerBtnClicked,
  handleChangeSelectBar,
}: SelectBarProps) {
  return (
    <div className={styles.selectBar}>
      <div
        className={`${isClassBtnClicked ? styles.clickedBtn : styles.btn} ${
          typoStyles.head2_SemiBold
        }`}
        onClick={handleChangeSelectBar}
      >
        수업
      </div>
      <div
        className={`${isDancerBtnClicked ? styles.clickedBtn : styles.btn} ${
          typoStyles.head2_SemiBold
        }`}
        onClick={handleChangeSelectBar}
      >
        댄서
      </div>
    </div>
  );
}
