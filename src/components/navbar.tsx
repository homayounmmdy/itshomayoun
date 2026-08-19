import type {PageMapItem} from 'nextra'
import {normalizePages} from 'nextra/normalize-pages'
import type {FC, ReactNode} from 'react'
import {NavbarLink} from './navbar-link'
import {cn} from "@/lib/utils";

type NavbarProps = {
    children?: ReactNode;
    pageMap: PageMapItem[];
    className?: string;
}

export const Navbar: FC<NavbarProps> = ({children, pageMap, className}) => {
    const {topLevelNavbarItems} = normalizePages({list: pageMap, route: '/'})
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
   <NavbarLink href="/" target="_blank">
                خانه
            </NavbarLink>
   <NavbarLink href="/posts" target="_blank">
                پست ها
            </NavbarLink>
            <NavbarLink href="/rss.xml" target="_blank">
                RSS
            </NavbarLink>
            <NavbarLink href="https://github.com/homayounmmdy/itshomayoun" target="_blank">
                گیت هاب
            </NavbarLink>
        </div>
    )
}
