import Image from "next/image";
import VideoSection from "@/components/VideoSection";
import InstagramFeed from "@/components/InstagramFeed";

export default function Home() {
  return (
    <>
      <main className="stage">
        <div className="spotlight" aria-hidden="true" />
        <div className="content">
          <p className="location">Adelaide</p>
          <div className="logo-wrap">
            <Image
              src="/jcs-logo.png"
              alt="Jesus Christ Superstar"
              width={900}
              height={400}
              priority
              className="logo-img"
            />
          </div>
          <div className="rule" aria-hidden="true" />
          <p className="coming-soon">Coming Easter 2027</p>
          <a
            href="https://futuresaustralia.churchcenter.com/registrations/events/3694286"
            target="_blank"
            rel="noopener noreferrer"
            className="audition-btn"
          >
            Cast &amp; Crew Auditions
          </a>
        </div>
      </main>
      <VideoSection />
      <InstagramFeed />
    </>
  );
}
