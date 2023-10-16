import HomeIcon from '../../../public/icons/Footer/homeIcon.svg';
import CommunityIcon from '../../../public/icons/Footer/communityIcon.svg';
import ScrapIcon from '../../../public/icons/Footer/scrapIcon.svg';
import MyPageIconBLogin from '../../../public/icons/Footer/MyPageIconBLogin.svg';
import MyPageIconALogin from '../../../public/icons/Footer/MyPageIconALogin.svg';
import styles from '../../styles/components/common/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.contatiner}>
      <HomeIcon className={styles.homeIcon} />
      <CommunityIcon className={styles.communityIcon} />
      <ScrapIcon className={styles.scrapIcon} />
      <MyPageIconBLogin className={styles.MyPageIconBLogin} />
    </div>
  );
}
