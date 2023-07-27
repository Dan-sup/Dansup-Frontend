import SearchHeader from '@/components/common/Header/SearchHeader';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getFilteredClassList } from '@/apis/class';
import { getFilteredDancerList } from '../../apis/dancer';
import FilterIcon from '../../../public/icons/filter.svg';
import typoStyles from '../../styles/typography.module.css';
import styles from '../../styles/SearchResultPage.module.css';
import FilterBar from '@/components/FilterBar';
import filterBarStyles from '../../styles/components/FilterBar.module.css';
import DancerCard from '@/components/SearchResultPage/DancerCard';
import ClassCard from '@/components/ClassCard';

export default function SearchResultPage() {
  const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [isClassBtnClicked, setIsClassBtnClicked] = useState<boolean>(true);
  const [isDancerBtnClicked, setIsDancerBtnClicked] = useState<boolean>(false);
  const [isGenreIncluding, setIsGenreIncluding] = useState<boolean>(true);

  //api 로직 가져와서 사용하기

  //타이핑만
  const getTypingFilteredClassListMutation = useMutation(getFilteredClassList, {
    onSuccess: data => {
      //여기로 typingFilteredClassList 오면 사용!
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  //타이핑,필터 둘다
  const getBothFilteredClassListMutation = useMutation(getFilteredClassList, {
    onSuccess: data => {
      //여기로 bothFilteredClassList 오면 사용!
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  /*
  const { data: filteredDancerList } = useQuery(
    ['classList'],
    () => getFilteredDancerList(typingValue), //value 바꾸기
    {
      onSuccess: data => {
        console.log(data);
      },
      onError: error => {
        console.log(error);
      },
    },
  );
  */

  /* 검색 페이지에서 입력한 input값을, 이 페이지로 넘겨서 처음에 typingFilteredClassList 보여주기
  useEffect(() => {
    getTypingFilteredClassListMutation.mutate({
      typingValue: typingValue, //검색 페이지에서 입력한 input값 넣기! //value 바꾸기
      filterValue: null,
    });
  }, []);
  */

  /* 필터 적용하기 버튼 클릭하면 (타이핑,필터 둘다 적용된 상태)
    const handleFilterOn = () => {
      getBothFilteredClassListMutation.mutate({
        typingValue: typingValue, //value 바꾸기
        filterValue: filterValue, //value 바꾸기
      });
  
      setIsFilterOn(true);
    };
  */
  //초기화 버튼 누르면, setIsFilterOn(false); , getTypingFilteredClassListMutation

  const handleBtnClick = () => {
    setIsClassBtnClicked(!isClassBtnClicked);
    setIsDancerBtnClicked(!isDancerBtnClicked);
  };

  return (
    <>
      <SearchHeader />

      <div className={styles.container}>
        <div className={styles.selectBar}>
          <div
            className={`${isClassBtnClicked ? styles.clickedBtn : styles.btn} ${
              typoStyles.head2_SemiBold
            }`}
            onClick={handleBtnClick}
          >
            수업
          </div>
          <div
            className={`${
              isDancerBtnClicked ? styles.clickedBtn : styles.btn
            } ${typoStyles.head2_SemiBold}`}
            onClick={handleBtnClick}
          >
            댄서
          </div>
        </div>

        {/*<FilterBar isFilterOn={isFilterOn} />*/}
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
          {/* {!isFilterOn ? typingFilteredClassList.length : bothFilteredClassList.length} */}
          <div className={filterBarStyles.filterIcon}>
            <FilterIcon />
          </div>
        </div>

        {isFilterOn && (
          <div className={filterBarStyles.appliedFiltersBox}></div>
        )}

        {/* { isClassBtnClicked ? (isFilterOn이 false면 typingFilteredClassList, true면 bothFilteredClassList 보여주기!) : filteredDancerList } -> 중첩 조건문으로! */}
        {isClassBtnClicked ? (
          <>
            <ClassCard />
            <ClassCard />
            <ClassCard />
          </>
        ) : (
          <div className={styles.classListBox}>
            <DancerCard isGenreIncluding={true} />
            <DancerCard isGenreIncluding={false} />
            <DancerCard isGenreIncluding={true} />
          </div>
        )}
      </div>
    </>
  );
}
