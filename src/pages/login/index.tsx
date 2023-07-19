import styles from '../../styles/LoginPage.module.css';
import typoStyles from '../../styles/typography.module.css';
import KakaoLogo from '../../../public/icons/kakao-logo.svg';
import Image from 'next/image';
import backgroundImg from '../../../public/imgs/background.png'; //svg로 수정 필요!

export default function LoginPage() {
  const KAKAO_AUTH_URL = `https://takgyun.shop/oauth2/authorization/kakao`;

  return (
    <div className={styles.container}>
      <Image
        src={backgroundImg}
        alt="img"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      <a href={KAKAO_AUTH_URL} className={styles.a}>
        <button className={`${styles.loginBtn} ${typoStyles.body1_SemiBold}`}>
          <KakaoLogo />
          <span className={styles.btnText}>카카오톡으로 시작하기</span>
        </button>
      </a>
    </div>
  );
}
