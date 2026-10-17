import { cn } from "@/lib/utils";
import type { PageMapItem } from "nextra";
import { normalizePages } from "nextra/normalize-pages";
import type { FC, ReactNode } from "react";
import { NavbarLink } from "./navbar-link";

type NavbarProps = {
  children?: ReactNode;
  pageMap: PageMapItem[];
  className?: string;
};

export const Navbar: FC<NavbarProps> = ({ children, pageMap, className }) => {
  const { topLevelNavbarItems } = normalizePages({ list: pageMap, route: "/" });
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      data-pagefind-ignore="all"
    >
      {/* {topLevelNavbarItems.map(nav => (
                <NavbarLink key={nav.route} href={nav.route}>
                    {nav.title}
                </NavbarLink>
            ))} */}
      {children}
      <NavbarLink href="/">
        خانه
      </NavbarLink>
      <NavbarLink href="/posts">
        پست ها
      </NavbarLink>
      <NavbarLink href="/playlists">
        فهرست پخش ها
      </NavbarLink>
      <NavbarLink href="/rss.xml" target="_blank">
        RSS
      </NavbarLink>
      <NavbarLink
        href="https://github.com/homayounmmdy/itshomayoun"
        target="_blank"
      >
        گیت هاب
      </NavbarLink>
    </div>
  );
};
