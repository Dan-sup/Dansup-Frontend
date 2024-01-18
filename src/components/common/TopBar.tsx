import { ReactNode } from 'react';
import styles from '../../styles/components/common/TopBar.module.css';

interface TopBarProps {
  children?: ReactNode;
  color?: string;
}

export default function TopBar({ children, color }: TopBarProps) {
  return (
    <>
      {color === 'black' ? (
        <div className={`${styles.defaultContainer} ${styles.blackContainer}`}>
          {children}
        </div>
      ) : color === 'gray' ? (
        <div className={`${styles.defaultContainer} ${styles.grayContainer}`}>
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
