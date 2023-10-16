import HomeIcon from '../../../public/icons/Footer/homeIcon.svg';
import CommunityIcon from '../../../public/icons/Footer/communityIcon.svg';
import ScrapIcon from '../../../public/icons/Footer/scrapIcon.svg';
import MyPageIconBLogin from '../../../public/icons/Footer/MyPageIconBLogin.svg';
import MyPageIconALogin from '../../../public/icons/Footer/MyPageIconALogin.svg';

import styles from '../../styles/components/common/Footer.module.css';
import typoStyles from '../../styles/typography.module.css';

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <HomeIcon className={styles.homeIcon} />
        <div className={`${styles.text} ${typoStyles.caption1_Regular}`}>
          홈
        </div>
      </div>
      <div className={styles.icon}>
        <CommunityIcon className={styles.communityIcon} />
        <div className={`${styles.text} ${typoStyles.caption1_Regular}`}>
          커뮤니티
        </div>
      </div>
      <div className={styles.icon}>
        <ScrapIcon className={styles.scrapIcon} />
        <div className={`${styles.text} ${typoStyles.caption1_Regular}`}>
          스크랩
        </div>
      </div>
      <div className={styles.icon}>
        <MyPageIconBLogin className={styles.MyPageIconBLogin} />
        <div className={`${styles.text} ${typoStyles.caption1_Regular}`}>
          마이페이지
        </div>
      </div>
    </div>
  );
}
