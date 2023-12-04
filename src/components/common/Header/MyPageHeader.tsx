import { useState } from 'react';
import BackIcon from '../../../../public/icons/back.svg';
import DotIcon from '../../../../public/icons/dot.svg';
import styles from '../../../styles/components/common/MyPageHeader.module.css';
import fonts from '../../../styles/typography.module.css';
import Modal from '../Modal';
import { useRouter } from 'next/router';

export default function MyPageHeader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    setIsOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
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
            <div className={styles.modalBox}>
              <button
                onClick={openLogoutModal}
                className={`${styles.upBtn} ${styles.modalBtn} ${fonts.body2_SemiBold}`}
              >
                <div className={styles.modalText}>로그아웃</div>
              </button>
              <button
                onClick={openDeleteModal}
                className={`${styles.downBtn} ${styles.modalBtn} ${fonts.body2_SemiBold}`}
              >
                <div className={styles.modalText}>계정 탈퇴</div>
              </button>
            </div>
          ) : (
            <></>
          )}
          {isLogoutModalOpen ? (
            <Modal
              question="계정에서 로그아웃 하시겠어요?"
              requestion=""
              button="로그아웃"
              closeModal={closeLogoutModal}
            />
          ) : (
            <></>
          )}
          {isDeleteModalOpen ? (
            <Modal
              question="계정을 탈퇴하시겠어요?"
              requestion=""
              button="계정 탈퇴"
              closeModal={closeDeleteModal}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
