import fonts from '../../styles/typography.module.css';
import styles from '../../styles/UploadPage.module.css';
import 'react-datepicker/dist/react-datepicker.css';

interface classTimeProps {
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
}

export default function ClassTime({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: classTimeProps) {
  const startTimeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };
  const endTimeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  return (
    <div className={styles.row_Between}>
      <input
        className={`${styles.input} ${styles.timeInput} ${fonts.body2_Regular}`}
        type="time"
        id="startTime"
        data-placeholder="시작시간"
        onChange={startTimeChangeHandler}
      />
      <div className={styles.timeText}>~</div>
      <input
        className={`${styles.input} ${styles.timeInput} ${fonts.body2_Regular}`}
        type="time"
        id="endTime"
        data-placeholder="종료시간"
        onChange={endTimeChangeHandler}
      />
    </div>
  );
}
