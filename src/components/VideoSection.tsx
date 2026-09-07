"use client";

import Script from "next/script";

export default function VideoSection() {
  return (
    <section className="video-section">
      <div className="video-wrap">
        <iframe
          src="https://player.vimeo.com/video/1216863451?h=6a6f991598&badge=0&autopause=0&player_id=0&app_id=58479"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          title="Jesus Christ Superstar - 2027 Teaser JCS"
        />
      </div>
      <Script src="https://player.vimeo.com/api/player.js" strategy="afterInteractive" />
    </section>
  );
}
