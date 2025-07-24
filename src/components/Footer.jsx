import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Footer() {
  return (
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
  );
}