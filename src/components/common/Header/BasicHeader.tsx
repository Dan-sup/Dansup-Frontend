import BackIcon from '../../../../public/icons/back.svg';
import DansupLogo from '../../../../public/icons/dansup-logo.svg';
import styles from '../../../styles/components/common/BasicHeader.module.css';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import { useRouter } from 'next/router';
import TopBar from '../TopBar';

interface BasicHeaderProps {
  type?: string;
}

export default function BasicHeader({ type }: BasicHeaderProps) {
  const router = useRouter();

  const onclickBack = () => {
    if (router.pathname === '/register') {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <TopBar color="black">
      {type !== 'home' && (
        <div className={styles.btn} onClick={onclickBack}>
          <BackIcon />
        </div>
      )}
      {type !== 'register' && (
        <div className={styles.btn} onClick={() => router.push('/')}>
          <DansupLogo />
        </div>
      )}
    </TopBar>
  );
}
