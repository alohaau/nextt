import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import styles from '../../styles/Post.module.css'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.slug as string)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={styles.title}>{postData.title}</h1>
        <div className={styles.date}>{postData.date}</div>
        <div 
          className={styles.content} 
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
    </div>
  )
}