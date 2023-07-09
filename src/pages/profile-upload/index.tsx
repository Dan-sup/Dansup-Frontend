import { useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import Textarea from 'react-textarea-autosize';
import styles from '../../styles/UploadPage.module.css';
import BlankImage from '../../assets/icons/blank-image.svg';
import Plus from '../../assets/icons/plus.svg';
import { IHashTagList, uploadFile } from '../../types/upload';
import UploadVideo from '../../components/upload/UploadVideo';
import DanceGenre from '@/components/upload/DanceGenre';
import { IAwardList } from '../../types/upload';

export default function ProfileUpload() {
  const [image, setImage] = useState<uploadFile | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [dancerName, setDancerName] = useState<string>('');
  const [video, setVideo] = useState<uploadFile | null>(null);
  const [introCount, setIntroCount] = useState<number>(0);
  const [intro, setIntro] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [hashTag, setHashTag] = useState<string>('');
  const [hashTagList, setHashTagList] = useState<IHashTagList[]>([
    { id: 0, hashTag: '' },
  ]);
  const [awardList, setAwardList] = useState<IAwardList[]>([
    { id: 0, date: '', award: '' },
  ]);
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

  //userId
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

  //DancerName
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

  //한 줄 소개
  const handleChangeIntro = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentIntro = e.target.value;
    setIntro(currentIntro);
    setIntroCount(e.target.value.length);
  };

  //Genre 박스 열기
  const onClickOpenBox = () => {
    setIsClicked(!isClicked);
  };

  //hashTag
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

  const KeyDownHadler = (e: React.KeyboardEvent) => {
    if (e.code != 'Enter' && e.code != 'NumpadEnter') return;
    e.preventDefault();
  };

  const handleChangeHashTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTag(e.target.value);
  };

  //Award,Date
  const nextId = useRef<number>(1);

  const addAward = () => {
    const awardItem = {
      id: nextId.current,
      date: '',
      award: '',
    };

    setAwardList([...awardList, awardItem]);
    nextId.current += 1;
  };

  const handleChangeDate = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const awardListsCopy: IAwardList[] = JSON.parse(JSON.stringify(awardList));
    awardListsCopy[index].date = e.target.value;
    setAwardList(awardListsCopy);
  };

  const handleChangeAward = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const awardListsCopy: IAwardList[] = JSON.parse(JSON.stringify(awardList));
    awardListsCopy[index].award = e.target.value;
    setAwardList(awardListsCopy);
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
        <div className={styles.maximum}>
          <div className={styles.text}>한줄 소개</div>
          <div className={styles.smallTexts}>
            <div className={`${styles.smallText} ${styles.pointText}`}>
              {introCount}
            </div>
            <div className={styles.smallText}>/80</div>
          </div>
        </div>
        <Textarea
          className={`${styles.input} ${styles.textarea} ${styles.long}`}
          placeholder="ex.저는 댄서경력 10년차 프로댄서입니다."
          value={intro}
          onChange={handleChangeIntro}
          maxLength={80}
          cacheMeasurements
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
              placeholder="나의 댄스 장르를 선택해주세요."
              onClick={onClickOpenBox}
            />
            <DanceGenre />
          </>
        ) : (
          <>
            <input
              className={`${styles.input} ${styles.genre} ${styles.before}`}
              placeholder="나의 댄스 장르를 선택해주세요."
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
          onChange={handleChangeHashTag}
          onKeyUp={addHashTag}
          onKeyDown={KeyDownHadler}
        />
        <div className={styles.hashTags}>
          {hashTagList.length > 1 &&
            hashTagList.slice(1, 4).map((item, idx) => (
              <div key={idx} className={styles.hashTag}>
                {'#' + item.hashTag}
              </div>
            ))}
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.text}>공연 및 활동경력</div>
        {awardList.map((item, idx) => (
          <div className={styles.inputs} key={idx}>
            <input
              className={`${styles.input} ${styles.short}`}
              placeholder="2023.01.01"
              type="text"
              value={item.date}
              onChange={e => handleChangeDate(e, idx)}
            />
            <input
              className={`${styles.input} ${styles.mid}`}
              placeholder="ex.OO댄스대회 최우수상"
              type="text"
              value={item.award}
              onChange={e => handleChangeAward(e, idx)}
            />
          </div>
        ))}
        <div
          className={`${styles.blank} ${styles.addAward}`}
          onClick={addAward}
        >
          <div className={styles.awardButton}>
            <Plus />
            경력 추가하기
          </div>
        </div>
      </div>
    </div>
  );
}
