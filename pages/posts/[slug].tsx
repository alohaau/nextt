import Layout from '@/components/Layout';
import { getPostData, getAllPostIds } from '@/lib/posts';
import styles from '../Blog.module.css';

type PostPageProps = {
  postData: {
    id: string;
    title: string;
    date: string;
    contentHtml: string;
  };
};

export default function PostPage({ postData }: PostPageProps) {
  return (
    <Layout title={postData.title}>
      <article className={styles.post}>
        <h1 className={styles.postTitle}>{postData.title}</h1>
        <div 
          className={styles.postContent} 
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}