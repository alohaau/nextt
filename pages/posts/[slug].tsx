import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Link from 'next/link'
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
    readTime?: string
    category?: string
    image?: string
    contentHtml: string
  }
}) {
  return (
    <div className={articleStyles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article className={articleStyles.article}>
        <h1>{postData.title}</h1>

        <div className={articleStyles.meta}>
          <span>{postData.date}</span>
          {postData.readTime && <span> · {postData.readTime}</span>}
          {postData.category && <span> · {postData.category}</span>}
        </div>

        {postData.image && (
          <img src={postData.image} alt={postData.title} className={articleStyles.coverImage} />
        )}

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

      </article>

      <div className={articleStyles.backLink}>
        <Link href="/posts">
          <a>← Вернуться ко всем статьям</a>
        </Link>
      </div>
    </div>
  )
}
