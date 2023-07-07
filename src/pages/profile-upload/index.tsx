import { useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import styles from '../../styles/UploadPage.module.css';
import BlankImage from '../../assets/icons/blank-image.svg';
import { uploadFile } from '../../types/upload';
import UploadVideo from '../../components/upload/UploadVideo';
import DanceGenre from '@/components/upload/DanceGenre';

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
  const [isClicked, setIsClicked] = useState<boolean>(false);

  //에러 메시지, 확인 메시지 state
  const [userIdMsg, setUserIdMsg] = useState<string>('');
  const [dancerNameMsg, setDancerNameMsg] = useState<string>('');

  //우효성 검사 state (Checked => 형식, Valid => 중복)
  const [isUserIdChecked, setIsUserIdChecked] = useState<boolean>(false);
  const [isdancerNameChecked, setIsDancerNameChecked] =
    useState<boolean>(false);
  const [isUserIdValid, setIsUserIdValid] = useState<boolean>(false);

  //image 미리보기
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentUserId = e.target.value;
    setUserId(currentUserId);
    const userIdRegex = /^[a-zA-Z0-9_.]{1,14}$/;

    if (!userIdRegex.test(currentUserId)) {
      setUserIdMsg('영문, 숫자, 밑줄 및 마침표만 입력 가능합니다.');
      setIsUserIdChecked(false);
    } else {
      setUserIdMsg('');
      setIsUserIdChecked(true);
    }
  };

  const handleChangeDancerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentDancerName = e.target.value;
    setDancerName(currentDancerName);
    const dancerNameRegex =
      /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{1,14}$/;

    if (!dancerNameRegex.test(currentDancerName)) {
      setDancerNameMsg('한글, 영문, 숫자, 특수기호 입력 가능합니다.(1-14자)');
      setIsDancerNameChecked(false);
    } else {
      setDancerNameMsg('');
      setIsDancerNameChecked(true);
    }
  };

  //Genre
  const onClickOpenBox = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        {showImage}
        <input
          className={styles.inputFile}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUploadImage}
        />
        <button className={styles.imgButton} onClick={onClickFileInput}>
          이미지 업로드
        </button>
      </div>
      <div className={styles.box}>
        <div className={styles.required}>
          <div className={styles.text}>사용자 계정</div>
          <div className={`${styles.pointText}`}>*</div>
        </div>
        <input
          className={`${styles.input} ${styles.long}`}
          placeholder="영문, 숫자, 밑줄 및 마침표만 입력 가능합니다."
          type="text"
          value={userId}
          onChange={handleChangeUserId}
        />
        <div className={styles.errorMsg}>{userIdMsg}</div>
      </div>
      <div className={styles.box}>
        <div className={styles.required}>
          <div className={styles.text}>댄서 활동명</div>
          <div className={styles.pointText}>*</div>
        </div>
        <input
          className={`${styles.input} ${styles.long}`}
          placeholder="한글, 영문, 숫자, 특수기호 입력 가능합니다.(1-14자)"
          type="text"
          value={dancerName}
          onChange={handleChangeDancerName}
        />
        <div className={styles.errorMsg}>{dancerNameMsg}</div>
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
        <div className={styles.maximum}>
          <div className={styles.text}>나의 장르</div>
          <div className={styles.smallTexts}>
            <div className={`${styles.smallText} ${styles.spacing}`}>최대</div>
            <div className={`${styles.smallText} ${styles.pointText}`}>3</div>
            <div className={styles.smallText}>개</div>
          </div>
        </div>
        {isClicked ? (
          <>
            <input
              className={`${styles.input} ${styles.genre} ${styles.after}`}
              placeholder="나의 댄스 장르를 선택해주세요"
              onClick={onClickOpenBox}
            />
            <DanceGenre />
          </>
        ) : (
          <>
            <input
              className={`${styles.input} ${styles.genre} ${styles.before}`}
              placeholder="나의 댄스 장르를 선택해주세요"
              onClick={onClickOpenBox}
            />
          </>
        )}
      </div>
      <div className={styles.box}>
        <div className={styles.maximum}>
          <div className={styles.text}>나를 소개하는 해시태그</div>
          <div className={styles.smallTexts}>
            <div className={`${styles.smallText} ${styles.spacing}`}>최대</div>
            <div className={`${styles.smallText} ${styles.pointText}`}>3</div>
            <div className={styles.smallText}>개</div>
          </div>
        </div>
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
