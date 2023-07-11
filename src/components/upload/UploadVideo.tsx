import { useRef, useMemo, useState } from 'react';
import styles from '../../styles/UploadPage.module.css';
import { IUploadFile } from '../../types/upload';
import Plus from '../../../public/assets/icons/plus.svg';
import Dot from '../../../public/assets/icons/dot.svg';

interface uploadVideoProps {
  video: IUploadFile | null;
  setVideo: React.Dispatch<React.SetStateAction<IUploadFile | null>>;
  title: string;
}

export default function UploadVideo({
  video,
  setVideo,
  title,
}: uploadVideoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isVideo, setIsVideo] = useState<boolean>(false);

  const onClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const onClickFileDelete = () => {
    setIsClicked(!isClicked);
  };

  const handleUploadVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);
      setVideo({
        file: fileList[0],
        thumnail: url,
        type: fileList[0].type.slice(0, 5),
      });
      setIsVideo(!isVideo);
    }
  };

  const deleteVideo = () => {
    setVideo(null);
    setIsVideo(!isVideo);
    setIsClicked(!isClicked);
  };

  const showVideo = useMemo(() => {
    if (!video && video == null) {
      return (
        <div
          className={`${styles.blank} ${styles.video}`}
          onClick={onClickFileInput}
        >
          <div className={styles.videoButton}>
            <Plus />
            영상 업로드하기
          </div>
        </div>
      );
    }
    return <video className={styles.video} src={video.thumnail} controls />;
  }, [video]);

  return (
    <div>
      {isVideo ? (
        <>
          <div className={styles.maximum}>
            <div className={styles.text}>{title}</div>
            <div className={styles.dot} onClick={onClickFileDelete}>
              <Dot />
            </div>
          </div>
          {isClicked ? (
            <div onClick={deleteVideo} className={styles.deleteVideo}>
              삭제하기
            </div>
          ) : (
            <></>
          )}
          {showVideo}
          <input
            className={styles.inputFile}
            type="file"
            accept="video/*"
            ref={fileInputRef}
            onChange={handleUploadVideo}
          />
        </>
      ) : (
        <>
          <>
            <div className={styles.text}>{title}</div>
          </>
          <>
            {showVideo}
            <input
              className={styles.inputFile}
              type="file"
              accept="video/*"
              ref={fileInputRef}
              onChange={handleUploadVideo}
            />
          </>
        </>
      )}
    </div>
  );
}
