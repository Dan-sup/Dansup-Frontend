import ClassDetail from '@/components/ClassDetail';
import styles from '../../../styles/ClassDetailPage.module.css';
import MyPageClassHeader from '../../../components/common/Header/MyPageClassHeader';
import Footer from '@/components/common/Footer';
import { useRouter } from 'next/router';

export default function ClassDetailPage() {
  const router = useRouter();
  console.log(router.query);

  return (
    <>
      <MyPageClassHeader classNumber={Number(router.query.classId)} />

      <div className={styles.container}>
        <ClassDetail />
      </div>
    </>
  );
}
