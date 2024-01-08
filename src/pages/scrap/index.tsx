import styles from '../../styles/ScrapPage.module.css';
import typoStyles from '../../styles/typography.module.css';
import TopBar from '@/components/common/TopBar';
import GenreChip from '@/components/common/GenreChip';

export default function ScrapPage() {
  return (
    <>
      <TopBar color="black">
        <div className={`${styles.topBarTitle} ${typoStyles.head1}`}>
          스크랩
        </div>
      </TopBar>

      <GenreChip text="힙합" size="small" />
      <GenreChip text="코레오" size="big" />
    </>
  );
}
