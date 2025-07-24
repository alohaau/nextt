import Link from 'next/link';
import styles from '../pages/Blog.module.css';

type PostCardProps = {
  post: {
    id: string;
    title: string;
    date: string;
  };
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className={styles.postCard}>
      <Link href={`/posts/${post.id}`}>
        <h2 className={styles.postCardTitle}>{post.title}</h2>
        <p className={styles.postCardDate}>{post.date}</p>
      </Link>
    </article>
  );
}