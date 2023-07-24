import styles from '../../styles/LoginPage.module.css';
import typoStyles from '../../styles/typography.module.css';
import KakaoLogo from '../../../public/icons/kakao-logo.svg';
import Login from '../../../public/icons/login.svg';

export default function LoginPage() {
  const KAKAO_AUTH_URL = `https://takgyun.shop/oauth2/authorization/kakao`;

  return (
    <div className={styles.container}>
      <Login />
      <a href={KAKAO_AUTH_URL} className={styles.a}>
        <button className={`${styles.loginBtn} ${typoStyles.body1_SemiBold}`}>
          <KakaoLogo />
          <span className={styles.btnText}>카카오톡으로 시작하기</span>
        </button>
      </a>
    </div>
  );
}
