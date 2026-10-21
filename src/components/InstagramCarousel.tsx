"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface InstagramPost {
  id: string;
  permalink: string;
  alt: string;
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

export default function InstagramCarousel({ posts }: { posts: InstagramPost[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    if (!slide) return;
    setIndex(Math.round(track.scrollLeft / slide.offsetWidth));
  }, []);

  const goTo = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetWidth * next, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goTo(Math.max(0, index - 1));
      if (event.key === "ArrowRight") goTo(Math.min(posts.length - 1, index + 1));
    };
    track.addEventListener("keydown", onKey);
    return () => track.removeEventListener("keydown", onKey);
  }, [goTo, index, posts.length]);

  return (
    <div className="ig-carousel">
      <div
        className="ig-track"
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Recent Instagram posts"
      >
        {posts.map((post, i) => (
          <a
            key={post.id}
            className="ig-slide"
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open Instagram post ${i + 1} of ${posts.length}`}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
          >
            <img
              src={post.src}
              srcSet={post.srcSet}
              sizes="(min-width: 480px) 420px, 88vw"
              width={post.width}
              height={post.height}
              alt={post.alt}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </a>
        ))}
      </div>

      <button
        type="button"
        className="ig-arrow ig-arrow--prev"
        onClick={() => goTo(Math.max(0, index - 1))}
        disabled={index === 0}
        aria-label="Previous post"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m15 5-7 7 7 7" />
        </svg>
      </button>
      <button
        type="button"
        className="ig-arrow ig-arrow--next"
        onClick={() => goTo(Math.min(posts.length - 1, index + 1))}
        disabled={index === posts.length - 1}
        aria-label="Next post"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m9 5 7 7-7 7" />
        </svg>
      </button>

      <div className="ig-dots">
        {posts.map((post, i) => (
          <button
            key={post.id}
            type="button"
            className={`ig-dot${i === index ? " is-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to post ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
