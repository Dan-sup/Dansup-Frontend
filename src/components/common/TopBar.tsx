import { ReactNode } from 'react';
import styles from '../../styles/components/common/TopBar.module.css';
import typoStyles from '../../styles/typography.module.css';

interface TopBarProps {
  children?: ReactNode;
  color?: string;
}

export default function TopBar({ children, color }: TopBarProps) {
  return (
    <div className={color != 'gray' ? styles.container : styles.grayContainer}>
      {children}
    </div>
  );
}
