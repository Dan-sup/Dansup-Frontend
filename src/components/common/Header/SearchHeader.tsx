import { useRouter } from 'next/router';
import BackIcon from '../../../../public/icons/back.svg';
import SearchIcon from '../../../../public/icons/search.svg';
import styles from '../../../styles/components/common/SearchHeader.module.css';
import typoStyles from '../../../styles/typography.module.css';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isSearchFilterOnState, typingValueState } from '@/store/filter';

export default function SearchHeader() {
  //const [typingValue, setTypingValue] = useState('');
  const [typingValue, setTypingValue] = useRecoilState(typingValueState);
  const setIsSearchFilterOn = useSetRecoilState(isSearchFilterOnState);

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (typingValue.trim().length === 0) {
      return;
    }

    setIsSearchFilterOn(false);

    router.push({
      pathname: '/search-result',
      query: { typingValue: typingValue },
    });

    //setTypingValue(''); //초기화
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.backBtn}
        onClick={() => {
          setTypingValue('');
          router.push('/');
        }}
      >
        <BackIcon />
      </div>

      <div className={styles.inputBox}>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={`${styles.input} ${typoStyles.body2_Regular}`}
            value={typingValue}
            onChange={e => setTypingValue(e.target.value)}
            required
          />
        </form>
      </div>
    </div>
  );
}
