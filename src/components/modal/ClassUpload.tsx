import { useState, useRef } from 'react';
import Textarea from 'react-textarea-autosize';
import Close from '../../../public/icons/close.svg';
import styleModal from '../../styles/Modal.module.css';
import styles from '../../styles/UploadPage.module.css';
import { IGenreList, IHashTagList, ILocation } from '@/types/upload';
import DanceGenre from '../upload/DanceGenre';
import DaumPostcode, { Address } from 'react-daum-postcode';
import HashTag from '../upload/HashTag';

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

  //수업 제목
  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentIntro = e.target.value;
    setTitle(currentIntro);
    setTitleCount(e.target.value.length);
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
    setIsOpenLocation(false);
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={`${styleModal.container} ${styleModal.black}`}>
        <div className={styleModal.modalCloseBox}>
          <button onClick={closeModal} className={styleModal.modalClose}>
            <Close />
          </button>
        </div>
        <div className={styles.inputList}>
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
              placeholder="수업에 대한 간단한 소개를 담아주세요."
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
                  댄스 장르를 선택해주세요.
                </button>
                <DanceGenre
                  list={genreList}
                  setList={setGenreList}
                  isFull={isFull}
                  setIsFull={setIsFull}
                />
              </>
            ) : (
              <>
                <button
                  className={`${styles.input} ${styles.genre} ${styles.before}`}
                  onClick={onClickOpenBox}
                >
                  댄스 장르를 선택해주세요.
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
                placeholder="이런 것들을 배울 거예요."
                type="text"
                value={classContent}
                onChange={handleChangeClassContent}
              />
              <input
                className={`${styles.input} ${styles.long}`}
                placeholder="이런 분들을 위한 레슨이에요."
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
                <div className={`${styleModal.container} ${styleModal.white}`}>
                  <div className={styleModal.modalCloseBox}>
                    <button
                      className={styleModal.modalClose}
                      onClick={() => setIsOpenLocation(false)}
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
              placeholder="수업 장소를 입력해주세요."
              type="text"
              onClick={() => setIsOpenLocation(true)}
              defaultValue={location.address}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
