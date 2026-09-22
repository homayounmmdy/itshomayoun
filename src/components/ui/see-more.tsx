import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Link } from "next-view-transitions";

function seeMore({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href} className="flex gap-1 items-center hover:underline">
      <IconArrowNarrowRight className="w-4" />
      {title}
    </Link>
  );
}

export default seeMore;
