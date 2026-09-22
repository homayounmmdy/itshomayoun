import PlayListItem from "@/components/playlist-item";
import { getPlaylists } from "@/lib/playlist";
import { slugify } from "@/lib/utils";

function Playlists() {
  const AMOUNT_OF_POST_TO_SHOW = 2;
  const playlists = getPlaylists();
  return (
    <>
      <h2>تمامی فهرست های پخش</h2>
      {playlists.map((playlist) => {
        const playlistSlug = slugify(playlist.name);

        const data = {
          slug: playlistSlug,
          title: playlist.name,
        };
        return (
          <section key={playlist.name}>
            <ul>
              <PlayListItem post={data} key={playlist.name} />
            </ul>
          </section>
        );
      })}
    </>
  );
}

export default Playlists;
