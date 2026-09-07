import Image from "next/image";
import VideoSection from "@/components/VideoSection";
import InstagramFeed from "@/components/InstagramFeed";

export default function Home() {
  return (
    <>
      <main className="stage">
        <div className="video-bg-wrap" aria-hidden="true">
        <iframe
          src="https://www.youtube.com/embed/IdX7JvGPiTw?autoplay=1&mute=1&loop=1&controls=0&playlist=IdX7JvGPiTw&playsinline=1&disablekb=1&iv_load_policy=3&rel=0&modestbranding=1&showinfo=0&cc_load_policy=0&fs=0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          className="video-bg-iframe"
          title=""
        />
      </div>
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
