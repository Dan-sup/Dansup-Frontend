import BasicHeader from '@/components/common/Header/BasicHeader';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getClassList, getFilteredClassList } from '@/apis/class';
import SearchIcon from '../../public/icons/search.svg';
import FilterIcon from '../../public/icons/filter.svg';
import typoStyles from '../styles/typography.module.css';
import styles from '../styles/HomePage.module.css';
import FilterBar from '@/components/FilterBar';
import filterBarStyles from '../styles/components/FilterBar.module.css';

export default function HomePage() {
  const [isFilterOn, setIsFilterOn] = useState<boolean>(false);

  //api 로직 가져와서 사용하기
  const { data: classList } = useQuery(['classList'], () => getClassList(), {
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      alert('결과를 가져오는데 실패했습니다.');
    },
  });

  const getFilteredClassListMutation = useMutation(getFilteredClassList, {
    onSuccess: data => {
      //여기로 filteredClassList 오면 사용!
      console.log(data);
    },
    onError: error => {
      alert('결과를 가져오는데 실패했습니다.');
    },
  });

  /* 필터 적용하기 버튼 클릭하면
  const handleFilterOn = () => {
    getFilteredClassListMutation.mutate({
      typingValue: null,
      filterValue: filterValue, //value 바꾸기
    });

    setIsFilterOn(true); //이거!
  };
  */
  //초기화 버튼 누르면, setIsFilterOn(false); , getClassList

  return (
    <>
      <BasicHeader type="home" />

      <div className={styles.container}>
        <div className={styles.inputBox}>
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>
          <input
            className={`${styles.input} ${typoStyles.body2_Regular}`}
            placeholder="수업 이름, 댄서명을 검색해보세요"
          />
        </div>

        {/*<FilterBar isFilterOn={isFilterOn} />*/}
        {!isFilterOn ? (
          <div className={filterBarStyles.bar}>
            <div
              className={`${filterBarStyles.barText} ${typoStyles.body1_SemiBold}`}
            >
              최근 업로드 된 수업
            </div>
            <div className={filterBarStyles.filterIcon}>
              <FilterIcon />
            </div>
          </div>
        ) : (
          <>
            <div className={filterBarStyles.bar}>
              <div
                className={`${filterBarStyles.onBarText} ${typoStyles.body2_Regular}`}
              >
                총
                <span
                  className={`${filterBarStyles.onNumberText} ${typoStyles.body2_Regular}`}
                >
                  8
                </span>
                건
              </div>
              {/* filteredClassList.length */}
              <div className={filterBarStyles.filterIcon}>
                <FilterIcon />
              </div>
            </div>
            <div className={filterBarStyles.appliedFiltersBox}></div>
          </>
        )}

        {/* isFilterOn이 false면 classList, true면 filteredClassList 보여주기! */}
      </div>
    </>
  );
}
