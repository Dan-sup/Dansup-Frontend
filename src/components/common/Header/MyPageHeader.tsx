import BackIcon from '../../../../public/icons/back.svg';
import DotIcon from '../../../../public/icons/dot.svg';
import styles from '../../../styles/components/common/BasicHeader.module.css';

export default function MyPageHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.btn}>
        <BackIcon />
      </div>
      <div className={styles.btn}>
        <DotIcon />
      </div>
    </div>
  );
}
