import styles from '../../styles/components/common/Location.module.css';
import typoStyles from '../../styles/typography.module.css';
import LocationIcon from '../../../public/icons/location.svg';

interface LocationProps {
  classInfo: any;
}

export default function Location({ classInfo }: LocationProps) {
  return (
    <div className={`${styles.container} ${typoStyles.caption1_Regular}`}>
      <LocationIcon className={styles.icon} />
      {classInfo.location.split(' ')[1]}
    </div>
  );
}
