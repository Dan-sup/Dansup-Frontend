import ClassDetail from '@/components/ClassDetailPage/ClassDetail';
import styles from '../../../styles/ClassDetailPage.module.css';
import BasicHeader from '@/components/common/Header/BasicHeader';

export default function ClassDetailPage() {
  return (
    <>
      <BasicHeader />

      <div className={styles.container}>
        <ClassDetail />
      </div>
    </>
  );
}
