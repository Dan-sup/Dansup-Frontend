import { useRef, useMemo, useState } from 'react';
import styles from '../../styles/UploadPage.module.css';
import fonts from '../../styles/typography.module.css';
import Plus from '../../../public/icons/plus.svg';
import Play from '../../../public/icons/play.svg';
import Dot from '../../../public/icons/dot.svg';
import ReactPlayer from 'react-player';

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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [playing, setPlaying] = useState<number>(0);

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
        //console.log(data.target?.result); // file을 url 형태로 읽은 결과물이다.
        setFileList(data.target?.result); // 미리보기를 위한 *임시 url* (Blob 형태)
        setVideo(file); // uploadFile API에 보내기 위한 url

        //console.log(video);
        setIsVideo(!isVideo);
      }
    };
  };

  const deleteVideo = () => {
    setFileList('');
    setVideo(undefined);
    setIsVideo(!isVideo);
    setIsClicked(!isClicked);
  };

  const clickPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  // formatTime 함수 '분:초' 형태로 리턴
  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

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
    return (
      <>
        <div className={styles.playBox}>
          <button className={styles.play} onClick={clickPlaying}>
            <Play />
          </button>
        </div>
        <div className={styles.durationBox}>
          <div className={`${styles.duration} ${fonts.caption1_Regular}`}>
            {playing === 0
              ? formatTime(duration)
              : formatTime(playing * duration)}
          </div>
        </div>
        <ReactPlayer
          className={styles.video}
          url={fileList}
          width="100%"
          height={164}
          controls={false}
          playing={isPlaying}
          onDuration={setDuration}
          onProgress={({ played }) => {
            setPlaying(played);
          }}
        />
      </>
    );
  }, [fileList, isPlaying, playing, duration]);

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
