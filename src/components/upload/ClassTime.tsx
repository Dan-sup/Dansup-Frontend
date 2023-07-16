import DatePicker from 'react-datepicker';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/UploadPage.module.css';
import 'react-datepicker/dist/react-datepicker.css';

interface classTimeProps {
  startTime: Date | null;
  setStartTIme: React.Dispatch<React.SetStateAction<Date | null>>;
  endTime: Date | null;
  setEndTIme: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function ClassTime({
  startTime,
  setStartTIme,
  endTime,
  setEndTIme,
}: classTimeProps) {
  return (
    <div className={styles.row_Between}>
      <DatePicker
        className={`${styles.timeInput} ${fonts.body2_Regular}`}
        selected={startTime}
        onChange={(time: Date) => setStartTIme(time)}
        closeOnScroll={true}
        showPopperArrow={false}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={10}
        timeCaption="Time"
        dateFormat="aa h:mm"
        placeholderText="시작시간"
      />
      <div className={styles.timeText}>~</div>
      <DatePicker
        className={`${styles.timeInput} ${fonts.body2_Regular}`}
        selected={endTime}
        onChange={(time: Date) => setEndTIme(time)}
        closeOnScroll={true}
        showPopperArrow={false}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={10}
        timeCaption="Time"
        dateFormat="aa h:mm"
        placeholderText="종료시간"
      />
    </div>
  );
}
