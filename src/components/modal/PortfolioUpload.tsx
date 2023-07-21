import { useState } from 'react';
import buttonStyles from '../../styles/Button.module.css';
import modalStyles from '../../styles/Modal.module.css';
import styles from '../../styles/UploadPage.module.css';
import fonts from '../../styles/typography.module.css';
import Close from '../../../public/icons/close.svg';
import Ect from '../../../public/icons/ETC.svg';
import { IUploadFile } from '@/types/upload';
import UploadVideo from '../upload/UploadVideo';

interface portfolioUploadProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function PortfolioUpload({
  isOpen,
  closeModal,
}: portfolioUploadProps) {
  const [video, setVideo] = useState<IUploadFile | null>(null);

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
              video={video}
              setVideo={setVideo}
              title="영상 파일 업로드"
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={buttonStyles.buttonSpace}>
            {video !== null ? (
              <button
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
