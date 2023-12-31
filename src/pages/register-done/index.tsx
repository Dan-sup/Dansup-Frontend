import styles from '../../styles/UploadPage.module.css';
import fonts from '../../styles/typography.module.css';
import buttonStyles from '../../styles/Button.module.css';
import RegisterDone from '../../../public/icons/register-done.svg';
import { useRouter } from 'next/router';

export default function RegisterDonePage() {
  const router = useRouter();

  return (
    <>
      <div className={styles.registerContainer}>
        <RegisterDone />
        <div className={styles.registerTexts}>
          <div className={fonts.head0}>회원가입이 완료되었습니다.</div>
        </div>
        <div className={styles.paddingContainer}>
          <div className={styles.bottom}>
            <div className={buttonStyles.buttonSpace}>
              <button
                className={`${buttonStyles.CTA_Large} ${buttonStyles.before} ${fonts.body1_SemiBold}`}
                onClick={() => router.push('/login')}
              >
                로그인하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
