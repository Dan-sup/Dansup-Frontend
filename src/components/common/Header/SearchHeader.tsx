import BackIcon from '../../../../public/icons/back.svg';
import SearchIcon from '../../../../public/icons/search.svg';
import styles from '../../../styles/components/common/SearchHeader.module.css';
import typoStyles from '../../../styles/typography.module.css';

export default function SearchHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.backBtn}>
        <BackIcon />
      </div>

      <div className={styles.inputBox}>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
        <input className={`${styles.input} ${typoStyles.body2_Regular}`} />
      </div>
    </div>
  );
}
