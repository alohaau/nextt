import { GetStaticPaths, GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { getPostBySlug, getAllPosts } from '../../lib/posts'
import PostContent from '../../components/PostContent'
import styles from '../../styles/Post.module.css'

interface Params extends ParsedUrlQuery {
  slug: string
}

export default function PostPage({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>{post.title} | DisneyWorldTicket</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Head>

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.article}
      >
        {/* Шапка статьи */}
        <header className={styles.header}>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={styles.imageWrapper}
          >
            <Image
              src={post.image || '/default-cover.jpg'}
              alt={post.title}
              width={1200}
              height={630}
              className={styles.image}
              priority
            />
          </motion.div>

          <div className={styles.meta}>
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={styles.category}
            >
              {post.category}
            </motion.span>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={styles.title}
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={styles.details}
            >
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </motion.div>
          </div>
        </header>

        {/* Контент статьи */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={styles.content}
        >
          <PostContent content={post.content} />
        </motion.section>

        {/* Кнопка возврата */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className={styles.backButton}
        >
          <Link href="/" className={styles.backLink}>
            ← Назад к статьям
          </Link>
        </motion.div>
      </motion.article>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params
  const post = getPostBySlug(slug)

  return {
    props: { post }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    fallback: false
  }
}