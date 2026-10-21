import Image from "next/image";

const AUDITIONS_URL = "https://futuresaustralia.churchcenter.com/registrations/events/3694286";
const INSTAGRAM_URL = "https://www.instagram.com/jesuschristsuperstar.adl/";
const CHURCH_URL = "https://futures.church";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Image
        src="/jcs-icon.webp"
        alt="Jesus Christ Superstar"
        width={120}
        height={100}
        className="footer-mark"
      />

      <p className="footer-show">
        Jesus Christ Superstar
        <span className="footer-show-sub">Easter 2027 &middot; Futures Event Centre, Paradise</span>
      </p>

      <nav className="footer-nav" aria-label="Footer">
        <a href={AUDITIONS_URL} target="_blank" rel="noopener noreferrer">
          Auditions
        </a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href={CHURCH_URL} target="_blank" rel="noopener noreferrer">
          Futures Church
        </a>
      </nav>

      <p className="footer-legal">
        &copy; {new Date().getFullYear()} Futures Church &middot; Adelaide, South Australia
      </p>
    </footer>
  );
}
