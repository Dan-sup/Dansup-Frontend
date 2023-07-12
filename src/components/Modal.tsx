import Close from '../../public/icons/close.svg';
import styles from '../styles/Modal.module.css';

interface modalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function Modal({ isOpen, closeModal }: modalProps) {
  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={styles.container}>
        <button onClick={closeModal}>
          <Close />
        </button>
        <p>Modal</p>
      </div>
    </div>
  );
}
