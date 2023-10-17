import HomeIcon from '../../../public/icons/Footer/homeIcon.svg';
import CommunityIcon from '../../../public/icons/Footer/communityIcon.svg';
import ScrapIcon from '../../../public/icons/Footer/scrapIcon.svg';
import MyPageIconBLogin from '../../../public/icons/Footer/MyPageIconBLogin.svg';
import MyPageIconALogin from '../../../public/icons/Footer/MyPageIconALogin.svg';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import styles from '../../styles/components/common/Footer.module.css';
import typoStyles from '../../styles/typography.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const user = useRecoilValue(userState);
  const [clickIndex, setClickIndex] = useState<number>(0);
  const [isHomeClick, setIsHomeClick] = useState<boolean>(false);
  const [isCommunityClick, setIsCommunityClick] = useState<boolean>(false);
  const [isScrapClick, setIsScrapClick] = useState<boolean>(false);
  const [isMyPageClick, setIsMyPageClick] = useState<boolean>(false);

  const onclickHome = () => {
    setIsHomeClick(!isHomeClick);
    setClickIndex(0);
  };
  const onclickCommunity = () => {
    setIsCommunityClick(!isCommunityClick);
    setClickIndex(1);
  };
  const onclickScrap = () => {
    setIsScrapClick(!isScrapClick);
    setClickIndex(2);
  };
  const onclickMyPage = () => {
    setIsMyPageClick(!isMyPageClick);
    setClickIndex(3);
  };

  const barList = [
    {
      id: 0,
      name: '홈',
      iconB: HomeIcon,
      iconA: HomeIcon,
      click: onclickHome,
      linkB: '/',
      linkA: '/',
    },
    {
      id: 1,
      name: '커뮤니티',
      iconB: CommunityIcon,
      iconA: CommunityIcon,
      click: onclickCommunity,
      linkB: '/',
      linkA: '/',
    },
    {
      id: 2,
      name: '스크랩',
      iconB: ScrapIcon,
      iconA: ScrapIcon,
      click: onclickScrap,
      linkB: '/',
      linkA: '/',
    },
    {
      id: 3,
      name: '마이페이지',
      iconB: MyPageIconBLogin,
      iconA: MyPageIconALogin,
      click: onclickMyPage,
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
            onClick={data.click}
          >
            {user.accessToken == '' ? (
              <>
                {clickIndex == data.id ? (
                  <data.iconB className={styles.clickedIcon} />
                ) : (
                  <data.iconB className={styles.icon} />
                )}
              </>
            ) : (
              <>
                {clickIndex == data.id ? (
                  <data.iconA className={styles.clickedIcon} />
                ) : (
                  <data.iconA className={styles.icon} />
                )}
              </>
            )}
            {clickIndex == data.id ? (
              <div
                className={`${styles.clickedIcon} ${typoStyles.caption1_Regular}`}
              >
                {data.name}
              </div>
            ) : (
              <div className={`${styles.icon} ${typoStyles.caption1_Regular}`}>
                {data.name}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
