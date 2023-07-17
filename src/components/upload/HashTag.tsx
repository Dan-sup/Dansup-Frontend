import { useRef } from 'react';
import { IHashTagList } from '@/types/upload';
import styles from '../../styles/UploadPage.module.css';
import fonts from '../../styles/typography.module.css';
import Delete from '../../../public/icons/delete.svg';

interface HashTagProps {
  hashTag: string;
  setHashTag: React.Dispatch<React.SetStateAction<string>>;
  hashTagList: IHashTagList[];
  setHashTagList: React.Dispatch<React.SetStateAction<IHashTagList[]>>;
  title: string;
}

export default function HashTag({
  hashTag,
  setHashTag,
  hashTagList,
  setHashTagList,
  title,
}: HashTagProps) {
  const nextId = useRef<number>(1);

  const addHashTag = (e: any) => {
    const hashTagItem = {
      id: nextId.current,
      hashTag: e.target.value.trim(),
    };

    const allowedCommand = ['Enter', 'NumpadEnter'];
    if (!allowedCommand.includes(e.code)) return;

    if (hashTagItem.hashTag == '') {
      return;
    } else {
      if (hashTagList.length < 4) {
        setHashTagList([...hashTagList, hashTagItem]);
        setHashTag('');
        nextId.current += 1;
        console.log({ hashTagList });
      } else {
        setHashTag('');
      }
    }
  };

  const deleteHashTag = (id: number) => {
    setHashTagList(hashTagList.filter(item => item.id !== id));
  };

  const KeyDownHadler = (e: React.KeyboardEvent) => {
    if (e.code != 'Enter' && e.code != 'NumpadEnter') return;
    e.preventDefault();
  };

  const handleChangeHashTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTag(e.target.value);
  };
  return (
    <>
      <div className={styles.box}>
        <div className={styles.row_Between}>
          <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
            {title}
          </div>
          <div className={`${styles.smallTexts} ${fonts.caption1_Regular}`}>
            <div className={`${styles.smallText} ${styles.spacing}`}>최대</div>
            <div className={`${styles.pointText}`}>3</div>
            <div className={styles.smallText}>개</div>
          </div>
        </div>
        <input
          className={`${styles.input} ${styles.long} ${fonts.body2_Regular}`}
          placeholder="빠른템포의, 허니제이같은 등의 키워드를 작성해보세요!"
          type="text"
          value={hashTag}
          onChange={handleChangeHashTag}
          onKeyUp={addHashTag}
          onKeyDown={KeyDownHadler}
        />
      </div>
      <div className={styles.hashTags}>
        {hashTagList.length > 1 &&
          hashTagList.slice(1, 4).map((item, idx) => (
            <div key={idx} className={styles.hashTagBox}>
              <div
                key={idx}
                className={`${styles.hashTag} ${fonts.body2_Regular}`}
              >
                {'#' + item.hashTag}
              </div>
              <div
                onClick={() => deleteHashTag(item.id)}
                className={styles.deleteHashTag}
              >
                <Delete />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
