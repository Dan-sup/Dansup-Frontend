import styles from '../../styles/components/ClassDetailPage/Hashtag.module.css';
import typoStyles from '../../styles/typography.module.css';

interface HashtagProps {
  text: string;
}

export default function Hashtag({ text }: HashtagProps) {
  return (
    text && (
      <div className={`${styles.hashtag} ${typoStyles.body2_Regular}`}>
        #{text}
      </div>
    )
  );
}
