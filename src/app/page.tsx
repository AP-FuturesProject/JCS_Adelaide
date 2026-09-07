import Image from "next/image";
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
        </div>
      </main>
      <InstagramFeed />
    </>
  );
}
