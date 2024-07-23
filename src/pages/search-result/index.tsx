import SearchHeader from '@/components/common/Header/SearchHeader';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import SearchFilter from '@/components/modal/SearchFilter';
import { useResetFilter } from '@/hooks/useResetFilter';
import {
  searchFilterValueState,
  searchFilterValueListState,
} from '@/store/filter/searchFilter';
import NoInfo from '@/components/common/NoInfo';
import Footer from '@/components/common/Footer';
import SelectBar from '@/components/SelectBar';
import { useSelectBar } from '@/hooks/useSelectBar';

export default function SearchResultPage() {
  //const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [isSearchFilterOn, setIsSearchFilterOn] = useRecoilState(
    isSearchFilterOnState,
  );
  const searchFilterValue = useRecoilValue(searchFilterValueState);
  const { selectBarItem, handleChangeSelectBarItem } = useSelectBar();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const searchFilterValueList = useRecoilValue(searchFilterValueListState);

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
  const { data: typingFilteredClassList } = useQuery(
    ['classList', typingValue],
    () =>
      getFilteredClassList({
        typingValue: typingValue,
        filterValue: {},
      }),
    {
      onSuccess: data => {
        console.log(data);
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  //타이핑,필터 둘다 (완료)
  const { data: bothFilteredClassList } = useQuery(
    ['classList', searchFilterValue],
    () =>
      getFilteredClassList({
        typingValue: typingValue,
        filterValue: searchFilterValue,
      }),
    {
      onSuccess: data => {
        console.log(data);
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  //타이핑 검색한 '댄서' 리스트 가져오기 (완료)
  const { data: filteredDancerList } = useQuery(
    ['dancerList', typingValue],
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
                  ? typingFilteredClassList?.length
                  : bothFilteredClassList?.length
                : filteredDancerList?.length}
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
              <SearchFilter isOpen={isModalOpen} closeModal={closeModal} />
            </>
          )}
        </div>

        {isSearchFilterOn && selectBarItem == '수업' && (
          <div className={filterBarStyles.appliedFiltersBox}>
            <div className={filterBarStyles.filterValueListBox}>
              {/*
              {searchFilterValueList.map((value: any, idx: any) => (
                <div
                  className={`${filterBarStyles.filterValueBox} ${typoStyles.caption1_Regular}`}
                  key={idx}
                >
                  {value}
                </div>
              ))}
                */}
              {searchFilterValueList.map((value: any, idx: any) => (
                <>
                  {value ? (
                    <div
                      className={`${filterBarStyles.filterValueBox} ${typoStyles.caption1_Regular}`}
                      key={idx}
                    >
                      {value}
                    </div>
                  ) : (
                    <></>
                  )}
                </>
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
            typingFilteredClassList?.length == 0 ? (
              <NoInfo />
            ) : (
              <>
                {typingFilteredClassList?.map((classInfo: any, idx: any) => (
                  <>
                    <ClassCard key={idx} classInfo={classInfo} />
                    <div className={styles.divider} />
                  </>
                ))}
              </>
            )
          ) : bothFilteredClassList?.length == 0 ? (
            <NoInfo />
          ) : (
            <>
              {bothFilteredClassList?.map((classInfo: any, idx: any) => (
                <>
                  <ClassCard key={idx} classInfo={classInfo} />
                  <div className={styles.divider} />
                </>
              ))}
            </>
          )
        ) : filteredDancerList?.length == 0 ? (
          <NoInfo />
        ) : (
          <div className={styles.classListBox}>
            {filteredDancerList?.map((dancerInfo: any, idx: any) => (
              <DancerCard key={idx} dancerInfo={dancerInfo} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
