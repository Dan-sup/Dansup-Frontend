import styles from '../../styles/components/ClassDetailPage/InfoBox.module.css';
import typoStyles from '../../styles/typography.module.css';

export interface InfoBoxProps {
  title: string;
  text: string;
}

export default function InfoBox({ title, text }: InfoBoxProps) {
  return (
    <div className={styles.infoBox}>
      <div className={`${styles.title} ${typoStyles.body1_SemiBold}`}>
        {title}
      </div>
      <div className={`${styles.text} ${typoStyles.body2_Regular}`}>{text}</div>
    </div>
  );
}
