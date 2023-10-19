import HomeIcon from '../../../public/icons/Footer/homeIcon.svg';
import CommunityIcon from '../../../public/icons/Footer/communityIcon.svg';
import ScrapIcon from '../../../public/icons/Footer/scrapIcon.svg';
import MyPageIconBLogin from '../../../public/icons/Footer/myPageIconBLogin.svg';
import MyPageIconALogin from '../../../public/icons/Footer/myPageIconALogin.svg';
import { useMutation } from '@tanstack/react-query';
import { getMyInfo } from '@/apis/my';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import styles from '../../styles/components/common/Footer.module.css';
import typoStyles from '../../styles/typography.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const user = useRecoilValue(userState);
  const pathname = usePathname();
  const [profileImg, setProfileImg] = useState<string>('');

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
    console.log(user.accessToken);
    getMyInfoMutation.mutate(user.accessToken);
  }, [user.accessToken]); //토큰 재발급 구현하면 다시 보자!!!

  const barList = [
    {
      id: 0,
      name: '홈',
      iconB: HomeIcon,
      iconA: HomeIcon,
      linkB: '/',
      linkA: '/',
    },
    {
      id: 1,
      name: '커뮤니티',
      iconB: CommunityIcon,
      iconA: CommunityIcon,
      linkB: '/',
      linkA: '/',
    },
    {
      id: 2,
      name: '스크랩',
      iconB: ScrapIcon,
      iconA: ScrapIcon,
      linkB: '/',
      linkA: '/',
    },
    {
      id: 3,
      name: '마이페이지',
      iconB: MyPageIconBLogin,
      iconA: MyPageIconALogin,
      linkB: '/login',
      linkA: '/my',
    },
  ];

  return (
    <div className={styles.container}>
      {barList.map(data => {
        return (
          <Link
            href={`${user.accessToken == '' ? data.linkB : data.linkA}`}
            key={data.id}
            className={styles.button}
          >
            {user.accessToken == '' ? (
              <data.iconB
                className={`${
                  pathname == data.linkA ? styles.clickedIcon : styles.icon
                }`}
              />
            ) : (
              <>
                {profileImg == '' ? (
                  <data.iconA
                    className={`${
                      pathname == data.linkA ? styles.clickedIcon : styles.icon
                    }`}
                  />
                ) : (
                  <img src={profileImg} className={styles.profile} />
                )}
              </>
            )}

            <div
              className={`${
                pathname == data.linkA
                  ? `${styles.clickedIcon} ${typoStyles.caption1_Regular}`
                  : `${styles.icon} ${typoStyles.caption1_Regular}`
              }`}
            >
              {data.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
