import styles from '../../styles/Profile.module.css';
import fonts from '../../styles/typography.module.css';
import ClassCard from './ClassCard';

interface classProps {
  classes: any;
}

export default function Class({ classes }: classProps) {
  return (
    <div className={styles.container}>
      <>
        {classes.length !== 0 ? (
          <>
            <ClassCard isMyPage={true} classes={classes} />
          </>
        ) : (
          <div className={styles.blank}>
            <div className={`${styles.blankText} ${fonts.body2_SemiBold}`}>
              운영중인 수업을 추가해주세요
            </div>
          </div>
        )}
      </>
    </div>
  );
}
