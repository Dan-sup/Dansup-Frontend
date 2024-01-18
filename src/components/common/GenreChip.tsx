import styles from '../../styles/components/common/GenreChip.module.css';
import typoStyles from '../../styles/typography.module.css';

interface GenreChipProps {
  text: string;
  size: string;
}

export default function GenreChip({ text, size }: GenreChipProps) {
  return (
    <>
      {size === 'small' ? (
        <div
          className={`${styles.defaultContainer} ${styles.smallContainer} ${typoStyles.caption1_Regular}`}
        >
          {text}
        </div>
      ) : size === 'big' ? (
        <div
          className={`${styles.defaultContainer} ${styles.bigContainer} ${typoStyles.body2_Regular}`}
        >
          {text}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
