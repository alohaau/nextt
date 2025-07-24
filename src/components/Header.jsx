import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Header() {
  return (
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
  );
}