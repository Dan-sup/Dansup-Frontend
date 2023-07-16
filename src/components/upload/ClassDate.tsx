import React from 'react';
import DatePicker from 'react-datepicker';
import styles from '../../styles/UploadPage.module.css';
import 'react-datepicker/dist/react-datepicker.css';

interface classDateProps {
  selectDate: Date | null;
  setSelectDate: React.Dispatch<React.SetStateAction<Date | null>>;
}
export default function ClassDate({
  selectDate,
  setSelectDate,
}: classDateProps) {
  return (
    <DatePicker
      className={`${styles.input} ${styles.datePicker}`}
      dateFormat="yyyy-MM-dd"
      shouldCloseOnSelect
      selected={selectDate}
      onChange={(date: Date) => setSelectDate(date)}
      placeholderText="수업 날짜를 선택해주세요"
    />
  );
}
