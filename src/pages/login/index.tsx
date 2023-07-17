import styles from '../../styles/LoginPage.module.css';
import typoStyles from '../../styles/typography.module.css';
import KakaoLogo from '../../../public/icons/kakao-logo.svg';

export default function LoginPage() {
  const REST_API_KEY = '91cfc73a730663e93196247d884f837e';
  const REDIRECT_URI = 'https://takgyun.shop/login/oauth2/code/kakao';

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className={styles.container}>
      <a href={KAKAO_AUTH_URL} className={styles.a}>
        <button className={`${styles.loginBtn} ${typoStyles.body1_SemiBold}`}>
          <KakaoLogo />
          <span className={styles.btnText}>카카오톡으로 시작하기</span>
        </button>
      </a>
    </div>
  );
}
