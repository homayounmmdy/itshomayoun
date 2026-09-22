import PlayListItem from "@/components/playlist-item";
import { getPlaylists } from "@/lib/playlist";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PlaylistPage({ params }: Props) {
  const { slug } = await params;

  const playlists = getPlaylists();

  const playlist = playlists.find((playlist) => {
    const normalized = playlist.name.toLocaleLowerCase().replaceAll(" ", "-");
    return normalized === decodeURIComponent(slug);
  });

  if (!playlist) notFound();

  return (
    <>
      <h1>{playlist.name}</h1>
      <ul>
        {playlist.posts.map((post) => (
          <PlayListItem post={post} key={post.slug} />
        ))}
      </ul>
    </>
  );
}
