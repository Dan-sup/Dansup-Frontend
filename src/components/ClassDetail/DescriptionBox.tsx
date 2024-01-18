import styles from '../../styles/components/ClassDetailPage/DescriptionBox.module.css';
import typoStyles from '../../styles/typography.module.css';

export interface DescriptionBoxProps {
  title: string;
  text: string;
}

export default function DescriptionBox({ title, text }: DescriptionBoxProps) {
  return (
    <div className={styles.descriptionBox}>
      <div className={`${styles.title} ${typoStyles.body2_Regular}`}>
        {title}
      </div>
      <div className={`${styles.text} ${typoStyles.body2_Regular}`}>{text}</div>
    </div>
  );
}
