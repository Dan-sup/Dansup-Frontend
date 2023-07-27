import BackIcon from '../../../../public/icons/back.svg';
import DansupLogo from '../../../../public/icons/dansup-logo.svg';
import AvatarIcon from '../../../../public/icons/avatar.svg';
import styles from '../../../styles/components/common/BasicHeader.module.css';
import { useMutation } from '@tanstack/react-query';
import { getMyInfo } from '@/apis/my';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';

interface BasicHeaderProps {
  type?: string;
}

export default function BasicHeader({ type }: BasicHeaderProps) {
  const [profileImg, setProfileImg] = useState('');
  const user = useRecoilValue(userState);

  const getMyInfoMutation = useMutation(getMyInfo, {
    onSuccess: data => {
      console.log(data);
      console.log(data.data.profileImageUrl);
      setProfileImg(data.data.profileImageUrl);
      console.log(profileImg);
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    console.log(user.accessToken);
    getMyInfoMutation.mutate(user.accessToken);
  }, [user.accessToken]); //토큰 재발급 구현하면 다시 보자!!!

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
          {!profileImg ? (
            <AvatarIcon />
          ) : (
            <img src={profileImg} className={styles.profileImg} />
          )}
        </div>
      )}
    </div>
  );
}
