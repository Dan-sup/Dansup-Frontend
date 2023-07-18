import BackIcon from '../../../../public/icons/back.svg';
import DansupLogo from '../../../../public/icons/dansup-logo.svg';
import AvatarIcon from '../../../../public/icons/avatar.svg';
import styles from '../../../styles/components/common/BasicHeader.module.css';

export default function RegisterPageHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.btn}>
        <BackIcon />
      </div>
      {/*
      <div className={styles.btn}>
        <DansupLogo />
      </div>
       */}
      {/*
      <div className={styles.btn}>
        <AvatarIcon />
      </div>
    */}
    </div>
  );
}
