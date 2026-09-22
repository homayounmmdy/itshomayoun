import Link from "next/link";

function playlistItem({
  post,
}: {
  post: {
    slug: string;
    title: string;
  };
}) {
  return (
    <li key={post.slug}>
      <Link href={post.slug}>{post.title}</Link>
    </li>
  );
}

export default playlistItem;
