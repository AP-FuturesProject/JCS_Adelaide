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
  mediaUrl?: string;
  /* Behold documents mediaType as IMAGE | VIDEO | REEL | CAROUSEL_ALBUM, and
     which of these reach us is a per-feed setting in the Behold dashboard. */
  mediaType?: string;
  thumbnailUrl?: string;
  /* Optional: a video or reel may arrive without the generated image sizes,
     in which case the thumbnail is the only still we get. */
  sizes?: Partial<Record<SizeKey, BeholdSize | undefined>>;
}

const SIZE_KEYS = ["small", "medium", "large", "full"] as const;
type SizeKey = (typeof SIZE_KEYS)[number];

const toAlt = (post: BeholdPost) => {
  const text = (post.prunedCaption || post.caption || "").replace(/\s+/g, " ").trim();
  if (!text) return "Instagram post from Jesus Christ Superstar Adelaide";
  return text.length > 140 ? `${text.slice(0, 139)}…` : text;
};

const isVideo = (post: BeholdPost) => post.mediaType === "VIDEO" || post.mediaType === "REEL";

/* Returns null rather than throwing: one malformed post should cost us that
   post, not the whole carousel. mediaUrl is deliberately not a fallback for
   video — there it is the .mp4, which an <img> cannot show. */
const toPost = (post: BeholdPost): InstagramPost | null => {
  if (!post?.id || !post.permalink) return null;

  const sizes = SIZE_KEYS
    .map(key => ({ key, size: post.sizes?.[key] }))
    .filter((entry): entry is { key: SizeKey; size: BeholdSize } =>
      !!entry.size?.mediaUrl && !!entry.size.width && !!entry.size.height
    );

  const largest = sizes.length > 0 ? sizes[sizes.length - 1].size : null;
  const still = largest?.mediaUrl ?? post.thumbnailUrl ?? (isVideo(post) ? null : post.mediaUrl);
  if (!still) return null;

  return {
    id: post.id,
    permalink: post.permalink,
    alt: toAlt(post),
    src: still,
    srcSet: largest ? sizes.map(({ size }) => `${size.mediaUrl} ${size.width}w`).join(", ") : undefined,
    width: largest?.width ?? 1080,
    height: largest?.height ?? 1350,
    isVideo: isVideo(post),
  };
};

async function getPosts(): Promise<InstagramPost[]> {
  try {
    const response = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!response.ok) return [];
    const feed = (await response.json()) as { posts?: BeholdPost[] };
    return (feed.posts ?? [])
      .map(toPost)
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, 6);
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
