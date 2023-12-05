import styles from '../../styles/Modal.module.css';
import fonts from '../../styles/typography.module.css';
import { useMutation } from '@tanstack/react-query';
import { closeMyClass, deleteMyClass } from '@/apis/my';
import { userState } from '@/store/user';
import { useRecoilValue } from 'recoil';

interface Modal {
  question: string;
  requestion: string;
  button: string;
  closeModal: () => void;
  classNumber: number;
}
export default function ClassModal({
  question,
  requestion,
  button,
  closeModal,
  classNumber,
}: Modal) {
  const user = useRecoilValue(userState);
  const accessToken = user.accessToken;

  const deleteMutation = useMutation(deleteMyClass, {
    onSuccess: data => {
      console.log(data);
      window.location.replace('/my');
    },
    onError: error => {
      console.log(error);
    },
  });

  const closeMutation = useMutation(closeMyClass, {
    onSuccess: data => {
      console.log(data);
      window.location.replace('/my');
    },
    onError: error => {
      console.log(error);
    },
  });

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
            onClick={() => {
              if (button === '삭제하기') {
                {
                  deleteMutation.mutate({
                    accessToken: accessToken,
                    danceclassId: classNumber,
                  });
                  closeModal();
                }
              } else if (button === '마감하기') {
                {
                  closeMutation.mutate({
                    accessToken: accessToken,
                    danceclassId: classNumber,
                  });
                  closeModal();
                }
              }
            }}
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}
