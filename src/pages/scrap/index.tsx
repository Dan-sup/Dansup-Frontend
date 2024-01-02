import styles from '../../styles/ScrapPage.module.css';
import typoStyles from '../../styles/typography.module.css';
import TopBar from '@/components/common/TopBar';

export default function ScrapPage() {
  return (
    <>
      <TopBar>
        <div className={`${styles.topBarTitle} ${typoStyles.head1}`}>
          스크랩
        </div>
      </TopBar>
    </>
  );
}
