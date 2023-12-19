import styles from '../../styles/components/ClassDetailPage/Kind.module.css';
import typoStyles from '../../styles/typography.module.css';

export interface KindProps {
  icon: any;
  text: string;
}

export default function Kind({ icon, text }: KindProps) {
  return (
    <div className={styles.kindBox}>
      <div className={styles.kind}>
        {icon}
        <div className={`${styles.kindContent} ${typoStyles.body2_SemiBold}`}>
          {text}
        </div>
      </div>
    </div>
  );
}
