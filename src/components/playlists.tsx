import PlayListItem from "@/components/playlist-item";
import SeeMore from "@/components/ui/see-more";
import { getPlaylists } from "@/lib/playlist";

function Playlist() {
  const AMOUNT_OF_POST_TO_SHOW = 2;
  const playlists = getPlaylists();
  return (
    <>
      <h2>فهرست پخش</h2>
      {playlists.map((playlist) => {
        const topPosts = playlist.posts.slice(0, AMOUNT_OF_POST_TO_SHOW);
        const playlistSlug = playlist.name
          .toLocaleLowerCase()
          .replaceAll(" ", "-");
        return (
          <section key={playlist.name}>
            <h3>{playlist.name}</h3>
            <ul>
              {topPosts.map((post) => (
                <PlayListItem post={post} key={post.slug} />
              ))}
            </ul>
            {playlist.posts.length > AMOUNT_OF_POST_TO_SHOW && (
              <SeeMore
                title={`دیدن همه ${playlist.posts.length} پست ها`}
                href={`/playlists/${playlistSlug}`}
              />
            )}
          </section>
        );
      })}
    </>
  );
}

export default Playlist;
