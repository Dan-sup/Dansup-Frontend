import styles from '../../styles/components/common/Date.module.css';
import typoStyles from '../../styles/typography.module.css';
import DateIcon from '../../../public/icons/date.svg';
import { changeDateForm, changeDayForm } from '@/utils/date';

interface DateProps {
  classInfo: any;
}

export default function Date({ classInfo }: DateProps) {
  return (
    <div className={`${styles.container} ${typoStyles.caption1_Regular}`}>
      <DateIcon className={styles.icon} />
      {classInfo.method}{' '}
      {classInfo.method == '원데이' ? (
        classInfo.date == null ? (
          <></>
        ) : (
          changeDateForm(classInfo.date)
        )
      ) : classInfo.mon == false &&
        classInfo.tue == false &&
        classInfo.wed == false &&
        classInfo.thu == false &&
        classInfo.fri == false &&
        classInfo.sat == false &&
        classInfo.sun == false ? (
        <></>
      ) : (
        changeDayForm(
          classInfo.mon,
          classInfo.tue,
          classInfo.wed,
          classInfo.thu,
          classInfo.fri,
          classInfo.sat,
          classInfo.sun,
        )
      )}
    </div>
  );
}
