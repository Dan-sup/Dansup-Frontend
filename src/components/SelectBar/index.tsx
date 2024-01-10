import styles from '../../styles/components/common/SelectBar.module.css';
import typoStyles from '../../styles/typography.module.css';

interface SelectBarProps {
  selectBarItem: any;
  handleChangeSelectBarItem: any;
}

export default function SelectBar({
  selectBarItem,
  handleChangeSelectBarItem,
}: SelectBarProps) {
  return (
    <div className={styles.selectBar}>
      <div
        className={`${
          selectBarItem == '수업' ? styles.clickedBtn : styles.btn
        } ${typoStyles.head2_SemiBold}`}
        onClick={handleChangeSelectBarItem}
      >
        수업
      </div>
      <div
        className={`${
          selectBarItem == '댄서' ? styles.clickedBtn : styles.btn
        } ${typoStyles.head2_SemiBold}`}
        onClick={handleChangeSelectBarItem}
      >
        댄서
      </div>
    </div>
  );
}
