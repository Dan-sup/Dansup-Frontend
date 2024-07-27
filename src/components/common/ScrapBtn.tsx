import styles from '../../styles/components/common/ScrapBtn.module.css';
import ScrapIcon from '../../../public/icons/scrap-small.svg';

export default function ScrapBtn() {
  return (
    <div className={styles.scrapIconBox}>
      <ScrapIcon />
    </div>
  );
}
