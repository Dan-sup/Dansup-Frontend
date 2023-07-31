import { useRecoilState } from 'recoil';
import styles from '../../styles/Modal.module.css';
import fonts from '../../styles/typography.module.css';
import { userState } from '@/store/user';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/apis/auth';

interface Modal {
  question: string;
  requestion: string;
  button: string;
  closeModal: () => void;
}
export default function Modal({
  question,
  requestion,
  button,
  closeModal,
}: Modal) {
  const [user, setUser] = useRecoilState(userState);
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);
  const router = useRouter();

  const logoutMutation = useMutation(logout, {
    onSuccess: data => {
      console.log(data);
      router.push('/');
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
              if (button == '로그아웃') {
                logoutMutation.mutate({
                  accessToken: user.accessToken,
                  refreshToken: user.refreshToken,
                });
                setUser({ ...user, accessToken: '', refreshToken: '' });
                removeCookie('refreshToken', {
                  sameSite: 'strict',
                  path: '/',
                });
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
