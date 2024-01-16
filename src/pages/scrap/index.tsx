import styles from '../../styles/ScrapPage.module.css';
import typoStyles from '../../styles/typography.module.css';
import TopBar from '@/components/common/TopBar';
import GenreChip from '@/components/common/GenreChip';
import SelectBar from '@/components/SelectBar';
import { useSelectBar } from '@/hooks/useSelectBar';

export default function ScrapPage() {
  const { selectBarItem, handleChangeSelectBarItem } = useSelectBar();

  return (
    <>
      <TopBar color="black">
        <div className={`${styles.topBarTitle} ${typoStyles.head1}`}>
          스크랩
        </div>
      </TopBar>

      <div className={styles.divider}></div>

      <SelectBar
        selectBarItem={selectBarItem}
        handleChangeSelectBarItem={handleChangeSelectBarItem}
        type="wide"
      />

      <GenreChip text="힙합" size="small" />
      <GenreChip text="코레오" size="big" />
    </>
  );
}
