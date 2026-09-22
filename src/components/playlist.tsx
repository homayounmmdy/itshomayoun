import { getPlaylists } from "@/lib/playlist";
import Link from "next/link";

function Playlist() {
  const playlists = getPlaylists();
  return (
    <>
      <h2>فهرست پخش</h2>
      {playlists.map((playlist) => (
        <section key={playlist.name}>
          <h3>{playlist.name}</h3>
          <ul>
            {playlist.posts.map((post) => (
              <li key={post.slug}>
                <Link href={post.slug}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

export default Playlist;
