import { useRef, useMemo, useState } from 'react';
import styles from '../../styles/UploadPage.module.css';
import fonts from '../../styles/typography.module.css';
import Plus from '../../../public/icons/plus.svg';
import Dot from '../../../public/icons/dot.svg';

interface uploadVideoProps {
  video: File | undefined;
  setVideo: React.Dispatch<React.SetStateAction<File | undefined>>;
  title: string;
  isImportant: boolean;
}

export default function UploadVideo({
  video,
  setVideo,
  title,
  isImportant,
}: uploadVideoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [fileList, setFileList] = useState<string>('');

  const onClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const onClickFileDelete = () => {
    setIsClicked(!isClicked);
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
        console.log(data.target?.result); // file을 url 형태로 읽은 결과물이다.
        setFileList(data.target?.result); // 미리보기를 위한 *임시 url* (Blob 형태)
        setVideo(file); // uploadFile API에 보내기 위한 url
        console.log(video);
        setIsVideo(!isVideo);
      }
    };
  };

  const deleteVideo = () => {
    setFileList('');
    setIsVideo(!isVideo);
    setIsClicked(!isClicked);
  };

  const showVideo = useMemo(() => {
    if (!fileList && fileList == '') {
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
    return <video className={styles.video} src={fileList} controls />;
  }, [fileList]);

  return (
    <div>
      {isVideo ? (
        <>
          <div className={styles.row_Between}>
            {isImportant ? (
              <div className={styles.row}>
                <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                  {title}
                </div>
                <div className={styles.pointText}>*</div>
              </div>
            ) : (
              <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                {title}
              </div>
            )}
            <div className={styles.dot} onClick={onClickFileDelete}>
              <Dot />
            </div>
          </div>
          {isClicked ? (
            <button
              onClick={deleteVideo}
              className={`${styles.deleteVideo} ${fonts.body2_SemiBold}`}
            >
              삭제하기
            </button>
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
            {isImportant ? (
              <div className={styles.row}>
                <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                  {title}
                </div>
                <div className={styles.pointText}>*</div>
              </div>
            ) : (
              <div className={`${styles.text} ${fonts.body1_SemiBold}`}>
                {title}
              </div>
            )}
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
