import { useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import styles from '../../styles/UploadPage.module.css';
import BlankImage from '../../assets/icons/blank-image.svg';
import UploadVideo from '../../components/video/UploadVideo';
import { uploadFile } from '../../types/upload';

export default function ProfileUpload() {
  const [image, setImage] = useState<uploadFile | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [dancerName, setDancerName] = useState<string>('');
  const [video, setVideo] = useState<uploadFile | null>(null);
  const [intro, setIntro] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [hashTag, setHashTag] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [award, setAward] = useState<string>('');

  //image 미리보기
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);
      setImage({
        file: fileList[0],
        thumnail: url,
        type: fileList[0].type.slice(0, 5),
      });
    }
  };

  const showImage = useMemo(() => {
    if (!image && image == null) {
      return (
        <BlankImage
          className={styles.image}
          alt="blank"
          width={100}
          height={100}
        />
      );
    }
    return (
      <Image
        className={styles.image}
        src={image.thumnail}
        alt={image.type}
        width={100}
        height={100}
      />
    );
  }, [image]);

  //genre 선택
  const genreList = [
    { name: '락킹', length: 2 },
    { name: '왁킹', length: 2 },
    { name: '팝핑', length: 2 },
    { name: '재즈', length: 2 },
    { name: '걸스 힙합', length: 5 },
    { name: '힙합', length: 2 },
    { name: '텃팅', length: 2 },
    { name: '디짓', length: 2 },
    { name: '트월크', length: 3 },
    { name: '힐댄스', length: 3 },
    { name: '브레이킹', length: 4 },
    { name: '크럼프', length: 3 },
    { name: '하우스', length: 3 },
    { name: '코레오', length: 3 },
    { name: '컨템', length: 2 },
    { name: '보깅', length: 2 },
    { name: '소울', length: 2 },
    { name: '프리스타일', length: 5 },
    { name: '기타', length: 2 },
  ];

  const clickedBox = genreList.map((data, idx) => {
    if (data.length == 2) {
      return (
        <div className={styles.smallGenreBox} key={idx}>
          {data.name}
        </div>
      );
    } else {
      return (
        <div className={styles.bigGenreBox} key={idx}>
          {data.name}
        </div>
      );
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        {showImage}
        <input
          className={styles.inputFile}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onUploadImage}
        />
        <button className={styles.imgButton} onClick={handleClickFileInput}>
          이미지 업로드
        </button>
      </div>
      <div className={styles.box}>
        <div className={styles.text}>사용자 계정</div>
        <input
          className={`${styles.input} ${styles.long}`}
          placeholder="영문, 숫자, 밑줄 및 마침표만 입력 가능합니다"
          type="text"
          value={userId}
        />
      </div>
      <div className={styles.box}>
        <div className={styles.text}>댄서 활동명</div>
        <input
          className={`${styles.input} ${styles.long}`}
          placeholder="한글, 영문, 숫자, 특수기호 입력 가능합니다 (1-14자)"
          type="text"
          value={dancerName}
        />
      </div>
      <div className={styles.box}>
        <div className={styles.text}>대표 영상 업로드</div>
        <UploadVideo video={video} setVideo={setVideo} />
      </div>
      <div className={styles.box}>
        <div className={styles.text}>한줄 소개</div>
        <input
          className={`${styles.input} ${styles.long}`}
          placeholder="ex.저는 댄서경력 10년차 프로댄서입니다"
          type="text"
          value={intro}
        />
      </div>
      <div className={styles.box}>
        <div className={styles.text}>나의 장르</div>
        <input
          className={`${styles.input} ${styles.genre}`}
          placeholder="나의 댄스 장르를 선택해주세요"
          onChange={(e: any) => {
            setGenre(e.target.value);
            console.log(genre);
          }}
        />
        <div className={styles.clickedBox}>{clickedBox}</div>
      </div>
      <div className={styles.box}>
        <div className={styles.text}>나를 소개하는 해시태그</div>
        <input
          className={`${styles.input} ${styles.long}`}
          placeholder="# 빠른템포의, 허니제이같은 등의 키워드를 작성해보세요!"
          type="text"
          value={hashTag}
        />
      </div>
      <div className={styles.box}>
        <div className={styles.text}>공연 및 활동경력</div>
        <div className={styles.inputs}>
          <input
            className={`${styles.input} ${styles.short}`}
            placeholder="2023.01.01"
            type="text"
            value={date}
          />
          <input
            className={`${styles.input} ${styles.mid}`}
            placeholder="ex.OO댄스대회 최우수상"
            type="text"
            value={award}
          />
        </div>
      </div>
    </div>
  );
}
