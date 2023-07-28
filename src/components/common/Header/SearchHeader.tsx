import { useRouter } from 'next/router';
import BackIcon from '../../../../public/icons/back.svg';
import SearchIcon from '../../../../public/icons/search.svg';
import styles from '../../../styles/components/common/SearchHeader.module.css';
import typoStyles from '../../../styles/typography.module.css';

export default function SearchHeader() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.backBtn} onClick={() => router.push('/')}>
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
