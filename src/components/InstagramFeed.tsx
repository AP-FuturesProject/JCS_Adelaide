"use client";

import { useEffect, useState } from "react";

interface Post {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        if (data.data) {
          setPosts(data.data);
          setStatus("ok");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "error") return null;

  return (
    <section className="ig-section">
      <p className="ig-label">Follow Along</p>
      <div className="ig-grid">
        {status === "loading"
          ? Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="ig-cell ig-skeleton" />
            ))
          : posts.map((post) => {
              const src =
                post.media_type === "VIDEO"
                  ? post.thumbnail_url ?? post.media_url
                  : post.media_url;
              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ig-cell"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" />
                  {post.media_type === "VIDEO" && (
                    <span className="ig-play" aria-hidden="true">▶</span>
                  )}
                </a>
              );
            })}
      </div>
    </section>
  );
}
