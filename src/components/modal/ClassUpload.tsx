import { useState, useEffect } from 'react';
import Textarea from 'react-textarea-autosize';
import Close from '../../../public/icons/close.svg';
import IndicatorFirst from '../../../public/icons/indicator-first.svg';
import IndicatorSecond from '../../../public/icons/indicator-second.svg';
import IndicatorThird from '../../../public/icons/indicator-third.svg';
import styleButton from '../../styles/Button.module.css';
import styleModal from '../../styles/Modal.module.css';
import styles from '../../styles/UploadPage.module.css';
import {
  IClassDayList,
  IGenreList,
  IHashTagList,
  ILocation,
  IUploadFile,
} from '@/types/upload';
import DanceGenre from '../upload/DanceGenre';
import DaumPostcode, { Address } from 'react-daum-postcode';
import HashTag from '../upload/HashTag';
import Select from '../upload/Select';
import UploadVideo from '../upload/UploadVideo';
import ClassDate from '../upload/ClassDate';
import ClassDay from '../upload/ClassDay';
import { levelList, wayList } from '@/data/class-data';

interface classUploadProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function ClassUpload({ isOpen, closeModal }: classUploadProps) {
  const [titleCount, setTitleCount] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [genreList, setGenreList] = useState<IGenreList[]>([
    { id: 0, genre: '' },
  ]);
  const [isFull, setIsFull] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [hashTag, setHashTag] = useState<string>('');
  const [hashTagList, setHashTagList] = useState<IHashTagList[]>([
    { id: 0, hashTag: '' },
  ]);
  const [classContent, setClassContent] = useState<string>('');
  const [classUser, setClassUser] = useState<string>('');
  const [classIntro, setClassIntro] = useState<string>('');
  const [location, setLocation] = useState<ILocation>({ address: '' });
  const [isOpenLocation, setIsOpenLocation] = useState<boolean>(false);
  const [classLevel, setClassLevel] = useState<string>('');
  const [classFee, setClassFee] = useState<string>();
  const [classAdmit, setClassAdmit] = useState<string>();
  const [classSong, setClassSong] = useState<string>('');
  const [classWay, setClassWay] = useState<string>('');
  const [classDate, setClassDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [classDayList, setClassDayList] = useState<IClassDayList[]>([
    { id: 0, day: '' },
  ]);
  const [video, setVideo] = useState<IUploadFile | null>(null);
  const [classLink, setClassLink] = useState<string>('');

  //우효성 검사 state (Checked => 형식)
  const [isTitleChecked, setIsTitleChecked] = useState<boolean>(false);
  const [isGenreListChecked, setIsGenreListChecked] = useState<boolean>(false);
  const [isLocationChecked, setIsLocationChecked] = useState<boolean>(false);
  const [isClassLevelChecked, setIsClassLevelChecked] =
    useState<boolean>(false);
  const [isClassFeeChecked, setIsClassFeeChecked] = useState<boolean>(false);
  const [isClassAdmitChecked, setIsClassAdmitChecked] =
    useState<boolean>(false);

  //수업 제목
  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentIntro = e.target.value;
    setTitle(currentIntro);
    setTitleCount(e.target.value.length);
    if (currentIntro !== '') {
      setIsTitleChecked(true);
    } else {
      setIsTitleChecked(false);
    }
  };

  //Genre 박스 열기
  const onClickOpenBox = () => {
    setIsClicked(!isClicked);
  };

