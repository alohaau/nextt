import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
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
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const mainPosts = filteredPosts.slice(0, 10)
  const sliderPosts = filteredPosts.slice(10)

  const categories = ['All', ...new Set(allPostsData.map(post => post.category))]

  // Unique background colors for categories
  const categoryColors = {
    'Technology': '#e3f2fd',
    'Design': '#e8f5e9',
    'Business': '#fff3e0',
    'Lifestyle': '#fce4ec',
    'Health': '#e0f7fa',
    'Default': '#f5f5f5'
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Modern Blog | Home</title>
        <meta name="description" content="A modern blog with Next.js" />
      </Head>

      {/* Навигация */}
    {/* Навигация */}
<nav className={styles.navbar}>
  <div className={styles.navContainer}>
    <Link href="/" className={styles.logo}>ModernBlog</Link>
    
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
        <Link href="/about" className={styles.navLink}>About</Link>
        <Link href="/categories" className={styles.navLink}>Categories</Link>
        <Link href="/contact" className={styles.navLink}>Contact</Link>
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchButton}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
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
                  backgroundColor: categoryColors[post.category] || categoryColors['Default'],
                  borderLeft: `4px solid ${getCategoryBorderColor(post.category)}`
                }}
              >
                <div className={styles.postContent}>
                  <span 
                    className={styles.postCategory}
                    style={{ color: getCategoryTextColor(post.category) }}
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
                    backgroundColor: categoryColors[post.category] || categoryColors['Default'],
                    borderTop: `3px solid ${getCategoryBorderColor(post.category)}`
                  }}
                >
                  <div className={styles.sliderContent}>
                    <span 
                      className={styles.sliderCategory}
                      style={{ color: getCategoryTextColor(post.category) }}
                    >
                      {post.category}
                    </span>
                    <h3 className={styles.sliderTitle}>
                      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className={styles.sliderExcerpt}>{post.excerpt.substring(0, 100)}...</p>
                    <Link href={`/posts/${post.slug}`} className={styles.sliderReadMore}>
                      Read →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Футер */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerAbout}>
            <h3 className={styles.footerLogo}>ModernBlog</h3>
            <p className={styles.footerText}>
              A modern blog built with Next.js and React. Sharing insights about technology, design and more.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.footerTitle}>Quick Links</h4>
            <ul className={styles.footerList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.footerSubscribe}>
            <h4 className={styles.footerTitle}>Subscribe</h4>
            <p className={styles.footerText}>Get the latest articles delivered to your inbox</p>
            <div className={styles.subscribeForm}>
              <input type="email" placeholder="Your email" className={styles.subscribeInput} />
              <button className={styles.subscribeButton}>Subscribe</button>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} ModernBlog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Helper functions for category colors
function getCategoryBorderColor(category) {
  const colors = {
    'Technology': '#2196f3',
    'Design': '#4caf50',
    'Business': '#ff9800',
    'Lifestyle': '#e91e63',
    'Health': '#00bcd4',
    'Default': '#9e9e9e'
  }
  return colors[category] || colors['Default']
}

function getCategoryTextColor(category) {
  const colors = {
    'Technology': '#0d47a1',
    'Design': '#2e7d32',
    'Business': '#e65100',
    'Lifestyle': '#ad1457',
    'Health': '#00838f',
    'Default': '#424242'
  }
  return colors[category] || colors['Default']
}

