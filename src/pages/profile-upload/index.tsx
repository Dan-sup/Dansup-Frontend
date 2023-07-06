import { useState } from 'react';
import styles from '../../styles/UploadPage.module.css';

export default function ProfileUpload() {
  const [image, setImage] = useState<any>();
  const [userId, setUserId] = useState<string>('');
  const [dancerName, setDancerName] = useState<string>('');
  const [intro, setIntro] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [hashTag, setHashTag] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [award, setAward] = useState<string>('');

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>(resolve => {
      reader.onload = () => {
        setImage(reader.result || null);
        resolve();
      };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <input
          accept="image/*"
          multiple
          type="file"
          onChange={e => onUpload(e)}
        />
        <img src={image} />
      </div>
      <div className={styles.box}>
        <div className={styles.text}>사용자 계정</div>
        <input
          className={styles.input}
          placeholder="영문, 숫자, 밑줄 및 마침표만 입력 가능합니다"
          type="text"
          value={userId}
        />
      </div>
      <div className={styles.box}>
        <div className={styles.text}>댄서 활동명</div>
        <input
          className={styles.input}
          placeholder="한글, 영문, 숫자, 특수기호 입력 가능합니다 (1-14자)"
          type="text"
          value={dancerName}
        />
      </div>
      <div className={styles.box}>
        <div className={styles.text}>대표 영상 업로드</div>
      </div>
      <div className={styles.box}>
        <div className={styles.text}>한줄 소개</div>
        <input
          className={styles.input}
          placeholder="ex.저는 댄서경력 10년차 프로댄서입니다"
          type="text"
          value={intro}
        />
      </div>
      <div className={styles.box}>
        <div className={styles.text}>나의 장르</div>
      </div>
      <div className={styles.box}>
        <div className={styles.text}>나를 소개하는 해시태그</div>
        <input
          className={styles.input}
          placeholder="# 빠른템포의, 허니제이같은 등의 키워드를 작성해보세요!"
          type="text"
          value={hashTag}
        />
      </div>
      <div className={styles.box}>
        <div className={styles.text}>공연 및 활동경력</div>
        <div className={styles.inputs}>
          <input
            className={styles.input}
            placeholder="2023.01.01"
            type="text"
            value={date}
          />
          <input
            className={styles.input}
            placeholder="ex.OO댄스대회 최우수상"
            type="text"
            value={award}
          />
        </div>
      </div>
    </div>
  );
}
