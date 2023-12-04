import styles from '../../styles/Edit.module.css';
import inputStyles from '../../styles/UploadPage.module.css';
import fonts from '../../styles/typography.module.css';
import Textarea from 'react-textarea-autosize';
import EditPageHeader from '../../components/common/Header/EditPageHeader';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getMyInfo } from '@/apis/my';
import ReactPlayer from 'react-player';
import BlankImage from '../../../public/icons/blank-image.svg';
import CameraIcon from '../../../public/icons/camera-icon.svg';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import Image from 'next/image';
import DuplicationSelect from '../../components/upload/DuplicationSelect';
import { IDuplicationList, IList } from '@/types/upload';
import { allGenreList } from '@/data/class-data';
import HashTag from '@/components/upload/HashTag';
import ToastMsg from '@/components/upload/ToastMsg';

export default function EditPage() {
  const [image, setImage] = useState<File>();
  const [profiles, setProfiles] = useState<any>([]);
  const [fileList, setFileList] = useState<string>('');
  const [video, setVideo] = useState<any>([]);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [videoFileList, setVideoFileList] = useState<string>('');
  const [dancerName, setDancerName] = useState<string>('');
  const [introCount, setIntroCount] = useState<number>(0);
  const [intro, setIntro] = useState<string>('');
  const [genreList, setGenreList] = useState<IDuplicationList[]>([]);
  const [isGenreFull, setIsGenreFull] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [hashTag, setHashTag] = useState<string>('');
  const [hashTagList, setHashTagList] = useState<IList[]>([
    { id: 0, name: '' },
  ]);
  const [isHashTagFull, setIsHashTagFull] = useState<boolean>(false);

  const user = useRecoilValue(userState);
  const accessToken = user.accessToken;

  //에러 메시지, 확인 메시지 state
  const [dancerNameMsg, setDancerNameMsg] = useState<string>('');

  //유효성 검사 state (Checked => 형식, Valid => 중복)
  const [isdancerNameChecked, setIsDancerNameChecked] =
    useState<boolean>(false);

  //profile
  const getMyInfoMutation = useMutation(getMyInfo, {
    onSuccess: data => {
      console.log(data.data);
      setProfiles(data.data);
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    getMyInfoMutation.mutate(accessToken);
  }, [accessToken]);

  //image 미리보기
  const fileInputRef = useRef<HTMLInputElement>(null);
  //video 미리보기
  const fileInputVideoRef = useRef<HTMLInputElement>(null);

  const onClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const onClickVideoFileInput = () => {
    fileInputVideoRef.current?.click();
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = data => {
      if (typeof data.target?.result === 'string') {
        //console.log(data.target?.result); // file을 url 형태로 읽은 결과물이다.
        setFileList(data.target?.result); // 미리보기를 위한 *임시 url* (Blob 형태)
        setImage(file); // uploadFile API에 보내기 위한 url

        //console.log(image);
      }
    };
  };

  const handleUploadVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = data => {
      if (typeof data.target?.result === 'string') {
        //console.log(data.target?.result); // file을 url 형태로 읽은 결과물이다.
        setVideoFileList(data.target?.result); // 미리보기를 위한 *임시 url* (Blob 형태)
        setVideo(file); // uploadFile API에 보내기 위한 url

        //console.log(video);
        setIsVideo(!isVideo);
      }
    };
  };

  const showImage = () => {
    return (
      <div className={styles.profileImg}>
        {!fileList && fileList == '' ? (
          <>
            {profiles.profileImageUrl == null ? (
              <BlankImage
                alt="blank"
                width={100}
                heigth={100}
                className={styles.profileImg}
              />
            ) : (
              <img
                src={profiles.profileImageUrl}
                alt={profiles.profileImageUrl}
                width={100}
                height={100}
                className={styles.profileImg}
              />
            )}
          </>
        ) : (
          <Image
            src={fileList}
            alt={fileList}
            width={100}
            height={100}
            className={styles.profileImg}
          />
        )}
      </div>
    );
  };

  const showVideo = () => {
    return (
      <>
        {!videoFileList && videoFileList == '' ? (
          <>
            {profiles.profileVideoUrl == null ? (
              <div className={styles.backBlankVideo}></div>
            ) : (
              <div className={styles.backVideoPlayer}>
                <ReactPlayer
                  url={profiles.profileVideoUrl}
                  playing
                  loop
                  muted
                  width="100%"
                />
              </div>
            )}
          </>
        ) : (
          <div className={styles.backVideoPlayer}>
            <ReactPlayer url={videoFileList} playing loop muted width="100%" />
          </div>
        )}
        <input
          className={styles.inputFile}
          type="file"
          accept="video/*"
          ref={fileInputVideoRef}
          onChange={handleUploadVideo}
        />
        <div className={styles.videoBtn} onClick={onClickVideoFileInput}>
          <CameraIcon className={styles.cameraIcon} />
        </div>
      </>
    );
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

  return (
    <>
      <EditPageHeader />
      <div className={styles.container}>
        <div className={styles.profilePart}>
          <div className={styles.backVideo}>{showVideo()}</div>
          <div className={styles.paddingContainer}>
            <div>{showImage()}</div>
            <input
              className={styles.inputFile}
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleUploadImage}
            />
            <div className={styles.imgBtn}>
              <CameraIcon
                onClick={onClickFileInput}
                className={styles.cameraIcon}
              />
            </div>{' '}
          </div>
        </div>
        <div className={styles.inputList}>
          <div className={styles.paddingContainer}>
            <div className={inputStyles.box}>
              <div className={`${inputStyles.text} ${fonts.body1_SemiBold}`}>
                댄서 활동명
              </div>
              <input
                className={`${inputStyles.input} ${inputStyles.long} ${fonts.body2_Regular}`}
                placeholder="한글, 영문, 숫자, 특수기호 입력 가능합니다 (1-14자)"
                type="text"
                value={dancerName}
                onChange={handleChangeDancerName}
              />
              <div
                className={`${inputStyles.errorText} ${fonts.caption1_Regular}`}
              >
                {dancerNameMsg}
              </div>
            </div>
            <div className={inputStyles.box}>
              <div className={inputStyles.row_Between}>
                <div className={`${inputStyles.text} ${fonts.body1_SemiBold}`}>
                  한줄 소개
                </div>
                <div
                  className={`${inputStyles.smallTexts} ${fonts.caption1_Regular}`}
                >
                  <div className={inputStyles.pointText}>{introCount}</div>
                  <div className={inputStyles.smallText}>/80</div>
                </div>
              </div>
              <Textarea
                className={`${inputStyles.input} ${inputStyles.textarea} ${inputStyles.long} ${fonts.body2_Regular}`}
                placeholder="ex.저는 댄서경력 10년차 프로댄서입니다"
                value={intro}
                onChange={handleChangeIntro}
                maxLength={79}
                cacheMeasurements
              />
            </div>
            <div className={inputStyles.box}>
              <div className={inputStyles.row_Between}>
                <div className={`${inputStyles.text} ${fonts.body1_SemiBold}`}>
                  나의 장르
                </div>
                <div
                  className={`${inputStyles.smallTexts} ${fonts.caption1_Regular}`}
                >
                  <div
                    className={`${inputStyles.smallText} ${inputStyles.spacing}`}
                  >
                    최대
                  </div>
                  <div className={inputStyles.pointText}>3</div>
                  <div className={inputStyles.smallText}>개</div>
                </div>
              </div>
              {isClicked ? (
                <>
                  <button
                    className={`${inputStyles.input} ${inputStyles.genre} ${inputStyles.after} ${fonts.body2_Regular}`}
                    onClick={onClickOpenBox}
                  >
                    나의 댄스 장르를 선택해주세요
                  </button>
                  <DuplicationSelect
                    allList={allGenreList}
                    list={genreList}
                    setList={setGenreList}
                    isFull={isGenreFull}
                    setIsFull={setIsGenreFull}
                    limit={4}
                  />
                </>
              ) : (
                <>
                  <button
                    className={`${inputStyles.input} ${inputStyles.genre} ${inputStyles.before} ${fonts.body2_Regular}`}
                    onClick={onClickOpenBox}
                  >
                    나의 댄스 장르를 선택해주세요
                  </button>
                </>
              )}
            </div>
            <HashTag
              hashTag={hashTag}
              setHashTag={setHashTag}
              hashTagList={hashTagList}
              setHashTagList={setHashTagList}
              title="나를 소개하는 해시태그"
              isFull={isHashTagFull}
              setIsFull={setIsHashTagFull}
            />
          </div>
          <ToastMsg
            isOpen={isGenreFull}
            setIsOpen={setIsGenreFull}
            msg="나의 장르는 최대 3개까지 선택 가능합니다."
            isEdit
          />

          <ToastMsg
            isOpen={isHashTagFull}
            setIsOpen={setIsHashTagFull}
            msg=" 해시태그는 최대 3개까지 선택 가능합니다."
            isEdit
          />
        </div>
      </div>
    </>
  );
}
