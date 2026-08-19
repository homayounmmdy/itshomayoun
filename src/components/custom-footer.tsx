import { Navbar } from "@/components/navbar";
import { ThemeSwitch } from "nextra-theme-blog";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";

const CustomFooter = async () => {
  return (
    <div className="pt-32">
      <div className="space-y-6">
        <Navbar pageMap={await getPageMap()} />

        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-2 items-center">
            <ThemeSwitch />
            <div>© {new Date().getFullYear()} همایون</div>
          </div>
          <Search placeholder="جستجو پست ها..." />
        </div>
      </div>
    </div>
  );
};

export default CustomFooter;
