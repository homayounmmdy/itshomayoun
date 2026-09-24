import CustomFooter from "@/components/custom-footer";
import CustomHeader from "@/components/custom-header";
import "@/styles/globals.css";
import { Metadata } from "next";
import localFont from "next/font/local";
import { Layout } from "nextra-theme-blog";
import "nextra-theme-blog/style.css";
import { Head } from "nextra/components";

export const metadata: Metadata = {
  title: "itshomayoun",
};

const bodyFont = localFont({
  src: [
    {
      path: "../../public/IRANSansX.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});

export default async function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={bodyFont.className}
    >
      <Head backgroundColor={{ dark: "#15120d", light: "#faf5e9" }} />
      <body className="min-h-screen">
        <Layout>
          <CustomHeader />
          {children}
          <CustomFooter />
        </Layout>
      </body>
    </html>
  );
}
