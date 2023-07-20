import BackIcon from '../../../../public/icons/back.svg';
import styles from '../../../styles/components/common/SearchHeader.module.css';

export default function SearchHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.backBtn}>
        <BackIcon />
      </div>

      <div className={styles.inputBox}></div>
    </div>
  );
}
