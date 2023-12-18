import { useState } from 'react';
import BackIcon from '../../../../public/icons/back.svg';
import DotIcon from '../../../../public/icons/dot.svg';
import styles from '../../../styles/components/common/MyPageHeader.module.css';
import fonts from '../../../styles/typography.module.css';
import ClassModal from '../ClassModal';
import { useRouter } from 'next/router';

interface myPageHeaderProps {
  classNumber: number;
}

export default function MyPageHeader({ classNumber }: myPageHeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();

  //마감 모달
  const openCloseModal = () => {
    setIsCloseModalOpen(true);
    setIsOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeCloseModal = () => {
    setIsCloseModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  //삭제 모달
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
      <div className={styles.classContainer}>
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
            <div className={styles.classBtnBox}>
              <button
                className={`${styles.upBtn} ${styles.classBtn} ${fonts.body2_SemiBold}`}
                onClick={openCloseModal}
              >
                수업 마감하기
              </button>
              <button
                className={`${styles.downBtn} ${styles.classBtn} ${fonts.body2_SemiBold}`}
                onClick={openDeleteModal}
              >
                수업 삭제하기
              </button>
            </div>
          ) : (
            <></>
          )}
          {isCloseModalOpen ? (
            <ClassModal
              question=" 수업을 마감할까요?"
              requestion="더 이상 수강인원을 받지 않아요"
              button="마감하기"
              closeModal={closeCloseModal}
              classNumber={classNumber}
            />
          ) : (
            <></>
          )}
          {isDeleteModalOpen ? (
            <ClassModal
              question="수업을 삭제할까요?"
              requestion="수업을 아예 목록에서 지울게요"
              button="삭제하기"
              closeModal={closeDeleteModal}
              classNumber={classNumber}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
