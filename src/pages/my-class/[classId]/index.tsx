import ClassDetail from '@/components/ClassDetailPage/ClassDetail';
import styles from '../../../styles/ClassDetailPage.module.css';
import MyPageClassHeader from '@/components/common/Header/MyPageClassHeader';

export default function ClassDetailPage() {
  return (
    <>
      <MyPageClassHeader />

      <div className={styles.container}>
        <ClassDetail />
      </div>
    </>
  );
}
