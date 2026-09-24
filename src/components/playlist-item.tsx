import Link from "next/link";

function playlistItem({
  post,
}: {
  post: {
    slug: string;
    title: string;
    href?: string;
  };
}) {
  return (
    <li key={post.slug}>
      <Link href={post.href ? post.href : post.slug}>{post.title}</Link>
    </li>
  );
}

export default playlistItem;
