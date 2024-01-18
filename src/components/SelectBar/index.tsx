import styles from '../../styles/components/SelectBar/SelectBar.module.css';
import typoStyles from '../../styles/typography.module.css';
import SelectBarBtn from './SelectBarBtn';

interface SelectBarProps {
  selectBarItem: any;
  handleChangeSelectBarItem: any;
  type: string;
}

export default function SelectBar({
  selectBarItem,
  handleChangeSelectBarItem,
  type,
}: SelectBarProps) {
  return (
    <>
      {type === 'narrow' ? (
        <div className={`${styles.defaultContainer} ${styles.narrowContainer}`}>
          {['수업', '댄서'].map((item: any, idx: any) => (
            // eslint-disable-next-line react/jsx-key
            <div className={styles.narrowBtnBox}>
              <SelectBarBtn
                selectBarItem={selectBarItem}
                handleChangeSelectBarItem={handleChangeSelectBarItem}
                name={item}
                key={idx}
              />
            </div>
          ))}
        </div>
      ) : type === 'wide' ? (
        <div className={`${styles.defaultContainer} ${styles.wideContainer}`}>
          {['수업', '댄서'].map((item: any, idx: any) => (
            // eslint-disable-next-line react/jsx-key
            <div className={styles.wideBtnBox}>
              <SelectBarBtn
                selectBarItem={selectBarItem}
                handleChangeSelectBarItem={handleChangeSelectBarItem}
                name={item}
                key={idx}
              />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
