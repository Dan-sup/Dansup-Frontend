import BasicHeader from '@/components/common/Header/BasicHeader';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getClassList, getFilteredClassList } from '@/apis/class';
import SearchIcon from '../../public/icons/search.svg';
import FilterIcon from '../../public/icons/filter.svg';
import FilterOnIcon from '../../public/icons/filter-on.svg';
import typoStyles from '../styles/typography.module.css';
import styles from '../styles/HomePage.module.css';
import FilterBar from '@/components/FilterBar';
import filterBarStyles from '../styles/components/FilterBar.module.css';
import ClassCard from '@/components/ClassCard';
import Filter from '../components/modal/Filter';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isHomeFilterOnState } from '@/store/filter';
import { filteredClassListState } from '@/store/class';

export default function HomePage() {
  //const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [isHomeFilterOn, setIsHomeFilterOn] =
    useRecoilState(isHomeFilterOnState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //const [filteredClassList, setfilteredClassList] = useState<object[]>([]);
  const [filteredClassList, setfilteredClassList] = useRecoilState(
    filteredClassListState,
  );

  const router = useRouter();

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

  //초기화 버튼 누르면, setIsHomeFilterOn(false);

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
            <Filter
              isOpen={isModalOpen}
              closeModal={closeModal}
              handleHomeFilterOn={handleHomeFilterOn}
            />
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
                  {filteredClassList.length}
                </span>
                건
              </div>

              <button className={styles.filterIcon} onClick={openModal}>
                <FilterOnIcon />
              </button>
              <Filter
                isOpen={isModalOpen}
                closeModal={closeModal}
                handleHomeFilterOn={handleHomeFilterOn}
              />
            </div>

            <div className={filterBarStyles.appliedFiltersBox}></div>
          </>
        )}

        {/* isFilterOn이 false면 classList, true면 filteredClassList 보여주기! */}
        {!isHomeFilterOn ? (
          <>
            {classList?.map((classInfo: any, idx: any) => (
              <ClassCard key={idx} classInfo={classInfo} />
            ))}
          </>
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
