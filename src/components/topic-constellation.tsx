import { getPosts, PostItem } from "@/lib/get-posts";
import Link from "next/link";
import fixRTL from "rtl-text-tools";

type Post = PostItem & {
  frontMatter: PostItem["frontMatter"] & {
    description?: string;
    playlist?: string;
    imgurl?: string;
  };
};

const TopicConstellation = async () => {
  const POST_LIMIT = 12;
  const posts = await getPosts();
  const counts = new Map<string, number>();
  const tagsOf = (post: Post) => post.frontMatter.tags ?? [];

  for (const post of posts) {
    for (const tag of tagsOf(post as Post)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  const topics = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, POST_LIMIT);

  if (!topics.length) return null;

  return (
    <section dir="rtl" className="space-y-5">
      <header >
        <h2 className="text-2xl my-1 font-bold tracking-tight">
          دنبال چه چیزی هستی؟
        </h2>

        <p className="max-w-xl text-sm leading-7 text-muted-foreground">
          از یک موضوع شروع کن و مسیر خودت را پیدا کن.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {topics.map(([tag, count], index) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors hover:border-foreground/40 hover:bg-muted/50 ${
              index < 3 ? "bg-muted/50" : ""
            }`}
          >
            <span className="text-sm">{fixRTL(tag)}</span>
            <span className="font-mono text-xs text-muted-foreground">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopicConstellation;
