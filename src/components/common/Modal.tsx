import styles from '../../styles/Modal.module.css';
import fonts from '../../styles/typography.module.css';

interface Modal {
  question: string;
  requestion: string;
  button: string;
  closeModal: () => void;
  actModal: () => void;
}
export default function Modal({
  question,
  requestion,
  button,
  closeModal,
  actModal,
}: Modal) {
  return (
    <div className={`${styles.checkModalContainer} ${styles.paddingContainer}`}>
      <div className={styles.checkModalBody}>
        <div className={styles.checkModalTexts}>
          <div className={`${styles.text_question} ${fonts.head2}`}>
            {question}
          </div>
          <div className={`${styles.text_requestion} ${fonts.body2_Regular}`}>
            {requestion}
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            className={`${styles.button_back} ${fonts.body1_SemiBold}`}
            onClick={closeModal}
          >
            뒤로가기
          </button>
          <button
            className={`${styles.button_submit}  ${fonts.body1_SemiBold}`}
            onClick={actModal}
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}
