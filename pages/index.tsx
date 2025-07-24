import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData, Post } from '../lib/posts';
import styles from '../styles/Home.module.css';

type HomeProps = {
  allPostsData: Post[];
};

type Category = 'All' | 'Attractions' | 'Tickets' | 'Planning' | 'Dining' | 'Accommodations' | string;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
}

export default function Home({ allPostsData }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredPosts = allPostsData.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const mainPosts = filteredPosts.slice(0, 10);
  const sliderPosts = filteredPosts.slice(10);

  const categories = ['All', 'Attractions', 'Tickets', 'Planning', 'Dining', 'Accommodations'];

  const categoryColors: Record<string, string> = {
    Attractions: '#e3f2fd',
    Tickets: '#e8f5e9',
    Planning: '#fff3e0',
    Dining: '#fce4ec',
    Accommodations: '#e0f7fa',
    Default: '#f5f5f5'
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Disney World Ticket Guide | Official Park Tips & Planning Advice</title>
        <meta name="description" content="Your complete guide to visiting the most magical theme parks. Find ticket deals, attraction guides, and expert planning tips for your perfect vacation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="theme park tickets, vacation planning, attraction guides, dining tips, hotel reviews" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Disney World Ticket Guide | Official Park Tips" />
        <meta property="og:description" content="Expert advice for planning your perfect theme park vacation" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.disneyworldticket.com" />
        <meta property="og:image" content="https://www.disneyworldticket.com/images/social-preview.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Disney World Ticket Guide" />
        <meta name="twitter:description" content="Your complete guide to theme park vacations" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.disneyworldticket.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Head>

      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Disney World Ticket Guide",
          "url": "https://www.disneyworldticket.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.disneyworldticket.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      <nav className={styles.navbar} aria-label="Main navigation">
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo} aria-label="Disney World Ticket Guide Home">
            DisneyWorldTicket.com
          </Link>

          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
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
                About Us
              </Link>
              <Link href="/pages" className={styles.navLink}>
                Articles
              </Link>
              <Link href="/contact" className={styles.navLink}>
                Privacy policy
              </Link>
            </div>

            
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <section className={styles.searchSection} aria-label="Search articles">
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search articles..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              aria-label="Search articles"
            />
            <button className={styles.searchButton} aria-label="Search">
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
                onClick={() => category && setActiveCategory(category)}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.postsSection}>
          <h1 className={styles.sectionTitle}>Disney Park Guides & Tips</h1>
          <p className={styles.sectionSubtitle}>Expert advice for planning your perfect theme park vacation</p>

          <div className={styles.postsGrid} role="list">
            {mainPosts.map(post => (
              <article 
                key={post.slug}
                className={styles.postCard}
                role="listitem"
                itemScope
                itemType="https://schema.org/BlogPosting"
                style={{
                  backgroundColor: categoryColors[post.category ?? 'Default'] || categoryColors['Default'],
                  borderLeft: `4px solid ${getCategoryBorderColor(post.category ?? 'Default')}`
                }}
              >
                <div className={styles.postContent}>
                  <span 
                    className={styles.postCategory}
                    style={{ color: getCategoryTextColor(post.category ?? 'Default') }}
                    itemProp="articleSection"
                  >
                    {post.category}
                  </span>
                  <h2 className={styles.postTitle} itemProp="headline">
                    <Link href={`/posts/${post.slug}`} itemProp="url">{post.title}</Link>
                  </h2>
                  <p className={styles.postExcerpt} itemProp="description">{post.excerpt}</p>
                  <div className={styles.postMeta}>
                    <time className={styles.postDate} dateTime={post.date} itemProp="datePublished">
                      {post.date}
                    </time>
                    <Link href={`/posts/${post.slug}`} className={styles.readMore} aria-label={`Read more about ${post.title}`}>
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {sliderPosts.length > 0 && (
          <section className={styles.sliderSection}>
            <h2 className={styles.sectionTitle}>More Articles</h2>
            <div className={styles.postsSlider} role="list">
              {sliderPosts.map(post => (
                <div
                  key={post.slug}
                  className={styles.sliderCard}
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                  style={{
                    backgroundColor: categoryColors[post.category ?? 'Default'] || categoryColors['Default'],
                    borderTop: `3px solid ${getCategoryBorderColor(post.category ?? 'Default')}`
                  }}
                >
                  <div className={styles.sliderContent}>
                    <span
                      className={styles.sliderCategory}
                      style={{ color: getCategoryTextColor(post.category ?? 'Default') }}
                      itemProp="articleSection"
                    >
                      {post.category}
                    </span>
                    <h3 className={styles.sliderTitle} itemProp="headline">
                      <Link href={`/posts/${post.slug}`} itemProp="url">{post.title}</Link>
                    </h3>
                    <p className={styles.sliderExcerpt} itemProp="description">{post.excerpt?.substring(0, 100)}...</p>
                    <div className={styles.sliderMeta}>
                      <time className={styles.sliderDate} dateTime={post.date} itemProp="datePublished">
                        {post.date}
                      </time>
                      <Link href={`/posts/${post.slug}`} className={styles.readMore} aria-label={`Read more about ${post.title}`}>
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
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <Link href="/about">About Us</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} DisneyWorldTicket.com - Independent Theme Park Resource. Not affiliated with The Walt Disney Company.</p>
          <p className={styles.disclaimer}>
            All information provided is based on personal experience and research. Prices, policies, and attractions are subject to change.
            All trademarks are property of their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}

function getCategoryBorderColor(category: string): string {
  switch (category) {
    case 'Attractions':
      return '#42a5f5';
    case 'Tickets':
      return '#66bb6a';
    case 'Planning':
      return '#ffa726';
    case 'Dining':
      return '#ec407a';
    case 'Accommodations':
      return '#26c6da';
    default:
      return '#bdbdbd';
  }
}

function getCategoryTextColor(category: string): string {
  switch (category) {
    case 'Attractions':
      return '#1565c0';
    case 'Tickets':
      return '#2e7d32';
    case 'Planning':
      return '#ef6c00';
    case 'Dining':
      return '#ad1457';
    case 'Accommodations':
      return '#00838f';
    default:
      return '#616161';
  }
}