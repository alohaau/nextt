import Head from 'next/head';
import Link from 'next/link';
import styles from '../pages/Blog.module.css';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export default function Layout({ children, title = "Disney World Ticket Guide" }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Шапка (скопирована из pages/index.tsx) */}
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
              <Link href="/" className={styles.navLink}>
                Articles
              </Link>
              <Link href="/privacy-policy" className={styles.navLink}>
                Privacy policy
              </Link>
            </div>

            
          </div>
        </div>
      </nav>


      <main className={styles.main}>
        {children}
      </main>

      {/* Футер (скопирован из pages/index.tsx) */}
      <footer className={styles.footer}>
              <div className={styles.footerContent}>
                <div className={styles.footerLinks}>
                  <Link href="/about">About Us</Link>
                  <Link href="/">Articles</Link>
                  <Link href="/privacy-policy">Privacy policy</Link>
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