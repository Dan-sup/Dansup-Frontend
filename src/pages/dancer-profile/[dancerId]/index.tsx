import { useState } from 'react';
import styles from '../../../styles/UploadPage.module.css';
import ClassUpload from '@/components/modal/ClassUpload';
import PortfolioUpload from '@/components/modal/PortfolioUpload';

export default function DancerProfile() {
  const [isClassOpen, setIsClassOpen] = useState<boolean>(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);

  const openClassModal = () => {
    setIsClassOpen(true);
  };

  const closeClassModal = () => {
    setIsClassOpen(false);
  };

  const openPortfolioModal = () => {
    setIsPortfolioOpen(true);
  };

  const closePortfolioModal = () => {
    setIsPortfolioOpen(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={openClassModal} className={styles.modal}>
        내수업 올리기
      </button>
      <ClassUpload isOpen={isClassOpen} closeModal={closeClassModal} />
      <button onClick={openPortfolioModal} className={styles.modal}>
        포트폴리오 올리기
      </button>
      <PortfolioUpload
        isOpen={isPortfolioOpen}
        closeModal={closePortfolioModal}
      />
    </div>
  );
}
