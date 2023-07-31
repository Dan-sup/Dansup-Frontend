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
            <ClassCard isMyPage={false} classes={classes} />
          </>
        ) : (
          <div className={styles.blank}>
            <div className={`${styles.blankText} ${fonts.body2_SemiBold}`}>
              운영중인 수업이 없어요
            </div>
          </div>
        )}
      </>
    </div>
  );
}
