import SearchHeader from '@/components/common/Header/SearchHeader';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getFilteredClassList } from '@/apis/class';
import { getFilteredDancerList } from '../../apis/dancer';
import FilterIcon from '../../../public/icons/filter.svg';
import FilterOnIcon from '../../../public/icons/filter-on.svg';
import ResetIcon from '../../../public/icons/reset.svg';
import typoStyles from '../../styles/typography.module.css';
import styles from '../../styles/SearchResultPage.module.css';
import FilterBar from '@/components/FilterBar';
import filterBarStyles from '../../styles/components/FilterBar.module.css';
import DancerCard from '@/components/DancerCard';
import ClassCard from '@/components/ClassCard';
import Filter from '@/components/modal/Filter';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isSearchFilterOnState } from '@/store/filter';
import {
  bothFilteredClassListState,
  typingFilteredClassListState,
} from '@/store/class';
import SearchFilter from '@/components/modal/SearchFilter';
import { useResetFilter } from '@/hooks/useResetFilter';
import { homeFilterValueListSearchState } from '@/store/filter/searchFilter';
import NoInfo from '@/components/common/NoInfo';
import Footer from '@/components/common/Footer';
import SelectBar from '@/components/SelectBar';
import { useSelectBar } from '@/hooks/useSelectBar';

export default function SearchResultPage() {
  //const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [isSearchFilterOn, setIsSearchFilterOn] = useRecoilState(
    isSearchFilterOnState,
  );
  const { selectBarItem, handleChangeSelectBarItem } = useSelectBar();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  /*
  const [typingFilteredClassList, setTypingFilteredClassList] = useState<
    object[]
  >([]);
  const [bothFilteredClassList, setBothFilteredClassList] = useState<object[]>(
    [],
  );
  */
  const [typingFilteredClassList, setTypingFilteredClassList] = useRecoilState(
    typingFilteredClassListState,
  );
  const [bothFilteredClassList, setBothFilteredClassList] = useRecoilState(
    bothFilteredClassListState,
  );

  const searchFilterValueList = useRecoilValue(homeFilterValueListSearchState);

  const { resetSearchFilter } = useResetFilter();

  /*modal*/
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  //api 로직 가져와서 사용하기

  const router = useRouter();
  const { typingValue } = router.query;

  //타이핑만 (완료)
  const getTypingFilteredClassListMutation = useMutation(getFilteredClassList, {
    onSuccess: data => {
      //여기로 typingFilteredClassList 오면 사용!
      //console.log(data);
      setTypingFilteredClassList(data);
      //console.log(typingFilteredClassList);
    },
    onError: error => {
      console.log(error);
    },
  });

  //타이핑,필터 둘다 (완료)
  const getBothFilteredClassListMutation = useMutation(getFilteredClassList, {
    onSuccess: data => {
      //여기로 bothFilteredClassList 오면 사용!
      console.log(data);
      setBothFilteredClassList(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  //타이핑 검색한 '댄서' 리스트 가져오기 (완료)
  const { data: filteredDancerList } = useQuery(
    ['classList', typingValue],
    () => getFilteredDancerList(typingValue),
    {
      onSuccess: data => {
        console.log(data);
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  //검색 페이지에서 입력한 input값을, 이 페이지로 넘겨서 처음에 typingFilteredClassList 보여주기
  useEffect(() => {
    console.log(typingValue);
    getTypingFilteredClassListMutation.mutate({
      typingValue: typingValue, //검색 페이지에서 입력한 input값 넣기!
      filterValue: {},
    });
  }, [typingValue]);

  //필터 적용하기 버튼 클릭하면 (타이핑,필터 둘다 적용된 상태)
  const handleSearchFilterOn = (filterValue: any) => {
    console.log(filterValue);

    getBothFilteredClassListMutation.mutate({
      typingValue: typingValue,
      filterValue: filterValue,
    });

    setIsSearchFilterOn(true);
  };

  return (
    <>
      <SearchHeader />

      <div className={styles.container}>
        <div className={styles.selectBar}>
          <SelectBar
            selectBarItem={selectBarItem}
            handleChangeSelectBarItem={handleChangeSelectBarItem}
            type="narrow"
          />
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
              {' '}
              {selectBarItem == '수업'
                ? !isSearchFilterOn
                  ? typingFilteredClassList.length
                  : bothFilteredClassList.length
                : filteredDancerList.length}
            </span>
            건
          </div>

          {selectBarItem == '수업' && (
            <>
              <button
                className={filterBarStyles.filterIcon}
                onClick={openModal}
              >
                {!isSearchFilterOn ? <FilterIcon /> : <FilterOnIcon />}
              </button>
              <SearchFilter
                isOpen={isModalOpen}
                closeModal={closeModal}
                handleSearchFilterOn={handleSearchFilterOn}
              />
            </>
          )}
        </div>

        {isSearchFilterOn && selectBarItem == '수업' && (
          <div className={filterBarStyles.appliedFiltersBox}>
            <div className={filterBarStyles.filterValueListBox}>
              {searchFilterValueList.map((value: any, idx: any) => (
                <div
                  className={`${filterBarStyles.filterValueBox} ${typoStyles.caption1_Regular}`}
                  key={idx}
                >
                  {value}
                </div>
              ))}
            </div>

            <div className={filterBarStyles.resetIconBox}>
              <ResetIcon
                className={filterBarStyles.resetIcon}
                onClick={() => {
                  setIsSearchFilterOn(false);
                  resetSearchFilter();
                }}
              />
            </div>
          </div>
        )}

        {/* { isClassBtnClicked ? (isFilterOn이 false면 typingFilteredClassList, true면 bothFilteredClassList 보여주기!) : filteredDancerList } -> 중첩 조건문으로! */}

        {selectBarItem == '수업' ? (
          !isSearchFilterOn ? (
            typingFilteredClassList.length == 0 ? (
              <NoInfo />
            ) : (
              <>
                {typingFilteredClassList.map((classInfo, idx) => (
                  <>
                    <ClassCard key={idx} classInfo={classInfo} />
                    <div className={styles.divider} />
                  </>
                ))}
              </>
            )
          ) : bothFilteredClassList.length == 0 ? (
            <NoInfo />
          ) : (
            <>
              {bothFilteredClassList.map((classInfo, idx) => (
                <>
                  <ClassCard key={idx} classInfo={classInfo} />
                  <div className={styles.divider} />
                </>
              ))}
            </>
          )
        ) : filteredDancerList.length == 0 ? (
          <NoInfo />
        ) : (
          <div className={styles.classListBox}>
            {filteredDancerList.map((dancerInfo: any, idx: any) => (
              <DancerCard key={idx} dancerInfo={dancerInfo} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
