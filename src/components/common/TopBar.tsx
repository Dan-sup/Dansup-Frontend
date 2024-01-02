import { ReactNode } from 'react';
import styles from '../../styles/components/common/TopBar.module.css';
import typoStyles from '../../styles/typography.module.css';

interface TopBarProps {
  children?: ReactNode;
}

export default function TopBar({ children }: TopBarProps) {
  return <div className={styles.container}>{children}</div>;
}
