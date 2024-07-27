import dynamic from 'next/dynamic';
import Bottom from '../components/common/Footer';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { getAllClassList, getFilteredClassList } from '@/apis/class';
import { useResetFilter } from '@/hooks/useResetFilter';
import { useSelectBar } from '@/hooks/useSelectBar';
import { isHomeFilterOnState } from '@/store/filter';
import {
  homeFilterValueState,
  homeFilterValueListState,
} from '@/store/filter/homeFilter';
import SearchIcon from '../../public/icons/search.svg';
import FilterIcon from '../../public/icons/filter.svg';
import FilterOnIcon from '../../public/icons/filter-on.svg';
import ResetIcon from '../../public/icons/reset.svg';
import typoStyles from '../styles/typography.module.css';
import styles from '../styles/HomePage.module.css';
import filterBarStyles from '../styles/components/FilterBar.module.css';
const BasicHeader = dynamic(import('@/components/common/Header/BasicHeader'));
const FilterBar = dynamic(import('@/components/FilterBar'));
const HomeFilter = dynamic(import('@/components/modal/HomeFilter'));
const ClassCard = dynamic(import('@/components/ClassCard'));
const NoInfo = dynamic(import('@/components/common/NoInfo'));
import SelectBar from '@/components/SelectBar';
import Footer from '../components/common/Footer';

export default function HomePage() {
  //const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [isHomeFilterOn, setIsHomeFilterOn] =
    useRecoilState(isHomeFilterOnState);
  const { selectBarItem, handleChangeSelectBarItem } = useSelectBar();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const homeFilterValue = useRecoilValue(homeFilterValueState);
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

  //전체 클래스 리스트 / 필터링된 클래스 리스트
  const { data: classList } = useQuery(
    !isHomeFilterOn ? ['classList'] : ['classList', homeFilterValue],
    !isHomeFilterOn
      ? getAllClassList
      : () =>
          getFilteredClassList({
            typingValue: null,
            filterValue: homeFilterValue,
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
            {/*
            <SelectBar
              selectBarItem={selectBarItem}
              handleChangeSelectBarItem={handleChangeSelectBarItem}
              type="narrow"
            />
            */}
            <div
              className={`${filterBarStyles.barText} ${typoStyles.body1_SemiBold}`}
            >
              최근 업로드된 수업
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
                  {classList?.length}
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
                    setIsHomeFilterOn(false);
                    resetHomeFilter();
                  }}
                />
              </div>
            </div>
          </>
        )}
        <HomeFilter isOpen={isModalOpen} closeModal={closeModal} />

        {classList?.length == 0 ? (
          <NoInfo />
        ) : (
          <>
            {classList?.map((classInfo: any, idx: any) => (
              <>
                <ClassCard key={idx} classInfo={classInfo} />
                <div className={styles.divider} />
              </>
            ))}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
