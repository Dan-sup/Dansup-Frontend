import { useState } from 'react';
import styleButton from '../../styles/Button.module.css';
import styleModal from '../../styles/Modal.module.css';
import styles from '../../styles/UploadPage.module.css';
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
      <div className={`${styleModal.container} ${styleModal.black}`}>
        <div className={styleModal.modalCloseBox}>
          <button className={styleModal.modalClose} onClick={closeModal}>
            <Close />
          </button>
        </div>
        <div className={styles.inputList}>
          <div className={styles.uploadMsg}>
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
          <div className={styleButton.buttonSpace}>
            {video !== null ? (
              <button
                className={`${styleButton.CTALarge} ${styleButton.beforeCTA}`}
              >
                수업 올리기
              </button>
            ) : (
              <button
                className={`${styleButton.CTALarge} ${styleButton.afterCTA}`}
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
