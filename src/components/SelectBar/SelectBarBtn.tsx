import styles from '../../styles/components/SelectBar/SelectBarBtn.module.css';
import typoStyles from '../../styles/typography.module.css';

interface SelectBarBtnProps {
  selectBarItem: any;
  handleChangeSelectBarItem: any;
  name: string;
}

export default function SelectBarBtn({
  selectBarItem,
  handleChangeSelectBarItem,
  name,
}: SelectBarBtnProps) {
  return (
    <div
      className={`${selectBarItem == name ? styles.clickedBtn : styles.btn} ${
        typoStyles.head2_SemiBold
      }`}
      onClick={handleChangeSelectBarItem}
    >
      {name}
    </div>
  );
}
