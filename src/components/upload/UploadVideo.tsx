import { useRef, useMemo } from 'react';
import styles from '../../styles/UploadPage.module.css';
import { uploadFile } from '../../types/upload';
import Plus from '../../assets/icons/plus.svg';

interface uploadVideoProps {
  video: uploadFile | null;
  setVideo: React.Dispatch<React.SetStateAction<uploadFile | null>>;
}

export default function UploadVideo({ video, setVideo }: uploadVideoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const onUploadVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);
      setVideo({
        file: fileList[0],
        thumnail: url,
        type: fileList[0].type.slice(0, 5),
      });
    }
  };

  const showVideo = useMemo(() => {
    if (!video && video == null) {
      return (
        <div className={styles.blankVideo} onClick={handleClickFileInput}>
          <div className={styles.videoButton}>
            <Plus />
            영상 업로드하기
          </div>
        </div>
      );
    }
    return (
      <video className={styles.video} src={video.thumnail} loop autoPlay />
    );
  }, [video]);

  return (
    <div>
      {showVideo}
      <input
        className={styles.inputFile}
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={onUploadVideo}
      />
    </div>
  );
}
