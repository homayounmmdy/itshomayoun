import fg from "fast-glob";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const WITHOUT_PLAYLIST_NUMBER = 999999999999999 // To keep it in bottom

export type Post = {
  title: string;
  slug: string;
  playlist: string;
  playlistOrder: number;
};

export type Playlist = {
  name: string;
  posts: Post[];
};

export function getPlaylists(): Playlist[] {
  const files = fg.sync("**/*.mdx", {
    cwd: CONTENT_DIR,
  });

  const playlists = new Map<string, Post[]>();

  for (const file of files) {
    const fullPath = path.join(CONTENT_DIR, file);
    const source = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(source);

    if (!data.playlist) continue;

    const slug = "/" + file.replace(/\.mdx$/, "").replace(/\/index$/, "");

    const post: Post = {
      title: data.title ?? file,
      slug,
      playlist: data.playlist,
      playlistOrder: Number(data.playlistOrder ?? WITHOUT_PLAYLIST_NUMBER) ,
    };

    if (!playlists.has(data.playlist)) {
      playlists.set(data.playlist, []);
    }

    playlists.get(data.playlist)!.push(post);
  }

  return Array.from(playlists.entries()).map(([name, posts]) => ({
    name,
    posts: posts.sort((a, b) => a.playlistOrder - b.playlistOrder),
  }));
}
