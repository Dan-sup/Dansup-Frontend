import BackIcon from '../../../../public/icons/back.svg';
import DansupLogo from '../../../../public/icons/dansup-logo.svg';
import styles from '../../../styles/components/common/BasicHeader.module.css';
import ProfileImg from '../../../../public/icons/header-blank-profile.svg';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import { useRouter } from 'next/router';
import TopBar from '../TopBar';
import { useMutation } from '@tanstack/react-query';
import { getMyInfo } from '@/apis/my';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BasicHeaderProps {
  type?: string;
}

export default function BasicHeader({ type }: BasicHeaderProps) {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const accessToken = user.accessToken;

  const [profileImg, setProfileImg] = useState<string>('');

  const onclickBack = () => {
    if (router.pathname === '/register') {
      router.push('/');
    } else {
      router.back();
    }
  };

  const getMyInfoMutation = useMutation(getMyInfo, {
    onSuccess: data => {
      //console.log(data);
      //console.log(data.data.profileImageUrl);
      setProfileImg(data.data.profileImageUrl);
      //console.log(profileImg);
    },
    onError: error => {
      //console.log(error);
    },
  });

  useEffect(() => {
    if (accessToken !== '') {
      getMyInfoMutation.mutate(accessToken);
    }
  }, [accessToken, profileImg]);

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
      {type !== 'register' && type !== 'home' && (
        <div>
          {accessToken === '' || profileImg === '' ? (
            <Link href={accessToken === '' ? '/login' : '/my'}>
              <ProfileImg className={styles.blankImg} />
            </Link>
          ) : (
            <Link href={'/my'}>
              <img src={profileImg} className={styles.profileImg} />
            </Link>
          )}
        </div>
      )}
    </TopBar>
  );
}
