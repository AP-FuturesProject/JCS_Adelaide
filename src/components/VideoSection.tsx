"use client";

import Script from "next/script";

/* Unlisted Vimeo uploads need their privacy hash (h=...) on the player URL or
   the embed is rejected, so each entry keeps its own. */
const VIDEOS = [
  {
    key: "teaser",
    title: "Jesus Christ Superstar - 2027 Teaser JCS",
    /* Plays itself, silent and looping — it sits under the logo as motion,
       not as something you press play on. */
    src:
      "https://player.vimeo.com/video/1216863451?h=6a6f991598&badge=0&autopause=0" +
      "&player_id=0&app_id=58479&autoplay=1&muted=1&playsinline=1&loop=1",
  },
  {
    key: "second",
    title: "Jesus Christ Superstar Adelaide",
    /* Press-to-play with sound: autoplay here would fight the teaser above. */
    src:
      "https://player.vimeo.com/video/1247464252?h=01d2f85e5d&badge=0&autopause=0" +
      "&player_id=0&app_id=58479&playsinline=1",
  },
];

export default function VideoSection() {
  return (
    <section className="video-section">
      {VIDEOS.map((video) => (
        <div className="video-wrap" key={video.key}>
          <iframe
            src={video.src}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            title={video.title}
          />
        </div>
      ))}
      <Script src="https://player.vimeo.com/api/player.js" strategy="afterInteractive" />
    </section>
  );
}
