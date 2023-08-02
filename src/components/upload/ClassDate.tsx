import React from 'react';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/UploadPage.module.css';
import 'react-datepicker/dist/react-datepicker.css';

interface classDateProps {
  selectDate: string;
  setSelectDate: React.Dispatch<React.SetStateAction<string>>;
}
export default function ClassDate({
  selectDate,
  setSelectDate,
}: classDateProps) {
  const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectDate(e.target.value);
  };

  return (
    <input
      className={`${styles.input} ${styles.datePicker} ${fonts.body2_Regular}`}
      type="date"
      id="date"
      placeholder="수업 날짜를 선택해주세요"
      onChange={dateChangeHandler}
    />
  );
}
