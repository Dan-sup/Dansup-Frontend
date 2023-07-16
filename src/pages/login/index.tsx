import styles from '../../styles/LoginPage.module.css';
import typoStyles from '../../styles/typography.module.css';
import KakaoLogo from '../../../public/icons/kakao-logo.svg';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <button className={`${styles.loginBtn} ${typoStyles.body1_SemiBold}`}>
        {/*<KakaoLogo />*/}
        <div>카카오톡으로 시작하기</div>
      </button>
    </div>
  );
}
