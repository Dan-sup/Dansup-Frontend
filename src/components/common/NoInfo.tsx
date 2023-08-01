import styles from '../../styles/components/common/NoInfo.module.css';
import typoStyles from '../../styles/typography.module.css';

export default function NoInfo() {
  return (
    <div className={`${styles.noInfo} ${typoStyles.body2_SemiBold}`}>
      검색 결과가 없어요
    </div>
  );
}
