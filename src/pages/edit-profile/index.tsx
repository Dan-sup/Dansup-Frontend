import styles from '../../styles/Edit.module.css';
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

export default function EditPage() {
  const [image, setImage] = useState<File>();
  const [profiles, setProfiles] = useState<any>([]);
  const [fileList, setFileList] = useState<string>('');
  const [video, setVideo] = useState<any>([]);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [videoFileList, setVideoFileList] = useState<string>('');

  const user = useRecoilValue(userState);
  const accessToken = user.accessToken;

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
              <BlankImage alt="blank" width={100} heigth={100} />
            ) : (
              <img
                src={profiles.profileImageUrl}
                alt={profiles.profileImageUrl}
                width={100}
                height={100}
              />
            )}
          </>
        ) : (
          <Image src={fileList} alt={fileList} width={100} height={100} />
        )}
      </div>
    );
  };

  const showVideo = () => {
    return (
      <div className={styles.backVideo}>
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
      </div>
    );
  };

  return (
    <>
      <EditPageHeader />
      <div className={styles.container}>
        <div className={styles.profilePart}>
          {showVideo()}
          <div className={styles.paddingContainer}>
            <div className={styles.profileImg}>{showImage()}</div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
