import BackIcon from '../../../../public/icons/back.svg';
import styles from '../../../styles/components/common/MyPageHeader.module.css';
import fonts from '../../../styles/typography.module.css';
import { useRouter } from 'next/router';

export default function MyPageHeader() {
  const router = useRouter();

  const onclickBack = () => {
    router.back();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerBtn}>
          <div className={styles.btn} onClick={onclickBack}>
            <BackIcon />
          </div>
          <div className={`${styles.textBtn} ${fonts.body1_Regular}`}>완료</div>
        </div>
      </div>
    </>
  );
}