  //수업 추가 설명
  const handleChangeClassContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentClassContent = e.target.value;
    setClassContent(currentClassContent);
  };

  const handleChangeClassUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentClassUser = e.target.value;
    setClassUser(currentClassUser);
  };

  const handleChangeClassIntro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentClassIntro = e.target.value;
    setClassIntro(currentClassIntro);
  };

  //수업 장소 찾기
  const handleChangeLocation = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? `${extraAddress}` : '';
    }
    setLocation({ ...location, address: fullAddress });
    setIsLocationChecked(true);
    setIsOpenLocation(false);
    document.body.style.overflow = 'unset';
  };

  const openLocationModal = () => {
    setIsOpenLocation(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLocationModal = () => {
    setIsOpenLocation(false);
    document.body.style.overflow = 'unset';
  };

  //수강료
  const handleChangeClassFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentClassFee = e.target.value;
    setClassFee(currentClassFee);
    if (currentClassFee !== '') {
      setIsClassFeeChecked(true);
    } else {
      setIsClassFeeChecked(false);
    }
  };

  //수용 인원
  const handleChangeClassAdmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentClassAdmit = e.target.value;
    setClassAdmit(currentClassAdmit);
    if (currentClassAdmit !== '') {
      setIsClassAdmitChecked(true);
    } else {
      setIsClassAdmitChecked(false);
    }
  };

  //수업 노래
  const handleChangeClassSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentClassSong = e.target.value;
    setClassSong(currentClassSong);
  };

  //수업 링크
  const handleChangeClassLink = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentClassLink = e.target.value;
    setClassLink(currentClassLink);
  };

  //GenreList & ClassLevel check
  useEffect(() => {
    if (genreList.length !== 1) {
      setIsGenreListChecked(true);
    } else {
      setIsGenreListChecked(false);
    }

    if (classLevel !== '') {
      setIsClassLevelChecked(true);
    } else {
      setIsClassLevelChecked(false);
    }
  }, [genreList, classLevel]);

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={`${styleModal.container} ${styleModal.black}`}>
        <div className={styleModal.modalCloseBox}>
          <button className={styleModal.modalClose} onClick={closeModal}>
            <Close />
          </button>
        </div>
        <div className={styles.inputList}>
          <div className={styles.section}>
            <IndicatorFirst />
            <div className={styles.sectionText}>수업을 소개해주세요</div>
            <div className={styles.box}>
              <div className={styles.maximum}>
                <div className={styles.required}>
                  <div className={styles.text}>수업 제목</div>
                  <div className={styles.pointText}>*</div>
                </div>
                <div className={styles.smallTexts}>
                  <div className={`${styles.smallText} ${styles.pointText}`}>
                    {titleCount}
                  </div>
                  <div className={styles.smallText}>/50</div>
                </div>
              </div>
              <Textarea
                className={`${styles.input} ${styles.textarea} ${styles.long}`}
                placeholder="수업에 대한 간단한 소개를 담아주세요"
                value={title}
                onChange={handleChangeTitle}
                maxLength={50}
                cacheMeasurements
              />
            </div>
            <div className={styles.box}>
              <div className={styles.maximum}>
                <div className={styles.required}>
                  <div className={styles.text}>수업 장르</div>
                  <div className={styles.pointText}>*</div>
                </div>
                <div className={styles.smallTexts}>
                  <div className={`${styles.smallText} ${styles.spacing}`}>
                    최대
                  </div>
                  <div className={`${styles.smallText} ${styles.pointText}`}>
                    5
                  </div>
                  <div className={styles.smallText}>개</div>
                </div>
              </div>
              {isClicked ? (
                <>
                  <button
                    className={`${styles.input} ${styles.genre} ${styles.after}`}
                    onClick={onClickOpenBox}
                  >
                    댄스 장르를 선택해주세요
                  </button>

                  <DanceGenre
                    list={genreList}
                    setList={setGenreList}
                    isFull={isFull}
                    setIsFull={setIsFull}
                    limit={6}
                  />
                </>
              ) : (
                <>
                  <button
                    className={`${styles.input} ${styles.genre} ${styles.before}`}
                    onClick={onClickOpenBox}
                  >
                    댄스 장르를 선택해주세요
                  </button>
                </>
              )}
            </div>
            <HashTag
              hashTag={hashTag}
              setHashTag={setHashTag}
              hashTagList={hashTagList}
              setHashTagList={setHashTagList}
              title="수업을 소개하는 해시태그"
            />
            <div className={styles.box}>
              <div className={styles.text}>수업 추가 설명</div>
              <div>
                <input
                  className={`${styles.input} ${styles.long}`}
                  placeholder="이런 것들을 배울 거예요"
                  type="text"
                  value={classContent}
                  onChange={handleChangeClassContent}
                />
                <input
                  className={`${styles.input} ${styles.long}`}
                  placeholder="이런 분들을 위한 레슨이에요"
                  type="text"
                  value={classUser}
                  onChange={handleChangeClassUser}
                />
                <input
                  className={`${styles.input} ${styles.long}`}
                  placeholder="드리는 인사말"
                  type="text"
                  value={classIntro}
                  onChange={handleChangeClassIntro}
                />
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.required}>
                <div className={styles.text}>수업 장소</div>
                <div className={styles.pointText}>*</div>
              </div>
              {isOpenLocation && (
                <div style={{ display: isOpenLocation ? 'block' : 'none' }}>
                  <div
                    className={`${styleModal.locationContainer} ${styleModal.white}`}
                  >
                    <div className={styleModal.modalCloseBox}>
                      <button
                        className={styleModal.modalClose}
                        onClick={closeLocationModal}
                      >
                        <Close />
                      </button>
                    </div>
                    <div className={styles.postCode}>
                      <DaumPostcode
                        onComplete={handleChangeLocation}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <input
                className={`${styles.input} ${styles.long} ${styles.clickLocation}`}
                placeholder="수업 장소를 입력해주세요"
                type="text"
                onClick={openLocationModal}
                defaultValue={location.address}
              />
            </div>
            <div className={styles.box}>
              <div className={styles.required}>
                <div className={styles.textForSelect}>수업 난이도</div>
                <div className={styles.pointText}>*</div>
              </div>
              <Select
                list={levelList}
                votedItem={classLevel}
                setVotedItem={setClassLevel}
              />
            </div>
            <div className={styles.box}>
              <div className={styles.required}>
                <div className={styles.text}>수강료</div>
                <div className={styles.pointText}>*</div>
              </div>
              <div className={styles.detail}>
                클래스 1회 당 수강료를 입력해주세요.
              </div>
              <div className={styles.required}>
                <input
                  className={`${styles.input} ${styles.long}`}
                  placeholder="금액을 입력해주세요"
                  type="text"
                  value={classFee}
                  onChange={handleChangeClassFee}
                />
                <div className={styles.unitText}>원</div>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.required}>
                <div className={styles.text}>수업 총원</div>
                <div className={styles.pointText}>*</div>
              </div>
              <div className={styles.required}>
                <input
                  className={`${styles.input} ${styles.long}`}
                  placeholder="수업 총원을 입력해주세요"
                  type="text"
                  value={classAdmit}
                  onChange={handleChangeClassAdmit}
                />
                <div className={styles.unitText}>명</div>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.text}>수업 노래</div>
              <input
                className={`${styles.input} ${styles.long}`}
                placeholder="♫ 수업에 진행할 노래를 추가해주세요"
                type="text"
                value={classSong}
                onChange={handleChangeClassSong}
              />
            </div>
          </div>
          <div className={styles.section}>
            <IndicatorSecond />
            <div className={styles.sectionText}>
              수업방식 & 수업날짜를 선택해주세요
            </div>
            <div className={styles.box}>
              <div className={styles.textForSelect}>수업 방식</div>
              <Select
                list={wayList}
                votedItem={classWay}
                setVotedItem={setClassWay}
              />
            </div>
            {classWay == '' ? (
              <></>
            ) : (
              <>
                {classWay == '원데이' ? (
                  <div className={styles.box}>
                    <div className={styles.text}>수업 날짜</div>
                    <ClassDate
                      selectDate={classDate}
                      setSelectDate={setClassDate}
                    />
                  </div>
                ) : (
                  <div className={styles.box}>
                    <div className={styles.text}>수업 요일</div>
                    <ClassDay list={classDayList} setList={setClassDayList} />
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.section}>
            <IndicatorThird />
            <div className={`${styles.sectionText} ${styles.sectionTextWidth}`}>
              수업 소개 영상 & 예약 링크를 업로드해주세요
            </div>
            <div className={styles.box}>
              <div className={styles.text}>예약 링크</div>
              <div className={styles.detail}>
                구글폼, 네이버 예약 등 수업 예약 URL을 첨부해주세요
              </div>
              <Textarea
                className={`${styles.input} ${styles.textarea} ${styles.long}`}
                placeholder="https://"
                value={classLink}
                onChange={handleChangeClassLink}
                cacheMeasurements
              />
            </div>
            <div className={styles.box}>
              <UploadVideo
                video={video}
                setVideo={setVideo}
                title="소개 영상 업로드"
              />
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styleButton.buttonSpace}>
            {isTitleChecked &&
            isGenreListChecked &&
            isLocationChecked &&
            isClassLevelChecked &&
            isClassFeeChecked &&
            isClassAdmitChecked ? (
              <button
                className={`${styleButton.CTALarge} ${styleButton.beforeCTA}`}
              >
                수업 올리기
              </button>
            ) : (
              <button
                className={`${styleButton.CTALarge} ${styleButton.afterCTA}`}
              >
                수업 올리기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
