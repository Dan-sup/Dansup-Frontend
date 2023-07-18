import BackIcon from '../../../../public/icons/back.svg';
import DansupLogo from '../../../../public/icons/dansup-logo.svg';
import AvatarIcon from '../../../../public/icons/avatar.svg';
import styles from '../../../styles/components/common/BasicHeader.module.css';

interface BasicHeaderProps {
  type?: string;
}

export default function BasicHeader({ type }: BasicHeaderProps) {
  return (
    <div className={styles.container}>
      {type !== 'home' && (
        <div className={styles.btn}>
          <BackIcon />
        </div>
      )}
      {type !== 'register' && (
        <div className={styles.btn}>
          <DansupLogo />
        </div>
      )}
      {type !== 'register' && (
        <div className={styles.btn}>
          <AvatarIcon />
        </div>
      )}
    </div>
  );
}
