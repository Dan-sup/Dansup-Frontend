import { useState, useEffect } from 'react';
import Textarea from 'react-textarea-autosize';
import Close from '../../../public/icons/close.svg';
import IndicatorFirst from '../../../public/icons/indicator-first.svg';
import IndicatorSecond from '../../../public/icons/indicator-second.svg';
import IndicatorThird from '../../../public/icons/indicator-third.svg';
import fonts from '../../styles/typography.module.css';
import buttonStyles from '../../styles/Button.module.css';
import modalStyles from '../../styles/Modal.module.css';
import styles from '../../styles/UploadPage.module.css';
import { IList, IGenreList } from '@/types/upload';
import DanceGenre from '../upload/DanceGenre';
import DaumPostcode, { Address } from 'react-daum-postcode';
import HashTag from '../upload/HashTag';
import Select from '../upload/Select';
import UploadVideo from '../upload/UploadVideo';
import ClassDate from '../upload/ClassDate';
import ClassDay from '../upload/ClassDay';
import ClassTime from '../upload/ClassTime';
import ToastMsg from '../upload/ToastMsg';
import { levelList, wayList } from '@/data/class-data';
import { postClassInfo } from '@/apis/my';
import { useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';

interface classUploadProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function ClassUpload({ isOpen, closeModal }: classUploadProps) {
  const [titleCount, setTitleCount] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [genreList, setGenreList] = useState<IGenreList[]>([]);
  const [isGenreFull, setIsGenreFull] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [hashTag, setHashTag] = useState<string>('');
  const [hashTagList, setHashTagList] = useState<IList[]>([
    { id: 0, name: '' },
  ]);
  const [isHashTagFull, setIsHashTagFull] = useState<boolean>(false);
  const [classContent, setClassContent] = useState<string>('');
  const [classUser, setClassUser] = useState<string>('');
  const [classIntro, setClassIntro] = useState<string>('');
  const [location, setLocation] = useState<IList>({ id: 0, name: '' });
  const [isOpenLocation, setIsOpenLocation] = useState<boolean>(false);
  const [classLevel, setClassLevel] = useState<string>('');
  const [classFee, setClassFee] = useState<number>();
  const [classAdmit, setClassAdmit] = useState<number>();
  const [classSong, setClassSong] = useState<string>('');
  const [selectWayClickIndex, setSelectWayClickIndex] = useState<number>(5);
  const [selectLevelClickIndex, setSelectLevelClickIndex] = useState<number>(5);
  const [classWay, setClassWay] = useState<string>('');
  const [classDate, setClassDate] = useState<string>('');
  const [startHour, setStartHour] = useState<number>(0);
  const [startTime, setStartTime] = useState<string>('');
  const [endHour, setEndHour] = useState<number>(0);
  const [endTime, setEndTime] = useState<string>('');
  const [classDayList, setClassDayList] = useState<IList[]>([
    { id: 0, name: '' },
  ]);
  const [monday, setMonday] = useState<boolean>(false);
  const [tuesday, setTuesday] = useState<boolean>(false);
  const [wednesday, setWednesday] = useState<boolean>(false);
  const [thursday, setThursday] = useState<boolean>(false);
  const [friday, setFriday] = useState<boolean>(false);
  const [saturday, setSaturday] = useState<boolean>(false);
  const [sunday, setSunday] = useState<boolean>(false);

  const [video, setVideo] = useState<File | undefined>();
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
  const [isLinkChecked, setIsLinkChecked] = useState<boolean>(false);
  const [isVideoChecked, setIsVideoChecked] = useState<boolean>(false);

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
    setLocation({ ...location, name: fullAddress });
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
    const currentClassFee = Number(e.target.value);
    setClassFee(currentClassFee);
    if (currentClassFee !== null) {
      setIsClassFeeChecked(true);
    } else {
      setIsClassFeeChecked(false);
    }
  };

  //수용 인원
  const handleChangeClassAdmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentClassAdmit = Number(e.target.value);
    setClassAdmit(currentClassAdmit);
    if (currentClassAdmit !== null) {
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
    if (currentClassLink !== '') {
      setIsLinkChecked(true);
    } else {
      setIsLinkChecked(false);
    }
  };

  //GenreList & ClassLevel check
  useEffect(() => {
    if (genreList.length !== 0) {
      setIsGenreListChecked(true);
    } else {
      setIsGenreListChecked(false);
    }

    if (classLevel !== '') {
      setIsClassLevelChecked(true);
    } else {
      setIsClassLevelChecked(false);
    }

    if (video !== undefined) {
      setIsVideoChecked(true);
    } else {
      setIsVideoChecked(false);
    }

    if (classDayList.filter(item => item.name == '월').length !== 0) {
      setMonday(true);
    }

    if (classDayList.filter(item => item.name == '화').length !== 0) {
      setTuesday(true);
    }

    if (classDayList.filter(item => item.name == '수').length !== 0) {
      setWednesday(true);
    }

    if (classDayList.filter(item => item.name == '목').length !== 0) {
      setThursday(true);
    }

    if (classDayList.filter(item => item.name == '금').length !== 0) {
      setFriday(true);
    }

    if (classDayList.filter(item => item.name == '토').length !== 0) {
      setSaturday(true);
    }

    if (classDayList.filter(item => item.name == '일').length !== 0) {
      setSunday(true);
    }

    setStartHour(parseInt(startTime));
    setEndHour(parseInt(endTime));
  }, [genreList, classLevel, video, classDayList, startTime, endTime]);

  //api
  const user = useRecoilValue(userState);
  const accessToken = user.accessToken;

  const classUploadMutation = useMutation(postClassInfo, {
    onSuccess: data => {
      console.log(data);
      alert('업로드 되었습니다');
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append(
      'createDanceClassDto',
      new Blob(
        [
          JSON.stringify({
            days: {
              fri: friday,
              mon: monday,
              sat: saturday,
              sun: sunday,
              thu: thursday,
              tue: tuesday,
              wed: wednesday,
            },
            detail1: classContent !== '' ? classContent : null,
            detail2: classUser !== '' ? classUser : null,
            detail3: classIntro !== '' ? classIntro : null,
            difficulty: classLevel,
            endHour: endTime !== '' ? endHour : null,
            endTime: endTime !== '' ? endTime : null,
            genres: genreList,
            hashtag1:
              hashTagList[1]?.name !== undefined ? hashTagList[1]?.name : null,
            hashtag2:
              hashTagList[2]?.name !== undefined ? hashTagList[2]?.name : null,
            hashtag3:
              hashTagList[3]?.name !== undefined ? hashTagList[3]?.name : null,
            location: location.name,
            maxPeople: classAdmit,
            method: classWay !== '' ? classWay : null,
            reserveLink: classLink,
            song: classSong !== '' ? classSong : null,
            startHour: startTime !== '' ? startHour : null,
            startTime: startTime !== '' ? startTime : null,
            title: title,
            tuition: classFee,
            date: classDate !== '' ? classDate : null,
          }),
        ],
        { type: 'application/json' },
      ),
    );
    if (video instanceof File) {
      formData.append('videoFile', video);
    }
    for (const keyValue of formData) console.log(keyValue);

    classUploadMutation.mutate({
      formData: formData,
      accessToken: accessToken,
    });
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={`${modalStyles.container} ${modalStyles.black}`}>
        <div
          className={`${modalStyles.modalCloseBox} ${modalStyles.paddingContainer}`}
        >
          <button className={modalStyles.modalClose} onClick={closeModal}>
            <Close />
          </button>
        </div>
        <div
          className={`${modalStyles.modalBody}  ${modalStyles.paddingContainer} `}
        >
          <div className={styles.inputList}>
            <div>
              <IndicatorFirst />
              <div className={`${styles.sectionText} ${fonts.head1}`}>
                수업을 소개해주세요
              </div>
              <div className={styles.box}>
                <div className={styles.row_Between}>
                  <div className={styles.row}>
                    <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                      수업 제목
                    </div>
                    <div className={styles.pointText}>*</div>
                  </div>
                  <div
                    className={`${styles.smallTexts} ${fonts.caption1_Regular}`}
                  >
                    <div className={`${styles.pointText}`}>{titleCount}</div>
                    <div className={styles.smallText}>/50</div>
                  </div>
                </div>
                <Textarea
                  className={`${styles.input} ${styles.textarea} ${styles.long} ${fonts.body2_Regular}`}
                  placeholder="수업에 대한 간단한 소개를 담아주세요"
                  value={title}
                  onChange={handleChangeTitle}
                  maxLength={50}
                  cacheMeasurements
                />
              </div>
              <div className={styles.box}>
                <div className={styles.row_Between}>
                  <div className={styles.row}>
                    <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                      수업 장르
                    </div>
                    <div className={styles.pointText}>*</div>
                  </div>
                  <div
                    className={`${styles.smallTexts} ${fonts.caption1_Regular}`}
                  >
                    <div className={`${styles.smallText} ${styles.spacing}`}>
                      최대
                    </div>
                    <div className={styles.pointText}>5</div>
                    <div className={styles.smallText}>개</div>
                  </div>
                </div>
                {isClicked ? (
                  <>
                    <button
                      className={`${styles.input} ${styles.genre} ${styles.after} ${fonts.body2_Regular}`}
                      onClick={onClickOpenBox}
                    >
                      댄스 장르를 선택해주세요
                    </button>

                    <DanceGenre
                      list={genreList}
                      setList={setGenreList}
                      isFull={isGenreFull}
                      setIsFull={setIsGenreFull}
                      limit={6}
                    />
                  </>
                ) : (
                  <>
                    <button
                      className={`${styles.input} ${styles.genre} ${styles.before} ${fonts.body2_Regular}`}
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
                isFull={isHashTagFull}
                setIsFull={setIsHashTagFull}
              />
              <div className={styles.box}>
                <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                  수업 추가 설명
                </div>
                <div>
                  <input
                    className={`${styles.input} ${styles.long} ${fonts.body2_Regular}`}
                    placeholder="이런 것들을 배울 거예요"
                    type="text"
                    value={classContent}
                    onChange={handleChangeClassContent}
                  />
                  <input
                    className={`${styles.input} ${styles.long} ${fonts.body2_Regular}`}
                    placeholder="이런 분들을 위한 레슨이에요"
                    type="text"
                    value={classUser}
                    onChange={handleChangeClassUser}
                  />
                  <input
                    className={`${styles.input} ${styles.long} ${fonts.body2_Regular}`}
                    placeholder="드리는 인사말"
                    type="text"
                    value={classIntro}
                    onChange={handleChangeClassIntro}
                  />
                </div>
              </div>
              <div className={styles.box}>
                <div className={styles.row}>
                  <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                    수업 장소
                  </div>
                  <div className={styles.pointText}>*</div>
                </div>
                {isOpenLocation && (
                  <div style={{ display: isOpenLocation ? 'block' : 'none' }}>
                    <div
                      className={`${modalStyles.container} ${modalStyles.paddingContainer} ${modalStyles.white} ${modalStyles.withoutScroll}`}
                    >
                      <div className={modalStyles.modalCloseBox}>
                        <button
                          className={modalStyles.modalClose}
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
                  className={`${styles.input} ${styles.long} ${styles.click_Postcode} ${fonts.body2_Regular}`}
                  placeholder="수업 장소를 입력해주세요"
                  type="text"
                  onClick={openLocationModal}
                  defaultValue={location.name}
                />
              </div>
              <div className={styles.box}>
                <div className={styles.row}>
                  <div className={fonts.body1_SemiBold}>수업 난이도</div>
                  <div className={styles.pointText}>*</div>
                </div>
                <Select
                  list={levelList}
                  votedItem={classLevel}
                  setVotedItem={setClassLevel}
                  clickIndex={selectLevelClickIndex}
                  setClickIndex={setSelectLevelClickIndex}
                />
              </div>
              <div className={styles.box}>
                <div className={styles.row}>
                  <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                    수강료
                  </div>
                  <div className={styles.pointText}>*</div>
                </div>
                <div className={`${styles.detailText} ${fonts.body2_Regular}`}>
                  클래스 1회 당 수강료를 입력해주세요.
                </div>
                <div className={styles.row}>
                  <input
                    className={`${styles.input} ${styles.long} ${fonts.body2_Regular}`}
                    placeholder="금액을 입력해주세요"
                    type="number"
                    value={classFee}
                    onChange={handleChangeClassFee}
                  />
                  <div className={fonts.body2_Regular}>원</div>
                </div>
              </div>
              <div className={styles.box}>
                <div className={styles.row}>
                  <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                    수업 총원
                  </div>
                  <div className={styles.pointText}>*</div>
                </div>
                <div className={styles.row}>
                  <input
                    className={`${styles.input} ${styles.long} ${fonts.body2_Regular}`}
                    placeholder="수업 총원을 입력해주세요"
                    type="text"
                    value={classAdmit}
                    onChange={handleChangeClassAdmit}
                  />
                  <div className={fonts.body2_Regular}>명</div>
                </div>
              </div>
              <div className={styles.box}>
                <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                  수업 노래
                </div>
                <input
                  className={`${styles.input} ${styles.long} ${fonts.body2_Regular}`}
                  placeholder="♫ 수업에 진행할 노래를 추가해주세요"
                  type="text"
                  value={classSong}
                  onChange={handleChangeClassSong}
                />
              </div>
            </div>
            <div>
              <IndicatorSecond />
              <div className={`${styles.sectionText} ${fonts.head1}`}>
                수업방식 & 수업날짜를 선택해주세요
              </div>
              <div className={styles.box}>
                <div className={fonts.body1_SemiBold}>수업 방식</div>
                <Select
                  list={wayList}
                  votedItem={classWay}
                  setVotedItem={setClassWay}
                  clickIndex={selectWayClickIndex}
                  setClickIndex={setSelectWayClickIndex}
                />
              </div>
              {classWay !== '' ? (
                <>
                  {classWay == 'OD' ? (
                    <div className={styles.box}>
                      <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                        수업 날짜
                      </div>
                      <div onClick={() => console.log(classDate)}>
                        <ClassDate
                          selectDate={classDate}
                          setSelectDate={setClassDate}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={styles.box}>
                      <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                        수업 요일
                      </div>
                      <ClassDay list={classDayList} setList={setClassDayList} />
                    </div>
                  )}
                  <div className={styles.box}>
                    <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                      수업 시간
                    </div>
                    <div onClick={() => console.log(startTime)}>
                      <ClassTime
                        startTime={startTime}
                        setStartTime={setStartTime}
                        endTime={endTime}
                        setEndTime={setEndTime}
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            <div>
              <IndicatorThird />
              <div
                className={`${styles.sectionText} ${styles.sectionTextWidth} ${fonts.head1}`}
              >
                수업 소개 영상 & 예약 링크를 업로드해주세요
              </div>
              <div className={styles.box}>
                <div className={styles.row}>
                  <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                    예약 링크
                  </div>
                  <div className={styles.pointText}>*</div>
                </div>
                <div className={`${styles.detailText} ${fonts.body2_Regular}`}>
                  구글폼, 네이버 예약 등 수업 예약 URL을 첨부해주세요
                </div>
                <Textarea
                  className={`${styles.input} ${styles.textarea} ${styles.long} ${fonts.body2_Regular}`}
                  placeholder="https://"
                  value={classLink}
                  onChange={handleChangeClassLink}
                  cacheMeasurements
                />
              </div>
              <div className={styles.box}>
                <UploadVideo
                  isImportant={true}
                  video={video}
                  setVideo={setVideo}
                  title="소개 영상 업로드"
                />
              </div>
            </div>
          </div>

          <ToastMsg
            isOpen={isGenreFull}
            setIsOpen={setIsGenreFull}
            msg="나의 장르는 최대 5개까지 선택 가능합니다."
          />

          <ToastMsg
            isOpen={isHashTagFull}
            setIsOpen={setIsHashTagFull}
            msg=" 해시태그는 최대 3개까지 선택 가능합니다."
          />

          <div className={styles.bottom}>
            <div className={buttonStyles.buttonSpace}>
              {isTitleChecked &&
              isGenreListChecked &&
              isLocationChecked &&
              isClassLevelChecked &&
              isClassFeeChecked &&
              isClassAdmitChecked &&
              isLinkChecked &&
              isVideoChecked ? (
                <button
                  onClick={handleSubmit}
                  className={`${buttonStyles.CTA_Large} ${buttonStyles.before} ${fonts.body1_SemiBold}`}
                >
                  수업 올리기
                </button>
              ) : (
                <button
                  className={`${buttonStyles.CTA_Large} ${buttonStyles.after} ${fonts.body1_SemiBold}`}
                >
                  수업 올리기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
