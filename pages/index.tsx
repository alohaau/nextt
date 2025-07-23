import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData, Post } from '../lib/posts'
import styles from '../styles/Home.module.css'

type HomeProps = {
  allPostsData: Post[]
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredPosts = allPostsData.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const mainPosts = filteredPosts.slice(0, 10)
  const sliderPosts = filteredPosts.slice(10)

  const categories = ['All', ...Array.from(new Set(allPostsData.map(post => post.category).filter(Boolean)))]

  // Unique background colors for categories
  const categoryColors: Record<string, string> = {
    Technology: '#e3f2fd',
    Design: '#e8f5e9',
    Business: '#fff3e0',
    Lifestyle: '#fce4ec',
    Health: '#e0f7fa',
    Default: '#f5f5f5'
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Modern Blog | Home</title>
        <meta name="description" content="A modern blog with Next.js" />
      </Head>

      {/* Навигация */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            ModernBlog
          </Link>

          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <div className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}>
            <div className={styles.navLinks}>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
              <Link href="/categories" className={styles.navLink}>
                Categories
              </Link>
              <Link href="/contact" className={styles.navLink}>
                Contact
              </Link>
            </div>

            <div className={styles.authButtons}>
              <button className={styles.loginBtn}>Login</button>
              <button className={styles.signupBtn}>Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Основное содержимое */}
      <main className={styles.main}>
        {/* Поиск и фильтры */}
        <section className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search articles..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchButton}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
          </div>

          <div className={styles.categoryFilters}>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${activeCategory === category ? styles.activeCategory : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Основные статьи */}
        <section className={styles.postsSection}>
          <h2 className={styles.sectionTitle}>Featured Articles</h2>

          <div className={styles.postsGrid}>
            {mainPosts.map(post => (
              <article
                key={post.slug}
                className={styles.postCard}
                style={{
                  backgroundColor: categoryColors[post.category ?? 'Default'] || categoryColors['Default'],
                  borderLeft: `4px solid ${getCategoryBorderColor(post.category ?? 'Default')}`
                }}
              >
                <div className={styles.postContent}>
                  <span
                    className={styles.postCategory}
                    style={{ color: getCategoryTextColor(post.category ?? 'Default') }}
                  >
                    {post.category}
                  </span>
                  <h3 className={styles.postTitle}>
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <div className={styles.postMeta}>
                    <span className={styles.postDate}>{post.date}</span>
                    <Link href={`/posts/${post.slug}`} className={styles.readMore}>
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Слайдер статей */}
        {sliderPosts.length > 0 && (
          <section className={styles.sliderSection}>
            <h2 className={styles.sectionTitle}>More Articles</h2>
            <div className={styles.postsSlider}>
              {sliderPosts.map(post => (
                <div
                  key={post.slug}
                  className={styles.sliderCard}
                  style={{
                    backgroundColor: categoryColors[post.category ?? 'Default'] || categoryColors['Default'],
                    borderTop: `3px solid ${getCategoryBorderColor(post.category ?? 'Default')}`
                  }}
                >
                  <div className={styles.sliderContent}>
                    <span
                      className={styles.sliderCategory}
                      style={{ color: getCategoryTextColor(post.category ?? 'Default') }}
                    >
                      {post.category}
                    </span>
                    <h3 className={styles.sliderTitle}>
                      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className={styles.sliderExcerpt}>{post.excerpt?.substring(0, 100)}...</p>
                    <div className={styles.sliderMeta}>
                      <span className={styles.sliderDate}>{post.date}</span>
                      <Link href={`/posts/${post.slug}`} className={styles.readMore}>
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Modern Blog. All rights reserved.
      </footer>
    </div>
  )
}

// Вспомогательные функции для цветов категорий

function getCategoryBorderColor(category: string): string {
  switch (category) {
    case 'Technology':
      return '#42a5f5'
    case 'Design':
      return '#66bb6a'
    case 'Business':
      return '#ffa726'
    case 'Lifestyle':
      return '#ec407a'
    case 'Health':
      return '#26c6da'
    default:
      return '#bdbdbd'
  }
}

function getCategoryTextColor(category: string): string {
  switch (category) {
    case 'Technology':
      return '#1565c0'
    case 'Design':
      return '#2e7d32'
    case 'Business':
      return '#ef6c00'
    case 'Lifestyle':
      return '#ad1457'
    case 'Health':
      return '#00838f'
    default:
      return '#616161'
  }
}
