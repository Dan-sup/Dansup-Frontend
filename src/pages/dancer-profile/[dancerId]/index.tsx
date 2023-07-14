import Modal from '@/components/modal/ClassUpload';
import { useState } from 'react';
import styles from '../../../styles/UploadPage.module.css';
import ClassUpload from '@/components/modal/ClassUpload';

export default function DancerProfile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={openModal} className={styles.modal}>
        모달열기
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}
