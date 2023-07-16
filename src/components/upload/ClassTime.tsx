import DatePicker from 'react-datepicker';
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
    <div className={styles.inputs}>
      <DatePicker
        className={styles.inputTime}
        selected={startTime}
        onChange={(time: Date) => setStartTIme(time)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={10}
        timeCaption="Time"
        dateFormat="aa h:mm"
        placeholderText="시작시간"
      />
      <div className={styles.timeText}>~</div>
      <DatePicker
        className={styles.inputTime}
        selected={endTime}
        onChange={(time: Date) => setEndTIme(time)}
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
