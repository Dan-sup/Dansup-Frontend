import { useEffect } from 'react';
import Ect from '../../../public/icons/ETC.svg';
import fonts from '../../styles/typography.module.css';
import styles from '../../styles/UploadPage.module.css';

interface toastMsgProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  msg: string;
  isEdit: boolean;
}

export default function ToastMsg({
  isOpen,
  setIsOpen,
  msg,
  isEdit,
}: toastMsgProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <div className={styles.toastMessageContainer}>
      {isOpen ? (
        <div
          className={
            isEdit
              ? styles.toastMessageBox
              : `${styles.toastMessageBox} ${styles.btnToastMessageBox}`
          }
        >
          <div className={styles.toastMessage}>
            <Ect />
            <div className={`${styles.message} ${fonts.body2_Regular}`}>
              {msg}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
