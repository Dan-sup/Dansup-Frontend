import { useState } from 'react';
import BackIcon from '../../../../public/icons/back.svg';
import DotIcon from '../../../../public/icons/dot.svg';
import styles from '../../../styles/components/common/MyPageHeader.module.css';
import fonts from '../../../styles/typography.module.css';
import Modal from '../Modal';
import { useRouter } from 'next/router';

export default function MyPageHeader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
    setIsOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const onclickBack = () => {
    router.back();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerBtn}>
          <div className={styles.btn} onClick={onclickBack}>
            <BackIcon />
          </div>
          <div
            className={styles.btn}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <DotIcon />
          </div>
          {isOpen ? (
            <button
              className={`${styles.logoutBtn} ${fonts.body2_SemiBold}`}
              onClick={openModal}
            >
              로그아웃
            </button>
          ) : (
            <></>
          )}
          {isModalOpen ? (
            <Modal
              question="계정에서 로그아웃 하시겠어요?"
              requestion=""
              button="로그아웃"
              closeModal={closeModal}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
