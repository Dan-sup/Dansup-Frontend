import dynamic from 'next/dynamic';

const BasicHeader = dynamic(import('@/components/common/Header/BasicHeader'));
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getClassList, getFilteredClassList } from '@/apis/class';
import SearchIcon from '../../public/icons/search.svg';
import FilterIcon from '../../public/icons/filter.svg';
import FilterOnIcon from '../../public/icons/filter-on.svg';
import ResetIcon from '../../public/icons/reset.svg';
import typoStyles from '../styles/typography.module.css';
import styles from '../styles/HomePage.module.css';
import filterBarStyles from '../styles/components/FilterBar.module.css';
const FilterBar = dynamic(import('@/components/FilterBar'));
const ClassCard = dynamic(import('@/components/ClassCard'));
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isHomeFilterOnState } from '@/store/filter';
import { filteredClassListState } from '@/store/class';
const HomeFilter = dynamic(import('@/components/modal/HomeFilter'));
const NoInfo = dynamic(import('@/components/common/NoInfo'));
import { useResetFilter } from '@/hooks/useResetFilter';
import { homeFilterValueListState } from '@/store/filter/homeFilter';

export default function HomePage() {
  //const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [isHomeFilterOn, setIsHomeFilterOn] =
    useRecoilState(isHomeFilterOnState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //const [filteredClassList, setfilteredClassList] = useState<object[]>([]);
  const [filteredClassList, setfilteredClassList] = useRecoilState(
    filteredClassListState,
  );

  const homeFilterValueList = useRecoilValue(homeFilterValueListState);

  const router = useRouter();

  const { resetHomeFilter } = useResetFilter();

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

  //전체 클래스 리스트
  const { data: classList } = useQuery(['classList'], () => getClassList(), {
    onSuccess: data => {
      //console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  //필터링된 클래스 리스트
  const getFilteredClassListMutation = useMutation(getFilteredClassList, {
    onSuccess: data => {
      //여기로 filteredClassList 오면 사용!
      console.log(data);
      setfilteredClassList(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleHomeFilterOn = (filterValue: any) => {
    console.log(filterValue);

    getFilteredClassListMutation.mutate({
      typingValue: null,
      filterValue: filterValue,
    });

    setIsHomeFilterOn(true);
  };

  return (
    <>
      <BasicHeader type="home" />

      <div className={styles.container}>
        <div className={styles.inputBox}>
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>
          <div
            className={`${styles.input} ${typoStyles.body2_Regular}`}
            onClick={() => router.push('/search')}
          >
            수업 이름, 댄서명을 검색해보세요
          </div>
        </div>

        {/*<FilterBar isFilterOn={isFilterOn} />*/}
        {!isHomeFilterOn ? (
          <div className={filterBarStyles.bar}>
            <div
              className={`${filterBarStyles.barText} ${typoStyles.body1_SemiBold}`}
            >
              최근 업로드 된 수업
            </div>

            <button className={styles.filterIcon} onClick={openModal}>
              <FilterIcon />
            </button>
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
                  {' '}
                  {filteredClassList.length}
                </span>
                건
              </div>

              <button className={styles.filterIcon} onClick={openModal}>
                <FilterOnIcon />
              </button>
            </div>

            <div className={filterBarStyles.appliedFiltersBox}>
              <div className={filterBarStyles.filterValueListBox}>
                {homeFilterValueList.map((value: any, idx: any) => (
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
                    setIsHomeFilterOn(false);
                    resetHomeFilter();
                  }}
                />
              </div>
            </div>
          </>
        )}
        <HomeFilter
          isOpen={isModalOpen}
          closeModal={closeModal}
          handleHomeFilterOn={handleHomeFilterOn}
        />

        {/* isFilterOn이 false면 classList, true면 filteredClassList 보여주기! */}
        {!isHomeFilterOn ? (
          <>
            {classList?.map((classInfo: any, idx: any) => (
              <ClassCard key={idx} classInfo={classInfo} />
            ))}
          </>
        ) : filteredClassList.length == 0 ? (
          <NoInfo />
        ) : (
          <>
            {filteredClassList.map((classInfo: any, idx: any) => (
              <ClassCard key={idx} classInfo={classInfo} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
