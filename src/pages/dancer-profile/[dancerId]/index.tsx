import Modal from '@/components/Modal';
import { useState } from 'react';

export default function DancerProfile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>모달열기</button>
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
