import { useState } from 'react';
import buttonStyles from '../../styles/Button.module.css';
import modalStyles from '../../styles/Modal.module.css';
import styles from '../../styles/UploadPage.module.css';
import fonts from '../../styles/typography.module.css';
import Close from '../../../public/icons/close.svg';
import Ect from '../../../public/icons/ETC.svg';
import UploadVideo from '../upload/UploadVideo';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import { useMutation } from '@tanstack/react-query';
import { postPortfolio } from '@/apis/my';

interface portfolioUploadProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function PortfolioUpload({
  isOpen,
  closeModal,
}: portfolioUploadProps) {
  const [video, setVideo] = useState<File | undefined>();

  //api
  const user = useRecoilValue(userState);
  const accessToken = user.accessToken;

  const portfolioUploadMutation = useMutation(postPortfolio, {
    onSuccess: data => {
      console.log(data);
      closeModal();
      window.location.replace('/my');
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();
    if (video instanceof File) {
      formData.append('videoFile', video);
    }
    for (const keyValue of formData) console.log(keyValue);

    portfolioUploadMutation.mutate({
      formData: formData,
      accessToken: accessToken,
    });
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div
        className={`${modalStyles.container} ${modalStyles.paddingContainer} ${modalStyles.black} ${modalStyles.withoutScroll}`}
      >
        <div className={modalStyles.modalCloseBox}>
          <button className={modalStyles.modalClose} onClick={closeModal}>
            <Close />
          </button>
        </div>
        <div className={styles.inputList}>
          <div className={`${styles.uploadMessage} ${fonts.body2_Regular}`}>
            <Ect />
            영상 파일을 업로드해주세요
          </div>
          <div className={styles.box}>
            <UploadVideo
              isImportant={false}
              video={video}
              setVideo={setVideo}
              title="영상 파일 업로드"
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={buttonStyles.buttonSpace}>
            {video !== undefined ? (
              <button
                onClick={handleSubmit}
                className={`${buttonStyles.CTA_Large} ${buttonStyles.before} ${fonts.body1_SemiBold}`}
              >
                수업 올리기
              </button>
            ) : (
              <button
                className={`${buttonStyles.CTA_Large} ${buttonStyles.after} ${fonts.body1_SemiBold}`}
              >
                수업 올리기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
