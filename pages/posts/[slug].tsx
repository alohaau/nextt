import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import postStyles from '../../styles/Post.module.css'
import articleStyles from '../../styles/article.module.css'

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
    <div className={postStyles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={articleStyles.article}>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  )
}
