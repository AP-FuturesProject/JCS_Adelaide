import InstagramCarousel from "@/components/InstagramCarousel";
import type { InstagramPost } from "@/components/InstagramCarousel";

const FEED_URL = "https://feeds.behold.so/pDvOivsL0ZBmC3OsayhL";
const PROFILE_URL = "https://www.instagram.com/jesuschristsuperstar.adl/";

interface BeholdSize {
  width: number;
  height: number;
  mediaUrl: string;
}

interface BeholdPost {
  id: string;
  permalink: string;
  prunedCaption?: string;
  caption?: string;
  mediaUrl: string;
  sizes: Record<"small" | "medium" | "large" | "full", BeholdSize>;
}

const toAlt = (post: BeholdPost) => {
  const text = (post.prunedCaption || post.caption || "").replace(/\s+/g, " ").trim();
  if (!text) return "Instagram post from Jesus Christ Superstar Adelaide";
  return text.length > 140 ? `${text.slice(0, 139)}…` : text;
};

async function getPosts(): Promise<InstagramPost[]> {
  try {
    const response = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!response.ok) return [];
    const feed = (await response.json()) as { posts?: BeholdPost[] };
    return (feed.posts ?? []).slice(0, 6).map(post => ({
      id: post.id,
      permalink: post.permalink,
      alt: toAlt(post),
      src: post.sizes.large.mediaUrl,
      srcSet: (["small", "medium", "large", "full"] as const)
        .map(key => `${post.sizes[key].mediaUrl} ${post.sizes[key].width}w`)
        .join(", "),
      width: post.sizes.large.width,
      height: post.sizes.large.height,
    }));
  } catch {
    return [];
  }
}

export default async function InstagramFeed() {
  const posts = await getPosts();

  return (
    <section className="ig-section">
      <h2 className="ig-heading">Follow Along</h2>
      <p className="ig-sub">
        follow us on{" "}
        <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="ig-link">
          instagram
        </a>
      </p>
      {posts.length > 0 && <InstagramCarousel posts={posts} />}
    </section>
  );
}
