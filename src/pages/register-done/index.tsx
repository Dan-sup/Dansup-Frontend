import styles from '../../styles/UploadPage.module.css';
import fonts from '../../styles/typography.module.css';
import buttonStyles from '../../styles/Button.module.css';
import RegisterDone from '../../../public/icons/register-done.svg';

export default function RegisterDonePage() {
  return (
    <>
      <div className={styles.registerContainer}>
        <RegisterDone />
        <div className={styles.registerTexts}>
          <div className={fonts.head0}>회원가입이 완료되었습니다.</div>
          <div className={`${fonts.body1_Regular} ${styles.registerSmallText}`}>
            홈으로 돌아가서 로그인해주세요!
          </div>
        </div>
        <div className={styles.paddingContainer}>
          <div className={styles.bottom}>
            <div className={buttonStyles.buttonSpace}>
              <button
                className={`${buttonStyles.CTA_Large} ${buttonStyles.before} ${fonts.body1_SemiBold}`}
              >
                홈으로
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
