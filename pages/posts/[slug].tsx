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
  <h1>{postData.title}</h1>

  {/* Основной текст статьи */}
  <p>
    Visiting world-class amusement destinations requires careful ticket planning. Here's what you should know:
  </p>

  {/* Список */}
  <ul>
    <li>Check for seasonal discounts and promotions</li>
    <li>Compare ticket types: single-day, multi-day, and annual passes</li>
    <li>Book early for guaranteed entry and better pricing</li>
    <li>Use official apps for mobile tickets and perks</li>
  </ul>

  {/* Кнопка назад */}
  <Link href="/posts" className={articleStyles.backButton}>
    ← Назад ко всем статьям
  </Link>
</article>    </div>
  )
}
